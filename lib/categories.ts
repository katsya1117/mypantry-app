import { LucideIcon } from "lucide-react";
import { Cuboid, Drumstick, Milk } from "lucide-react";

export const categoriesPropsMap: Record<
  string,
  { icon: LucideIcon; color: string }
> = {
  "Processed foods": {
    icon: Cuboid,
    color: "bg-orange-100 text-orange-700",
  },
  "Meat & Fish": {
    icon: Drumstick,
    color: "bg-red-100 text-red-700",
  },
  "Dairy & Eggs": {
    icon: Milk,
    color: "bg-yellow-100 text-yellow-700",
  },
};
