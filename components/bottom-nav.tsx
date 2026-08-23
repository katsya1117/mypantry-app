"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, PlusCircle, Settings } from "lucide-react";

const TABS = [
  { label: "Home", href: "/", icon: Home },
  { label: "アイテムを追加", href: "/add", icon: PlusCircle },
  { label: "設定", href: "/settings", icon: Settings },
];

export const BottomNav = () => {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-around border-t bg-background">
      {TABS.map((t) => {
        const isActive =
          t.href === "/" ? pathname === "/" : pathname.startsWith(t.href);
        const Icon = t.icon;
        return (
          <Link
            key={t.href}
            href={t.href}
            className={`flex flex-col items-center py-2 ${isActive ? "text-primary" : "text-muted-foreground"}`}
          >
            <Icon />
            <span className="text-xs">{t.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
