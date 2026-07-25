import { db } from '$lib/db';
import { categories, services } from '$lib/db/schema';
import { eq, asc } from 'drizzle-orm';

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
		.innerJoin(categories, eq(services.category, categories.id))
		.where(eq(services.active, 1))
		.orderBy(asc(services.order));
	const allCategories = await db.select().from(categories);

	return {
		title: 'Prendre rendez-vous',
		services: allServices,
		categories: allCategories
	};
};
