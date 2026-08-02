import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { decrypt } from '$lib/server/crypto';
import { upsertCustomer } from '$lib/server/customer';
import { db } from '$lib/db';
import { customers } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params }) => {
	const rawCustomers = await db.select().from(customers).where(eq(customers.id, params.id));
	const customer = rawCustomers.map((customer) => ({
		id: customer.id,
		name: customer.name,
		email: customer.email ? decrypt(customer.email) : null,
		phoneNumber: decrypt(customer.phoneNumber),
		createdAt: customer.createdAt,
		updatedAt: customer.updatedAt
	}));
	if (!customer || customer.length === 0) {
		throw error(404, 'Not found');
	}
	return {
		customer: customer[0]
	};
};

export const actions: Actions = {
	updateCustomer: async ({ request, params }) => {
		console.log('params.id:', params.id);
		const formData = await request.formData();
		const customerId = params.id;
		const name = String(formData.get('name') ?? '').trim();
		const email = String(formData.get('email') ?? '').trim();
		const phoneNumber = String(formData.get('phone_number') ?? '').trim();

		if (!customerId) return fail(400, { message: 'Identifiant manquant.' });
		if (!name || !phoneNumber) {
			return fail(400, { message: 'Le nom et le téléphone sont requis.' });
		}

		try {
			await upsertCustomer({
				id: customerId,
				name,
				phoneNumber,
				email: email || undefined
			});
		} catch (err) {
			return fail(500, { message: err instanceof Error ? err.message : 'Erreur de mise à jour' });
		}
		return { success: true };
	}
};
