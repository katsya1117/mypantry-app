import { RouteTabs } from "@/components/route-tabs";

const PantryLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <RouteTabs
        tabs={[
          { label: "My Pantry", href: "/" },
          { label: "買い物リスト", href: "/shopping-list" },
        ]}
      />
      {children}
    </>
  );
};

export default PantryLayout;
