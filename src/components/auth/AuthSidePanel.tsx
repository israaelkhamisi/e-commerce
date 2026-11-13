import { useTranslations } from "next-intl";
import { ShoppingCart } from "lucide-react";

// Left side of the login/register/forgot screens (hidden on mobile)
export default function AuthSidePanel() {
  const t = useTranslations("AuthPage");

  return (
    <div className="hidden flex-col items-center justify-center gap-4 text-center lg:flex">
      <ShoppingCart className="size-24 text-primary" />
      <h2 className="text-3xl font-bold">{t("sideTitle")}</h2>
      <p className="max-w-sm text-muted-foreground">{t("sideText")}</p>
    </div>
  );
}
