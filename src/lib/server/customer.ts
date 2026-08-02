// $lib/server/customers.ts
import { db } from '$lib/db';
import { customers } from '$lib/db/schema';
import { encrypt } from '$lib/server/crypto';
import { eq } from 'drizzle-orm';

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

export interface UpsertCustomer {
	id?: string;
	name: string;
	email?: string;
	phoneNumber: string;
	status?: 'pending' | 'active';
	bookingUid?: string;
}

export async function upsertCustomer(data: UpsertCustomer) {
	const encryptedEmail = data.email ? encrypt(data.email) : undefined;
	const encryptedPhone = encrypt(data.phoneNumber);

	if (data.id) {
		const [customer] = await db
			.update(customers)
			.set({
				name: data.name,
				email: encryptedEmail,
				phoneNumber: encryptedPhone,
				updatedAt: new Date()
			})
			.where(eq(customers.id, data.id))
			.returning();

		return customer;
	}

	const [customer] = await db
		.insert(customers)
		.values({
			name: data.name,
			email: encryptedEmail,
			phoneNumber: encryptedPhone,
			status: data.status ?? 'active'
		})
		.returning();

	return customer;
}

export async function softDeleteCustomer(id: string) {
	await db.update(customers).set({ status: 'cancelled' }).where(eq(customers.id, id));
}
