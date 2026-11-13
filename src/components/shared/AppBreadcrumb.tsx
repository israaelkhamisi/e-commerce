import { Fragment } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "src/i18n/routing";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function AppBreadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="breadcrumb" className="flex flex-wrap items-center gap-1 text-sm opacity-80">
      {items.map((item, i) => (
        <Fragment key={item.label}>
          {i > 0 && <ChevronRight className="size-3.5 rtl:rotate-180" />}
          {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
        </Fragment>
      ))}
    </nav>
  );
}
