ALTER TABLE "customers" ADD COLUMN "booking_uid" varchar(255);
ALTER TABLE "customers" ADD CONSTRAINT "customers_booking_uid_unique" UNIQUE ("booking_uid");
