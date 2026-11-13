import { useTranslations } from "next-intl";
import { User } from "lucide-react";
import Container from "src/components/shared/Container";
import PageHero from "src/components/shared/PageHero";
import AccountSidebar from "src/components/account/AccountSidebar";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function ProfileLayout({ children, params }: LayoutProps<"/[locale]/profile">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("AccountPage");
  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} icon={User} />
      <Container className="flex flex-col gap-8 py-8 lg:flex-row">
        <AccountSidebar />
        <div className="flex-1 space-y-6">{children}</div>
      </Container>
    </>
  );
}
