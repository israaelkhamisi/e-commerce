import { useTranslations } from "next-intl";
import Icon from "src/components/shared/Icon";

const badges = [
  { icon: "/icons/reset/badge-envelope.svg", key: "emailVerification" },
  { icon: "/icons/reset/badge-shield.svg", key: "secureReset" },
  { icon: "/icons/reset/badge-lock.svg", key: "encrypted" },
] as const;

// Left side of the forgot / verify / reset screens (hidden on mobile)
export default function ResetSidePanel() {
  const t = useTranslations("AuthPage");

  return (
    <div className="hidden flex-col gap-6 lg:flex">
      <div className="relative flex h-96 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-green-50 via-green-50 to-gray-100 shadow-lg dark:from-gray-800 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute start-8 top-8 size-24 rounded-full bg-green-100/50" />
        <div className="absolute end-10 bottom-12 size-32 rounded-full bg-green-100/50" />
        <div className="absolute end-20 top-20 size-16 rounded-full bg-emerald-100/50" />

        <div className="relative flex flex-col items-center gap-5">
          <div className="flex size-28 rotate-3 items-center justify-center rounded-3xl bg-white shadow-xl">
            <div className="flex size-20 items-center justify-center rounded-2xl bg-green-100">
              <Icon src="/icons/reset/side-lock.svg" width={45} height={38} />
            </div>
          </div>
          <div className="flex gap-3">
            <span className="size-3 rounded-full bg-green-400" />
            <span className="size-3 rounded-full bg-green-500" />
            <span className="size-3 rounded-full bg-green-600" />
          </div>

          <div className="absolute -start-16 top-4 flex size-14 -rotate-12 items-center justify-center rounded-xl bg-white shadow-lg">
            <Icon src="/icons/reset/side-envelope.svg" width={25} height={20} />
          </div>
          <div className="absolute -end-16 top-8 flex size-14 rotate-12 items-center justify-center rounded-xl bg-white shadow-lg">
            <Icon src="/icons/reset/side-shield.svg" width={25} height={20} />
          </div>
        </div>
      </div>

      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          {t("resetSideTitle")}
        </h2>
        <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
          {t("resetSideText")}
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-8">
          {badges.map((badge) => (
            <li key={badge.key} className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <Icon src={badge.icon} width={17.5} height={14} />
              {t(badge.key)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
