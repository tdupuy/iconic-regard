import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/db';
import { services } from '$lib/db/schema';

export const load: PageServerLoad = async ({ params }) => {
	const dbServices = await db.select().from(services);
	if (!dbServices || dbServices.length === 0) {
		throw error(404, 'Not found');
	}

	return {
		services: dbServices
	};
};
