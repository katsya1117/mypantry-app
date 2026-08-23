import { SettingView } from "@/components/setting-view";
import { db } from "@/lib/db";
import { getHouseholdId } from "@/lib/household";
import { categories as categoriesTable } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const SettingCategoriesPage = async () => {
  const houseId = await getHouseholdId();
  const categories = await db
    .select()
    .from(categoriesTable)
    .where(eq(categoriesTable.householdId, houseId))
    .orderBy(categoriesTable.sortOrder);

  return (
    <>
      <Link
        href="/settings"
        className="inline-flex items-center gap-1 mb-4 text-muted-foreground"
      >
        <ArrowLeft className="size-5" />
      </Link>
      <h2 className="text-lg font-bold">カテゴリ設定</h2>
      <p className="text-sm text-muted-foreground mb-4">
        カテゴリの表示順を設定します
      </p>
      <SettingView initialCategories={categories} />
    </>
  );
};

export default SettingCategoriesPage;
