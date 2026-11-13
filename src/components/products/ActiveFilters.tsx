import { useTranslations } from "next-intl";
import { Filter, Tag, X } from "lucide-react";
import { Link } from "src/i18n/routing";

// "Active Filters: [Brand x]  Clear all" row above the products
export default function ActiveFilters({ label }: { label: string }) {
  const t = useTranslations("ProductsPage");

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="flex items-center gap-2 text-gray-700 dark:text-foreground">
        <Filter className="size-4 fill-current" />
        {t("activeFilters")}
      </span>
      <Link
        href="/products"
        aria-label={t("removeFilter")}
        className="flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1.5 text-violet-700 transition-colors hover:bg-violet-200 dark:bg-violet-500/20 dark:text-violet-300"
      >
        <Tag className="size-4 fill-current" />
        {label}
        <X className="size-4" />
      </Link>
      <Link href="/products" className="text-sm text-gray-500 underline hover:text-green-600 dark:text-muted-foreground">
        {t("clearAll")}
      </Link>
    </div>
  );
}
