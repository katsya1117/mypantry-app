"use server";

import { nextStock, stockNum } from "./stock";
import { db } from "./db";
import { items } from "./schema";
import { eq, sql, and } from "drizzle-orm";
import { getHouseholdId } from "./household";

export const updateStockAction = async (id: number, currentStock: stockNum) => {
  const houseId = await getHouseholdId();
  const nextStockLevel = nextStock(currentStock);
  await db
    .update(items)
    .set({ stockLevel: nextStockLevel })
    .where(and(eq(items.id, id), eq(items.householdId, houseId)));
};

export const addToPantryAction = async (catalogId: number) => {
  const houseId = await getHouseholdId();

  return await db
    .insert(items)
    .values({
      catalogId: catalogId,
      stockLevel: 1,
      wantToBuy: false,
      householdId: houseId,
    })
    .returning();
};

export const toggleBoughtAction = async (id: number, currentValue: boolean) => {
  const houseId = await getHouseholdId();
  await db
    .update(items)
    .set({ bought: !currentValue })
    .where(and(eq(items.id, id), eq(items.householdId, houseId)));
};

export const toggleWantToBuyAction = async (
  id: number,
  currentValue: boolean,
) => {
  const houseId = await getHouseholdId();
  await db
    .update(items)
    .set({ wantToBuy: !currentValue, bought: false })
    .where(and(eq(items.id, id), eq(items.householdId, houseId)));
};

export const confirmBoughtAction = async () => {
  const houseId = await getHouseholdId();
  await db
    .update(items)
    .set({
      wantToBuy: false,
      bought: false,
      stockLevel: sql`LEAST(${items.stockLevel} + 1, 2)`,
    })
    .where(and(eq(items.bought, true), eq(items.householdId, houseId)));
};

export const deleteItemsAction = async (id: number) => {
  const houseId = await getHouseholdId();
  await db
    .delete(items)
    .where(and(eq(items.id, id), eq(items.householdId, houseId)));
};
