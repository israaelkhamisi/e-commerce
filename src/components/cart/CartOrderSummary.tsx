import { useTranslations } from "next-intl";
import { ArrowLeft, Lock, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { Link } from "src/i18n/routing";
import CouponBox from "./CouponBox";

// Free shipping starts from this cart total (EGP)
const FREE_SHIPPING_MIN = 500;
const SHIPPING_FEE = 50;

// Order summary on the right of the cart page (Figma cart screen)
export default function CartOrderSummary({ count, total, cartId }: { count: number; total: number; cartId: string }) {
  const t = useTranslations("CartPage");
  const tCommon = useTranslations("Common");

  const isFree = total >= FREE_SHIPPING_MIN;
  const shipping = isFree ? 0 : SHIPPING_FEE;
  const left = FREE_SHIPPING_MIN - total;
  const progress = Math.min(100, (total / FREE_SHIPPING_MIN) * 100);

  return (
    <aside className="h-fit overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:sticky lg:top-28 dark:border-gray-800 dark:bg-gray-900">
      <header className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-5 text-white">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <ShoppingBag className="size-5" />
          {t("summary")}
        </h2>
        <p className="mt-1 text-sm text-green-50">{t("itemsCount", { count })}</p>
      </header>

      <div className="space-y-5 p-6">
        {/* Free shipping progress (orange box) */}
        {isFree ? (
          <div className="flex items-center gap-2 rounded-xl bg-green-50 p-4 text-sm font-medium text-green-700 dark:bg-green-950 dark:text-green-300">
            <Truck className="size-5" />
            {t("freeShippingUnlocked")}
          </div>
        ) : (
          <div className="space-y-3 rounded-xl bg-orange-50 p-4 dark:bg-orange-950">
            <p className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
              <Truck className="size-5 text-orange-500" />
              {t("freeShippingLeft", { amount: left })}
            </p>
            <div className="h-2 overflow-hidden rounded-full bg-orange-100 dark:bg-orange-900">
              <div
                className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex justify-between text-gray-600 dark:text-gray-300">
          <span>{t("subtotal")}</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {total} {tCommon("currency")}
          </span>
        </div>
        <div className="flex justify-between text-gray-600 dark:text-gray-300">
          <span>{t("shipping")}</span>
          {isFree ? (
            <span className="font-medium text-green-600">{t("free")}</span>
          ) : (
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {shipping} {tCommon("currency")}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-dashed border-gray-200 pt-5 dark:border-gray-700">
          <span className="font-semibold text-gray-900 dark:text-gray-100">{t("total")}</span>
          <span>
            <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">{total + shipping}</span>{" "}
            <span className="text-sm text-gray-500">{tCommon("currency")}</span>
          </span>
        </div>

        <CouponBox />

        <Link
          href={`/checkout/${cartId}`}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-green-700 py-4 text-lg font-semibold text-white shadow-lg shadow-green-600/25 transition hover:from-green-700 hover:to-green-800"
        >
          <Lock className="size-5" />
          {t("secureCheckout")}
        </Link>

        <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-4 text-green-600" />
            {t("securePayment")}
          </span>
          <span className="h-4 w-px bg-gray-200 dark:bg-gray-700" />
          <span className="flex items-center gap-1.5">
            <Truck className="size-4 text-blue-600" />
            {t("fastDelivery")}
          </span>
        </div>

        <Link
          href="/products"
          className="flex items-center justify-center gap-2 pt-2 font-medium text-green-600 hover:text-green-700"
        >
          <ArrowLeft className="size-4 rtl:rotate-180" />
          {t("continueShopping")}
        </Link>
      </div>
    </aside>
  );
}
