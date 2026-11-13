"use client";

import { useContext, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { Link, useRouter } from "src/i18n/routing";
import { addTocart } from "src/services/cart.services";
import { DeletFromWishlist } from "src/services/wishlist.services";
import { CartContext } from "src/context/CartContextProvider";
import { WishlistContext } from "src/context/WishlistContextProvider";
import type { product as Product } from "src/types/product.t";


export default function WishlistRow({ product }: { product: Product }) {
  const t = useTranslations("WishlistPage");
  const tCommon = useTranslations("Common");
  const router = useRouter();
  const { setnumbercartitem } = useContext(CartContext);
  const { setWishlistIds } = useContext(WishlistContext);
  const [loading, setLoading] = useState<"cart" | "remove" | null>(null);

  const price = product.priceAfterDiscount ?? product.price;
  const inStock = product.quantity > 0;

  async function handleAddToCart() {
    setLoading("cart");
    const data = await addTocart(product._id);
    setLoading(null);
    if (data.status === "success") {
      toast.success(data.message);
      setnumbercartitem(data.numOfCartItems);
    } else {
      toast.error(data.message);
    }
  }

  async function handleRemove() {
    setLoading("remove");
    const data = await DeletFromWishlist(product._id);
    setLoading(null);
    if (data.status === "success") {
      toast.success(data.message);
      setWishlistIds(data.data);
      router.refresh();
    } else {
      toast.error(data.message);
    }
  }

  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-4 border-t border-gray-100 px-5 py-5 first:border-t-0 md:grid-cols-[1fr_9rem_9rem_11rem] dark:border-gray-800">
      <div className="col-span-2 flex items-center gap-4 md:col-span-1">
        <Link
          href={`/products/${product._id}`}
          className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-white dark:border-gray-800"
        >
          <Image src={product.imageCover} alt={product.title} fill sizes="80px" className="object-contain p-2" />
        </Link>
        <div className="space-y-1">
          <Link
            href={`/products/${product._id}`}
            className="line-clamp-2 font-medium text-gray-900 hover:text-green-600 dark:text-gray-100"
          >
            {product.title}
          </Link>
          <p className="text-sm text-gray-400">{product.category?.name}</p>
        </div>
      </div>

      <div className="md:text-center">
        <p className="font-semibold text-gray-900 dark:text-gray-100">
          {price.toLocaleString()} {tCommon("currency")}
        </p>
        {product.priceAfterDiscount && (
          <p className="text-sm text-gray-400 line-through">
            {product.price.toLocaleString()} {tCommon("currency")}
          </p>
        )}
      </div>

      <div className="justify-self-end md:justify-self-center">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
            inStock ? "bg-green-50 text-green-600 dark:bg-green-950" : "bg-red-50 text-red-500 dark:bg-red-950"
          }`}
        >
          <span className={`size-1.5 rounded-full ${inStock ? "bg-green-500" : "bg-red-500"}`} />
          {inStock ? t("inStock") : t("outOfStock")}
        </span>
      </div>

      <div className="col-span-2 flex items-center gap-2 md:col-span-1 md:justify-center">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!inStock || loading !== null}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 disabled:opacity-50 md:flex-none"
        >
          <ShoppingCart className="size-4" />
          {tCommon("addToCart")}
        </button>
        <button
          type="button"
          onClick={handleRemove}
          disabled={loading !== null}
          aria-label={tCommon("remove")}
          className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:opacity-50 dark:border-gray-700"
        >
          <Trash2 className="size-4" />
        </button>
      </div>
    </div>
  );
}
