import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import LoginSidePanel from "src/components/auth/LoginSidePanel";
import LoginForm from "src/components/auth/LoginForm";

export default function LoginPage({ params }: PageProps<"/[locale]/login">) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
      <LoginSidePanel />
      <LoginForm />
    </div>
  );
}
