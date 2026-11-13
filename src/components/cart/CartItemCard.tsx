"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "src/i18n/routing";
import type { CartProduct } from "src/interfaces/cart.interface";
import { DeletProductFromCart, UpdateCartItem } from "src/services/cart.services";
import { toast } from 'react-hot-toast';
import { useRouter } from "src/i18n/routing";
import { useContext } from "react";
import { CartContext } from "src/context/CartContextProvider";
export default function CartItemCard({ item }: { item: CartProduct }) {
  const t = useTranslations("CartPage");
  const router = useRouter();
  const {setnumbercartitem}=useContext(CartContext)
  const tCommon = useTranslations("Common");
  const { product, count, price } = item;
async function handleDelete() {
  const res = await DeletProductFromCart(product.id)
  console.log("delete", res)
  if (res.status == 'success') {
    toast.success(res.message)
    router.refresh()
    setnumbercartitem(res.numOfCartItems)
  }
}

async function updateCount(Count: number, id: string) {
  const res = await UpdateCartItem(Count, id)
  console.log("update", res)
  if (res.status == 'success') {
    router.refresh()
    setnumbercartitem(res.numOfCartItems)
  }
}
  return (
    <article className="flex gap-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <Link
        href={`/products/${product.id}`}
        className="relative size-40 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 dark:border-gray-800"
      >
        <Image src={product.imageCover} alt={product.title} fill sizes="160px" className="object-contain p-4" />
      </Link>

      <div className="flex flex-1 flex-col gap-3">
        <Link
          href={`/products/${product.id}`}
          className="text-xl font-medium text-gray-900 hover:text-green-600 dark:text-gray-100"
        >
          {product.title}
        </Link>
        <span className="w-fit rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700 dark:bg-green-950">
          {product.category.name}
        </span>
        <p className="text-xl font-bold text-green-600">
          {price} {tCommon("currency")}
        </p>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-1 dark:border-gray-700 dark:bg-gray-800">
            <button
            onClick={()=>updateCount(count -1,product.id)}
              type="button"
              aria-label={t("decrease")}
            
              className="flex size-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white disabled:opacity-50"
            >
              <Minus className="size-4" />
            </button>
            <span className="min-w-4 text-center text-lg font-semibold">{count}</span>
            <button
            onClick={()=>updateCount(count +1,product.id)}
              type="button"
              aria-label={t("increase")}
              className="flex size-9 items-center justify-center rounded-lg bg-green-600 text-white transition hover:bg-green-700"
            >
              <Plus className="size-4" />
            </button>
          </div>

          <div className="flex items-end gap-5">
            <div className="text-end">
              <p className="text-sm text-gray-400">{t("itemTotal")}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {price * count} <span className="text-base font-normal text-gray-400">{tCommon("currency")}</span>
              </p>
            </div>
            <button
            onClick={handleDelete}
              type="button"
              aria-label={tCommon("remove")}
              className="flex size-12 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-500 transition hover:bg-red-100"
            >
              <Trash2 className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
