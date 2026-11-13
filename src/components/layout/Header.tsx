
import { useTranslations } from "next-intl";
import { Link } from "src/i18n/routing";
import Container from "src/components/shared/Container";
import Icon from "src/components/shared/Icon";
import TopBar from "./TopBar";
import SearchBar from "./SearchBar";
import MainNav from "./MainNav";
import UserMenu from "./UserMenu";
import { useSession } from "next-auth/react";
import CartIcon from "./CartIcon";
import WishlistIcon from "./WishlistIcon";


const iconLinkClass = "rounded-full p-2.5 transition hover:bg-gray-100 dark:hover:bg-muted";

export default function Header() {
  const t = useTranslations("Header");

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm dark:bg-background">
      <TopBar />
      <Container className="flex h-[72px] items-center justify-between gap-8">
        <Link href="/" aria-label={t("brand")} className="shrink-0">
          <Icon src="/images/freshcart-logo.svg" width={165.16} height={32} alt={t("brand")} />
        </Link>
        <div className="hidden flex-1 justify-center md:flex">
          <SearchBar />
        </div>
        <MainNav />
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/"
            className="me-2 hidden items-center gap-2 border-e border-gray-200 pe-3 xl:flex dark:border-border"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-green-50 dark:bg-muted">
              <Icon src="/icons/header/headset.svg" width={20} height={16} />
            </span>
            <span className="text-xs leading-4">
              <span className="block text-gray-400">{t("support")}</span>
              <span className="block font-semibold text-gray-700 dark:text-foreground">{t("supportHours")}</span>
            </span>
          </Link>
          <WishlistIcon />
          <CartIcon/>
          <UserMenu />
        </div>
      </Container>
    </header>
  );
}
