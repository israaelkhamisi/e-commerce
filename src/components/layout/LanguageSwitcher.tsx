"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "src/i18n/routing";

export default function LanguageSwitcher() {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const nextLocale = locale === "ar" ? "en" : "ar";

  function switchLocale() {
    router.replace(
      // @ts-expect-error -- params always match the current pathname
      { pathname, params },
      { locale: nextLocale },
    );
  }

  return (
    <button
      type="button"
      onClick={switchLocale}
      className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-muted"
    >
      {t("label")}
    </button>
  );
}
