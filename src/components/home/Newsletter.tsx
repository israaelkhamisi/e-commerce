import { useTranslations } from "next-intl";
import Icon from "src/components/shared/Icon";

const perks = [
  { key: "perkFresh", icon: "/icons/home/perk-leaf.svg" },
  { key: "perkDelivery", icon: "/icons/home/perk-truck.svg" },
  { key: "perkDeals", icon: "/icons/home/perk-tag.svg" },
] as const;

export default function Newsletter() {
  const t = useTranslations("HomePage");

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex items-center gap-4">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30">
          <Icon src="/icons/home/newsletter-envelope.svg" width={25} height={20} />
        </span>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-600">{t("newsletterLabel")}</h3>
          <p className="text-xs text-gray-500 dark:text-muted-foreground">{t("newsletterSubscribers")}</p>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-3xl font-bold leading-tight text-gray-900 lg:text-4xl lg:leading-[49.5px] dark:text-foreground">
          {t("newsletterTitle")} <span className="text-emerald-600">{t("newsletterHighlight")}</span>
        </h2>
        <p className="text-lg text-gray-500 dark:text-muted-foreground">{t("newsletterText")}</p>
      </div>

      <div className="flex flex-wrap gap-3">
        {perks.map(({ key, icon }) => (
          <span
            key={key}
            className="flex items-center gap-2.5 rounded-full border border-emerald-100 bg-white/80 px-4 py-2.5 shadow-sm backdrop-blur-sm dark:border-border dark:bg-card"
          >
            <span className="flex size-7 items-center justify-center rounded-full bg-emerald-100">
              <Icon src={icon} width={15} height={12} />
            </span>
            <span className="text-sm font-medium text-gray-700 dark:text-foreground">{t(key)}</span>
          </span>
        ))}
      </div>

      <form className="space-y-3 pt-2">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            name="email"
            required
            placeholder={t("emailPlaceholder")}
            aria-label={t("emailPlaceholder")}
            className="min-w-0 flex-1 rounded-2xl border-2 border-gray-200 bg-white px-5 py-[18px] text-gray-700 shadow-sm outline-none placeholder:text-gray-400 focus:border-emerald-500 dark:border-border dark:bg-background dark:text-foreground"
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 py-[18px] font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:brightness-110"
          >
            {t("subscribe")}
            <Icon src="/icons/home/subscribe-arrow.svg" width={17.5} height={14} className="rtl:-scale-x-100" />
          </button>
        </div>
        <p className="ps-1 text-xs text-gray-400">{t("newsletterNote")}</p>
      </form>
    </div>
  );
}
