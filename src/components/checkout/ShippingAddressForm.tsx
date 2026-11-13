import { useTranslations } from "next-intl";
import FormField from "src/components/shared/FormField";

export default function ShippingAddressForm() {
  const t = useTranslations("CheckoutPage");

  return (
    <div className="space-y-4">
      <FormField label={t("city")} name="city" />
      <FormField label={t("street")} name="details" />
      <FormField label={t("phone")} name="phone" type="tel" placeholder="01xxxxxxxxx" />
    </div>
  );
}
