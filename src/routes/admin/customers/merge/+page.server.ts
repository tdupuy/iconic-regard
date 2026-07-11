import { db } from '$lib/db';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { encrypt, decrypt } from '$lib/server/crypto';
import { eq } from 'drizzle-orm';
import { customers, pendingCustomers } from '$lib/db/schema';

export const load: PageServerLoad = async ({ url }) => {
	const idCustomerMergeFrom = url.searchParams.get('uid1');
	const idCustomerMergeTo = url.searchParams.get('uid2');

	if (!idCustomerMergeTo || !idCustomerMergeFrom) {
		const message = encodeURIComponent(
			"Impossible d'accéder à la page, sûrement une erreur de manipulation mais tu peux quand même venir m'en parler"
		);
		throw redirect(303, `/admin/customers?mergeError=${message}`);
	}

	const CustomerMergeFromRaw = await db
		.select()
		.from(customers)
		.where(eq(customers.id, idCustomerMergeFrom));

	const CustomerMergeToRaw = await db
		.select()
		.from(customers)
		.where(eq(customers.id, idCustomerMergeTo));

	if (CustomerMergeFromRaw.length === 0 || CustomerMergeToRaw.length === 0) {
		const message = encodeURIComponent(
			"Impossible d'accéder à la page, sûrement une erreur de manipulation mais tu peux quand même venir m'en parler"
		);
		throw redirect(303, `/admin/customers?mergeError=${message}`);
	}

	const CustomerMergeFrom = {
		id: CustomerMergeFromRaw[0].id,
		name: CustomerMergeFromRaw[0].name,
		email: CustomerMergeFromRaw[0].email ? decrypt(CustomerMergeFromRaw[0].email) : null,
		phoneNumber: decrypt(CustomerMergeFromRaw[0].phoneNumber)
	};

	const CustomerMergeTo = {
		id: CustomerMergeToRaw[0].id,
		name: CustomerMergeToRaw[0].name,
		email: CustomerMergeToRaw[0].email ? decrypt(CustomerMergeToRaw[0].email) : null,
		phoneNumber: decrypt(CustomerMergeToRaw[0].phoneNumber)
	};

	return {
		customerMergeFrom: CustomerMergeFrom,
		customerMergeTo: CustomerMergeTo
	};
};
