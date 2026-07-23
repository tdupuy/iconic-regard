import type { PageServerLoad } from './$types';
import { getCalendarEvents } from '$lib/server/google-calendar';

const CALENDAR_ID = 'primary';
// Calendrier partagé, à réutiliser plus tard si besoin :
// const SHARED_CALENDAR_ID = 'espaceparta.gee@gmail.com';

// Parse "YYYY-MM-DD" comme date locale, pas UTC (évite le décalage de fuseau horaire)
function parseLocalDate(dateStr: string): Date {
	const [y, m, d] = dateStr.split('-').map(Number);
	return new Date(y, m - 1, d);
}

// Lundi de la semaine contenant `dateParam` (ou aujourd'hui si absent)
function getWeekStart(dateParam: string | null): Date {
	const base = dateParam ? parseLocalDate(dateParam) : new Date();
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

	const events = await getCalendarEvents({
		calendarId: CALENDAR_ID,
		timeMin: weekStart.toISOString(),
		timeMax: weekEnd.toISOString()
	});

	return {
		weekStart: weekStart.toISOString(),
		events
	};
};
