import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/db';
import { services, customers } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import { decrypt } from '$lib/server/crypto';

export const load: PageServerLoad = async ({ params }) => {
	const dbServices = await db.select().from(services).orderBy(services.name);
	if (!dbServices || dbServices.length === 0) {
		throw error(404, 'Not found');
	}

	const dbCustomers = params.customerId
		? await db.select().from(customers).where(eq(customers.id, params.customerId))
		: await db
				.select()
				.from(customers)
				.where(eq(customers.status, 'active'))
				.orderBy(customers.name);

	const decryptedCustomers = dbCustomers.map((customer) => ({
		...customer,
		email: customer.email ? decrypt(customer.email) : null,
		phoneNumber: decrypt(customer.phoneNumber)
	}));

	return {
		services: dbServices,
		customers: decryptedCustomers
	};
};
