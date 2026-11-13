import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "src/i18n/routing";
import type { Categorys } from "src/types/category.t";

export default function CategoryCard({ category }: { category: Categorys }) {
  const t = useTranslations("CategoriesPage");

  return (
    <Link
      href={`/categories/${category._id}`}
      className="group rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl sm:p-6 dark:border-border dark:bg-card"
    >
      <div className="mb-4 aspect-square overflow-hidden rounded-xl bg-gray-50 dark:bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element -- remote API images */}
        <img
          src={category.image}
          alt={category.name}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <h3 className="text-center font-bold text-gray-900 transition-colors group-hover:text-green-600 dark:text-foreground">
        {category.name}
      </h3>
      {/* Shows on hover only */}
      <div className="mt-2 flex justify-center opacity-0 transition-opacity group-hover:opacity-100">
        <span className="flex items-center gap-1 text-xs text-green-600">
          {t("viewSubcategories")}
          <ArrowRight className="size-2.5 rtl:-scale-x-100" />
        </span>
      </div>
    </Link>
  );
}
