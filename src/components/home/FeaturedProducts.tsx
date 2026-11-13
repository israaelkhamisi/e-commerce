import { useTranslations } from "next-intl";
import SectionTitle from "src/components/shared/SectionTitle";
import ProductGrid from "src/components/shared/ProductGrid";
import type { product as Product } from "src/types/product.t";

export default function FeaturedProducts({ products }: { products: Product[] }) {
  const t = useTranslations("HomePage");

  return (
    <section className="space-y-8">
      <SectionTitle title={t("featured")} highlight={t("featuredHighlight")} />
      <ProductGrid products={products} />
    </section>
  );
}
