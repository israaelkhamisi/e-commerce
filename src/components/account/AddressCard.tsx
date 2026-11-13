"use client";

import { useTranslations } from "next-intl";
import { Building2, MapPin, Phone, Trash2 } from "lucide-react";
import type { IAddress } from "src/interfaces/address.interface";
import { RemoveAddress } from "src/services/addresses.services";
import toast from "react-hot-toast";
import { useRouter } from "src/i18n/routing";

export default function AddressCard({ address }: { address: IAddress }) {
  const t = useTranslations("AccountPage");
const router = useRouter()
  async function handleDelete() {
    const res = await RemoveAddress(address._id)
    console.log(res)
    if(res.status == 'success'){
      toast.success('Address removed successfully')
      router.refresh()
    }else {
  toast.error(res.message);
}
   
  }

  return (
    <article className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600 dark:bg-green-950">
        <MapPin className="size-5" />
      </span>

      <div className="min-w-0 flex-1 space-y-1">
        <p className="font-bold text-gray-900 dark:text-gray-100">{address.name}</p>
        <p className="text-sm text-gray-500">{address.details}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <Phone className="size-3.5" />
            <span dir="ltr">{address.phone}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Building2 className="size-3.5" />
            {address.city}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleDelete}
        aria-label={t("delete")}
        className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition hover:bg-red-50 hover:text-red-500 dark:bg-gray-800"
      >
        <Trash2 className="size-4" />
      </button>
    </article>
  );
}
