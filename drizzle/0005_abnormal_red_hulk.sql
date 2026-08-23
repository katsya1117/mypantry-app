CREATE TABLE "households" (
	"id" serial PRIMARY KEY NOT NULL,
	"share_code" text NOT NULL,
	CONSTRAINT "households_share_code_unique" UNIQUE("share_code")
);
--> statement-breakpoint
ALTER TABLE "categories" DROP CONSTRAINT "categories_name_unique";--> statement-breakpoint
ALTER TABLE "items" DROP CONSTRAINT "items_name_category_id_unique";--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "household_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "items" ADD COLUMN "household_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_household_id_households_id_fk" FOREIGN KEY ("household_id") REFERENCES "public"."households"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_household_id_households_id_fk" FOREIGN KEY ("household_id") REFERENCES "public"."households"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_name_household_id_unique" UNIQUE("name","household_id");--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_name_category_id_household_id_unique" UNIQUE("name","category_id","household_id");