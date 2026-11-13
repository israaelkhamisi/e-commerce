import { useTranslations } from "next-intl";
import type { IBrand } from "src/interfaces/brand.interface";
import type { ICategory } from "src/interfaces/category.interface";

export default function FiltersSidebar({
  categories,
  brands,
}: {
  categories: ICategory[];
  brands: IBrand[];
}) {
  const t = useTranslations("SearchPage");

  return (
    <aside className="space-y-6 rounded-xl border border-border p-4 text-sm">
      <fieldset className="space-y-2">
        <legend className="mb-2 font-semibold">{t("categories")}</legend>
        {categories.map((c) => (
          <label key={c.id} className="flex items-center gap-2">
            <input type="checkbox" name="category" value={c.id} /> {c.name}
          </label>
        ))}
      </fieldset>
      <fieldset className="space-y-2">
        <legend className="mb-2 font-semibold">{t("priceRange")}</legend>
        <div className="flex gap-2">
          <input type="number" placeholder={t("min")} className="h-9 w-full rounded-md border border-input bg-transparent px-2" />
          <input type="number" placeholder={t("max")} className="h-9 w-full rounded-md border border-input bg-transparent px-2" />
        </div>
      </fieldset>
      <fieldset className="space-y-2">
        <legend className="mb-2 font-semibold">{t("brands")}</legend>
        {brands.map((b) => (
          <label key={b.id} className="flex items-center gap-2">
            <input type="checkbox" name="brand" value={b.id} /> {b.name}
          </label>
        ))}
      </fieldset>
    </aside>
  );
}
