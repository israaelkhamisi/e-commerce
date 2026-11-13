"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Tag, X } from "lucide-react";
import { ApplyCopun } from "src/services/cart.services";
import toast from "react-hot-toast";
import { useRouter } from "src/i18n/routing";

export default function CouponBox() {
  const t = useTranslations("CartPage");
  const [open, setOpen] = useState(false);
  const [coupon, setCoupon] = useState("");
  const router = useRouter()

  async function handleApply(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const copun = await ApplyCopun(coupon)
    console.log(copun)
    if(copun.status == 'success'){
      toast.success("Coupon applied")
      router.refresh()

    }else {
       toast.error(copun.message) }
   
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 py-3 text-sm font-medium text-gray-600 transition hover:border-green-500 hover:text-green-600 dark:border-gray-700 dark:text-gray-300"
      >
        <Tag className="size-4" />
        {t("applyPromo")}
      </button>
    );
  }

  return (
    <form onSubmit={handleApply} className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
          <Tag className="size-4 text-green-600" />
          {t("applyPromo")}
        </span>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label={t("closePromo")}
          className="rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800"
        >
          <X className="size-4" />
        </button>
      </div>
      <div className="flex gap-2">
        <input
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder={t("promoPlaceholder")}
          className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-transparent px-4 py-3 text-sm font-medium uppercase text-gray-700 outline-none placeholder:normal-case placeholder:text-gray-400 focus:border-green-600 dark:border-gray-700 dark:text-gray-100"
        />
        <button
          type="submit"
          disabled={!coupon.trim()}
          className="rounded-xl bg-green-600 px-5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {t("apply")}
        </button>
      </div>
    </form>
  );
}
