import { useTranslations } from "next-intl";
import Container from "src/components/shared/Container";
import Icon from "src/components/shared/Icon";

const services = [
  { key: "shipping", bg: "bg-red-50" },
  { key: "payment", bg: "bg-emerald-50" },
  { key: "returns", bg: "bg-gray-100" },
  { key: "support", bg: "bg-gray-50" },
] as const;

// The 4 service cards right under the hero slider
export default function ServicesBar() {
  const t = useTranslations("HomePage");

  return (
    <section className="bg-gray-50 py-8 dark:bg-muted/40">
      <Container className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map(({ key, bg }) => (
          <div key={key} className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm dark:bg-card">
            <span className={`flex size-12 shrink-0 items-center justify-center rounded-full ${bg} dark:bg-muted`}>
              <Icon src={`/icons/home/service-${key}.svg`} width={25} height={20} />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-gray-800 dark:text-foreground">{t(`services.${key}Title`)}</h3>
              <p className="text-xs text-gray-500 dark:text-muted-foreground">{t(`services.${key}Text`)}</p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
