import { useTranslations } from "next-intl";
import { ArrowRight, FolderOpen } from "lucide-react";
import { Link } from "src/i18n/routing";
import type { Categorys } from "src/types/category.t";

export default function SubCategoryCard({ subcategory }: { subcategory: Categorys }) {
  const t = useTranslations("CategoriesPage");

  return (
    <Link
      href={`/products?subcategory=${subcategory._id}`}
      className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl dark:border-border dark:bg-card"
    >
      <div className="mb-4 flex size-14 items-center justify-center rounded-xl bg-green-50 transition-colors group-hover:bg-green-100 dark:bg-muted">
        <FolderOpen className="size-6 fill-green-600 text-green-600" />
      </div>
      <h3 className="mb-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-green-600 dark:text-foreground">
        {subcategory.name}
      </h3>
      {/* Shows on hover only */}
      <div className="flex items-center gap-2 text-sm text-green-600 opacity-0 transition-opacity group-hover:opacity-100">
        <span>{t("browseProducts")}</span>
        <ArrowRight className="size-3 rtl:-scale-x-100" />
      </div>
    </Link>
  );
}
