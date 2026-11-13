import { useTranslations } from "next-intl";
import { Link } from "src/i18n/routing";
import { Button } from "src/components/ui/button";

export default function CartSummary({ subtotal }: { subtotal: number }) {
  const t = useTranslations("CartPage");
  const tCommon = useTranslations("Common");

  return (
    <aside className="h-fit space-y-4 rounded-xl border border-border p-6">
      <h2 className="text-lg font-semibold">{t("summary")}</h2>
      <div className="flex justify-between text-sm">
        <span>{t("subtotal")}</span>
        <span>{subtotal} {tCommon("currency")}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>{t("shipping")}</span>
        <span className="text-primary">{t("free")}</span>
      </div>
      <div className="flex justify-between border-t border-border pt-4 font-bold">
        <span>{t("total")}</span>
        <span>{subtotal} {tCommon("currency")}</span>
      </div>
      <Button size="lg" className="w-full" render={<Link href="/checkout" />}>
        {t("checkout")}
      </Button>
      <Button size="lg" variant="outline" className="w-full" render={<Link href="/products" />}>
        {t("continueShopping")}
      </Button>
    </aside>
  );
}
