import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "src/i18n/routing";
import Container from "src/components/shared/Container";
import AppBreadcrumb from "src/components/shared/AppBreadcrumb";
import EmptyState from "src/components/shared/EmptyState";
import SubCategoryCard from "src/components/categories/SubCategoryCard";
import { getSingleCategory, getSubCategories } from "src/services/api";

export default async function CategoryDetailsPage({ params }: PageProps<"/[locale]/categories/[id]">) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("CategoriesPage");
  const tCommon = await getTranslations("Common");

  const [category, subcategories] = await Promise.all([getSingleCategory(id), getSubCategories(id)]);

  return (
    <>
      {/* Green banner with the category image */}
      <section className="bg-gradient-to-br from-green-600 to-green-400 py-10 text-white">
        <Container className="space-y-4">
          <AppBreadcrumb
            items={[
              { label: tCommon("home"), href: "/" },
              { label: t("title"), href: "/categories" },
              { label: category.name },
            ]}
          />
          <div className="flex items-center gap-5">
            <div className="flex size-16 items-center justify-center overflow-hidden rounded-2xl bg-white/20 shadow-xl ring-1 ring-white/30 backdrop-blur-sm">
              {/* eslint-disable-next-line @next/next/no-img-element -- remote API images */}
              <img src={category.image} alt={category.name} className="size-12 object-contain" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{category.name}</h1>
              <p className="mt-1 text-white/80">{t("chooseSubcategory")}</p>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-10">
        <Link
          href="/categories"
          className="mb-6 inline-flex items-center gap-2 text-gray-600 transition-colors hover:text-green-600 dark:text-muted-foreground"
        >
          <ArrowLeft className="size-4 rtl:-scale-x-100" />
          <span>{t("backToCategories")}</span>
        </Link>

        <h2 className="mb-6 text-lg font-bold text-gray-900 dark:text-foreground">
          {t("subcategoriesIn", { count: subcategories.length, name: category.name })}
        </h2>

        {subcategories.length === 0 ? (
          <EmptyState message={tCommon("empty")} />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {subcategories.map((subcategory) => (
              <SubCategoryCard key={subcategory._id} subcategory={subcategory} />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
