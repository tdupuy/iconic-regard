import type { PageServerLoad } from './$types';
import { getBookings } from '$lib/server/cal';

// Lundi de la semaine contenant `dateParam` (ou aujourd'hui si absent)
function getWeekStart(dateParam: string | null): Date {
	const base = dateParam ? new Date(dateParam) : new Date();
	const day = base.getDay(); // 0 = dimanche, 1 = lundi, ...
	const diffToMonday = day === 0 ? -6 : 1 - day;
	const monday = new Date(base);
	monday.setDate(base.getDate() + diffToMonday);
	monday.setHours(0, 0, 0, 0);
	return monday;
}

export const load: PageServerLoad = async ({ url }) => {
	const weekStart = getWeekStart(url.searchParams.get('semaine'));

	// Semaine de 6 jours : lundi -> samedi inclus, pas de RDV le dimanche
	const weekEnd = new Date(weekStart);
	weekEnd.setDate(weekEnd.getDate() + 6);

	const bookings = await getBookings({
		status: 'upcoming',
		afterStart: weekStart.toISOString(),
		beforeEnd: weekEnd.toISOString(),
		take: 100
	});

	return {
		weekStart: weekStart.toISOString(),
		bookings
	};
};
