"use client";

import { useState } from "react";
import type { IProduct } from "src/interfaces/product.interface";
import type { IWishlistItem } from "src/interfaces/wishlist-item.interface";

// Wishlist state. Local only for now: each TODO marks where the API call goes.
// To share one wishlist between the Header and the pages, move this into a context provider.
export function useWishlist() {
  const [items, setItems] = useState<IWishlistItem[]>([]);
  const [loading, setLoading] = useState(false);

  // TODO: load the wishlist from the API (getWishlist in src/api/wishlist.ts)
  async function load() {
    setLoading(true);
    setLoading(false);
  }

  const isInWishlist = (productId: string) => items.some((item) => item.product.id === productId);

  // TODO: POST the product to the wishlist API
  function add(product: IProduct) {
    setItems((prev) =>
      prev.some((item) => item.product.id === product.id)
        ? prev
        : [...prev, { product, addedAt: new Date().toISOString() }],
    );
  }

  // TODO: DELETE the product from the wishlist API
  function remove(productId: string) {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  }

  function toggle(product: IProduct) {
    if (isInWishlist(product.id)) remove(product.id);
    else add(product);
  }

  return { items, count: items.length, loading, load, isInWishlist, add, remove, toggle };
}
