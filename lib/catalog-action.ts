"use server";

import { and, eq, ne } from "drizzle-orm";
import { db } from "./db";
import { getHouseholdId } from "./household";
import { catalog, items } from "./schema";

export const createCatalogEntryAction = async (
  name: string,
  categoryId: number,
) => {
  const houseId = await getHouseholdId();
  const existing = (
    await db
      .select()
      .from(catalog)
      .where(
        and(
          eq(catalog.name, name),
          eq(catalog.categoryId, categoryId),
          eq(catalog.householdId, houseId),
        ),
      )
  )[0];
  if (!existing) {
    const added = (
      await db
        .insert(catalog)
        .values({ name, categoryId, householdId: houseId })
        .returning()
    )[0];
    return { success: true, entries: added };
  } else {
    return { success: false, error: "すでに登録されています" };
  }
};

export const deleteCatalogEntryAction = async (id: number) => {
  const houseId = await getHouseholdId();
  const inUse = (
    await db.select().from(items).where(eq(items.catalogId, id))
  )[0];
  if (!inUse) {
    await db
      .delete(catalog)
      .where(and(eq(catalog.id, id), eq(catalog.householdId, houseId)));
    return {
      success: true,
    };
  } else {
    return {
      success: false,
      error: "pantryで使用中のため削除できません",
    };
  }
};

export const updateCatalogEntryAction = async (
  id: number,
  name: string,
  categoryId: number,
) => {
  const houseId = await getHouseholdId();
  const existing = (
    await db
      .select()
      .from(catalog)
      .where(
        and(
          eq(catalog.name, name),
          eq(catalog.categoryId, categoryId),
          eq(catalog.householdId, houseId),
          ne(catalog.id, id),
        ),
      )
  )[0];
  if (!existing) {
    await db
      .update(catalog)
      .set({ name, categoryId })
      .where(and(eq(catalog.id, id), eq(catalog.householdId, houseId)));
    return { success: true };
  } else {
    return { success: false, error: "すでに登録されています" };
  }
};
