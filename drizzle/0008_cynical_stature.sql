ALTER TABLE "services" ADD COLUMN "order" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "services" ADD COLUMN "active" integer DEFAULT 1 NOT NULL;