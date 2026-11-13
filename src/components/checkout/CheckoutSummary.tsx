import Image from "next/image";
import { useTranslations } from "next-intl";
import { RotateCcw, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import type { PaymentType } from "./CheckoutForm";
import type { CartProduct } from "src/interfaces/cart.interface";

// Right side of the checkout page: items list, totals and the Place Order button
export default function CheckoutSummary({
  products,
  count,
  total,
  payment,
}: {
  products: CartProduct[];
  count: number;
  total: number;
  payment: PaymentType;
}) {
  const t = useTranslations("CheckoutPage");
  const tCommon = useTranslations("Common");

  return (
    <aside className="h-fit overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:sticky lg:top-28 dark:border-gray-800 dark:bg-gray-900">
      <header className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 text-white">
        <h2 className="flex items-center gap-3 text-xl font-bold">
          <ShoppingBag className="size-5" />
          {t("summary")}
        </h2>
        <p className="mt-1 text-green-50">{t("itemsCount", { count })}</p>
      </header>

      <div className="space-y-6 p-6">
        <ul className="max-h-72 space-y-3 overflow-y-auto pe-1">
          {products.map((item) => (
            <li key={item._id} className="flex items-center gap-4 rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
              <span className="relative size-16 shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-white dark:border-gray-700">
                <Image src={item.product.imageCover} alt={item.product.title} fill sizes="64px" className="object-contain p-1" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium text-gray-900 dark:text-gray-100">{item.product.title}</span>
                <span className="block text-sm text-gray-500">
                  {item.count} × {item.price} {tCommon("currency")}
                </span>
              </span>
              <span className="font-bold text-gray-900 dark:text-gray-100">{item.price * item.count}</span>
            </li>
          ))}
        </ul>

        <div className="space-y-4 border-t border-gray-100 pt-5 text-lg dark:border-gray-800">
          <div className="flex justify-between text-gray-600 dark:text-gray-300">
            <span>{t("subtotal")}</span>
            <span>
              {total} {tCommon("currency")}
            </span>
          </div>
          <div className="flex justify-between text-gray-600 dark:text-gray-300">
            <span className="flex items-center gap-2">
              <Truck className="size-5 text-gray-400" />
              {t("shipping")}
            </span>
            <span className="font-semibold text-green-600">{t("free")}</span>
          </div>
        </div>

        <div className="flex items-end justify-between border-t border-gray-100 pt-5 dark:border-gray-800">
          <span className="text-xl font-bold text-gray-900 dark:text-gray-100">{t("total")}</span>
          <span className="text-3xl font-bold text-green-600">
            {total} <span className="text-base font-normal text-gray-400">{tCommon("currency")}</span>
          </span>
        </div>

        {/* Submits the form in CheckoutForm (id="checkout-form") */}
        <button
          type="submit"
          form="checkout-form"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-green-700
           py-4 text-lg font-semibold text-white shadow-lg shadow-green-600/25 transition hover:from-green-700 hover:to-green-800"
        >
          {payment === "online" ? <ShieldCheck className="size-5" /> : <ShoppingBag className="size-5" />}
          {payment === "online" ? t("proceedToPayment") : t("placeOrder")}
        </button>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-gray-100 pt-5 text-sm text-gray-500 dark:border-gray-800">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-4 text-green-600" />
            {t("perkSecure")}
          </span>
          <span className="flex items-center gap-1.5">
            <Truck className="size-4 text-blue-600" />
            {t("perkFast")}
          </span>
          <span className="flex items-center gap-1.5">
            <RotateCcw className="size-4 text-orange-500" />
            {t("perkReturns")}
          </span>
        </div>
      </div>
    </aside>
  );
}
