import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
  return Number(value);
};

export const hasHouseholdId = async (): Promise<boolean> => {
  const cookieStore = await cookies();
  const value = cookieStore.get("householdId")?.value;
  return Boolean(value);
};
