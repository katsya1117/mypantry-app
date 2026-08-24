import { LucideIcon } from "lucide-react";
import {
  Carrot,
  Beef,
  Milk,
  Package,
  Wheat,
  Package2,
  Droplet,
  FlaskConical,
  CupSoda,
  SprayCan,
  PaperBag,
} from "lucide-react";

export const categoriesPropsMap: Record<
  string,
  { icon: LucideIcon; color: string }
> = {
  "野菜・果物・きのこ": {
    icon: Carrot,
    color: "bg-green-100 text-green-700",
  },
  "肉・魚・加工品": {
    icon: Beef,
    color: "bg-red-100 text-red-700",
  },
  "乳製品・卵": {
    icon: Milk,
    color: "bg-yellow-100 text-yellow-700",
  },
  "大豆加工品・漬物・缶詰": {
    icon: Package,
    color: "bg-amber-100 text-amber-700",
  },
  "米・パン・麺": {
    icon: Wheat,
    color: "bg-orange-100 text-orange-700",
  },
  "乾物": {
    icon: Package2,
    color: "bg-stone-100 text-stone-700",
  },
  "調味料": {
    icon: Droplet,
    color: "bg-teal-100 text-teal-700",
  },
  "スパイス": {
    icon: FlaskConical,
    color: "bg-rose-100 text-rose-700",
  },
  "飲料": {
    icon: CupSoda,
    color: "bg-blue-100 text-blue-700",
  },
  "生活用品": {
    icon: SprayCan,
    color: "bg-purple-100 text-purple-700",
  },
  "その他": {
    icon: PaperBag,
    color: "bg-gray-100 text-gray-700",
  },
};
