"use client";

import { useState } from "react";
import type { ICartItem } from "src/interfaces/cart-item.interface";
import type { IProduct } from "src/interfaces/product.interface";

// Cart state. Local only for now: each TODO marks where the API call goes.
// To share one cart between the Header and the pages, move this into a context provider.
export function useCart() {
  const [items, setItems] = useState<ICartItem[]>([]);
  const [loading, setLoading] = useState(false);

  // TODO: load the cart from the API (getCart in src/api/cart.ts)
  async function load() {
    setLoading(true);
    setLoading(false);
  }

  // TODO: POST the product to the cart API
  function addToCart(product: IProduct, quantity = 1) {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (!existing) return [...prev, { product, quantity }];
      return prev.map((item) =>
        item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
      );
    });
  }

  // TODO: PUT the new quantity to the cart API
  function updateQuantity(productId: string, quantity: number) {
    setItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item)),
    );
  }

  // TODO: DELETE the product from the cart API
  function removeFromCart(productId: string) {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  }

  // TODO: DELETE the whole cart from the API
  function clearCart() {
    setItems([]);
  }

  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce(
    (sum, item) => sum + (item.product.priceAfterDiscount ?? item.product.price) * item.quantity,
    0,
  );

  return { items, count, total, loading, load, addToCart, updateQuantity, removeFromCart, clearCart };
}
