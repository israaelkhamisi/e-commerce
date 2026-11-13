import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import ResetSidePanel from "src/components/auth/ResetSidePanel";
import VerifyCodeForm from "src/components/auth/VerifyCodeForm";

export default function VerifyCodePage({ params }: PageProps<"/[locale]/verify-code">) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
      <ResetSidePanel />
      <VerifyCodeForm />
    </div>
  );
}
