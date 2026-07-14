import type { PageServerLoad } from './$types';
import { db } from '$lib/db';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
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
				category: categories.name
			})
			.from(services)
			.innerJoin(categories, eq(services.category, categories.id));
		return { services: rows };
	} catch (err) {
		throw error(500, err instanceof Error ? err.message : 'Erreur');
	}
};
