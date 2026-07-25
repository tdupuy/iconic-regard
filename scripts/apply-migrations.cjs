const { Client } = require('pg');

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
			`CREATE EXTENSION IF NOT EXISTS pgcrypto;`,
			`DO $$ BEGIN
				IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'customer_status') THEN
					CREATE TYPE customer_status AS ENUM ('pending', 'active', 'cancelled');
				END IF;
			END $$;`,
			`CREATE TABLE IF NOT EXISTS categories (
				id serial PRIMARY KEY,
				name varchar(100) NOT NULL UNIQUE,
				slug varchar(100) NOT NULL UNIQUE
			);`,
			`CREATE TABLE IF NOT EXISTS services (
				id serial PRIMARY KEY,
				name varchar(100) NOT NULL UNIQUE,
				description text NOT NULL,
				category integer NOT NULL,
				slug varchar(100) NOT NULL UNIQUE,
				duration integer NOT NULL,
				price varchar(50) NOT NULL,
				img_name varchar(255),
				"order" integer NOT NULL DEFAULT 0,
				active integer NOT NULL DEFAULT 1
			);`,
			`CREATE TABLE IF NOT EXISTS customers (
				id uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
				name varchar(100),
				email varchar(500),
				phone_number varchar(500),
				status customer_status DEFAULT 'pending',
				booking_uid varchar(255),
				created_at timestamp DEFAULT now(),
				updated_at timestamp DEFAULT now()
			);`,
			`ALTER TABLE customers ADD COLUMN IF NOT EXISTS name varchar(100);`,
			`ALTER TABLE customers ADD COLUMN IF NOT EXISTS email varchar(500);`,
			`ALTER TABLE customers ADD COLUMN IF NOT EXISTS phone_number varchar(500);`,
			`ALTER TABLE customers ADD COLUMN IF NOT EXISTS status customer_status DEFAULT 'pending';`,
			`ALTER TABLE customers ADD COLUMN IF NOT EXISTS booking_uid varchar(255);`,
			`ALTER TABLE customers ADD COLUMN IF NOT EXISTS created_at timestamp DEFAULT now();`,
			`ALTER TABLE customers ADD COLUMN IF NOT EXISTS updated_at timestamp DEFAULT now();`,
			`DO $$ BEGIN
				IF NOT EXISTS (
					SELECT 1 FROM pg_constraint WHERE conname = 'customers_booking_uid_unique'
				) THEN
					CREATE UNIQUE INDEX IF NOT EXISTS customers_booking_uid_unique ON customers (booking_uid);
				END IF;
			END $$;`,
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
