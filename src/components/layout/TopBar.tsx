'use client'

import { useTranslations, useLocale  } from "next-intl";
import { Link } from "src/i18n/routing";
import Container from "src/components/shared/Container";
import Icon from "src/components/shared/Icon";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import { useSession, signOut } from "next-auth/react";


const itemClass = "flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-muted-foreground";
const accountClass = "flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-green-600 dark:text-foreground";


export default function TopBar({ userName }: { userName?: string }) {
  const t = useTranslations("TopBar");
  const locale = useLocale();

const {status,data}=useSession()
console.log(data)
function handlesignout(){
  signOut({ callbackUrl: `/${locale}/login` })
}
  return (
    <div className="hidden border-b border-gray-100 lg:block dark:border-border">
      <Container className="flex h-10 items-center justify-between">
        <div className="flex items-center gap-6">
          <span className={itemClass}>
            <Icon src="/icons/topbar/truck.svg" width={15} height={12} /> {t("freeShipping")}
          </span>
          <span className={itemClass}>
            <Icon src="/icons/topbar/gift.svg" width={15} height={12} /> {t("newArrivals")}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <a href={`tel:${t("phone")}`} className={`${itemClass} gap-1.5`} dir="ltr">
              <Icon src="/icons/topbar/phone.svg" width={15} height={12} /> {t("phone")}
            </a>
            <a href={`mailto:${t("email")}`} className={`${itemClass} gap-1.5 hover:text-green-600`}>
              <Icon src="/icons/topbar/envelope.svg" width={15} height={12} /> {t("email")}
            </a>
          </div>
          <span className="h-4 w-px bg-gray-200 dark:bg-border" />
          <div className="flex items-center gap-4">
            {status === 'authenticated' ? (
              <>
                <Link href="/profile" className={accountClass}>
                  <Icon src="/icons/topbar/user.svg" width={15} height={12} /> {data?.user?.name}
                </Link>
                <button type="button" className={accountClass} onClick={handlesignout}>
                  <Icon src="/icons/topbar/sign-out.svg" width={15} height={12} /> {t("signOut")}
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className={accountClass}>
                  <Icon src="/icons/topbar/user.svg" width={15} height={12} /> {t("signIn")}
                </Link>
                <Link href="/register" className={accountClass}>
                  {t("signUp")}
                </Link>
              </>
            )}
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </div>
  );
}
