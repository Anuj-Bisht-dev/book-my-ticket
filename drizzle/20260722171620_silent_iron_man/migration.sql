CREATE TABLE "seats" (
	"id" serial PRIMARY KEY,
	"name" varchar(100),
	"isbooked" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar(100) NOT NULL,
	"email" varchar(322) NOT NULL,
	"verify_email" boolean DEFAULT false,
	"verification_token" varchar,
	"verification_token_expires_in" timestamp,
	"password" varchar(66) NOT NULL,
	"refresh_token" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
