import { db } from '$lib/db';
import { services } from '$lib/db/schema';

export const load = async () => {
	const allServices = await db.select().from(services);
	return {
		title: 'Prendre rendez-vous',
		services: allServices
	};
};
