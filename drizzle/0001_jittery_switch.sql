CREATE TABLE "articles" (
	"id" serial PRIMARY KEY NOT NULL,
	"titre" varchar(200) NOT NULL,
	"contenu" text NOT NULL
);

CREATE TABLE "rendezvous" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"date" timestamp NOT NULL,
	"note" text
);

CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"nom" varchar(100) NOT NULL,
	"prenom" varchar(100) NOT NULL,
	"code_postal" varchar(10)
);

DROP TABLE "task" CASCADE;
ALTER TABLE "rendezvous" ADD CONSTRAINT "rendezvous_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;