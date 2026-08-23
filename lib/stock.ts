export type stockNum = 0 | 1 | 2;

export const nextStock = (current: stockNum): stockNum => {
  if (current === 0) return 2;
  else if (current === 1) return 0;
  else return 1;
};

export const restock = (level: stockNum): stockNum => {
  if (level === 2) return 2;
  else {
    const nextLevel = (level as number) + 1;
    return nextLevel as stockNum;
  }
};

export const STOCK_META: Record<stockNum, { label: string; pips: number }> = {
  0: { label: "なし", pips: 0 },
  1: { label: "あり", pips: 1 },
  2: { label: "ストックあり", pips: 2 },
};

export const formatStockLevel = (num: number): stockNum => {
  if (num === 0 || num === 1 || num === 2) {
    return num as stockNum;
  } else {
    throw new Error("予期せぬエラー");
  }
};
