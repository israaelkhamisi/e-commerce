import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "src/i18n/routing";
import type { Brands } from "src/types/brand.t";

export default function BrandCard({ brand }: { brand: Brands }) {
  const t = useTranslations("BrandsPage");

  return (
    <Link
      href={`/products?brand=${brand._id}`}
      className="group rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl sm:p-5 dark:border-border dark:bg-card"
    >
      {/* Brand logos are wide, so the box is wider than tall and the image is "contain" */}
      <div className="mb-4 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-gray-50 p-4 dark:bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element -- remote API images */}
        <img
          src={brand.image}
          alt={brand.name}
          className="size-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <h3 className="truncate text-center font-bold text-gray-900 transition-colors group-hover:text-green-600 dark:text-foreground">
        {brand.name}
      </h3>
      {/* Shows on hover only */}
      <div className="mt-2 flex justify-center opacity-0 transition-opacity group-hover:opacity-100">
        <span className="flex items-center gap-1 text-xs text-green-600">
          {t("viewProducts")}
          <ArrowRight className="size-2.5 rtl:-scale-x-100" />
        </span>
      </div>
    </Link>
  );
}
