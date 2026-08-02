import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { upsertCustomer } from '$lib/server/customer';

export const actions: Actions = {
	createCustomer: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name')?.toString().trim();
		const phoneNumber = formData.get('phone_number')?.toString().trim();
		const email = formData.get('email')?.toString().trim();

		if (!name || !phoneNumber) {
			return fail(400, { message: 'Le nom et le téléphone sont requis.' });
		}

		let customer;
		try {
			customer = await upsertCustomer({
				name,
				phoneNumber,
				email: email || undefined
			});
		} catch (err) {
			console.error('createCustomer failed', err);
			return fail(500, { message: 'Une erreur est survenue lors de la création.' });
		}

		redirect(303, `/admin/customers/edit/${customer.id}`);
	}
};
