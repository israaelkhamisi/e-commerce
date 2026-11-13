import { useTranslations } from "next-intl";
import type { product as Product } from "src/types/product.t";
import ProductCard from "./ProductCard";
import EmptyState from "./EmptyState";

export default function ProductGrid({ products }: { products: Product[] }) {
  const t = useTranslations("Common");

  if (products.length === 0) return <EmptyState message={t("empty")} />;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
