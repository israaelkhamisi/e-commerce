import { getTranslations, setRequestLocale } from "next-intl/server";
import { Package } from "lucide-react";
import Container from "src/components/shared/Container";
import PageHero from "src/components/shared/PageHero";
import ProductGrid from "src/components/shared/ProductGrid";
import AppPagination from "src/components/shared/AppPagination";
import FilterHero from "src/components/products/FilterHero";
import ActiveFilters from "src/components/products/ActiveFilters";
import NoProductsFound from "src/components/products/NoProductsFound";
import { getSingleBrand, handleGetProduct } from "src/services/api";

export default async function ProductsPage({ params, searchParams }: PageProps<"/[locale]/products">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ProductsPage");
  const tCommon = await getTranslations("Common");
  const tBrands = await getTranslations("BrandsPage");

  // Filters from the link: /products?category=... or ?subcategory=... or ?brand=...
  const { category, subcategory, brand } = await searchParams;
  const filters: Record<string, string> = {};
  if (typeof category === "string") filters.category = category;
  if (typeof subcategory === "string") filters.subcategory = subcategory;
  if (typeof brand === "string") filters.brand = brand;

  const products = await handleGetProduct(filters);

  // Opened from the Brands page: brand banner + filter chip + "No Products Found"
  if (typeof brand === "string") {
    const brandInfo = await getSingleBrand(brand);

    return (
      <>
        <FilterHero
          title={brandInfo.name}
          subtitle={t("shopBrand", { name: brandInfo.name })}
          image={brandInfo.image}
          breadcrumb={[
            { label: tCommon("home"), href: "/" },
            { label: tBrands("title"), href: "/brands" },
            { label: brandInfo.name },
          ]}
        />
        <Container className="space-y-6 py-8">
          <ActiveFilters label={brandInfo.name} />
          <p className="text-gray-500 dark:text-muted-foreground">{t("showing", { count: products.length })}</p>
          {products.length === 0 ? <NoProductsFound /> : <ProductGrid products={products} />}
        </Container>
      </>
    );
  }

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} icon={Package} />
      <Container className="space-y-8 py-8">
        <ProductGrid products={products} />
        <AppPagination current={1} total={1} />
      </Container>
    </>
  );
}
