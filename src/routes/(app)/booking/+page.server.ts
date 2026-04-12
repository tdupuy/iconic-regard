import { db } from '$lib/db';
import { categories, services } from '$lib/db/schema';

export const load = async () => {
	const allServices = await db.select().from(services);
	const allCategories = await db.select().from(categories);
	return {
		title: 'Prendre rendez-vous',
		services: allServices,
		categories: allCategories
	};
};
