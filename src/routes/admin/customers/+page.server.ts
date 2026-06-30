import type { PageServerLoad, Actions } from './$types';
import { getBookings } from '$lib/server/cal';
import { encrypt, decrypt } from '$lib/server/crypto';
import { db } from '$lib/db';
import { customers } from '$lib/db/schema';
import { error, fail } from '@sveltejs/kit';
import { isPlaceholderEmail } from '$lib/utils';

export const load: PageServerLoad = async () => {
	try {
		const [bookings, existingCustomers] = await Promise.all([
			getBookings({ status: 'upcoming' }),
			db.select().from(customers)
		]);

		type BookingReason =
			| { type: 'new' }
			| { type: 'pending'; matchId: string }
			| { type: 'duplicate'; matchId: string; fields: ('name' | 'email' | 'phone')[] };

		const newBookings = bookings.reduce<((typeof bookings)[0] & { reason: BookingReason })[]>(
			(acc, b) => {
				const attendee = b.attendees[0];
				if (!attendee) return acc;

				const bookingPhone = attendee.phoneNumber ?? '';
				const bookingEmail = isPlaceholderEmail(attendee.email) ? null : attendee.email;
				const bookingName = attendee.name;

				// exact match non-pending → on n'affiche pas
				const exactMatch = existingCustomers.find((c) => {
					if (c.status === 'pending') return false;
					return (
						decrypt(c.phoneNumber) === bookingPhone &&
						(c.email ? decrypt(c.email) : null) === bookingEmail &&
						c.name === bookingName
					);
				});
				if (exactMatch) return acc;

				// pending match ?
				const pendingMatch = existingCustomers.find(
					(c) => c.status === 'pending' && decrypt(c.phoneNumber) === bookingPhone
				);
				if (pendingMatch) {
					acc.push({ ...b, reason: { type: 'pending', matchId: pendingMatch.id } });
					return acc;
				}

				// doublon partiel ?
				const partialMatch = existingCustomers.find((c) => {
					if (c.status === 'pending') return false;
					const samePhone = decrypt(c.phoneNumber) === bookingPhone;
					const sameEmail = (c.email ? decrypt(c.email) : null) === bookingEmail;
					const sameName = c.name === bookingName;
					return samePhone || sameEmail || sameName;
				});
				if (partialMatch) {
					const fields: ('name' | 'email' | 'phone')[] = [];
					if (partialMatch.name === bookingName) fields.push('name');
					if ((partialMatch.email ? decrypt(partialMatch.email) : null) === bookingEmail)
						fields.push('email');
					if (decrypt(partialMatch.phoneNumber) === bookingPhone) fields.push('phone');
					acc.push({ ...b, reason: { type: 'duplicate', matchId: partialMatch.id, fields } });
					return acc;
				}

				// nouveau client
				acc.push({ ...b, reason: { type: 'new' } });
				return acc;
			},
			[]
		);

		return { bookings: newBookings };
	} catch (err) {
		throw error(500, err instanceof Error ? err.message : 'Erreur');
	}
};

export const actions: Actions = {
	addCustomer: async ({ request }) => {
		const form = await request.formData();
		const name = form.get('name') as string;
		const email = (form.get('email') as string) || null;
		const phoneNumber = form.get('phoneNumber') as string;

		if (!name || !phoneNumber) {
			return fail(400, { message: 'Nom et téléphone requis' });
		}

		try {
			await db.insert(customers).values({
				name,
				email: email ? encrypt(email) : null,
				phoneNumber: encrypt(phoneNumber),
				status: 'active'
			});
		} catch (err) {
			return fail(500, { message: err instanceof Error ? err.message : 'Erreur base de données' });
		}
	}
};
