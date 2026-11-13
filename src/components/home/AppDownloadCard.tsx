import { useTranslations } from "next-intl";
import Icon from "src/components/shared/Icon";

const stores = [
  { icon: "/icons/home/apple.svg", label: "downloadOn", name: "appStore" },
  { icon: "/icons/home/google-play.svg", label: "getItOn", name: "googlePlay" },
] as const;

export default function AppDownloadCard() {
  const t = useTranslations("HomePage");

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <span className="absolute end-0 top-0 size-32 rounded-full bg-emerald-500/20 blur-[20px]" />
      <span className="absolute bottom-0 start-0 size-24 rounded-full bg-teal-500/20 blur-[20px]" />
      <div className="relative">
        <span className="inline-block rounded-full border border-emerald-500/30 bg-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-emerald-400">
          {t("appBadge")}
        </span>
        <h3 className="mt-[18px] text-2xl font-bold leading-[30px] text-white">{t("appTitle")}</h3>
        <p className="mt-[19px] text-sm leading-[22.75px] text-gray-400">{t("appText")}</p>
        <div className="mt-5 space-y-3 pt-2">
          {stores.map((store) => (
            <a
              key={store.name}
              href="#"
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm transition hover:bg-white/20"
            >
              <Icon src={store.icon} width={25} height={20} />
              <span>
                <span className="-mb-0.5 block text-[10px] font-medium uppercase leading-[15px] tracking-[0.25px] text-gray-400">
                  {t(store.label)}
                </span>
                <span className="block text-sm font-semibold text-white">{t(store.name)}</span>
              </span>
            </a>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 pt-2 text-sm">
          <span className="text-yellow-400">★★★★★</span>
          <span className="text-gray-400">{t("appRating")}</span>
        </div>
      </div>
    </div>
  );
}
