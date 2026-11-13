import type { IBrand } from "src/interfaces/brand.interface";
import type { ApiResponse } from "src/types/api.types";

export async function getBrands(): Promise<ApiResponse<IBrand[]>> {
  const res = await fetch("/api/brands");
  return res.json();
}

export async function getBrand(id: string): Promise<ApiResponse<IBrand>> {
  const res = await fetch(`/api/brands/${id}`);
  return res.json();
}
