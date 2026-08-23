"use client";

import { Category } from "@/lib/types";
import { useState } from "react";
import { Input } from "./ui/input";
import { createCatalogEntryAction } from "@/lib/catalog-action";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const NewCatalogItemForm = ({
  categories,
}: {
  categories: Category[];
}) => {
  const [newItemName, setNewItemName] = useState("");
  const [newItemCategoryId, setNewItemCategoryId] = useState(categories[0].id);
  const handleCreateCatalogEntry = async (
    e: React.SubmitEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (!newItemName.trim()) {
      toast("アイテム名を入力してください");
      return;
    }
    const result = await createCatalogEntryAction(
      newItemName,
      newItemCategoryId,
    );
    if (result.success) {
      toast(`${newItemName} を追加しました`);
      setNewItemName("");
    } else {
      toast(result.error);
    }
  };
  return (
    <form onSubmit={handleCreateCatalogEntry} className="mt-4">
      <div className="flex flex-col gap-3 w-full">
        <div className="grid grid-cols-[2.5fr_1.5fr_auto] gap-1">
          <Input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="名前"
          />
          <Select
            items={categories.map((c) => ({
              label: c.name,
              value: String(c.id),
            }))}
            value={String(newItemCategoryId)}
            onValueChange={(value) => setNewItemCategoryId(Number(value))}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c.id} value={String(c.id)}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-center">
          <Button type="submit" className="max-w-96 w-full">
            追加
          </Button>
        </div>
      </div>
    </form>
  );
};
