"use client";
import { useTranslations } from "next-intl";
import { Check, MapPin, Phone, Plus } from "lucide-react";
import type { IAddress } from "src/interfaces/address.interface";

// List of the user's saved addresses inside Checkout.
// selectedId = "new" means the user will type a different address by hand.
export default function SavedAddresses({
  addresses,
  selectedId,
  onSelect,
}: {
  addresses: IAddress[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const t = useTranslations("CheckoutPage");

  return (
    <div className="space-y-3">
      <p className="font-medium text-gray-900 dark:text-gray-100">{t("savedAddresses")}</p>

      <div className="grid gap-3 sm:grid-cols-2">
        {addresses.map((address) => {
          const selected = selectedId === address._id;
          return (
            <button
              key={address._id}
              type="button"
              onClick={() => onSelect(address._id)}
              className={`flex items-start gap-3 rounded-xl border-2 p-4 text-start transition ${
                selected
                  ? "border-green-500 bg-green-50 dark:bg-green-950"
                  : "border-gray-200 hover:border-green-300 dark:border-gray-700"
              }`}
            >
              <span
                className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
                  selected ? "bg-green-600 text-white" : "bg-gray-100 text-gray-500 dark:bg-gray-800"
                }`}
              >
                <MapPin className="size-5" />
              </span>
              <span className="min-w-0 flex-1 space-y-1">
                <span className="block font-semibold text-gray-900 dark:text-gray-100">{address.name}</span>
                <span className="block truncate text-sm text-gray-500">
                  {address.details} - {address.city}
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-500" dir="ltr">
                  <Phone className="size-3.5" /> {address.phone}
                </span>
              </span>
              <span
                className={`flex size-6 shrink-0 items-center justify-center rounded-full border-2 ${
                  selected ? "border-green-600 bg-green-600 text-white" : "border-gray-300 dark:border-gray-600"
                }`}
              >
                {selected && <Check className="size-3.5" />}
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => onSelect("new")}
        className={`flex w-full items-center gap-3 rounded-xl border-2 border-dashed p-4 text-start font-medium transition ${
          selectedId === "new"
            ? "border-green-500 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
            : "border-gray-300 text-gray-600 hover:border-green-300 dark:border-gray-700 dark:text-gray-300"
        }`}
      >
        <Plus className="size-5" />
        {t("newAddress")}
      </button>
    </div>
  );
}
