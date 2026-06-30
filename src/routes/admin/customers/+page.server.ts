import type { PageServerLoad } from './$types';
import { getBookings } from '$lib/server/cal';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	try {
		const bookings = await getBookings({ status: 'upcoming' });
		return { bookings };
	} catch (err) {
		throw error(500, err instanceof Error ? err.message : 'Erreur Cal.com');
	}
};
