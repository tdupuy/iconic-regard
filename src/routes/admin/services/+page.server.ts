import type { PageServerLoad } from './$types';
import { db } from '$lib/db';
import { eq, asc, sql, inArray } from 'drizzle-orm';
import { error, fail } from '@sveltejs/kit';
import { services, categories } from '$lib/db/schema';

export const load: PageServerLoad = async () => {
	try {
		const rows = await db
			.select({
				id: services.id,
				name: services.name,
				description: services.description,
				slug: services.slug,
				duration: services.duration,
				price: services.price,
				imgName: services.imgName,
				order: services.order,
				active: services.active,
				category: categories.name
			})
			.from(services)
			.innerJoin(categories, eq(services.category, categories.id))
			.orderBy(asc(services.order));
		return { services: rows };
	} catch (err) {
		throw error(500, err instanceof Error ? err.message : 'Erreur');
	}
};

export const actions = {
	toggleActive: async ({ url }) => {
		const id = Number(url.searchParams.get('id'));

		const service = await db.query.services.findFirst({ where: eq(services.id, id) });
		if (!service) return fail(404, { message: 'Service introuvable' });

		await db
			.update(services)
			.set({ active: service.active ? 0 : 1 })
			.where(eq(services.id, id));
		return { success: true };
	},
	reorder: async ({ request }) => {
		const formData = await request.formData();
		const rawIds = JSON.parse(formData.get('ids') as string) as (string | number)[];
		const ids = rawIds.map(Number);

		if (!ids?.length || ids.some(isNaN)) {
			return fail(400, { error: 'Ordre invalide' });
		}

		const orderCase = sql.join(
			ids.map((id, i) => sql`WHEN ${id} THEN ${i}`),
			sql` `
		);

		try {
			await db
				.update(services)
				.set({ order: sql`(CASE ${services.id} ${orderCase} END)::integer` })
				.where(inArray(services.id, ids));
		} catch (e) {
			console.error('Reorder SQL error:', e instanceof Error ? e.cause : e);
			return fail(500, { error: 'Erreur lors de la sauvegarde' });
		}

		return { success: true };
	}
};
