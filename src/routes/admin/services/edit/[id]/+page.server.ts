import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/db';
import { services } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params }) => {
	const service = await db.select().from(services).where(eq(services.id, params.id));
	if (!service || service.length === 0) {
		error(404, 'Not found');
	}
	return {
		service: service[0]
	};
};
