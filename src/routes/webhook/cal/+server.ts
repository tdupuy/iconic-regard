// src/routes/api/webhooks/cal/+server.ts
import crypto from 'node:crypto';
import { CAL_WEBHOOK_SECRET, GOOGLE_CALENDAR_ID } from '$env/static/private';
import { createCalendarEvent } from '$lib/server/google-calendar';
import type { RequestHandler } from './$types';

function isValidSignature(rawBody: string, signature: string | null): boolean {
	if (!signature) return false;
	const expected = crypto.createHmac('sha256', CAL_WEBHOOK_SECRET).update(rawBody).digest('hex');
	return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

export const POST: RequestHandler = async ({ request }) => {
	const rawBody = await request.text();
	const signature = request.headers.get('x-cal-signature-256');

	if (!isValidSignature(rawBody, signature)) {
		return new Response('Invalid signature', { status: 401 });
	}

	const event = JSON.parse(rawBody);
	if (event.triggerEvent !== 'BOOKING_CREATED') {
		return new Response('ignored', { status: 200 });
	}

	const booking = event.payload;

	await createCalendarEvent({
		calendarId: GOOGLE_CALENDAR_ID,
		summary: 'cils',
		description: booking.description ?? '',
		start: booking.startTime,
		end: booking.endTime
	});

	return new Response('ok', { status: 200 });
};
