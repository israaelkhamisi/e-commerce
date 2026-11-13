"use client";

import { useTranslations } from "next-intl";
import Icon from "src/components/shared/Icon";
import { Link, usePathname } from "src/i18n/routing";
import { cn } from "src/lib/utils";

const links = [
  { href: "/profile/addresses", icon: "pin", key: "addresses" },
  { href: "/profile/settings", icon: "gear", key: "settings" },
] as const;

export default function AccountSidebar() {
  const t = useTranslations("AccountPage");
  const pathname = usePathname();

  return (
    <aside className="h-fit w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:w-72 dark:border-gray-800 dark:bg-gray-900">
      <p className="border-b border-gray-100 p-4 font-bold text-gray-900 dark:border-gray-800 dark:text-gray-100">
        {t("title")}
      </p>
      <nav className="p-2">
        {links.map(({ href, icon, key }) => {
          const active = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-colors",
                active ? "bg-green-50 text-green-700 dark:bg-green-950" : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800",
              )}
            >
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-lg",
                  active ? "bg-green-500" : "bg-gray-100 dark:bg-gray-800",
                )}
              >
                <Icon
                  src={`/icons/account/${icon}${active ? "-white" : ""}.svg`}
                  width={17.5}
                  height={14}
                />
              </span>
              <span className="flex-1">{t(key)}</span>
              <Icon
                src={`/icons/account/chevron${active ? "-green" : ""}.svg`}
                width={15}
                height={12}
                className="rtl:rotate-180"
              />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
