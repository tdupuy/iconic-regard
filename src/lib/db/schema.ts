import {
	pgTable,
	serial,
	varchar,
	text,
	integer,
	uuid,
	timestamp,
	pgEnum
} from 'drizzle-orm/pg-core';

export const customerStatusEnum = pgEnum('customer_status', ['pending', 'active', 'cancelled']);

export const services = pgTable('services', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 100 }).notNull().unique(),
	description: text('description').notNull(),
	category: integer('category').notNull(),
	slug: varchar('slug', { length: 100 }).notNull().unique(),
	duration: integer('duration').notNull(),
	price: varchar('price', { length: 50 }).notNull(),
	imgName: varchar('img_name', { length: 255 })
});

export const categories = pgTable('categories', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 100 }).notNull().unique(),
	slug: varchar('slug', { length: 100 }).notNull().unique()
});

export const customers = pgTable('customers', {
	id: uuid('id').defaultRandom().primaryKey(),
	name: varchar('name', { length: 100 }).notNull(),
	email: varchar('email', { length: 500 }).unique(),
	phoneNumber: varchar('phone_number', { length: 500 }).notNull().unique(),
	status: customerStatusEnum('status').default('pending').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const pendingCustomers = pgTable('pending_customers', {
	id: uuid('id').defaultRandom().primaryKey(),
	customerId: uuid('customer_id')
		.notNull()
		.references(() => customers.id, { onDelete: 'cascade' }),
	matchedCustomerId: uuid('matched_customer_id').references(() => customers.id, {
		onDelete: 'set null'
	}),
	reasons: varchar('reasons', { length: 50 }).array().notNull(), // ex: ['phone_match', 'name_match']
	createdAt: timestamp('created_at').defaultNow().notNull()
});
