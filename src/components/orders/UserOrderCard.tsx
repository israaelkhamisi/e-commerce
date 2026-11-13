"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import {
  Banknote,
  Calendar,
  ChevronDown,
  CircleCheck,
  Clock,
  CreditCard,
  MapPin,
  Package,
  Phone,
  ReceiptText,
  Truck,
} from "lucide-react";
import type { UserOrder } from "src/interfaces/user-order.interface";

export default function UserOrderCard({ order }: { order: UserOrder }) {
  const t = useTranslations("OrdersPage");
  const tCommon = useTranslations("Common");
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  const items = order.cartItems;
  const first = items[0]?.product;
  const itemsCount = items.reduce((sum, item) => sum + item.count, 0);
  const isCard = order.paymentMethodType === "card";
  const subtotal = order.totalOrderPrice - order.shippingPrice - order.taxPrice;
  const num = (n: number) => n.toLocaleString(locale);
  const date = new Date(order.createdAt).toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Order status badge: delivered, paid (on the way) or still processing
  const status = order.isDelivered
    ? { label: t("delivered"), icon: CircleCheck, className: "bg-green-100 text-green-700 dark:bg-green-950" }
    : order.isPaid
      ? { label: t("onTheWay"), icon: Truck, className: "bg-blue-100 text-blue-700 dark:bg-blue-950" }
      : { label: t("processing"), icon: Clock, className: "bg-amber-100 text-amber-700 dark:bg-amber-950" };
  const StatusIcon = status.icon;

  return (
    <article
      className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition dark:bg-gray-900 ${
        open ? "border-green-200 dark:border-green-900" : "border-gray-100 dark:border-gray-800"
      }`}
    >
      {/* Top part (always visible) */}
      <div className="flex flex-wrap gap-6 p-6 sm:p-8">
        {first && (
          <div className="relative size-24 shrink-0 sm:size-36">
            <div className="relative size-full overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 dark:border-gray-800">
              <Image src={first.imageCover} alt={first.title} fill sizes="144px" className="object-contain p-3" />
            </div>
            {items.length > 1 && (
              <span dir="ltr" className="absolute -end-3 -top-3 flex size-9 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white">
                +{items.length - 1}
              </span>
            )}
          </div>
        )}

        <div className="flex flex-1 flex-col gap-3">
          <div className="flex items-start justify-between gap-4">
            <span className={`flex w-fit items-center gap-2 rounded-lg px-3 py-1 text-sm font-medium ${status.className}`}>
              <StatusIcon className="size-4" />
              {status.label}
            </span>
            <span
              title={isCard ? t("paidOnline") : t("cash")}
              className={`flex size-12 items-center justify-center rounded-xl ${
                isCard ? "bg-purple-100 text-purple-600 dark:bg-purple-950" : "bg-green-100 text-green-600 dark:bg-green-950"
              }`}
            >
              {isCard ? <CreditCard className="size-5" /> : <Banknote className="size-5" />}
            </span>
          </div>

          <p className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
            <span className="font-normal text-gray-400">#</span>
            {order.id}
          </p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-gray-500">
            <span className="flex items-center gap-2">
              <Calendar className="size-4" />
              {date}
            </span>
            <span className="text-gray-300">•</span>
            <span className="flex items-center gap-2">
              <Package className="size-4" />
              {t("itemsCount", { count: itemsCount })}
            </span>
            <span className="text-gray-300">•</span>
            <span className="flex items-center gap-2">
              <MapPin className="size-4" />
              {order.shippingAddress.city}
            </span>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-4">
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {num(order.totalOrderPrice)} <span className="text-base font-normal text-gray-400">{tCommon("currency")}</span>
            </p>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className={`flex items-center gap-2 rounded-xl px-5 py-3 font-semibold transition ${
                open
                  ? "bg-green-600 text-white shadow-lg shadow-green-600/25 hover:bg-green-700"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100"
              }`}
            >
              {open ? t("hide") : t("details")}
              <ChevronDown className={`size-4 transition ${open ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Details part (after pressing Details) */}
      {open && (
        <div className="space-y-6 border-t border-gray-100 bg-gray-50/60 p-6 sm:p-8 dark:border-gray-800 dark:bg-gray-950/40">
          <h3 className="flex items-center gap-3 font-semibold text-gray-900 dark:text-gray-100">
            <span className="flex size-8 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-950">
              <ReceiptText className="size-4" />
            </span>
            {t("orderItems")}
          </h3>

          <ul className="space-y-4">
            {items.map((item) => (
              <li
                key={item._id}
                className="flex items-center gap-5 rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800">
                  <Image src={item.product.imageCover} alt={item.product.title} fill sizes="80px" className="object-contain p-2" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-lg font-medium text-gray-900 dark:text-gray-100">{item.product.title}</p>
                  <p className="text-gray-500">
                    {item.count} × {num(item.price)} {tCommon("currency")}
                  </p>
                </div>
                <p className="text-end text-xl font-bold text-gray-900 dark:text-gray-100">
                  {num(item.count * item.price)}
                  <span className="block text-sm font-normal text-gray-400">{tCommon("currency")}</span>
                </p>
              </li>
            ))}
          </ul>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3 rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <h4 className="flex items-center gap-3 font-semibold text-gray-900 dark:text-gray-100">
                <span className="flex size-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950">
                  <MapPin className="size-4" />
                </span>
                {t("deliveryAddress")}
              </h4>
              <p className="text-lg text-gray-900 dark:text-gray-100">{order.shippingAddress.city}</p>
              <p className="text-gray-500">{order.shippingAddress.details}</p>
              <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Phone className="size-4 text-gray-400" />
                <span dir="ltr">{order.shippingAddress.phone}</span>
              </p>
            </div>

            <div className="space-y-3 rounded-2xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950/40">
              <h4 className="flex items-center gap-3 font-semibold text-gray-900 dark:text-gray-100">
                <span className="flex size-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                  <Truck className="size-4" />
                </span>
                {t("orderSummary")}
              </h4>
              <p className="flex justify-between text-gray-600 dark:text-gray-300">
                {t("subtotal")}
                <span>
                  {num(subtotal)} {tCommon("currency")}
                </span>
              </p>
              <p className="flex justify-between text-gray-600 dark:text-gray-300">
                {t("shipping")}
                <span>
                  {order.shippingPrice === 0 ? t("free") : `${num(order.shippingPrice)} ${tCommon("currency")}`}
                </span>
              </p>
              <p className="flex items-center justify-between border-t border-blue-200 pt-3 font-semibold text-gray-900 dark:border-blue-900 dark:text-gray-100">
                {t("total")}
                <span className="text-2xl font-bold">
                  {num(order.totalOrderPrice)} {tCommon("currency")}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
