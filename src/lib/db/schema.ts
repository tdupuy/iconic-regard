import { pgTable, serial, varchar, text, integer } from 'drizzle-orm/pg-core';

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
