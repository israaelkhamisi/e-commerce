"use client";

import { useState } from "react";

// Quantity counter clamped between 1 and max
export function useQuantity(initial = 1, max?: number) {
  const [quantity, setQuantity] = useState(initial);

  return {
    quantity,
    setQuantity,
    increase: () => setQuantity((q) => (max ? Math.min(max, q + 1) : q + 1)),
    decrease: () => setQuantity((q) => Math.max(1, q - 1)),
    canIncrease: max === undefined || quantity < max,
    canDecrease: quantity > 1,
  };
}
