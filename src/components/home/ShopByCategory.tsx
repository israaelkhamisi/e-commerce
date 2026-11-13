import { useTranslations } from "next-intl";
import SectionTitle from "src/components/shared/SectionTitle";
import CategoryCard from "src/components/categories/CategoryCard";
import EmptyState from "src/components/shared/EmptyState";
import type { Categorys } from "src/types/category.t";

export default function ShopByCategory({ categories }: { categories: Categorys[] }) {
  const t = useTranslations("HomePage");
  const tCommon = useTranslations("Common");

  return (
    <section className="space-y-8">
      <div className="py-8">
        <SectionTitle
          title={t("shopByCategory")}
          highlight={t("shopByCategoryHighlight")}
          linkLabel={t("viewAllCategories")}
          href="/categories"
        />
      </div>
      {categories.length === 0 ? (
        <EmptyState message={tCommon("empty")} />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {categories.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      )}
    </section>
  );
}
