"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { toast } from "sonner";
import { createCategoryAction } from "@/lib/category-action";
import { Category } from "@/lib/types";

export const SettingNewCategoryDialog = ({
  onSaved,
}: {
  onSaved: (category: Category) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const handleSave = async () => {
    if (!categoryName.trim()) return;
    const result = await createCategoryAction(categoryName);
    if (result.success && result.category) {
      onSaved(result.category);
      toast(`カテゴリ ${categoryName} を追加しました`);
      setOpen(false);
    } else {
      toast(result.error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button className="max-w-96 w-full" />}>
        カテゴリを追加
      </DialogTrigger>
      <DialogContent className="space-y-3">
        <DialogHeader>
          <DialogTitle>カテゴリを追加</DialogTitle>
        </DialogHeader>
        <Input
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <Button onClick={handleSave}>追加</Button>
      </DialogContent>
    </Dialog>
  );
};
