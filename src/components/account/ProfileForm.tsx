'use client'
import { useTranslations } from "next-intl";
import { updatemeSchema,updatemetype } from "src/lib/updateme.schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateMe } from "src/lib/updateme.api";
import toast from "react-hot-toast";
import Icon from "src/components/shared/Icon";
import SettingsCard from "./SettingsCard";
import SettingsInput from "./SettingsInput";
import { useState } from "react"

export default function ProfileForm({ userId, role }: { userId?: string; role?: string }) {
  const t = useTranslations("AccountPage");
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const {handleSubmit,control}=useForm<updatemetype>({
     defaultValues: {
     name:'',
    email:'',
    phone:''
  },
  resolver: zodResolver(updatemeSchema),
  })
  async function handleUpdate(data:updatemetype) {
    const response = await updateMe(data);
if (response.message === "success") {
  setMsg({ type: "success", text: "Profile updated successfully" });
} else {
  setMsg({ type: "error", text: response.errors?.msg || response.message });
}
}

  return (
    <SettingsCard
      icon="/icons/account/user.svg"
      iconBg="bg-green-100"
      title={t("profileInfo")}
      subtitle={t("profileInfoText")}
      footer={
        <div className="space-y-4 bg-gray-50 p-6 sm:p-8 dark:bg-gray-800/50">
          <h3 className="font-bold text-gray-900 dark:text-gray-100">{t("accountInfo")}</h3>
          <dl className="space-y-3 text-sm font-medium">
            <div className="flex items-center justify-between">
              <dt className="text-gray-500">{t("userId")}</dt>
              <dd className="font-mono text-gray-700 dark:text-gray-200">{userId ?? "_"}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-gray-500">{t("role")}</dt>
            <dd className="rounded-lg bg-green-100 px-3 py-1 text-green-700 capitalize">{role ?? "user"}</dd>
            </div>
          </dl>
        </div>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit(handleUpdate)}>
        {msg && (
  <div
    className={
      msg.type === "success"
        ? "rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-green-700"
        : "rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-600"
    }
  >
    {msg.text}
  </div>
)}
       <Controller
  name="name"
  
  control={control}
  render={({ field, fieldState }) => (
    <>
      <SettingsInput
        {...field}
          type="text"
        label={t("fullName")}
        placeholder={t("fullNamePlaceholder")}
      />
      {fieldState.error && (
        <p className="text-sm text-red-500">{fieldState.error.message}</p>
      )}
    </>
  )}
/>
        <Controller
  name="email"

  control={control}
  render={({ field, fieldState }) => (
    <>
      <SettingsInput
        type="email"
        {...field}
        label={t("email")}
        placeholder={t("emailPlaceholder")}
      />
      {fieldState.error && (
        <p className="text-sm text-red-500">{fieldState.error.message}</p>
      )}
    </>
  )}
/>
<Controller

  name="phone"

  control={control}
  render={({ field, fieldState }) => (
    <>
      <SettingsInput
         type="tel"
        {...field}
        label={t("phone")}
        placeholder={("01xxxxxxxxx" )}
      />
      {fieldState.error && (
        <p className="text-sm text-red-500">{fieldState.error.message}</p>
      )}
    </>
  )}
/>
     
        <div className="pt-4">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white shadow-lg shadow-green-600/25 transition-colors hover:bg-green-700"
          >
            <Icon src="/icons/account/save.svg" width={20} height={16} />
            {t("save")}
          </button>
        </div>
      </form>
    </SettingsCard>
  );

 }