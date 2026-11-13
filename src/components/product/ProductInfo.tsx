"use client";

import { useTranslations } from "next-intl";
import { Heart, Minus, Plus, Share2, ShoppingCart, Zap } from "lucide-react";
import RatingStars from "src/components/shared/RatingStars";
import { useQuantity } from "src/hooks/useQuantity";
import type { product as Product } from "src/types/product.t";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { CartContext } from "src/context/CartContextProvider";
import { addTocart, UpdateCartItem } from "src/services/cart.services";

export default function ProductInfo({ product }: { product: Product }) {
  const t = useTranslations("ProductPage");
  const tCommon = useTranslations("Common");
  const { quantity, increase, decrease } = useQuantity(1, product.quantity);
  const price = product.priceAfterDiscount ?? product.price;
  const { setnumbercartitem } = useContext(CartContext);

async function handleAdd() {
  const data = await addTocart(product.id);
  if (data.status !== "success") {
    toast.error(data.message);
    return;
  }

  if (quantity > 1) {
    await UpdateCartItem(quantity, product.id);
  }

  toast.success(data.message);
  setnumbercartitem(data.numOfCartItems);
}

  return (
    <div className="space-y-5 rounded-xl bg-white p-8 shadow-sm dark:bg-card">
      <div className="flex gap-2 text-sm">
        <span className="rounded-full bg-green-50 px-4 py-1 text-green-700 dark:bg-green-950 dark:text-green-400">
          {product.category?.name}
        </span>
        <span className="rounded-full bg-gray-100 px-4 py-1 text-gray-700 dark:bg-muted dark:text-foreground">
          {product.brand?.name}
        </span>
      </div>

      <div className="space-y-1">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-foreground">{product.title}</h1>
        <div className="flex items-center gap-2">
          <RatingStars rating={product.ratingsAverage} />
          <span className="text-gray-600 dark:text-muted-foreground">
            ({product.ratingsQuantity} {tCommon("reviews")})
          </span>
        </div>
      </div>

      <p className="flex items-baseline gap-3">
        <span className="text-4xl font-bold text-gray-900 dark:text-foreground">
          {price} {tCommon("currency")}
        </span>
        {product.priceAfterDiscount && (
          <span className="text-xl text-gray-400 line-through">
            {product.price} {tCommon("currency")}
          </span>
        )}
      </p>

      <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-green-700 dark:bg-green-950 dark:text-green-400">
        <span className="size-2 rounded-full bg-green-600" />
        {t("inStock")}
      </span>

      <hr className="border-gray-100 dark:border-border" />

      <p className="text-lg text-gray-600 dark:text-muted-foreground">{product.description}</p>

      <div className="space-y-2">
        <p className="text-gray-700 dark:text-foreground">{tCommon("quantity")}</p>
        <div className="flex items-center gap-5">
          <div className="inline-flex items-center rounded-lg border-2 border-gray-200 dark:border-border">
            <button
              type="button"
              aria-label={tCommon("decrease")}
              onClick={decrease}
              className="p-4 text-gray-500 transition hover:text-gray-900 dark:hover:text-foreground"
            >
              <Minus className="size-5" />
            </button>
            <span className="w-12 text-center text-lg font-medium">{quantity}</span>
            <button
              type="button"
              aria-label={tCommon("increase")}
              onClick={increase}
              className="p-4 text-gray-500 transition hover:text-gray-900 dark:hover:text-foreground"
            >
              <Plus className="size-5" />
            </button>
          </div>
          <span className="text-gray-500 dark:text-muted-foreground">
            {t("available", { count: product.quantity })}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-xl bg-gray-50 px-5 py-6 dark:bg-muted">
        <span className="text-lg text-gray-700 dark:text-foreground">{t("totalPrice")}:</span>
        <span className="text-3xl font-bold text-green-600">
          {(price * quantity).toFixed(2)} {tCommon("currency")}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <button
        onClick={handleAdd}
          type="button"
          className="flex items-center justify-center gap-3 rounded-xl bg-green-600 py-4 text-lg font-medium text-white shadow-lg shadow-green-600/25 transition hover:bg-green-700"
        >
          <ShoppingCart className="size-5"  /> {tCommon("addToCart")}
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-3 rounded-xl bg-gray-900 py-4 text-lg font-medium text-white transition hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900"
        >
          <Zap className="size-5 fill-current" /> {t("buyNow")}
        </button>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-3 rounded-xl border-2 border-gray-200 py-4 text-lg text-gray-700 transition hover:border-green-600 hover:text-green-600 dark:border-border dark:text-foreground"
        >
          <Heart className="size-5" /> {tCommon("addToWishlist")}
        </button>
        <button
          type="button"
          aria-label={t("share")}
          className="flex w-[68px] items-center justify-center rounded-xl border-2 border-gray-200 text-gray-700 transition hover:border-green-600 hover:text-green-600 dark:border-border dark:text-foreground"
        >
          <Share2 className="size-5" />
        </button>
      </div>
    </div>
  );
}
