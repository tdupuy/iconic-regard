import type { PageServerLoad } from './$types';
import { db } from '$lib/db';
import { customerNotes, customers } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params }) => {
	const notes = await db
		.select({
			id: customerNotes.id,
			note: customerNotes.note,
			createdAt: customerNotes.createdAt,
			updatedAt: customerNotes.updatedAt,
			name: customers.name
		})
		.from(customers)
		.leftJoin(customerNotes, eq(customerNotes.customerId, customers.id))
		.where(eq(customers.id, params.userId));
	return { notes: notes };
};
