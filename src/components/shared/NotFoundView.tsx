"use client";
import { useTranslations } from "next-intl";
import { Apple, ArrowLeft, Carrot, House, Leaf, ShoppingCart, Sprout } from "lucide-react";
import { Link, useRouter } from "src/i18n/routing";

// FreshCart 404 page: cart card + "Oops! Nothing Here" + buttons + popular links
export default function NotFoundView() {
  const t = useTranslations("NotFoundPage");
  const router = useRouter();

  const links = [
    { href: "/products", label: t("allProducts"), active: true },
    { href: "/categories", label: t("categories") },
    { href: "/products", label: t("todaysDeals") },
    { href: "/brands", label: t("brands") },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-green-50/40 px-4 py-16 dark:from-gray-950 dark:to-gray-900">
      {/* Floating fruit / veggie icons in the background */}
      <Apple className="pointer-events-none absolute left-[5%] top-[10%] size-10 text-green-300/70" />
      <Apple className="pointer-events-none absolute left-[15%] top-[45%] size-7 text-green-200/70" />
      <Leaf className="pointer-events-none absolute bottom-[20%] left-[8%] size-9 text-green-300/70" />
      <Carrot className="pointer-events-none absolute right-[10%] top-[18%] size-10 text-green-200/80" />
      <Carrot className="pointer-events-none absolute right-[6%] top-[40%] size-8 text-green-200/70" />
      <Sprout className="pointer-events-none absolute bottom-[18%] right-[16%] size-12 text-green-300/70" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        {/* Cart card with the 404 badge */}
        <div className="relative">
          <div className="flex size-56 items-center justify-center rounded-3xl bg-white shadow-xl shadow-gray-200/60 dark:bg-gray-800 dark:shadow-none sm:h-56 sm:w-72">
            <ShoppingCart className="size-24 text-green-300" strokeWidth={2.2} />
          </div>
          <span className="absolute -right-8 -top-8 flex size-24 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-700 text-2xl font-black text-white shadow-lg ring-8 ring-white dark:ring-gray-900">
            404
          </span>
        </div>

        {/* Little smile */}
        <div className="mt-12 flex items-center gap-3">
          <span className="size-2.5 rounded-full bg-green-500" />
          <span className="h-3 w-9 rounded-b-full border-b-2 border-green-500" />
          <span className="size-2.5 rounded-full bg-green-500" />
        </div>

        <h1 className="mt-10 text-5xl font-black text-gray-900 dark:text-gray-100 sm:text-6xl">{t("title")}</h1>
        <p className="mt-6 max-w-lg text-xl leading-relaxed text-gray-500">{t("text")}</p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-2xl bg-green-600 px-10 py-5 text-xl font-bold text-white shadow-lg shadow-green-600/30 transition hover:bg-green-700"
          >
            <House className="size-6" />
            {t("home")}
          </Link>
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-10 py-5 text-xl font-bold text-gray-800 shadow-md transition hover:border-green-500 hover:text-green-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          >
            <ArrowLeft className="size-6 rtl:rotate-180" />
            {t("back")}
          </button>
        </div>

        {/* Popular destinations */}
        <div className="mt-12 w-full max-w-2xl rounded-3xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm font-medium uppercase tracking-widest text-gray-400">{t("popular")}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`rounded-xl px-6 py-3 font-medium transition ${
                  link.active
                    ? "bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-950 dark:text-green-400"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
