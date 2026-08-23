import { formatStockLevel } from "@/lib/stock";
import { db } from "@/lib/db";
import {
  catalog as catalogTable,
  categories as categoriesTable,
  items as itemsTable,
} from "@/lib/schema";
import { and, eq } from "drizzle-orm";
import { ShoppingListView } from "@/components/shopping-list-view";
import { getHouseholdId } from "@/lib/household";

const ShoppingList = async () => {
  const houseId = await getHouseholdId();
  const lists = (
    await db
      .select()
      .from(itemsTable)
      .innerJoin(catalogTable, eq(itemsTable.catalogId, catalogTable.id))
      .innerJoin(
        categoriesTable,
        eq(catalogTable.categoryId, categoriesTable.id),
      )
      .where(
        and(
          eq(itemsTable.wantToBuy, true),
          eq(itemsTable.householdId, houseId),
        ),
      )
      .orderBy(categoriesTable.sortOrder)
  ).map(({ items, catalog, categories }) => ({
    id: items.id,
    name: catalog.name,
    category: categories.name,
    stockLevel: formatStockLevel(items.stockLevel),
    wantToBuy: items.wantToBuy,
    bought: items.bought,
  }));
  return <ShoppingListView initialItems={lists} />;
};

export default ShoppingList;
