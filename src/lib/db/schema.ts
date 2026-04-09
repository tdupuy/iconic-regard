import { pgTable, serial, varchar, text, integer } from 'drizzle-orm/pg-core';

export const services = pgTable('services', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 100 }).notNull().unique(),
	description: text('description').notNull(),
	category: varchar('category', { length: 100 }).notNull(),
	slug: varchar('slug', { length: 100 }).notNull().unique(),
	duration: integer('duration').notNull(),
	price: varchar('price', { length: 50 }).notNull()
});
