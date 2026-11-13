'use client'

import { useTranslations } from "next-intl";
import { Link } from "src/i18n/routing";
import Icon from "src/components/shared/Icon";
import AuthCard from "./AuthCard";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyResetCodeSchema, verifyResetCodetype } from "src/lib/verifyresetcode.schema";
import { verifyResetCode } from "src/lib/verifyresetcode.api";
import toast from "react-hot-toast";
import { useRouter } from "src/i18n/routing";



export default function VerifyCodeForm() {
  const t = useTranslations("AuthPage");
const router = useRouter()
  const { handleSubmit, control } = useForm<verifyResetCodetype >({
  defaultValues: {  resetCode: "" },
  resolver: zodResolver(verifyResetCodeSchema),
});
async function handleVerify(data: verifyResetCodetype) {
  const response = await verifyResetCode(data.resetCode);
if(response.status === 'Success'){
  toast.success("Code verified")
  router.push("/reset-password")
}else{
  toast.error(response.message);
}}
  return (
    <AuthCard title={t("verifyTitle")} subtitle={t("verifyText")} step={2}>
      <form className="space-y-6 " onSubmit={handleSubmit(handleVerify)}>
        <div className="space-y-2">
          <label htmlFor="resetCode" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
            {t("code")}
          </label>
          <Controller
  name="resetCode"
  control={control}
  render={({ field, fieldState }) => (
    <>
     <div className="relative">
            <Icon
              src="/icons/reset/code-shield.svg"
              width={20}
              height={16}
              className="absolute start-4 top-1/2 -translate-y-1/2"
            />
            <input
              id="resetCode"
              {...field}
              name="resetCode"
              inputMode="numeric"
              maxLength={6}
              placeholder="••••••"
              dir="ltr"
              className="w-full rounded-xl border-2 border-gray-200 bg-transparent px-[50px] py-3 text-center text-2xl font-medium tracking-[12px] text-gray-700 outline-none placeholder:text-gray-700/50 focus:border-green-600 dark:border-gray-700 dark:text-gray-100"
            />
          </div>
      {fieldState.error && (
        <p className="text-sm text-red-600">{fieldState.error.message}</p>
      )}
    </>
  )}
/>
        
        </div>

        <p className="text-center text-sm font-medium text-gray-500">
          {t("noCode")}{" "}
          <button type="button" className="font-semibold text-green-600">
            {t("resendCode")}
          </button>
        </p>

        <button
          type="submit"
          className="w-full rounded-xl bg-green-600 px-4 py-3 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-green-700"
        >
          {t("verify")}
        </button>

        <div className="text-center">
          <Link href="/forgot-password" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500">
            <Icon src="/icons/reset/arrow-left-gray.svg" width={15} height={12} className="rtl:rotate-180" />
            {t("changeEmail")}
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}
