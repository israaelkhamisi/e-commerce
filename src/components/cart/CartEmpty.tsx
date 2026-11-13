import { useTranslations } from "next-intl";
import { ArrowRight, Package } from "lucide-react";
import { Link } from "src/i18n/routing";

// Popular categories under the empty cart (ids from the API's /categories)
const popular = [
  { key: "electronics", href: "/products?category=6439d2d167d9aa4ca970649f" },
  { key: "fashion", href: "/products?category=6439d58a0049ad0b52b9003f" },
  { key: "home", href: "/categories" },
  { key: "beauty", href: "/products?category=6439d30b67d9aa4ca97064b1" },
] as const;

// Shown on the cart page when the cart has no products
export default function CartEmpty() {
  const t = useTranslations("CartPage");

  return (
    <section className="mx-auto flex max-w-lg flex-col items-center px-4 py-12 text-center">
      <span className="flex size-40 items-center justify-center rounded-full bg-gray-100 shadow-[0_24px_40px_-24px_rgba(0,0,0,0.15)] dark:bg-gray-800">
        <Package className="size-16 fill-gray-300 text-gray-100 dark:fill-gray-600 dark:text-gray-800" />
      </span>

      <h2 className="mt-8 text-3xl font-bold text-gray-900 dark:text-gray-100">{t("emptyTitle")}</h2>
      <p className="mt-4 text-lg text-gray-500">{t("emptyText")}</p>

      <Link
        href="/products"
        className="mt-10 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-10 py-4 text-lg font-semibold text-white shadow-lg shadow-green-600/25 transition hover:from-green-700 hover:to-green-800"
      >
        {t("startShopping")}
        <ArrowRight className="size-5 rtl:rotate-180" />
      </Link>

      <div className="mt-14 w-full border-t border-gray-100 pt-12 dark:border-gray-800">
        <p className="text-gray-400">{t("popularCategories")}</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          {popular.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className="rounded-full bg-gray-50 px-5 py-2.5 font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-600 dark:bg-gray-800 dark:text-gray-200"
            >
              {t(`categories.${key}`)}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
