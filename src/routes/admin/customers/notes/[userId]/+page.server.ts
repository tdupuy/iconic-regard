import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/db';
import { customerNotes } from '$lib/db/schema';
import { getActiveCustomer } from '$lib/server/customer';
import { eq } from 'drizzle-orm';
import { error, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const customer = await getActiveCustomer(params.userId);

	if (!customer) {
		error(404, 'Client introuvable');
	}

	const note = await db.query.customerNotes.findFirst({
		where: eq(customerNotes.customerId, params.userId)
	});

	return {
		customerName: customer.name,
		note
	};
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const formData = await request.formData();
		const note = formData.get('notes');

		if (typeof note !== 'string' || note.trim() === '') {
			return fail(400, { error: 'La note ne peut pas être vide.' });
		}

		const existing = await db.query.customerNotes.findFirst({
			where: eq(customerNotes.customerId, params.userId)
		});

		if (existing) {
			await db
				.update(customerNotes)
				.set({ note, updatedAt: new Date() })
				.where(eq(customerNotes.id, existing.id));
		} else {
			await db.insert(customerNotes).values({
				customerId: params.userId,
				note
			});
		}

		return { success: true };
	}
};
