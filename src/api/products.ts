import type { IProduct } from "src/interfaces/product.interface";
import type { ApiResponse } from "src/types/api.types";
import { API_URL } from "./config";
import { type ApiCategory, toCategory } from "./categories";

interface ApiProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  images: string[];
  quantity: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  category?: ApiCategory;
  brand?: ApiCategory;
}

function toProduct(product: ApiProduct): IProduct {
  return {
    id: product._id,
    name: product.title,
    description: product.description,
    price: product.price,
    priceAfterDiscount: product.priceAfterDiscount,
    image: product.imageCover,
    images: product.images,
    stock: product.quantity,
    rating: product.ratingsAverage,
    ratingsCount: product.ratingsQuantity,
    category: product.category && toCategory(product.category),
    brand: product.brand && toCategory(product.brand),
  };
}

export async function getProducts(limit = 40): Promise<ApiResponse<IProduct[]>> {
  try {
    const res = await fetch(`${API_URL}/products?limit=${limit}`, { next: { revalidate: 3600 } });
    if (!res.ok) return { success: false, error: `HTTP ${res.status}` };
    const body: { data: ApiProduct[] } = await res.json();
    return { success: true, data: body.data.map(toProduct) };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function getProduct(id: string): Promise<ApiResponse<IProduct>> {
  try {
    const res = await fetch(`${API_URL}/products/${id}`, { next: { revalidate: 3600 } });
    if (!res.ok) return { success: false, error: `HTTP ${res.status}` };
    const body: { data: ApiProduct } = await res.json();
    return { success: true, data: toProduct(body.data) };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}
