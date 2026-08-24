"use client";

import { nextStock, STOCK_META, stockNum } from "@/lib/stock";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { categoriesPropsMap } from "@/lib/categories";
import type { Item } from "@/lib/types";
import {
  deleteItemsAction,
  toggleWantToBuyAction,
  updateStockAction,
} from "@/lib/action";
import { PaperBag, Search, ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import { ConfirmDialog } from "./confirm-dialog";
import { Input } from "./ui/input";

export const GroceryList = ({ initialItems }: { initialItems: Item[] }) => {
  const [items, setItems] = useState(initialItems);
  const [prevInitialItems, setPrevInitialItems] = useState(initialItems);
  if (initialItems !== prevInitialItems) {
    setPrevInitialItems(initialItems);
    setItems(initialItems);
  }
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  const filtered = items.filter((item) => item.name.includes(searchKeyword));
  const alignedItem = filtered.reduce<Record<string, Item[]>>((acc, cur) => {
    if (acc[cur.category] === undefined) {
      acc[cur.category] = [];
    }
    acc[cur.category].push(cur);
    return acc;
  }, {});

  const updateStock = async (v: number, currentStock: stockNum) => {
    setItems(
      items.map((i) =>
        i.id === v ? { ...i, stockLevel: nextStock(i.stockLevel) } : i,
      ),
    );
    await updateStockAction(v, currentStock);
  };

  const toggleShoppingList = async (v: number, currentWantToBuy: boolean) => {
    setItems(
      items.map((i) => (i.id === v ? { ...i, wantToBuy: !i.wantToBuy } : i)),
    );
    await toggleWantToBuyAction(v, currentWantToBuy);
  };

  const deleteItem = async (id: number) => {
    setItems(items.filter((item) => id !== item.id));
    await deleteItemsAction(id);
  };

  return (
    <>
      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-4 mt-12">
          <span>アイテムが未登録です</span>
          <Button nativeButton={false} render={<Link href="/add" />}>
            アイテムを登録する
          </Button>
        </div>
      ) : (
        <>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="キーワードから探す"
              className="pl-9"
            />
          </div>
          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              該当のアイテムがありません
            </p>
          ) : (
            <>
              {Object.entries(alignedItem).map(([category, categoryItems]) => (
                <div key={category}>
                  <h2 className="text-lg font-bold mt-6 mb-2">{category}</h2>
                  <ul className="space-y-2">
                    {categoryItems.map((item) => {
                      const categoryProps = categoriesPropsMap[
                        item.category
                      ] ?? {
                        icon: PaperBag,
                        color: "bg-gray-100 text-gray-700",
                      };
                      const Icon = categoryProps.icon;
                      const IconColor = categoryProps.color;
                      const stockLevelProps = STOCK_META[item.stockLevel];
                      const stockLabel = stockLevelProps.label;
                      const stockPips = stockLevelProps.pips;

                      return (
                        <li
                          key={item.id}
                          className="flex items-start gap-2 py-1 rounded-2xl bg-card px-3 shadow-sm"
                        >
                          <span
                            className={`${IconColor} rounded-full size-9 flex items-center justify-center shrink-0`}
                          >
                            <Icon />
                          </span>
                          <span className="font-medium flex-1 min-w-0 py-1.5">
                            {item.name}
                          </span>
                          <div className="ml-auto flex items-center shrink-0">
                            <Button
                              variant="ghost"
                              onClick={() =>
                                updateStock(item.id, item.stockLevel)
                              }
                              className="h-9 px-3 bg-primary/12 text-primary hover:bg-primary/20 hover:text-primary rounded-full"
                            >
                              {stockLabel}
                              {[0, 1].map((p) => (
                                <span
                                  key={`pip${p}`}
                                  className={`rounded-full size-1 ${p < stockPips ? "bg-primary/50" : "bg-muted-foreground/30"}`}
                                ></span>
                              ))}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                toggleShoppingList(item.id, item.wantToBuy)
                              }
                              className={`rounded-full size-9 ${item.wantToBuy ? "bg-primary  text-white hover:bg-primary/90 hover:text-white" : "bg-primary/12 text-primary hover:bg-primary/20 hover:text-primary"}`}
                            >
                              <ShoppingCart className="size-5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setDeleteTargetId(item.id)}
                              className="rounded-full size-9 text-muted-foreground"
                            >
                              <Trash2 className="size-5" />
                            </Button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </>
          )}
          <ConfirmDialog
            open={deleteTargetId !== null}
            onOpenChange={(open) => {
              if (!open) {
                setDeleteTargetId(null);
              }
            }}
            title="アイテムの削除"
            message="パントリーからアイテムを削除しますか？"
            onConfirm={async () => {
              if (deleteTargetId === null) return;
              return await deleteItem(deleteTargetId);
            }}
          />
        </>
      )}
    </>
  );
};
