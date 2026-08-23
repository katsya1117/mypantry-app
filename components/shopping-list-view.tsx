"use client";

import { toggleBoughtAction, confirmBoughtAction } from "@/lib/action";
import { categoriesPropsMap } from "@/lib/categories";
import { Item } from "@/lib/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, PaperBag } from "lucide-react";
import Link from "next/link";

export const ShoppingListView = ({
  initialItems,
}: {
  initialItems: Item[];
}) => {
  const [items, setItems] = useState(initialItems);
  const [prevInitialItems, setPrevInitialItems] = useState(initialItems);
  if (initialItems !== prevInitialItems) {
    setPrevInitialItems(initialItems);
    setItems(initialItems);
  }
  const alignedItem = items.reduce<Record<string, Item[]>>((acc, cur) => {
    if (acc[cur.category] === undefined) {
      acc[cur.category] = [];
    }
    acc[cur.category].push(cur);
    return acc;
  }, {});
  const buyItem = async (id: number, currentValue: boolean) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, bought: !currentValue } : item,
      ),
    );
    await toggleBoughtAction(id, currentValue);
  };
  const confirmBought = async () => {
    setItems(items.filter((item) => item.bought === false));
    await confirmBoughtAction();
  };
  return (
    <>
      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-4 mt-12">
          <span>リストが空です</span>
          <Button nativeButton={false} render={<Link href="/" />}>
            パントリーを見る
          </Button>
        </div>
      ) : (
        <>
          {Object.entries(alignedItem).map(([category, categoryItems]) => (
            <div key={category}>
              <h2 className="text-lg font-bold mt-6 mb-2">{category}</h2>
              <ul className="space-y-2">
                {categoryItems.map((item) => {
                  const categoryProps = categoriesPropsMap[item.category] ?? {
                    icon: PaperBag,
                    color: "bg-gray-100 text-gray-700",
                  };
                  const Icon = categoryProps.icon;
                  const IconColor = categoryProps.color;
                  const IsBought = item.bought;

                  return (
                    <li
                      key={item.id}
                      className="flex items-center gap-2 py-1 rounded-2xl bg-card px-3 shadow-sm"
                    >
                      <span
                        className={`${IconColor} rounded-full size-9 flex items-center justify-center`}
                      >
                        <Icon />
                      </span>
                      <span
                        className={`${IsBought ? "line-through" : ""} font-medium`}
                      >
                        {item.name}
                      </span>
                      <div className="ml-auto flex items-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => buyItem(item.id, item.bought)}
                          className={`ml-auto rounded-full size-9 ${IsBought ? "bg-primary  text-white hover:bg-primary/90 hover:text-white" : "bg-primary/12 text-primary hover:bg-primary/20 hover:text-primary"}`}
                        >
                          <CheckCircle className="size-6" />
                        </Button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          <div className="flex justify-center mt-6">
            <Button
              variant="default"
              onClick={confirmBought}
              className="max-w-96 w-full"
            >
              DONE!
            </Button>
          </div>
        </>
      )}
    </>
  );
};
