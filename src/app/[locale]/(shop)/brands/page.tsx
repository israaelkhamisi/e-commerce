import { getTranslations, setRequestLocale } from "next-intl/server";
import { Tag } from "lucide-react";
import Container from "src/components/shared/Container";
import PageHero from "src/components/shared/PageHero";
import EmptyState from "src/components/shared/EmptyState";
import BrandCard from "src/components/brands/BrandCard";
import {getAllBrands} from "src/services/api"

export default async function BrandsPage({ params }: PageProps<"/[locale]/brands">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("BrandsPage");
  const tCommon = await getTranslations("Common");

const brands = await getAllBrands()

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} icon={Tag} />
      <Container className="py-10">
        {brands.length === 0 ? (
          <EmptyState message={tCommon("empty")} />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {brands.map((item) => (
              <BrandCard key={item._id} brand={item} />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
