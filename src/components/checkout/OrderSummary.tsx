import { useTranslations } from "next-intl";
import { Button } from "src/components/ui/button";
import type { ICartItem } from "src/interfaces/cart-item.interface";

export default function OrderSummary({ items }: { items: ICartItem[] }) {
  const t = useTranslations("CheckoutPage");
  const tCart = useTranslations("CartPage");
  const tCommon = useTranslations("Common");
  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <aside className="h-fit space-y-4 rounded-xl border border-border p-6">
      <h2 className="text-lg font-semibold">{t("summary")}</h2>
      {items.map(({ product, quantity }) => (
        <div key={product.id} className="flex justify-between text-sm">
          <span>
            {product.name} × {quantity}
          </span>
          <span>{product.price * quantity}</span>
        </div>
      ))}
      <div className="flex justify-between border-t border-border pt-4 font-bold">
        <span>{tCart("total")}</span>
        <span>
          {total} {tCommon("currency")}
        </span>
      </div>
      <Button type="submit" size="lg" className="w-full">
        {t("placeOrder")}
      </Button>
    </aside>
  );
}
