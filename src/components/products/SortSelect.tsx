import { useTranslations } from "next-intl";

export default function SortSelect() {
  const t = useTranslations("SearchPage");

  return (
    <label className="flex items-center gap-2 text-sm">
      {t("sortBy")}
      <select name="sort" className="h-9 rounded-md border border-input bg-background px-2">
        <option value="">{t("relevance")}</option>
        <option value="price">{t("priceLowHigh")}</option>
        <option value="-price">{t("priceHighLow")}</option>
      </select>
    </label>
  );
}
