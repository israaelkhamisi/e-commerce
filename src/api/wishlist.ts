import type { IWishlistItem } from "src/interfaces/wishlist-item.interface";
import type { ApiResponse } from "src/types/api.types";

export async function getWishlist(): Promise<ApiResponse<IWishlistItem[]>> {
  const res = await fetch("/api/wishlist");
  return res.json();
}
