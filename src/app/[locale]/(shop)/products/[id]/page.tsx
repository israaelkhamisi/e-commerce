import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import Container from "src/components/shared/Container";
import AppBreadcrumb from "src/components/shared/AppBreadcrumb";
import EmptyState from "src/components/shared/EmptyState";
import ProductGallery from "src/components/product/ProductGallery";
import ProductInfo from "src/components/product/ProductInfo";
import ProductTabs from "src/components/product/ProductTabs";
import RelatedProducts from "src/components/product/RelatedProducts";
import { handleGetsingleProduct,handleGetProduct } from "src/services/api";
import { GetProductReviews } from "src/services/reviews.services";
import {VerifyToken} from 'src/lib/verifytoken.api'



export default async function ProductPage({ params }: PageProps<"/[locale]/products/[id]">) {
  const { locale,id } = await (params);
setRequestLocale(locale);
  const t = await getTranslations("ProductPage");

  const tCommon =  await getTranslations("Common");
  
const product = await  handleGetsingleProduct(id)
const related = await handleGetProduct({ category:product.category._id })

const reviews = await GetProductReviews(id)
console.log(reviews)
const user =  await VerifyToken()
const userId = user.decoded?.id
  return (
    <Container className="space-y-8 py-8">
      <AppBreadcrumb items={[{ label: tCommon("home"), href: "/" }, { label: t("title") }]} />
      {product ? (
        <>
     <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)]">
        <ProductGallery images={[product.imageCover, ...product.images]} alt={product.title} />
            <ProductInfo product={product}  />
          </div>
          <ProductTabs product={product} reviews={reviews.data} userId={userId} />
        </>
      ) : (
        <EmptyState message={tCommon("empty")} />
      )}
      <RelatedProducts  products={related}  />
    </Container>
  );
}
