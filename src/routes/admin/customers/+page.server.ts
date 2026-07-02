import type { PageServerLoad, Actions } from './$types';
import { encrypt, decrypt } from '$lib/server/crypto';
import { db } from '$lib/db';
import { eq } from 'drizzle-orm';
import { customers, pendingCustomers } from '$lib/db/schema';
import { error, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	try {
		const rows = await db
			.select({
				id: customers.id,
				name: customers.name,
				email: customers.email,
				phoneNumber: customers.phoneNumber,
				matchedCustomerId: pendingCustomers.matchedCustomerId,
				reasons: pendingCustomers.reasons
			})
			.from(customers)
			.innerJoin(pendingCustomers, eq(pendingCustomers.customerId, customers.id))
			.where(eq(customers.status, 'pending'));

		type MatchReason = 'phone_match' | 'email_match' | 'name_match';

		const pendingBookings = rows
			.filter((row) => row.matchedCustomerId !== null)
			.map((row) => ({
				id: row.id,
				name: row.name,
				email: row.email ? decrypt(row.email) : null,
				phoneNumber: decrypt(row.phoneNumber),
				reason: {
					matchId: row.matchedCustomerId as string,
					reasons: row.reasons as MatchReason[]
				}
			}));

		return { bookings: pendingBookings };
	} catch (err) {
		throw error(500, err instanceof Error ? err.message : 'Erreur');
	}
};

export const actions: Actions = {
	addCustomer: async ({ request }) => {
		const form = await request.formData();
		const name = form.get('name') as string;
		const email = (form.get('email') as string) || null;
		const phoneNumber = form.get('phoneNumber') as string;

		if (!name || !phoneNumber) {
			return fail(400, { message: 'Nom et téléphone requis' });
		}

		try {
			await db.insert(customers).values({
				name,
				email: email ? encrypt(email) : null,
				phoneNumber: encrypt(phoneNumber),
				status: 'active'
			});
		} catch (err) {
			return fail(500, { message: err instanceof Error ? err.message : 'Erreur base de données' });
		}
	}
};
