import type { IProduct } from "./product.interface";

export interface IWishlistItem {
  product: IProduct;
  addedAt: string;
}
