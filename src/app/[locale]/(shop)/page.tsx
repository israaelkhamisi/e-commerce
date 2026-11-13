import { setRequestLocale } from "next-intl/server";
import Container from "src/components/shared/Container";
import HeroSlider from "src/components/home/HeroSlider";
import ServicesBar from "src/components/home/ServicesBar";
import ShopByCategory from "src/components/home/ShopByCategory";
import PromoBanners from "src/components/home/PromoBanners";
import { Suspense } from "react";
import HomeProducts from "src/components/home/Homeproducts";
import NewsletterSection from "src/components/home/NewsletterSection";
import { getAllCategories } from "src/services/api";
import { getServerSession } from "next-auth";
import { nextAuthConfig } from "src/lib/nextauth.config";



export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const categories = await getAllCategories();
 const data = await getServerSession( nextAuthConfig)
 console.log('sessioon', data)
  return (
    <>
      <HeroSlider />
      <ServicesBar />
      <Container className="mt-10">
      <ShopByCategory categories={categories} />
      </Container>
      <Container className="mt-20">
        <PromoBanners />
      </Container>
      <Container className="mt-28">
     <Suspense
  fallback={
    <div className="flex min-h-60 items-center justify-center bg-slate-50 text-2xl font-bold text-slate-400">
      loading......
    </div>
  }
>
  <HomeProducts />
</Suspense>
      </Container>
      <div className="mt-10">
        <NewsletterSection />
      </div>
    </>
  );
}
