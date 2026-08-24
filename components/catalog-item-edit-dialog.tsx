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
import {
  updateCatalogEntryAction,
  deleteCatalogEntryAction,
} from "@/lib/catalog-action";
import { toast } from "sonner";
import { MoreHorizontal, Trash2 } from "lucide-react";
import type { Catalog, Category } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ConfirmDialog } from "./confirm-dialog";

export const CatalogItemEditDialog = ({
  item,
  categories,
  onDeleted,
  onUpdated,
}: {
  item: Catalog;
  categories: Category[];
  onDeleted: (id: number) => void;
  onUpdated: (id: number, name: string, categoryId: number) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(item.name);
  const [categoryId, setCategoryId] = useState(item.categoryId);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleSave = async () => {
    const result = await updateCatalogEntryAction(item.id, name, categoryId);
    if (result.success) {
      onUpdated(item.id, name, categoryId);
      toast("更新しました");
      setOpen(false);
    } else {
      toast(result.error);
    }
  };
  const handleDelete = async () => {
    const result = await deleteCatalogEntryAction(item.id);
    if (result.success) {
      onDeleted(item.id);
      setOpen(false);
    } else {
      toast(result.error);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full size-9 text-muted-foreground"
            />
          }
        >
          <MoreHorizontal />
        </DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>アイテムを編集</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground block">
              アイテム名
            </label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground block">
              カテゴリ
            </label>
            <Select
              items={categories.map((c) => ({
                label: c.name,
                value: String(c.id),
              }))}
              value={String(categoryId)}
              onValueChange={(value) => setCategoryId(Number(value))}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center pt-2 justify-end gap-2">
            <Button
              variant="destructive"
              size="icon"
              onClick={() => setConfirmOpen(true)}
              className="rounded-full"
            >
              <Trash2 />
            </Button>
            <Button onClick={handleSave}>保存</Button>
          </div>
        </DialogContent>
      </Dialog>
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={(open) => {
          if (!open) {
            setConfirmOpen(false);
          }
        }}
        title="アイテムの削除"
        message="アイテムを削除しますか？"
        onConfirm={() => {
          return handleDelete();
        }}
      />
    </>
  );
};
