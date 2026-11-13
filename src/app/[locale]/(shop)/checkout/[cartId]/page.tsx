import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ReceiptText } from "lucide-react";
import { Link } from "src/i18n/routing";
import Container from "src/components/shared/Container";
import AppBreadcrumb from "src/components/shared/AppBreadcrumb";
import CartEmpty from "src/components/cart/CartEmpty";
import CheckoutClient from "src/components/checkout/CheckoutClient";
import type { CartProduct, CartResponse } from "src/interfaces/cart.interface";
import { GetAllCartItem } from "src/services/cart.services";
import type { IAddress } from "src/interfaces/address.interface";
import {GetAllAddress} from 'src/services/addresses.services'


export default async function CheckoutPage({ params }: PageProps<"/[locale]/checkout">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("CheckoutPage");
  const tCommon = await getTranslations("Common");
  const tCart = await getTranslations("CartPage");
  const data: CartResponse = await GetAllCartItem()
const products: CartProduct[] = data.data.products
const count = data.numOfCartItems
const total = data.data.totalCartPrice

const addressData = await GetAllAddress();
const addresses: IAddress[] = addressData.data;


  return (
    <Container className="space-y-8 py-8">
      <AppBreadcrumb
        items={[
          { label: tCommon("home"), href: "/" },
          { label: tCart("title"), href: "/cart" },
          { label: t("breadcrumb") },
        ]}
      />

      {products.length === 0 ? (
        <CartEmpty />
      ) : (
        <>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <span className="flex size-14 items-center justify-center rounded-xl bg-green-600 text-white">
                  <ReceiptText className="size-8" />
                </span>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">{t("title")}</h1>
              </div>
              <p className="text-lg text-gray-500">{t("subtitle")}</p>
            </div>
            <Link href="/cart" className="flex items-center gap-2 text-lg font-medium text-green-600 hover:text-green-700">
              <ArrowLeft className="size-5 rtl:rotate-180" />
              {t("backToCart")}
            </Link>
          </div>

          <CheckoutClient cartId={data.cartId ?? ""} products={products} count={count} total={total} addresses={addresses} />
        </>
      )}
    </Container>
  );
}
