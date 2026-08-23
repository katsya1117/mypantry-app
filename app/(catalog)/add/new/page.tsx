import { NewCatalogItemForm } from "@/components/new-catalog-item-form";
import { db } from "@/lib/db";
import { getHouseholdId } from "@/lib/household";
import { categories as categoriesTable } from "@/lib/schema";
import { eq } from "drizzle-orm";

const NewItemPage = async () => {
  const houseId = await getHouseholdId();
  const categories = await db
    .select()
    .from(categoriesTable)
    .where(eq(categoriesTable.householdId, houseId))
    .orderBy(categoriesTable.sortOrder);
  return (
    <>
      <p className="text-sm text-muted-foreground mb-4">
        アイテムを新しく定義します
      </p>
      <NewCatalogItemForm categories={categories} />
    </>
  );
};

export default NewItemPage;
