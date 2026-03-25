CREATE TABLE "articles" (
	"id" serial PRIMARY KEY NOT NULL,
	"titre" varchar(200) NOT NULL,
	"contenu" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rendezvous" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"date" timestamp NOT NULL,
	"note" text
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"nom" varchar(100) NOT NULL,
	"prenom" varchar(100) NOT NULL,
	"code_postal" varchar(10)
);
--> statement-breakpoint
DROP TABLE "task" CASCADE;--> statement-breakpoint
ALTER TABLE "rendezvous" ADD CONSTRAINT "rendezvous_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;