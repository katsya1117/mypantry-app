"use client";

import { getShareCodeAction } from "@/lib/household-action";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "./ui/dialog";

export const ShareCodeButton = () => {
  const [code, setCode] = useState("");

  const handleOpenChange = async (open: boolean) => {
    if (open) {
      const result = await getShareCodeAction();
      setCode(result);
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger
        nativeButton={false}
        render={
          <div className="flex items-center justify-between rounded-xl bg-card shadow-sm px-4 py-3" />
        }
      >
        招待コード
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>招待コード</DialogTitle>
        </DialogHeader>
        <p className="text-center text-2xl font-bold">{code}</p>
      </DialogContent>
    </Dialog>
  );
};
