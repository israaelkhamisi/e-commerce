import type { ICartItem } from "src/interfaces/cart-item.interface";
import type { ApiResponse } from "src/types/api.types";

export async function getCart(): Promise<ApiResponse<ICartItem[]>> {
  const res = await fetch("/api/cart");
  return res.json();
}
