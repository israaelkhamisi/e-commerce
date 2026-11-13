import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Package, ShoppingBag } from "lucide-react";
import { Link } from "src/i18n/routing";
import Container from "src/components/shared/Container";
import AppBreadcrumb from "src/components/shared/AppBreadcrumb";
import UserOrderCard from "src/components/orders/UserOrderCard";
import type { UserOrder } from "src/interfaces/user-order.interface";
import { getUserOrders } from "src/services/cart.services";
import { VerifyToken } from "src/lib/verifytoken.api";



export default async function AllOrdersPage({ params }: PageProps<"/[locale]/allorders">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("OrdersPage");
  const tCommon = await getTranslations("Common");
  
const user = await VerifyToken();
const orders: UserOrder[] = await getUserOrders(user.decoded.id);
console.log(orders);


  return (
    <Container className="space-y-8 py-8">
      <AppBreadcrumb items={[{ label: tCommon("home"), href: "/" }, { label: t("title") }]} />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-600/30">
            <ShoppingBag className="size-8" />
          </span>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">{t("title")}</h1>
            <p className="mt-1 text-lg text-gray-500">{t("subtitleCount", { count: orders.length })}</p>
          </div>
        </div>
        <Link href="/products" className="flex items-center gap-2 text-lg font-medium text-green-600 hover:text-green-700">
          <ShoppingBag className="size-5" />
          {t("continueShopping")}
        </Link>
      </div>

      {orders.length === 0 ? (
        <section className="mx-auto flex max-w-lg flex-col items-center py-12 text-center">
          <span className="flex size-32 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
            <Package className="size-14 text-gray-400" />
          </span>
          <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-gray-100">{t("emptyTitle")}</h2>
          <p className="mt-3 text-gray-500">{t("emptyText")}</p>
          <Link
            href="/products"
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-green-600 px-8 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            {t("startShopping")}
            <ArrowRight className="size-5 rtl:rotate-180" />
          </Link>
        </section>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <UserOrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </Container>
  );
}
