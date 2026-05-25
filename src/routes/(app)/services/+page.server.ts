import { db } from '$lib/db';
import { categories, services } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const load = async () => {
	const allServices = await db
		.select({
			id: services.id,
			name: services.name,
			description: services.description,
			slug: services.slug,
			duration: services.duration,
			price: services.price,
			imgName: services.imgName,
			category: {
				id: categories.id,
				name: categories.name,
				slug: categories.slug
			}
		})
		.from(services)
		.innerJoin(categories, eq(services.category, categories.id));
	const allCategories = await db.select().from(categories);

	return {
		title: 'Mes prestations',
		services: allServices,
		categories: allCategories
	};
};
