// $lib/server/customers.ts
import { db } from '$lib/db';
import { customers } from '$lib/db/schema';
import { encrypt } from '$lib/server/crypto';

export interface NewCustomer {
	name: string;
	email?: string;
	phoneNumber: string;
	status?: 'pending' | 'active';
	bookingUid?: string;
}

export async function addCustomer(data: NewCustomer) {
	const encryptedEmail = data.email ? encrypt(data.email) : undefined;
	const encryptedPhone = encrypt(data.phoneNumber);

	const [customer] = await db
		.insert(customers)
		.values({
			name: data.name,
			email: encryptedEmail,
			phoneNumber: encryptedPhone,
			status: data.status ?? 'active',
			bookingUid: data.bookingUid
		})
		.returning();

	return customer;
}
