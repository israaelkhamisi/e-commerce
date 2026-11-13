import Image from "next/image";
import { useTranslations } from "next-intl";
import Icon from "src/components/shared/Icon";

const features = [
  { icon: "/icons/auth/feature-star.svg", key: "premiumQuality" },
  { icon: "/icons/auth/feature-truck.svg", key: "fastDelivery" },
  { icon: "/icons/auth/feature-shield.svg", key: "secureShopping" },
] as const;

// Left side of the register screen: welcome text, perks and a review
export default function RegisterSidePanel() {
  const t = useTranslations("AuthPage");

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-4xl font-bold text-gray-700 dark:text-gray-100">
        {t.rich("registerSideTitle", {
          brand: (chunks) => <span className="text-green-600">{chunks}</span>,
        })}
      </h1>
      <p className="text-xl font-medium text-gray-700 dark:text-gray-300">
        {t("registerSideText")}
      </p>

      <ul className="space-y-6 py-6">
        {features.map((feature) => (
          <li key={feature.key} className="flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-green-200">
              <Icon src={feature.icon} width={22.5} height={18} />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100">
                {t(feature.key)}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">{t(`${feature.key}Text`)}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="space-y-4 rounded-md bg-card p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <Image
            src="/images/auth/review-avatar.png"
            alt=""
            width={48}
            height={48}
            className="size-12 rounded-full"
          />
          <div>
            <h3 className="font-medium text-gray-700 dark:text-gray-100">{t("reviewName")}</h3>
            <div className="flex pt-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <Icon key={i} src="/icons/auth/star-yellow.svg" width={20} height={16} />
              ))}
            </div>
          </div>
        </div>
        <p className="font-medium italic text-gray-600 dark:text-gray-300">{t("reviewText")}</p>
      </div>
    </div>
  );
}
