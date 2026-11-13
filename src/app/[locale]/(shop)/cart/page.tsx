import { getTranslations, setRequestLocale } from "next-intl/server";
import { ShoppingCart } from "lucide-react";
import Container from "src/components/shared/Container";
import AppBreadcrumb from "src/components/shared/AppBreadcrumb";
import CartEmpty from "src/components/cart/CartEmpty";
import CartItemCard from "src/components/cart/CartItemCard";
import CartOrderSummary from "src/components/cart/CartOrderSummary";
import { GetAllCartItem } from "src/services/cart.services";
import type { CartResponse,CartProduct } from "src/interfaces/cart.interface";
import ClearAllItems from "src/components/shared/ClearAllItems";



export default async function CartPage({ params }: PageProps<"/[locale]/cart">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("CartPage");
  const tCommon = await getTranslations("Common");

  const data:CartResponse = await GetAllCartItem()

console.log("cart data", data)
  const products = data.data.products

  const count = data.numOfCartItems
const total = data.data.totalCartPrice
 async function deletItem(id:string){


}


  return (
    <Container className="space-y-8 py-8">
      <AppBreadcrumb items={[{ label: tCommon("home"), href: "/" }, { label: t("title") }]} />

      {products.length === 0 ? (
        <CartEmpty />
      ) : (
        <>
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <span className="flex size-14 items-center justify-center rounded-xl bg-green-600 text-white">
                <ShoppingCart className="size-8" />
              </span>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">{t("title")}</h1>
            </div>
            <p className="text-lg text-gray-500">
              {t.rich("itemsInCart", {
                count,
                b: (chunks) => <span className="font-semibold text-green-600">{chunks}</span>,
              })}
            </p>
          </div>

         <div className="grid items-start gap-8 lg:grid-cols-[1fr_24rem]">
  <div className="space-y-5">
    {products.map((item: CartProduct) => (
      <CartItemCard key={item._id} item={item} />
    ))}
    <ClearAllItems />
  </div>
  <CartOrderSummary count={count} total={total}   cartId={data.cartId ?? ""}/>
</div>
        </>
      )}
    </Container>
  );
}
