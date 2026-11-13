import Icon from "src/components/shared/Icon";
import { cn } from "src/lib/utils";

// Icon of each step: [upcoming, current, done]
const steps = [
  { upcoming: "", current: "/icons/reset/step-envelope.svg" },
  { upcoming: "/icons/reset/step-key-gray.svg", current: "/icons/reset/step-key.svg" },
  { upcoming: "/icons/reset/step-lock-gray.svg", current: "/icons/reset/step-lock.svg" },
];

// 3-step progress: email -> code -> new password
export default function ResetSteps({ current }: { current: 1 | 2 | 3 }) {
  return (
    <div dir="ltr" className="flex items-center justify-center">
      {steps.map((step, i) => {
        const number = i + 1;
        const done = number < current;
        const active = number === current;

        return (
          <div key={number} className="flex items-center">
            <div
              className={cn(
                "flex size-10 items-center justify-center rounded-full",
                done || active ? "bg-green-600" : "bg-gray-100 dark:bg-gray-800",
                active && "ring-4 ring-green-100",
              )}
            >
              {done ? (
                <Icon src="/icons/reset/step-check.svg" width={17.5} height={14} />
              ) : (
                <Icon
                  src={active ? step.current : step.upcoming}
                  width={15}
                  height={number === 3 ? 13 : 12}
                />
              )}
            </div>
            {number < steps.length && (
              <span
                className={cn(
                  "mx-2 h-0.5 w-16",
                  number < current ? "bg-green-600" : "bg-gray-200 dark:bg-gray-700",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
