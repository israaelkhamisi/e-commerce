import { useTranslations } from "next-intl";
import Container from "src/components/shared/Container";
import Icon from "src/components/shared/Icon";

const features = ["shipping", "returns", "payment", "support"] as const;

// "Free Shipping / Easy Returns / Secure Payment / 24/7 Support" strip above the footer
export default function FeaturesStrip() {
  const t = useTranslations("FeaturesStrip");

  return (
    <section className="border-y border-green-100 bg-green-50 py-6 dark:border-border dark:bg-card">
      <Container className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((key) => (
          <div key={key} className="flex items-center gap-3">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-green-100 dark:bg-muted">
              <Icon src={`/icons/features/${key}.svg`} width={22.5} height={18} />
            </span>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-foreground">{t(`${key}Title`)}</p>
              <p className="text-xs text-gray-500 dark:text-muted-foreground">{t(`${key}Text`)}</p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
