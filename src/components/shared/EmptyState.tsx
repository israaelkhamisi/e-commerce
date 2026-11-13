import { Package } from "lucide-react";

export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-16 text-muted-foreground">
      <Package className="size-10" />
      <p>{message}</p>
    </div>
  );
}
