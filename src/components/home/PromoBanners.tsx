import { useTranslations } from "next-intl";
import { Link } from "src/i18n/routing";
import Icon from "src/components/shared/Icon";

const banners = [
  {
    key: "deal",
    emoji: "🔥",
    gradient: "from-emerald-500 to-emerald-700",
    buttonText: "text-emerald-600",
    cta: "shopNow",
    arrow: "/icons/home/promo-arrow-emerald.svg",
  },
  {
    key: "new",
    emoji: "✨",
    gradient: "from-orange-400 to-rose-500",
    buttonText: "text-orange-500",
    cta: "explore",
    arrow: "/icons/home/promo-arrow-orange.svg",
  },
] as const;

export default function PromoBanners() {
  const t = useTranslations("HomePage");

  return (
    <section className="grid gap-6 md:grid-cols-2">
      {banners.map((banner) => (
        <div
          key={banner.key}
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-br p-8 text-white ${banner.gradient}`}
        >
          <span className="absolute -end-20 -top-20 size-40 rounded-full bg-white/10" />
          <span className="absolute -bottom-16 -start-16 size-32 rounded-full bg-white/10" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm font-medium">
              <span>{banner.emoji}</span>
              {t(`${banner.key}Badge`)}
            </span>
            <h3 className="mt-4 text-3xl font-bold leading-9">{t(`${banner.key}Title`)}</h3>
            <p className="mt-2 text-white/80">{t(`${banner.key}Text`)}</p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <span className="text-3xl font-bold leading-9">{t(`${banner.key}Discount`)}</span>
              <span className="text-sm text-white/70">
                {t("useCode")} <b className="font-bold text-white">{t(`${banner.key}Code`)}</b>
              </span>
            </div>
            <Link
              href="/products"
              className={`mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold transition hover:scale-105 ${banner.buttonText}`}
            >
              {t(banner.cta)}
              <Icon src={banner.arrow} width={20} height={16} className="rtl:-scale-x-100" />
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
}
