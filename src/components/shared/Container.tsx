import { cn } from "src/lib/utils";

// Same as the design's "container mx-auto px-4" (1536px max on 2xl screens)
export default function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("container mx-auto px-4", className)}>
      {children}
    </div>
  );
}
