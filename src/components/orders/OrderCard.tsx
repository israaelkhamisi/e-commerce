import { useTranslations } from "next-intl";
import { Package } from "lucide-react";
import { Button } from "src/components/ui/button";
import type { IOrder } from "src/interfaces/order.interface";

export default function OrderCard({ order }: { order: IOrder }) {
  const t = useTranslations("OrdersPage");
  const tCommon = useTranslations("Common");

  return (
    <article className="flex flex-wrap items-center gap-4 rounded-xl border border-border p-5">
      <span className="rounded-lg bg-primary/10 p-3 text-primary">
        <Package className="size-6" />
      </span>
      <div className="flex-1 text-sm">
        <p className="font-semibold">
          {t("order")} #{order.id}
        </p>
        <p className="text-muted-foreground">
          {order.items.length} {t("items")} · {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>
      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-700">{t(order.status)}</span>
      <p className="font-bold">
        {order.total} {tCommon("currency")}
      </p>
      <Button variant="outline">{t("details")}</Button>
    </article>
  );
}
