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
    {
      name: "野菜・果物・きのこ",
      sortOrder: 1,
      householdId: newHousehold.id,
    },
    { name: "肉・魚・加工品", sortOrder: 2, householdId: newHousehold.id },
    { name: "乳製品・卵", sortOrder: 3, householdId: newHousehold.id },
    {
      name: "大豆加工品・漬物・缶詰",
      sortOrder: 4,
      householdId: newHousehold.id,
    },
    { name: "米・パン・麺", sortOrder: 5, householdId: newHousehold.id },
    { name: "乾物", sortOrder: 6, householdId: newHousehold.id },
    { name: "調味料", sortOrder: 7, householdId: newHousehold.id },
    { name: "スパイス", sortOrder: 8, householdId: newHousehold.id },
    { name: "飲料", sortOrder: 9, householdId: newHousehold.id },
    { name: "生活用品", sortOrder: 10, householdId: newHousehold.id },
    { name: "その他食品", sortOrder: 11, householdId: newHousehold.id },
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
