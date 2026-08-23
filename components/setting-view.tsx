"use client";

import { Category } from "@/lib/types";
import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import { SettingNewCategoryDialog } from "./setting-new-category-dialog";
import {
  deleteCategoryAction,
  moveCategoryAction,
} from "@/lib/category-action";
import { toast } from "sonner";
import { ConfirmDialog } from "./confirm-dialog";

export const SettingView = ({
  initialCategories,
}: {
  initialCategories: Category[];
}) => {
  const [categories, setCategories] = useState(initialCategories);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const handleSaved = (category: Category) => {
    setCategories([...categories, category]);
  };
  const handleMove = async (id: number, direction: "up" | "down") => {
    const currentIndex = categories.findIndex((e) => e.id === id);
    const targetIndex =
      direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex > categories.length - 1) return;
    const newCategories = [...categories];
    [newCategories[currentIndex], newCategories[targetIndex]] = [
      newCategories[targetIndex],
      newCategories[currentIndex],
    ];
    setCategories(newCategories);
    await moveCategoryAction(id, direction);
  };
  const handleDelete = async (id: number) => {
    const result = await deleteCategoryAction(id);
    if (result.success) {
      setCategories(categories.filter((c) => c.id !== id));
    } else {
      toast(result.error);
    }
  };
  return (
    <>
      <ul className="space-y-2">
        {categories.map((c) => (
          <li
            key={c.id}
            className="flex items-center gap-2 py-1 px-3 rounded-2xl bg-card shadow-sm"
          >
            {c.name}
            <div className="ml-auto">
              <Button
                variant="ghost"
                onClick={() => handleMove(c.id, "up")}
                className="size-9 rounded-full text-muted-foreground"
              >
                <ArrowUp />
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleMove(c.id, "down")}
                className="size-9 rounded-full text-muted-foreground"
              >
                <ArrowDown />
              </Button>
              <Button
                variant="ghost"
                onClick={() => setDeleteTargetId(c.id)}
                className="size-9 rounded-full text-muted-foreground"
              >
                <Trash2 />
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-center mt-6">
        <SettingNewCategoryDialog onSaved={handleSaved} />
      </div>
      <ConfirmDialog
        open={deleteTargetId !== null}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTargetId(null);
          }
        }}
        title="カテゴリの削除"
        message="カテゴリを削除しますか？"
        onConfirm={async () => {
          if (deleteTargetId === null) return;
          return await handleDelete(deleteTargetId);
        }}
      />
    </>
  );
};
