import Image from "next/image";
import { useTranslations } from "next-intl";
import Icon from "src/components/shared/Icon";

const perks = [
  { icon: "/icons/auth/truck.svg", key: "freeDelivery" },
  { icon: "/icons/auth/shield.svg", key: "securePayment" },
  { icon: "/icons/auth/clock.svg", key: "support247" },
] as const;

// Left side of the login screen: illustration + tagline (hidden on mobile)
export default function LoginSidePanel() {
  const t = useTranslations("AuthPage");

  return (
    <div className="hidden flex-col gap-6 lg:flex">
      <div className="relative h-96 overflow-hidden rounded-2xl shadow-lg">
        <Image
          src="/images/auth/login-cart.png"
          alt=""
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          priority
        />
      </div>
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          {t("loginSideTitle")}
        </h2>
        <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
          {t("loginSideText")}
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-8">
          {perks.map((perk) => (
            <li key={perk.key} className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <Icon src={perk.icon} width={17.5} height={14} />
              {t(perk.key)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
