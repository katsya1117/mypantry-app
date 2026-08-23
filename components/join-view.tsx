"use client";

import {
  createHouseholdAction,
  joinHouseholdAction,
} from "@/lib/household-action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";

export const JoinView = () => {
  const [mode, setMode] = useState<"choose" | "created">("choose");
  const [genCode, setGenCode] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const router = useRouter();

  const handleCreate = async () => {
    try {
      const code = await createHouseholdAction();
      setGenCode(code);
      setMode("created");
    } catch (e) {
      console.error(e);
      toast("世帯の作成に失敗しました");
    }
  };

  const handleJoin = async () => {
    const result = await joinHouseholdAction(joinCode);
    if (result.success) {
      router.push("/");
    } else {
      toast(result.error ? result.error : "予期せぬエラー");
    }
  };

  return (
    <>
      {mode === "choose" ? (
        <div className="max-w-sm mx-auto flex flex-col gap-4">
          <Button onClick={handleCreate}>新しい世帯を作る</Button>
          <div className="flex items-center justify-center gap-2">
            <Input
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
            />
            <Button onClick={handleJoin}>参加する</Button>
          </div>
        </div>
      ) : (
        <div className="max-w-sm mx-auto flex flex-col items-center gap-4">
          <span className="font-medium text-2xl">{genCode}</span>
          <Button onClick={() => router.push("/")}>Top</Button>
        </div>
      )}
    </>
  );
};
