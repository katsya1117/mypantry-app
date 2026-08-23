import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  unique,
} from "drizzle-orm/pg-core";

export const categories = pgTable(
  "categories",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
    householdId: integer("household_id")
      .notNull()
      .references(() => households.id),
  },
  (table) => [unique().on(table.name, table.householdId)],
);

export const items = pgTable(
  "items",
  {
    id: serial("id").primaryKey(),
    catalogId: integer("catalog_id")
      .notNull()
      .references(() => catalog.id),
    stockLevel: integer("stock_level").notNull(),
    wantToBuy: boolean("want_to_buy").notNull(),
    bought: boolean("bought").notNull().default(false),
    householdId: integer("household_id")
      .notNull()
      .references(() => households.id),
  },
  (table) => [unique().on(table.catalogId, table.householdId)],
);

export const households = pgTable("households", {
  id: serial("id").primaryKey(),
  shareCode: text("share_code").notNull().unique(),
});

export const catalog = pgTable(
  "catalog",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id),
    householdId: integer("household_id")
      .notNull()
      .references(() => households.id),
  },
  (table) => [unique().on(table.name, table.categoryId, table.householdId)],
);
