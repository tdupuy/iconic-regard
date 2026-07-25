const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

const client = new Client({ connectionString: databaseUrl });

async function run() {
  try {
    await client.connect();
    console.log('Connected to database');

    const statements = [
      `CREATE TABLE IF NOT EXISTS customers (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        email varchar(500),
        phone_number varchar(500),
        booking_uid varchar(255),
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL,
        notes text
      );`,
      `ALTER TABLE customers ADD COLUMN IF NOT EXISTS booking_uid varchar(255);`,
      `ALTER TABLE customers ALTER COLUMN email TYPE varchar(500);`,
      `ALTER TABLE customers ALTER COLUMN phone_number TYPE varchar(500);`,
      `CREATE UNIQUE INDEX IF NOT EXISTS customers_booking_uid_unique ON customers (booking_uid);`,
      `CREATE TABLE IF NOT EXISTS customer_notes (
        id serial PRIMARY KEY NOT NULL,
        customer_id uuid NOT NULL,
        note text NOT NULL,
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL,
        CONSTRAINT customer_notes_customer_id_customers_id_fk FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE ON UPDATE NO ACTION
      );`,
      `CREATE TABLE IF NOT EXISTS pending_customers (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        customer_id uuid NOT NULL,
        matched_customer_id uuid,
        reasons varchar(50)[] NOT NULL,
        created_at timestamp DEFAULT now() NOT NULL,
        CONSTRAINT pending_customers_customer_id_customers_id_fk FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
        CONSTRAINT pending_customers_matched_customer_id_customers_id_fk FOREIGN KEY (matched_customer_id) REFERENCES customers(id) ON DELETE SET NULL
      );`,
      `ALTER TABLE services ADD COLUMN IF NOT EXISTS "order" integer DEFAULT 0 NOT NULL;`,
      `ALTER TABLE services ADD COLUMN IF NOT EXISTS active integer DEFAULT 1 NOT NULL;`
    ];

    for (const statement of statements) {
      await client.query(statement);
    }

    console.log('Database migration script completed');
  } catch (error) {
    console.error('Database migration failed:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

run();
