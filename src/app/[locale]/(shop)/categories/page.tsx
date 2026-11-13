import { getTranslations, setRequestLocale } from "next-intl/server";
import { LayoutGrid } from "lucide-react";
import Container from "src/components/shared/Container";
import PageHero from "src/components/shared/PageHero";
import CategoryCard from "src/components/categories/CategoryCard";
import { getAllCategories } from "src/services/api";

export default async function CategoriesPage({ params }: PageProps<"/[locale]/categories">) {
  const { locale } = await (params);
  setRequestLocale(locale);
  const t = await getTranslations("CategoriesPage");
const categories = await getAllCategories()
  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} icon={LayoutGrid} />
      <Container className="grid grid-cols-2 gap-4 py-10 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-5">
        {categories.map((item) => (
          <CategoryCard key={item._id} category={item} />
        ))}
      </Container>
    </>
  );
}
