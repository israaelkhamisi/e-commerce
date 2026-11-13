import { useTranslations } from "next-intl";
import { ShoppingCart, X } from "lucide-react";
import { Button } from "src/components/ui/button";
import PriceTag from "src/components/shared/PriceTag";
import type { IWishlistItem } from "src/interfaces/wishlist-item.interface";

export default function WishlistItem({ item }: { item: IWishlistItem }) {
  const t = useTranslations("WishlistPage");
  const tCommon = useTranslations("Common");
  const { product } = item;

  return (
    <div className="flex items-center gap-4 rounded-xl border border-border p-4">
      {/* eslint-disable-next-line @next/next/no-img-element -- remote images */}
      <img src={product.image} alt={product.name} className="size-20 rounded-md object-cover" />
      <div className="flex-1 space-y-1">
        <p className="font-medium">{product.name}</p>
        <PriceTag price={product.price} />
      </div>
      <Button>
        <ShoppingCart /> {t("moveToCart")}
      </Button>
      <Button variant="ghost" size="icon" aria-label={tCommon("remove")}>
        <X />
      </Button>
    </div>
  );
}
