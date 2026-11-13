import { useTranslations } from "next-intl";
import { CreditCard, Wallet } from "lucide-react";
import type { PaymentMethod as PaymentMethodType } from "src/types/order.types";

const methods: { value: PaymentMethodType; icon: typeof Wallet; key: "cash" | "online" }[] = [
  { value: "cash", icon: Wallet, key: "cash" },
  { value: "card", icon: CreditCard, key: "online" },
];

export default function PaymentMethod() {
  const t = useTranslations("CheckoutPage");

  return (
    <fieldset className="space-y-3">
      <legend className="mb-2 font-semibold">{t("payment")}</legend>
      {methods.map(({ value, icon: Icon, key }) => (
        <label key={value} className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-4 has-checked:border-primary">
          <Icon className="size-5 text-primary" />
          <span className="flex-1 text-sm">
            <b>{t(key)}</b>
            <br />
            <span className="text-muted-foreground">{t(`${key}Text`)}</span>
          </span>
          <input type="radio" name="paymentMethod" value={value} defaultChecked={value === "cash"} />
        </label>
      ))}
    </fieldset>
  );
}
