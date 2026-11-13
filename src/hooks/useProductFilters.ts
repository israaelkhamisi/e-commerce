"use client";

import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "src/i18n/routing";

export type ProductView = "grid" | "list";

// Products page filters kept in the URL (?sort=price&category=a&category=b&minPrice=10&view=list)
export function useProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function update(change: (params: URLSearchParams) => void) {
    const params = new URLSearchParams(searchParams.toString());
    change(params);
    params.delete("page"); // any filter change goes back to page 1
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function setParam(key: string, value: string | null) {
    update((params) => (value ? params.set(key, value) : params.delete(key)));
  }

  function toggleValue(key: "category" | "brand", value: string) {
    update((params) => {
      const values = params.getAll(key);
      params.delete(key);
      const next = values.includes(value) ? values.filter((v) => v !== value) : [...values, value];
      next.forEach((v) => params.append(key, v));
    });
  }

  return {
    sort: searchParams.get("sort") ?? "",
    categories: searchParams.getAll("category"),
    brands: searchParams.getAll("brand"),
    minPrice: searchParams.get("minPrice") ?? "",
    maxPrice: searchParams.get("maxPrice") ?? "",
    view: (searchParams.get("view") === "list" ? "list" : "grid") as ProductView,
    setSort: (sort: string) => setParam("sort", sort || null),
    setView: (view: ProductView) => setParam("view", view === "grid" ? null : view),
    setPriceRange: (min: string, max: string) =>
      update((params) => {
        if (min) params.set("minPrice", min);
        else params.delete("minPrice");
        if (max) params.set("maxPrice", max);
        else params.delete("maxPrice");
      }),
    toggleCategory: (id: string) => toggleValue("category", id),
    toggleBrand: (id: string) => toggleValue("brand", id),
    clear: () => router.replace(pathname, { scroll: false }),
  };
}
