"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsIndicator } from "./ui/tabs";

export const RouteTabs = ({
  tabs,
}: {
  tabs: { label: string; href: string }[];
}) => {
  const pathname = usePathname();
  const activeHref = tabs
    .slice()
    .sort((a, b) => b.href.length - a.href.length)
    .find(
      (t) => pathname === t.href || pathname.startsWith(t.href + "/"),
    )?.href;

  return (
    <Tabs value={activeHref} className="mb-4">
      <TabsList className="w-full">
        <TabsIndicator />
        {tabs.map((t) => (
          <TabsTrigger
            key={t.href}
            value={t.href}
            render={<Link href={t.href} />}
            nativeButton={false}
          >
            {t.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
