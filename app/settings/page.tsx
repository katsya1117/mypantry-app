import { ShareCodeButton } from "@/components/share-code-button";
import Link from "next/link";

const SettingPage = async () => {
  return (
    <>
      <h2 className="text-lg font-bold">設定</h2>
      <div className="flex flex-col gap-2 mt-4">
        <Link
          href="/settings/categories"
          className="flex items-center justify-between rounded-xl bg-card shadow-sm px-4 py-3"
        >
          カテゴリ設定
        </Link>
        <ShareCodeButton />
      </div>
    </>
  );
};
export default SettingPage;
