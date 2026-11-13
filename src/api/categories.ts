import type { ICategory } from "src/interfaces/category.interface";
import type { ApiResponse } from "src/types/api.types";
import { API_URL } from "./config";

export interface ApiCategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export function toCategory(category: ApiCategory): ICategory {
  return { id: category._id, name: category.name, slug: category.slug, image: category.image };
}

export async function getCategories(): Promise<ApiResponse<ICategory[]>> {
  try {
    const res = await fetch(`${API_URL}/categories`, { next: { revalidate: 3600 } });
    if (!res.ok) return { success: false, error: `HTTP ${res.status}` };
    const body: { data: ApiCategory[] } = await res.json();
    return { success: true, data: body.data.map(toCategory) };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function getCategory(id: string): Promise<ApiResponse<ICategory>> {
  try {
    const res = await fetch(`${API_URL}/categories/${id}`, { next: { revalidate: 3600 } });
    if (!res.ok) return { success: false, error: `HTTP ${res.status}` };
    const body: { data: ApiCategory } = await res.json();
    return { success: true, data: toCategory(body.data) };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}
