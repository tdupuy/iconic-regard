import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN } from '$env/static/private';

const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const CALENDAR_API_BASE = 'https://www.googleapis.com/calendar/v3';

export interface GoogleCalendarEvent {
	id: string;
	summary?: string;
	description?: string;
	start: { dateTime?: string; date?: string };
	end: { dateTime?: string; date?: string };
	attendees?: { email: string; displayName?: string }[];
}

interface GoogleEventsListResponse {
	items: GoogleCalendarEvent[];
}

// Cache en mémoire de l'access token (évite de le régénérer à chaque appel)
let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
	if (cachedToken && cachedToken.expiresAt > Date.now()) {
		return cachedToken.value;
	}

	const res = await fetch(TOKEN_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			client_id: GOOGLE_CLIENT_ID,
			client_secret: GOOGLE_CLIENT_SECRET,
			refresh_token: GOOGLE_REFRESH_TOKEN,
			grant_type: 'refresh_token'
		})
	});

	if (!res.ok) {
		const body = await res.text();
		throw new Error(`Google OAuth refresh error (${res.status}): ${body}`);
	}

	const json = (await res.json()) as { access_token: string; expires_in: number };

	cachedToken = {
		value: json.access_token,
		// marge de sécurité de 60s avant l'expiration réelle
		expiresAt: Date.now() + (json.expires_in - 60) * 1000
	};

	return cachedToken.value;
}

async function calendarRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
	const accessToken = await getAccessToken();

	const res = await fetch(`${CALENDAR_API_BASE}${path}`, {
		...options,
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'Content-Type': 'application/json',
			...options.headers
		}
	});

	if (!res.ok) {
		const body = await res.text();
		throw new Error(`Google Calendar API error (${res.status}): ${body}`);
	}

	return res.json() as Promise<T>;
}

export async function getCalendarEvents(opts: {
	calendarId: string;
	timeMin: string; // ISO 8601
	timeMax: string; // ISO 8601
}): Promise<GoogleCalendarEvent[]> {
	const { calendarId, timeMin, timeMax } = opts;

	const params = new URLSearchParams({
		timeMin,
		timeMax,
		singleEvents: 'true', // développe les événements récurrents en occurrences individuelles
		orderBy: 'startTime'
	});

	const response = await calendarRequest<GoogleEventsListResponse>(
		`/calendars/${encodeURIComponent(calendarId)}/events?${params.toString()}`
	);

	return response.items;
}
