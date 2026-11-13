"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MapPin, Plus, X } from "lucide-react";
import { AddAddress} from 'src/services/addresses.services'
import {useRouter} from 'src/i18n/routing'
import toast from "react-hot-toast";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-transparent px-4 py-3 font-medium text-gray-700 outline-none placeholder:text-gray-400 focus:border-green-600 dark:border-gray-700 dark:text-gray-100";
const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-200";

export default function AddAddressButton({ label, big = false }: { label: string; big?: boolean }) {
  const t = useTranslations("AccountPage");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  
  

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
const name = form.get("name") as string;
const details = form.get("details") as string;
const phone = form.get("phone") as string;
const city = form.get("city") as string;
    const res = await  AddAddress(name ,details,phone,city)
    console.log(res);
    if(res.status == 'success'){
      toast.success("Address added");
      setOpen(false);
      router.refresh();

    } else {
  toast.error(res.message);
}
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`inline-flex items-center gap-2 rounded-xl bg-green-600 font-semibold text-white shadow-lg shadow-green-600/25 transition-colors hover:bg-green-700 ${
          big ? "px-8 py-4" : "px-6 py-3"
        }`}
      >
        <Plus className="size-5" />
        {label}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-3xl bg-white text-start shadow-xl dark:bg-gray-900"
          >
            <div className="flex items-center justify-between border-b border-gray-100 p-6 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-green-50 text-green-600 dark:bg-green-950">
                  <MapPin className="size-5" />
                </span>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100">{t("addNewAddress")}</h3>
                  <p className="text-sm text-gray-500">{t("addNewAddressText")}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t("cancel")}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-4 p-6">
              <div className="space-y-2">
                <label htmlFor="addr-name" className={labelClass}>{t("addressName")}</label>
                <input id="addr-name" name="name" placeholder={t("addressNamePlaceholder")} className={inputClass} />
              </div>
              <div className="space-y-2">
                <label htmlFor="addr-details" className={labelClass}>{t("addressDetails")}</label>
                <textarea
                  id="addr-details"
                  name="details"
                  rows={2}
                  placeholder={t("addressDetailsPlaceholder")}
                  className={`${inputClass} resize-none`}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="addr-phone" className={labelClass}>{t("phone")}</label>
                  <input id="addr-phone" name="phone" type="tel" dir="ltr" placeholder="01xxxxxxxxx" className={inputClass} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="addr-city" className={labelClass}>{t("city")}</label>
                  <input id="addr-city" name="city" placeholder={t("cityPlaceholder")} className={inputClass} />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-xl border border-gray-200 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  {t("cancel")}
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
                >
                  {t("saveAddress")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
