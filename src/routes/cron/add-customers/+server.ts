import { json, error, type RequestHandler } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { syncCustomersFromBookings } from '$lib/server/syncBookingUsers';

const CRON_SECRET = env.CRON_SECRET;

export const GET: RequestHandler = async ({ request }) => {
	if (!dev) {
		if (!CRON_SECRET) {
			throw new Error('CRON_SECRET must be defined in environment variables in production');
		}

		const authHeader = request.headers.get('authorization');
		if (authHeader !== `Bearer ${CRON_SECRET}`) {
			throw error(401, 'Unauthorized');
		}
	}
	const results = await syncCustomersFromBookings();
	return json(results);
};
