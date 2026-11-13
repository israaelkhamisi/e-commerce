import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import ResetSidePanel from "src/components/auth/ResetSidePanel";
import ForgotPasswordForm from "src/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage({ params }: PageProps<"/[locale]/forgot-password">) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
      <ResetSidePanel />
      <ForgotPasswordForm />
    </div>
  );
}
