import type { PageServerLoad } from './$types';
import { getCalendarEvents } from '$lib/server/google-calendar';
import { getWeekStart } from '$lib/utils';

const CALENDAR_ID = 'primary';
// Calendrier partagé, à réutiliser plus tard si besoin :
// const SHARED_CALENDAR_ID = 'espaceparta.gee@gmail.com';

export const load: PageServerLoad = async ({ url }) => {
	const weekStart = getWeekStart(url.searchParams.get('semaine'));

	// Semaine de 6 jours : lundi -> samedi inclus, pas de RDV le dimanche
	const weekEnd = new Date(weekStart);
	weekEnd.setDate(weekEnd.getDate() + 6);

	const events = await getCalendarEvents({
		calendarId: CALENDAR_ID,
		timeMin: weekStart.toISOString(),
		timeMax: weekEnd.toISOString()
	});

	return {
		weekStart: weekStart.toISOString(),
		events: events.map((e) => ({
			...e,
			calBookingUid: e.iCalUID?.match(/^(.+)@Cal\.com$/)?.[1]
		}))
	};
};
