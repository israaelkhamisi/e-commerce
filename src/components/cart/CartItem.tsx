import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { Button } from "src/components/ui/button";
import PriceTag from "src/components/shared/PriceTag";
import QuantitySelector from "src/components/shared/QuantitySelector";
import type { ICartItem } from "src/interfaces/cart-item.interface";

export default function CartItem({ item }: { item: ICartItem }) {
  const t = useTranslations("Common");
  const { product } = item;

  return (
    <div className="flex items-center gap-4 rounded-xl border border-border p-4">
      {/* eslint-disable-next-line @next/next/no-img-element -- remote images */}
      <img src={product.image} alt={product.name} className="size-20 rounded-md object-cover" />
      <div className="flex-1 space-y-1">
        <p className="font-medium">{product.name}</p>
        <PriceTag price={product.price} />
      </div>
      <QuantitySelector initial={item.quantity} max={product.stock} />
      <Button variant="ghost" size="icon" aria-label={t("remove")}>
        <X />
      </Button>
    </div>
  );
}
