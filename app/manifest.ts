import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MyPantry — 在庫と買い物リストを管理 —",
    short_name: "MyPantry",
    description: "食材や調味料の在庫を管理し、買い物リストをパッと作成",
    start_url: "/",
    display: "standalone",
    background_color: "#fefaf1",
    theme_color: "#bb4d00",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
