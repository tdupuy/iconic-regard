import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/db';
import { services } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params }) => {
	const service = await db
		.select()
		.from(services)
		.where(eq(services.id, Number(params.id)));
	if (!service || service.length === 0) {
		throw error(404, 'Not found');
	}
	return {
		service: service[0]
	};
};

export const actions: Actions = {
	updateService: async ({ request, params }) => {
		const formData = await request.formData();
		const serviceId = Number(params.id);
		const name = String(formData.get('name') ?? '').trim();
		const description = String(formData.get('description') ?? '').trim();
		const price = String(formData.get('price') ?? '').trim();

		if (!serviceId || !name || !description || !price) {
			return fail(400, { message: 'Nom, description et prix sont requis.' });
		}

		try {
			await db.update(services).set({ name, description, price }).where(eq(services.id, serviceId));
			return { success: true };
		} catch (err) {
			return fail(500, { message: err instanceof Error ? err.message : 'Erreur de mise à jour' });
		}
	}
};
