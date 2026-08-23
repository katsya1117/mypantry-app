import { CatalogBrowser } from "@/components/catalog-browser";
import { db } from "@/lib/db";
import { getHouseholdId } from "@/lib/household";
import {
  categories as categoriesTable,
  catalog as catalogTable,
  items as itemsTable,
} from "@/lib/schema";
import { and, eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const CategoryItemsPage = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;
  const houseId = await getHouseholdId();
  const categories = await db
    .select()
    .from(categoriesTable)
    .where(eq(categoriesTable.householdId, houseId))
    .orderBy(categoriesTable.sortOrder);
  const catalog = await db
    .select()
    .from(catalogTable)
    .where(
      and(
        eq(catalogTable.householdId, houseId),
        eq(catalogTable.categoryId, Number(categoryId)),
      ),
    );
  const targetCategory = categories.find((c) => c.id === Number(categoryId))!;
  const itemsInPantry = await db
    .select({
      catalogId: itemsTable.catalogId,
    })
    .from(itemsTable)
    .where(eq(itemsTable.householdId, houseId));

  return (
    <>
      <Link
        href="/add"
        className="inline-flex items-center gap-1 mb-4 text-muted-foreground"
      >
        <ArrowLeft className="size-5" />
      </Link>
      <h2 className="text-lg font-bold mb-4">{targetCategory.name}</h2>
      <CatalogBrowser
        categories={categories}
        initialCatalog={catalog}
        itemsInPantry={itemsInPantry}
      />
    </>
  );
};
export default CategoryItemsPage;
