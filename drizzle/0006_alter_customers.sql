ALTER TABLE "customers" ALTER COLUMN "email" TYPE varchar(500);
ALTER TABLE "customers" ALTER COLUMN "phone_number" TYPE varchar(500);
-- Update existing data if necessary (no-op here)
