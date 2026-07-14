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
	const knownBookingUids = new Set(
		existingCustomers.map((c) => c.bookingUid).filter((uid): uid is string => uid !== null)
	);

	const results = { created: 0, pending: 0, skipped: 0, alreadyProcessed: 0 };

	for (const booking of bookings) {
		// déjà importé lors d'un run précédent → on ignore complètement
		if (knownBookingUids.has(booking.uid)) {
			results.alreadyProcessed++;
			continue;
		}

		const attendee = booking.attendees[0];
		if (!attendee) continue;

		const bookingPhone = attendee.phoneNumber ?? '';
		const bookingEmail = isPlaceholderEmail(attendee.email) ? null : (attendee.email ?? null);
		const bookingName = attendee.name;

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

		const match = findMatch(knownCustomers, bookingPhone, bookingEmail, bookingName);

		if (match) {
			const newCustomer = await addCustomer({
				name: bookingName,
				email: bookingEmail ?? undefined,
				phoneNumber: bookingPhone,
				status: 'pending',
				bookingUid: booking.uid
			});

			await db.insert(pendingCustomers).values({
				customerId: newCustomer.id,
				matchedCustomerId: match.customer.id,
				reasons: match.reasons
			});

			knownCustomers.push(newCustomer);
			knownBookingUids.add(booking.uid);
			results.pending++;
			continue;
		}

		const newCustomer = await addCustomer({
			name: bookingName,
			email: bookingEmail ?? undefined,
			phoneNumber: bookingPhone,
			status: 'active',
			bookingUid: booking.uid
		});

		knownCustomers.push(newCustomer);
		knownBookingUids.add(booking.uid);
		results.created++;
	}

	return results;
}
