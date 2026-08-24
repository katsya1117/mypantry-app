import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "./db";
import { households } from "./schema";
import { eq } from "drizzle-orm";

const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export const generateShareCode = (): string => {
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  }
  return code;
};

export const getHouseholdId = async (): Promise<number> => {
  const cookieStore = await cookies();
  const value = cookieStore.get("householdId")?.value;
  if (!value) redirect("/join");
  const id = Number(value);
  const household = (
    await db.select().from(households).where(eq(households.id, id))
  )[0];
  if (!household) redirect("/join");
  return id;
};

export const hasHouseholdId = async (): Promise<boolean> => {
  const cookieStore = await cookies();
  const value = cookieStore.get("householdId")?.value;
  return Boolean(value);
};
