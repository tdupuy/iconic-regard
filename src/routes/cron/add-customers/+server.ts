import { json, error, type RequestHandler } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { syncCustomersFromBookings } from '$lib/server/syncBookingUsers';

const CRON_TOKEN = env.CRON_TOKEN;

export const GET: RequestHandler = async ({ request }) => {
	if (!dev) {
		if (!CRON_TOKEN) {
			throw new Error('CRON_TOKEN must be defined in environment variables in production');
		}

		const token = request.headers.get('x-cron-token');
		if (!token || token !== CRON_TOKEN) {
			throw error(401, 'Unauthorized');
		}
	}
	const results = await syncCustomersFromBookings();
	return json(results);
};
