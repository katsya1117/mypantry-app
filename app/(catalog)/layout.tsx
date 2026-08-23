import { RouteTabs } from "@/components/route-tabs";

const CatalogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <RouteTabs
        tabs={[
          { label: "アイテムの追加", href: "/add" },
          { label: "アイテムの定義", href: "/add/new" },
        ]}
      />
      {children}
    </>
  );
};

export default CatalogLayout;
