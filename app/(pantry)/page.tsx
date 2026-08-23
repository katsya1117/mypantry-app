import { formatStockLevel } from "@/lib/stock";
import { db } from "@/lib/db";
import {
  categories as categoriesTable,
  items as itemsTable,
  catalog as catalogTable,
} from "@/lib/schema";
import { and, eq } from "drizzle-orm";
import { GroceryList } from "@/components/grocery-list";
import { getHouseholdId } from "@/lib/household";

const Home = async () => {
  const houseId = await getHouseholdId();
  const items = (
    await db
      .select()
      .from(itemsTable)
      .innerJoin(catalogTable, eq(itemsTable.catalogId, catalogTable.id))
      .innerJoin(
        categoriesTable,
        eq(catalogTable.categoryId, categoriesTable.id),
      )
      .where(eq(itemsTable.householdId, houseId))
      .orderBy(categoriesTable.sortOrder)
  ).map(({ items, catalog, categories }) => ({
    id: items.id,
    name: catalog.name,
    category: categories.name,
    stockLevel: formatStockLevel(items.stockLevel),
    wantToBuy: items.wantToBuy,
    bought: items.bought,
  }));

  return <GroceryList initialItems={items} />;
};

export default Home;
