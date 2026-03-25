import { pgTable, serial, varchar, timestamp, text } from 'drizzle-orm/pg-core';
export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	nom: varchar('nom', { length: 100 }).notNull(),
	prenom: varchar('prenom', { length: 100 }).notNull(),
	codePostal: varchar('code_postal', { length: 10 })
});
export const rendezvous = pgTable('rendezvous', {
	id: serial('id').primaryKey(),
	userId: serial('user_id').references(() => users.id),
	date: timestamp('date').notNull(),
	note: text('note')
});
export const articles = pgTable('articles', {
	id: serial('id').primaryKey(),
	titre: varchar('titre', { length: 200 }).notNull(),
	contenu: text('contenu').notNull()
});
