import Icon from "src/components/shared/Icon";
import { cn } from "src/lib/utils";

// White card with an icon header, used by the profile and password forms
export default function SettingsCard({
  icon,
  iconBg,
  title,
  subtitle,
  children,
  footer,
}: {
  icon: string;
  iconBg: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="space-y-6 p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <span className={cn("flex size-14 shrink-0 items-center justify-center rounded-2xl", iconBg)}>
            <Icon src={icon} width={30} height={24} />
          </span>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-gray-100">{title}</h3>
            <p className="text-sm font-medium text-gray-500">{subtitle}</p>
          </div>
        </div>
        {children}
      </div>
      {footer}
    </section>
  );
}
