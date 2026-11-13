import { Link } from "src/i18n/routing";
import Icon from "./Icon";

export default function SectionTitle({
  title,
  highlight,
  linkLabel,
  href,
}: {
  title: string;
  highlight?: string;
  linkLabel?: string;
  href?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="h-8 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-emerald-500 to-emerald-700" />
        <h2 className="text-2xl font-bold leading-9 text-gray-800 sm:text-3xl dark:text-foreground">
          {title} {highlight && <span className="text-emerald-600">{highlight}</span>}
        </h2>
      </div>
      {href && linkLabel && (
        <Link
          href={href}
          className="flex shrink-0 items-center gap-2 font-medium text-green-600 hover:text-green-700"
        >
          {linkLabel}
          <Icon src="/icons/home/arrow-right-green.svg" width={20} height={16} className="rtl:-scale-x-100" />
        </Link>
      )}
    </div>
  );
}
