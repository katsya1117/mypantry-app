import type { Metadata, Viewport } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Zen_Maru_Gothic } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import FocusRevalidate from "@/components/focus-revalidate";
import { BottomNav } from "@/components/bottom-nav";
import { hasHouseholdId } from "@/lib/household";

const zenMaru = Zen_Maru_Gothic({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-zen-maru",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MyPantry — 在庫と買い物リストを管理 —",
  description: "食材や調味料の在庫を管理し、買い物リストをパッと作成",
  applicationName: "MyPantry",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MyPantry",
  },
  icons: {
    icon: "/icon-512.png",
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#bb4d00",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = await hasHouseholdId();
  return (
    <html
      lang="ja"
      className={cn("h-full", "antialiased", zenMaru.variable, "font-sans")}
    >
      <body className="min-h-full flex flex-col">
        {isAuthenticated && <BottomNav />}
        <main className="w-full max-w-2xl mx-auto p-6 pb-24">{children}</main>
        <FocusRevalidate />
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
