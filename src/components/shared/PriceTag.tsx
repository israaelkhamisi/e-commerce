import { useTranslations } from "next-intl";

export default function PriceTag({ price, oldPrice }: { price: number; oldPrice?: number }) {
  const t = useTranslations("Common");

  return (
    <p className="flex items-baseline gap-2">
      <span
        className={`text-lg font-bold ${oldPrice ? "text-green-600" : "text-gray-800 dark:text-foreground"}`}
      >
        {price} {t("currency")}
      </span>
      {oldPrice && (
        <span className="text-sm text-gray-500 line-through dark:text-muted-foreground">
          {oldPrice} {t("currency")}
        </span>
      )}
    </p>
  );
}
