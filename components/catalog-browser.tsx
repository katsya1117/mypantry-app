"use client";

import { Catalog, Category } from "@/lib/types";
import { useState } from "react";
import { addToPantryAction } from "@/lib/action";
import { CheckCircle2 } from "lucide-react";
import { CatalogItemEditDialog } from "./catalog-item-edit-dialog";

export const CatalogBrowser = ({
  categories,
  initialCatalog,
  itemsInPantry,
}: {
  categories: Category[];
  initialCatalog: Catalog[];
  itemsInPantry: { catalogId: number }[];
}) => {
  const [pantryCatalogIds, setPantryCatalogIds] = useState(
    itemsInPantry.map((i) => i.catalogId),
  );
  const [catalog, setCatalog] = useState(initialCatalog);
  const handleAddToPantry = async (catalogId: number) => {
    if (pantryCatalogIds.includes(catalogId)) {
      return;
    } else {
      setPantryCatalogIds([...pantryCatalogIds, catalogId]);
      await addToPantryAction(catalogId);
    }
  };
  const handleDeleted = (id: number) => {
    setCatalog(catalog.filter((e) => e.id !== id));
  };

  const handleUpdated = (id: number, name: string, categoryId: number) => {
    const target = catalog.find((e) => e.id === id);
    if (target?.categoryId === categoryId) {
      setCatalog(
        catalog.map((e) => (e.id === id ? { id, name, categoryId } : e)),
      );
    } else {
      setCatalog(catalog.filter((e) => e.id !== id));
    }
  };
  return (
    <>
      {catalog.length === 0 ? (
        <div className="flex flex-col items-center gap-4 mt-12">
          <span>このカテゴリにはアイテムがありません</span>
        </div>
      ) : (
        <>
          <p className="text-sm text-muted-foreground mb-4">
            タップしてパントリーに登録します
          </p>
          <ul className="space-y-2">
            {catalog.map((i) => {
              const isInPantry = pantryCatalogIds.includes(i.id);
              return (
                <li
                  key={i.id}
                  onClick={() => handleAddToPantry(i.id)}
                  className={`flex items-center gap-2 py-1 px-3 rounded-lg shadow-sm cursor-pointer ${
                    isInPantry ? "bg-primary/20" : "bg-card"
                  }`}
                >
                  <span className="font-medium flex-1 min-w-0 truncate">
                    {i.name}
                  </span>
                  {isInPantry && (
                    <CheckCircle2 className="text-primary size-6" />
                  )}
                  <div onClick={(e) => e.stopPropagation()} className="ml-auto">
                    <CatalogItemEditDialog
                      item={i}
                      categories={categories}
                      onDeleted={handleDeleted}
                      onUpdated={handleUpdated}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
};
