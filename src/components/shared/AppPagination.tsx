import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "src/components/ui/button";

export default function AppPagination({ current, total }: { current: number; total: number }) {
  const t = useTranslations("Common");

  return (
    <nav className="flex items-center justify-center gap-2" aria-label="pagination">
      <Button variant="outline" size="icon" aria-label={t("previous")}>
        <ChevronLeft className="rtl:rotate-180" />
      </Button>
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
        <Button key={n} variant={n === current ? "default" : "outline"} size="icon">
          {n}
        </Button>
      ))}
      <Button variant="outline" size="icon" aria-label={t("next")}>
        <ChevronRight className="rtl:rotate-180" />
      </Button>
    </nav>
  );
}
