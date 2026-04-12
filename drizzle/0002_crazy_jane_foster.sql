CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	CONSTRAINT "categories_name_unique" UNIQUE("name"),
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text NOT NULL,
	"category" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"duration" integer NOT NULL,
	"price" varchar(50) NOT NULL,
	"img_name" varchar(255),
	CONSTRAINT "services_name_unique" UNIQUE("name"),
	CONSTRAINT "services_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
DROP TABLE "articles" CASCADE;--> statement-breakpoint
DROP TABLE "rendezvous" CASCADE;--> statement-breakpoint
DROP TABLE "users" CASCADE;