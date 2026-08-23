CREATE TABLE "catalog" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"category_id" integer NOT NULL,
	"household_id" integer NOT NULL,
	CONSTRAINT "catalog_name_category_id_household_id_unique" UNIQUE("name","category_id","household_id")
);
--> statement-breakpoint
ALTER TABLE "items" DROP CONSTRAINT "items_name_category_id_household_id_unique";--> statement-breakpoint
ALTER TABLE "items" DROP CONSTRAINT "items_category_id_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "items" ADD COLUMN "catalog_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "catalog" ADD CONSTRAINT "catalog_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "catalog" ADD CONSTRAINT "catalog_household_id_households_id_fk" FOREIGN KEY ("household_id") REFERENCES "public"."households"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_catalog_id_catalog_id_fk" FOREIGN KEY ("catalog_id") REFERENCES "public"."catalog"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "items" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "items" DROP COLUMN "category_id";--> statement-breakpoint
ALTER TABLE "items" DROP COLUMN "tracked";--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_catalog_id_household_id_unique" UNIQUE("catalog_id","household_id");