'use client'
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { Link } from "src/i18n/routing";
import Icon from "src/components/shared/Icon";
import AuthCard from "./AuthCard";
import IconInput from "./IconInput";
import { Controller, useForm } from "react-hook-form";
import { forgotPasswordSchema,ForgotPasswordType} from 'src/lib/forgotpassword.schema'
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPassword } from "src/lib/forgotpassword.api";
import { useRouter } from "src/i18n/routing";


export default function ForgotPasswordForm() {
  const t = useTranslations("AuthPage");
  const router = useRouter();
  const { handleSubmit, control } = useForm<ForgotPasswordType>({
  defaultValues: { email: "" },
  resolver: zodResolver(forgotPasswordSchema),
});
async function handleForgot(data: ForgotPasswordType) {
  const response = await forgotPassword(data.email);
if (response.statusMsg === "success") {
  toast.success(response.message);

  router.push("/verify-code");
} else {
  toast.error(response.message);
}
}
  return (
    <AuthCard title={t("forgotTitle")} subtitle={t("forgotText")} step={1}>
      <form className="space-y-6" onSubmit={handleSubmit(handleForgot)}>
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
            {t("emailAddress")}
          </label>
       <Controller
  name="email"
  control={control}
  render={({ field, fieldState }) => (
    <>
      <IconInput
        {...field}
        type="email"
        placeholder={t("forgotEmailPlaceholder")}
        icon="/icons/auth/envelope.svg"
      />
      {fieldState.error && (
        <p className="text-sm text-red-600">{fieldState.error.message}</p>
      )}
    </>
  )}
/>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-green-600 px-4 py-3 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-green-700"
        >
          {t("sendCode")}
        </button>

        <div className="text-center">
          <Link href="/login" className="inline-flex items-center gap-2 text-sm font-medium text-green-600">
            <Icon src="/icons/reset/arrow-left-green.svg" width={15} height={12} className="rtl:rotate-180" />
            {t("backToLogin")}
          </Link>
        </div>
      </form>

      <p className="border-t border-gray-100 pt-6 text-center font-medium text-gray-600 dark:border-gray-800 dark:text-gray-300">
        {t("rememberPassword")}{" "}
        <Link href="/login" className="font-semibold text-green-600">
          {t("signIn")}
        </Link>
      </p>
    </AuthCard>
  );
}
