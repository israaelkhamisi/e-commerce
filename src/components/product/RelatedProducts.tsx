import { useTranslations } from "next-intl";
import SectionTitle from "src/components/shared/SectionTitle";
import ProductGrid from "src/components/shared/ProductGrid";
import type { product as Product } from "src/types/product.t";

export default function RelatedProducts({ products }: { products: Product[] }) {
  const t = useTranslations("ProductPage");

  return (
    <section>
      <SectionTitle title={t("related")} />
      <ProductGrid products={products} />
    </section>
  );
}
