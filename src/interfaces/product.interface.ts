import type { IBrand } from "./brand.interface";
import type { ICategory } from "./category.interface";

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  priceAfterDiscount?: number;
  image: string;
  images: string[];
  stock: number;
  rating: number;
  ratingsCount: number;
  category?: ICategory;
  brand?: IBrand;
}
