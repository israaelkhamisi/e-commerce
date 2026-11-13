import { useLocale, useTranslations } from "next-intl";
import Icon from "src/components/shared/Icon";

export default function SearchBar() {
  const t = useTranslations("SearchBar");
  const locale = useLocale();

  // Plain GET form: submits to /search?q=...
  return (
    <form action={`/${locale}/search`} className="relative w-full max-w-[672px]">
      <input
        name="q"
        type="search"
        placeholder={t("placeholder")}
        className="w-full rounded-full border border-gray-200 bg-gray-50/50 py-3.5 ps-5 pe-12 text-sm font-medium text-gray-700 outline-none placeholder:text-gray-700/50 focus:border-green-600 dark:border-border dark:bg-muted dark:text-foreground"
      />
      <button
        type="submit"
        aria-label={t("submit")}
        className="absolute end-1.5 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-green-600 hover:bg-green-700"
      >
        <Icon src="/icons/header/search.svg" width={17.5} height={14} />
      </button>
    </form>
  );
}
