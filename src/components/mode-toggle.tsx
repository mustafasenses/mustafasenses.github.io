"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

export function ModeToggle({ className }: { className?: string }) {
  return (
    <span className={cn("relative block size-full", className)} aria-hidden>
      <SunIcon className="size-full dark:hidden" />
      <MoonIcon className="hidden size-full dark:block" />
    </span>
  );
}
