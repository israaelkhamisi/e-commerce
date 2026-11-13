import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import Container from "src/components/shared/Container";
import SearchBar from "src/components/layout/SearchBar";
import ProductGrid from "src/components/shared/ProductGrid";
import AppPagination from "src/components/shared/AppPagination";
import FiltersSidebar from "src/components/products/FiltersSidebar";
import ViewToggle from "src/components/products/ViewToggle";
import SortSelect from "src/components/products/SortSelect";

export default function SearchPage({ params }: PageProps<"/[locale]/search">) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("SearchPage");

  return (
    <Container className="space-y-8 py-8">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <SearchBar />
      <div className="grid gap-6 lg:grid-cols-[16rem_1fr]">
        <FiltersSidebar categories={[]} brands={[]} />
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <ViewToggle />
            <SortSelect />
          </div>
          <ProductGrid products={[]} />
          <AppPagination current={1} total={1} />
        </div>
      </div>
    </Container>
  );
}
