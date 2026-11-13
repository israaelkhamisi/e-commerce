import type { Category, Categorys } from "src/types/category.t";
import type { Products, product } from "src/types/product.t";
import type { Brand, Brands } from "src/types/brand.t";



export async function handleGetProduct(filters: Record<string, string> = {}): Promise<product[]> {
const query = new URLSearchParams(filters).toString()
const response= await fetch(`${process.env.BASE_URL}/api/v1/products${query ? `?${query}` : ""}`)
const data: Products= await response.json()
return data.data
}
    export async function handleGetsingleProduct(id :string): Promise<product> {
const response= await fetch(`${process.env.BASE_URL}/api/v1/products/${id}`)
const data: { data: product } = await response.json()
return data.data
}
    export async function getAllCategories(): Promise<Categorys[]> {
const response= await fetch(`${process.env.BASE_URL}/api/v1/categories`)
const  data: Category  = await response.json()
return data.data
}

export async function getSingleCategory(id: string): Promise<Categorys> {
  const response = await fetch(`${process.env.BASE_URL}/api/v1/categories/${id}`);
  const data: { data: Categorys } = await response.json();
  return data.data;
}

export async function getSubCategories(id: string): Promise<Categorys[]> {
  const response = await fetch(`${process.env.BASE_URL}/api/v1/categories/${id}/subcategories`);
  const data: Category = await response.json();
  return data.data;
}
export async function getAllBrands(): Promise<Brands[]> {
  const response = await fetch(`${process.env.BASE_URL}/api/v1/brands?limit=60`);
  const data: Brand = await response.json();
  return data.data;
}
export async function getSingleBrand(id: string ): Promise<Brands> {
  const response = await fetch(`${process.env.BASE_URL}/api/v1/brands/${id}`);
  const data:{ data: Brands } = await response.json();
  return data.data;
}