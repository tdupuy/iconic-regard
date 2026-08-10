import { json } from '@sveltejs/kit';
import { db } from '$lib/db';
import { loyalty } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ params }) => {
	const { customerId } = params;

	const existing = await db.select().from(loyalty).where(eq(loyalty.customerId, customerId));

	if (existing.length >= 5) {
		return json({ visits: existing.map((v) => v.createdAt) }, { status: 400 });
	}

	const [created] = await db.insert(loyalty).values({ customerId }).returning();

	return json({ visits: [...existing, created].map((v) => v.createdAt) });
};
