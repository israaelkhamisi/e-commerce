"use client";

import { useTranslations } from "next-intl";
import { Minus, Plus } from "lucide-react";
import { Button } from "src/components/ui/button";
import { useQuantity } from "src/hooks/useQuantity";

export default function QuantitySelector({ initial = 1, max }: { initial?: number; max?: number }) {
  const t = useTranslations("Common");
  const { quantity, increase, decrease } = useQuantity(initial, max);

  return (
    <div className="inline-flex items-center rounded-md border border-border">
      <Button variant="ghost" size="icon" aria-label={t("decrease")} onClick={decrease}>
        <Minus />
      </Button>
      <span className="w-8 text-center text-sm">{quantity}</span>
      <Button variant="ghost" size="icon" aria-label={t("increase")} onClick={increase}>
        <Plus />
      </Button>
    </div>
  );
}
