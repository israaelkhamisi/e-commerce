import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
import { Link } from "src/i18n/routing";
import Container from "src/components/shared/Container";
import AppBreadcrumb from "src/components/shared/AppBreadcrumb";
import WishlistRow from "src/components/wishlist/WishlistRow";
import { GetWishlist } from "src/services/wishlist.services";
import type { product as Product } from "src/types/product.t";

export default async function WishlistPage({ params }: PageProps<"/[locale]/wishlist">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("WishlistPage");
  const tCommon = await getTranslations("Common");

  const res = await GetWishlist();
  const products: Product[] = res?.data ?? [];

  return (
    <>

      <div className="border-b border-gray-100 bg-white dark:border-gray-800 dark:bg-background">
        <Container className="space-y-5 py-8">
          <AppBreadcrumb items={[{ label: tCommon("home"), href: "/" }, { label: t("breadcrumb") }]} />
          <div className="flex items-center gap-4">
            <span className="flex size-12 items-center justify-center rounded-xl bg-red-50 dark:bg-red-950">
              <Heart className="size-6 fill-red-500 text-red-500" />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t("title")}</h1>
              <p className="text-sm text-gray-500">{t("itemsSaved", { count: products.length })}</p>
            </div>
          </div>
        </Container>
      </div>

   
      <div className="bg-gray-50 dark:bg-gray-950/40">
        <Container className="space-y-6 py-8">
          {products.length === 0 ? (
            <section className="mx-auto flex max-w-lg flex-col items-center py-12 text-center">
              <span className="flex size-32 items-center justify-center rounded-full bg-red-50 dark:bg-red-950">
                <Heart className="size-14 text-red-300" />
              </span>
              <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-gray-100">{t("emptyTitle")}</h2>
              <p className="mt-3 text-gray-500">{t("emptyText")}</p>
              <Link
                href="/products"
                className="mt-8 inline-flex items-center gap-3 rounded-xl bg-green-600 px-8 py-3 font-semibold text-white transition hover:bg-green-700"
              >
                {t("startShopping")}
                <ArrowRight className="size-5 rtl:rotate-180" />
              </Link>
            </section>
          ) : (
            <>
              <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900">
                <div className="hidden grid-cols-[1fr_9rem_9rem_11rem] gap-4 bg-gray-50 px-5 py-4 text-sm text-gray-500 md:grid dark:bg-gray-800/50">
                  <span>{t("product")}</span>
                  <span className="text-center">{t("price")}</span>
                  <span className="text-center">{t("status")}</span>
                  <span className="text-center">{t("actions")}</span>
                </div>
                {products.map((product) => (
                  <WishlistRow key={product._id} product={product} />
                ))}
              </div>

              <Link href="/products" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-600">
                <ArrowLeft className="size-4 rtl:rotate-180" />
                {t("continueShopping")}
              </Link>
            </>
          )}
        </Container>
      </div>
    </>
  );
}
