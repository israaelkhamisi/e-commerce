import { useTranslations } from "next-intl";
import { MapPin } from "lucide-react";
import AddAddressButton from "./AddAddressButton";

// Empty state shown when the user has no saved addresses
export default function AddressesEmpty() {
  const t = useTranslations("AccountPage");

  return (
    <section className="flex flex-col items-center rounded-3xl border border-gray-100 bg-white px-6 py-14 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <span className="flex size-24 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
        <MapPin className="size-10 fill-gray-400 text-gray-100 dark:text-gray-800" />
      </span>
      <h3 className="mt-8 text-xl font-bold text-gray-900 dark:text-gray-100">{t("noAddresses")}</h3>
      <p className="mt-3 mb-8 max-w-md text-gray-500">{t("noAddressesText")}</p>
      <AddAddressButton label={t("addFirstAddress")} big />
    </section>
  );
}
