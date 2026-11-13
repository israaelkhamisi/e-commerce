"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { LayoutGrid, List } from "lucide-react";
import { Button } from "src/components/ui/button";

export default function ViewToggle() {
  const t = useTranslations("SearchPage");
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="flex gap-1">
      <Button size="icon" variant={view === "grid" ? "default" : "outline"} aria-label={t("gridView")} onClick={() => setView("grid")}>
        <LayoutGrid />
      </Button>
      <Button size="icon" variant={view === "list" ? "default" : "outline"} aria-label={t("listView")} onClick={() => setView("list")}>
        <List />
      </Button>
    </div>
  );
}
