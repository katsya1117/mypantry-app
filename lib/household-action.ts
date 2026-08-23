"use server";

import { cookies } from "next/headers";
import { db } from "./db";
import { categories, households } from "./schema";
import { generateShareCode, getHouseholdId } from "./household";
import { eq } from "drizzle-orm";

export const createHouseholdAction = async () => {
  const genCode = generateShareCode();
  const newHousehold = (
    await db.insert(households).values({ shareCode: genCode }).returning()
  )[0];
  const cookieStore = await cookies();
  cookieStore.set("householdId", String(newHousehold.id));
  await db.insert(categories).values([
    { name: "Processed foods", sortOrder: 1, householdId: newHousehold.id },
    { name: "Meat & Fish", sortOrder: 2, householdId: newHousehold.id },
    { name: "Dairy & Eggs", sortOrder: 3, householdId: newHousehold.id },
  ]);
  return newHousehold.shareCode;
};

export const joinHouseholdAction = async (code: string) => {
  const target = (
    await db.select().from(households).where(eq(households.shareCode, code))
  )[0];
  if (target) {
    const cookieStore = await cookies();
    cookieStore.set("householdId", String(target.id));
    return { success: true };
  } else {
    return { success: false, error: "コードが違います" };
  }
};

export const getShareCodeAction = async () => {
  const houseId = await getHouseholdId();
  const target = (
    await db.select().from(households).where(eq(households.id, houseId))
  )[0];
  return target.shareCode;
};
