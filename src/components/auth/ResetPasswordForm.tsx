"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Icon from "src/components/shared/Icon";
import AuthCard from "./AuthCard";
import IconInput from "./IconInput";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "src/i18n/routing";
import {resetPasswordSchema,resetPasswordtype} from 'src/lib/resetpassword.schema'
import { resetPassword} from 'src/lib/resetpassword.api'


// Step 3: choose the new password (UI only)
export default function ResetPasswordForm() {
  const t = useTranslations("AuthPage");
  const router =useRouter()
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [done, setDone] = useState(false);
  const { handleSubmit, control } = useForm<resetPasswordtype>({
  defaultValues: {
     newPassword:'',
    rePassword:''
  },
  resolver: zodResolver(resetPasswordSchema),
});
async function handlereset(data: resetPasswordtype) {
  const response = await  resetPassword(data.newPassword);
  console.log(response);
if(response.token){
  toast.success("Password changed successfully")
setDone(true);
}else{
  toast.error(response.message);
}}
if (done) {
  return (
    <div className="rounded-3xl bg-white p-10 text-center shadow-xl dark:bg-gray-900">
      <h2 className="text-3xl font-bold">
        <span className="text-green-600">Fresh</span>Cart
      </h2>
      <div className="mx-auto mt-8 flex size-24 items-center justify-center rounded-full bg-green-100 text-5xl text-green-600">
        ✓
      </div>
      <h3 className="mt-8 text-2xl font-bold">Password Reset!</h3>
      <p className="mt-3 text-gray-600">
        Your password has been successfully reset. You can now sign in with your new password.
      </p>
      <button
        type="button"
        onClick={() => router.push("/login")}
        className="mt-8 w-full rounded-xl bg-green-600 px-4 py-3 text-lg font-semibold text-white hover:bg-green-700"
      >
        Back to Sign In
      </button>
    </div>
  );
}
  return (
    <AuthCard title={t("resetTitle")} subtitle={t("resetText")} step={3}>
      <form className="space-y-6" onSubmit={handleSubmit(handlereset)}>
        <div className="space-y-2">
          <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
            {t("newPassword")}
          </label>
       <Controller
  name="newPassword"
  control={control}
  render={({ field, fieldState }) => (
    <>
      <IconInput
        {...field}
        type={showPassword ? "text" : "password"}
        placeholder={t("newPasswordPlaceholder")}
        icon="/icons/auth/lock.svg"
        end={
          <button type="button" aria-label={t("showPassword")} onClick={() => setShowPassword((s) => !s)}>
            <Icon src="/icons/auth/eye.svg" width={20} height={16} />
          </button>
        }
      />
      {fieldState.error && (
        <p className="text-sm text-red-600">{fieldState.error.message}</p>
      )}
    </>
  )}
/>
        </div>

        <div className="space-y-2">
          <label htmlFor="rePassword" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
            {t("rePassword")}
          </label>
       <Controller
  name="rePassword"
  control={control}
  render={({ field, fieldState }) => (
    <>
      <IconInput
        {...field}
        type={showRePassword ? "text" : "password"}
        placeholder={t("confirmNewPasswordPlaceholder")}
        icon="/icons/auth/lock.svg"
        end={
          <button type="button" aria-label={t("showPassword")} onClick={() => setShowRePassword((s) => !s)}>
            <Icon src="/icons/auth/eye.svg" width={20} height={16} />
          </button>
        }
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
          {t("reset")}
        </button>
      </form>
    </AuthCard>
  );
}
