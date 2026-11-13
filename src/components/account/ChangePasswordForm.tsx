"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Icon from "src/components/shared/Icon";
import SettingsCard from "./SettingsCard";
import SettingsInput from "./SettingsInput";
import { changePasswordSchema, changePasswordtype } from "src/lib/changepassword.schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangePassword } from "src/lib/changepassword.api";
const fields = [
  { name: "currentPassword", label: "currentPassword", placeholder: "currentPasswordPlaceholder" },
  { name: "password", label: "newPassword", placeholder: "newPasswordPlaceholder", hint: "passwordHint" },
  { name: "rePassword", label: "confirmPassword", placeholder: "confirmPasswordPlaceholder" },
] as const;

// Change password card (UI only)
export default function ChangePasswordForm() {
  const t = useTranslations("AccountPage");
  const [visible, setVisible] = useState<string[]>([]);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const {handleSubmit,control}=useForm<changePasswordtype>({
       defaultValues: {
      currentPassword :'',
      password:'',
      rePassword:''
    },
    resolver: zodResolver(changePasswordSchema),
    })
async function handleChangePassword(data:changePasswordtype) {
    const response = await ChangePassword(data);
if (response.message === "success") {
  setMsg({ type: "success", text: "Password changed successfully" });
} else {
  setMsg({ type: "error", text: response.errors?.msg || response.message });
}
}

  function toggle(name: string) {
    setVisible((v) => (v.includes(name) ? v.filter((n) => n !== name) : [...v, name]));
  }

  return (
    <SettingsCard
      icon="/icons/account/lock-orange.svg"
      iconBg="bg-amber-100"
      title={t("changePassword")}
      subtitle={t("changePasswordText")}
    >
      <form className="space-y-5" onSubmit={handleSubmit(handleChangePassword)}>
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
      {fields.map((f) => (
  <Controller
    key={f.name}
    name={f.name}
    control={control}
    render={({ field, fieldState }) => (
      <>
        <SettingsInput
          {...field}
          type={visible.includes(f.name) ? "text" : "password"}
          label={t(f.label)}
          placeholder={t(f.placeholder)}
          hint={"hint" in f ? t(f.hint) : undefined}
          end={
            <button type="button" aria-label={t("showPassword")} onClick={() => toggle(f.name)}>
              <Icon src="/icons/account/eye.svg" width={20} height={16} />
            </button>
          }
        />
        {fieldState.error && (
          <p className="text-sm text-red-500">{fieldState.error.message}</p>
        )}
      </>
    )}
  />
))}
        <div className="pt-4">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-[#e17100] px-6 py-3 font-semibold text-white shadow-lg shadow-[#e17100]/25 transition-colors hover:bg-orange-700"
          >
            <Icon src="/icons/account/lock-white.svg" width={20} height={17} />
            {t("changePassword")}
          </button>
        </div>
      </form>
    </SettingsCard>
  );
}
