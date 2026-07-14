CREATE TABLE "pending_customers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customer_id" uuid NOT NULL REFERENCES "customers"("id") ON DELETE CASCADE,
	"matched_customer_id" uuid REFERENCES "customers"("id") ON DELETE SET NULL,
	"reasons" varchar(50)[] NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
