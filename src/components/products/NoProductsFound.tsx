import { useTranslations } from "next-intl";
import { Package } from "lucide-react";
import { Link } from "src/i18n/routing";

export default function NoProductsFound() {
  const t = useTranslations("ProductsPage");

  return (
    <div className="flex flex-col items-center py-20 text-center">
      <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-gray-100 dark:bg-muted">
        <Package className="size-10 text-gray-400" />
      </div>
      <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-foreground">{t("noProductsTitle")}</h3>
      <p className="mb-6 text-gray-500 dark:text-muted-foreground">{t("noProductsText")}</p>
      <Link
        href="/products"
        className="rounded-xl bg-green-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-green-700"
      >
        {t("viewAllProducts")}
      </Link>
    </div>
  );
}
