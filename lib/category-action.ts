"use server";

import { and, eq } from "drizzle-orm";
import { db } from "./db";
import { getHouseholdId } from "./household";
import { catalog, categories } from "./schema";

export const createCategoryAction = async (name: string) => {
  const houseId = await getHouseholdId();
  const LastOrderNum = Math.max(
    ...(
      await db
        .select({ sortOrder: categories.sortOrder })
        .from(categories)
        .where(eq(categories.householdId, houseId))
    ).map((o) => o.sortOrder),
  );
  const existing = (
    await db
      .select()
      .from(categories)
      .where(
        and(eq(categories.name, name), eq(categories.householdId, houseId)),
      )
  )[0];
  if (!existing) {
    const added = (
      await db
        .insert(categories)
        .values({ name, sortOrder: LastOrderNum + 1, householdId: houseId })
        .returning()
    )[0];
    return { success: true, category: added };
  } else {
    return { success: false, error: "すでに登録されています" };
  }
};
export const moveCategoryAction = async (
  id: number,
  direction: "up" | "down",
) => {
  const houseId = await getHouseholdId();
  const all = await db
    .select()
    .from(categories)
    .where(eq(categories.householdId, houseId))
    .orderBy(categories.sortOrder);
  const index = all.findIndex((c) => c.id === id);
  const targetIndex = direction === "up" ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= all.length) return;
  const current = all[index];
  const target = all[targetIndex];

  await db
    .update(categories)
    .set({ sortOrder: target.sortOrder })
    .where(eq(categories.id, current.id));
  await db
    .update(categories)
    .set({ sortOrder: current.sortOrder })
    .where(eq(categories.id, target.id));
};

export const deleteCategoryAction = async (id: number) => {
  const houseId = await getHouseholdId();
  const inUse = (
    await db.select().from(catalog).where(eq(catalog.categoryId, id))
  )[0];
  if (!inUse) {
    await db
      .delete(categories)
      .where(and(eq(categories.id, id), eq(categories.householdId, houseId)));
    return {
      success: true,
    };
  } else {
    return {
      success: false,
      error: "カテゴリが使用中のため削除できません",
    };
  }
};
