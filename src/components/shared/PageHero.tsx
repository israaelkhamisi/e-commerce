import { useTranslations } from "next-intl";
import type { LucideIcon } from "lucide-react";
import Container from "./Container";
import AppBreadcrumb from "./AppBreadcrumb";

// Green gradient header used by Categories, Brands, Products and My Account
export default function PageHero({
  title,
  subtitle,
  icon: Icon,
}: {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
}) {
  const t = useTranslations("Common");

  return (
    <section className="bg-gradient-to-br from-primary to-primary/70 py-10 text-primary-foreground">
      <Container className="space-y-4">
        <AppBreadcrumb items={[{ label: t("home"), href: "/" }, { label: title }]} />
        <div className="flex items-center gap-4">
          {Icon && (
            <span className="rounded-xl bg-white/20 p-3">
              <Icon className="size-7" />
            </span>
          )}
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            {subtitle && <p className="opacity-90">{subtitle}</p>}
          </div>
        </div>
      </Container>
    </section>
  );
}
