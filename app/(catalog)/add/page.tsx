import { categoriesPropsMap } from "@/lib/categories";
import { db } from "@/lib/db";
import { getHouseholdId } from "@/lib/household";
import { categories as categoriesTable } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { PaperBag } from "lucide-react";
import Link from "next/link";

const AddPage = async () => {
  const houseId = await getHouseholdId();
  const categories = await db
    .select()
    .from(categoriesTable)
    .where(eq(categoriesTable.householdId, houseId))
    .orderBy(categoriesTable.sortOrder);

  return (
    <>
      <p className="text-sm text-muted-foreground mb-4">
        パントリーで管理するアイテムを登録します
      </p>
      <div className="grid grid-cols-2 gap-3 gap-y-6 justify-items-center max-w-md mx-auto">
        {categories.map((c) => {
          const { icon: Icon, color } = categoriesPropsMap[c.name] ?? {
            icon: PaperBag,
            color: "bg-gray-100 text-gray-700",
          };
          return (
            <Link
              key={c.id}
              href={`/add/${c.id}`}
              className="flex flex-col w-full items-center gap-2 py-6 rounded-lg bg-card shadow-sm max-w-48"
            >
              <span
                className={`${color} rounded-full size-14 flex items-center justify-center`}
              >
                <Icon className="size-7" />
              </span>
              <span className="text-sm font-medium">{c.name}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
};
export default AddPage;
