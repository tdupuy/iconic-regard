import { CAL_API_KEY } from '$env/static/private';

const CAL_API_BASE = 'https://api.cal.com/v2';
const CAL_API_VERSION = '2024-08-13';

export interface CalAttendee {
	name: string;
	email?: string;
	timeZone: string;
	phoneNumber: string;
}

export interface CalBooking {
	id: number;
	uid: string;
	title: string;
	start: string;
	end: string;
	status: string;
	attendees: CalAttendee[];
}

interface CalApiResponse<T> {
	status: 'success' | 'error';
	data: T;
	error?: { code: string; message: string };
}

async function calRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
	const res = await fetch(`${CAL_API_BASE}${path}`, {
		...options,
		headers: {
			Authorization: `Bearer ${CAL_API_KEY}`,
			'cal-api-version': CAL_API_VERSION,
			'Content-Type': 'application/json',
			...options.headers
		}
	});

	const json = (await res.json()) as CalApiResponse<T>;

	if (!res.ok || json.status === 'error') {
		throw new Error(json.error?.message ?? `Cal.com API error (${res.status})`);
	}

	return json.data;
}

type BookingStatus = 'upcoming' | 'past' | 'cancelled' | 'unconfirmed' | 'recurring';

export async function getBookings(
	opts: { status?: BookingStatus; take?: number; cursor?: string } = {}
): Promise<CalBooking[]> {
	const { status, take = 50, cursor } = opts;
	const params = new URLSearchParams();
	if (status) params.set('status', status);
	if (take) params.set('take', String(take));
	if (cursor) params.set('cursor', cursor);

	return calRequest<CalBooking[]>(`/bookings?${params.toString()}`);
}
