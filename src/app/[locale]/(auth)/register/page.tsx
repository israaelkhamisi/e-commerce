import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import RegisterSidePanel from "src/components/auth/RegisterSidePanel";
import RegisterForm from "src/components/auth/RegisterForm";

export default function RegisterPage({ params }: PageProps<"/[locale]/register">) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-2">
      <RegisterSidePanel />
      <RegisterForm />
    </div>
  );
}
