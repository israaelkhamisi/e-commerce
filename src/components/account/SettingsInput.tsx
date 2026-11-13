import { cn } from "src/lib/utils";

// Label + input used in the settings forms (UI only)
export default function SettingsInput({
  label,
  name,
  hint,
  end,
  className,
  ...props
}: React.ComponentProps<"input"> & {
  label: string;
  name: string;
  hint?: string;
  end?: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          className={cn(
            "w-full rounded-xl border border-gray-200 bg-transparent px-4 py-3 font-medium text-gray-700 outline-none placeholder:text-gray-700/50 focus:border-green-600 dark:border-gray-700 dark:text-gray-100",
            end ? "pe-12" : undefined,
            className,
          )}
          {...props}
        />
        {end && <div className="absolute end-4 top-1/2 flex -translate-y-1/2">{end}</div>}
      </div>
      {hint && <p className="text-xs font-medium text-gray-500">{hint}</p>}
    </div>
  );
}
