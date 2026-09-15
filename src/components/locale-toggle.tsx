"use client";

import { useLocale } from "@/components/locale-provider";
import { cn } from "@/lib/utils";

export function LocaleToggle({ className }: { className?: string }) {
  const { locale } = useLocale();
  const next = locale === "en" ? "TR" : "EN";

  return (
    <span
      className={cn(
        "font-semibold text-[11px] tracking-wide leading-none select-none",
        className
      )}
      aria-hidden
    >
      {next}
    </span>
  );
}
