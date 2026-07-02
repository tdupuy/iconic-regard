import { db } from '$lib/db';
import { customers, pendingCustomers } from '$lib/db/schema';
import { decrypt } from '$lib/server/crypto';
import { addCustomer } from '$lib/server/customer';
import { getBookings } from '$lib/server/cal';
import { isPlaceholderEmail } from '$lib/utils';

type MatchReason = 'phone_match' | 'email_match' | 'name_match';

function findMatch(
	existingCustomers: (typeof customers.$inferSelect)[],
	bookingPhone: string,
	bookingEmail: string | null,
	bookingName: string
) {
	for (const c of existingCustomers) {
		const cPhone = decrypt(c.phoneNumber);
		const cEmail = c.email ? decrypt(c.email) : null;

		const samePhone = cPhone === bookingPhone;
		// email null vs null ne compte pas comme un match
		const sameEmail = bookingEmail !== null && cEmail === bookingEmail;
		const sameName = c.name === bookingName;

		if (samePhone || sameEmail || sameName) {
			const reasons: MatchReason[] = [];
			if (samePhone) reasons.push('phone_match');
			if (sameEmail) reasons.push('email_match');
			if (sameName) reasons.push('name_match');

			return { customer: c, reasons };
		}
	}
	return null;
}

export async function syncCustomersFromBookings() {
	const [bookings, existingCustomers] = await Promise.all([
		getBookings({ status: 'upcoming' }),
		db.select().from(customers)
	]);

	const knownCustomers = [...existingCustomers];

	const results = { created: 0, pending: 0, skipped: 0 };

	for (const booking of bookings) {
		const attendee = booking.attendees[0];
		if (!attendee) continue;

		const bookingPhone = attendee.phoneNumber ?? '';
		const bookingEmail = isPlaceholderEmail(attendee.email) ? null : (attendee.email ?? null);
		const bookingName = attendee.name;

		// 1. client actif identique en tout point → rien à faire
		const exactMatch = knownCustomers.find((c) => {
			if (c.status === 'pending') return false;
			return (
				decrypt(c.phoneNumber) === bookingPhone &&
				(c.email ? decrypt(c.email) : null) === bookingEmail &&
				c.name === bookingName
			);
		});
		if (exactMatch) {
			results.skipped++;
			continue;
		}

		// 2. doublon partiel → client en pending + trace
		const match = findMatch(knownCustomers, bookingPhone, bookingEmail, bookingName);

		if (match) {
			const newCustomer = await addCustomer({
				name: bookingName,
				email: bookingEmail ?? undefined,
				phoneNumber: bookingPhone,
				status: 'pending'
			});

			await db.insert(pendingCustomers).values({
				customerId: newCustomer.id,
				matchedCustomerId: match.customer.id,
				reasons: match.reasons
			});

			knownCustomers.push(newCustomer);
			results.pending++;
			continue;
		}

		// 3. aucun doublon → client actif
		const newCustomer = await addCustomer({
			name: bookingName,
			email: bookingEmail ?? undefined,
			phoneNumber: bookingPhone,
			status: 'active'
		});

		knownCustomers.push(newCustomer);
		results.created++;
	}

	return results;
}
