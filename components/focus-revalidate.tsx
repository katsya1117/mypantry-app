"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const FocusRevalidate = () => {
  const router = useRouter();
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        router.refresh();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [router]);

  return null;
};
export default FocusRevalidate;
