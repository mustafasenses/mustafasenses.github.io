"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "next-themes";
import BlurFade from "@/components/magicui/blur-fade";
import { IconCloud } from "@/components/ui/icon-cloud";
import { useLocale } from "@/components/locale-provider";
import { skillIcons } from "@/lib/icon-registry";
import { cn } from "@/lib/utils";

const BLUR_FADE_DELAY = 0.04;
const HOVER_QUERY = "(hover: hover) and (pointer: fine)";
const OPEN_DELAY_MS = 200;

export default function SkillsSection() {
  const { site, t } = useLocale();
  const { resolvedTheme } = useTheme();
  const [showList, setShowList] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const clearOpenTimeout = () => {
    if (openTimeoutRef.current !== null) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia(HOVER_QUERY);
    const update = () => {
      const matches = mediaQuery.matches;
      setCanHover(matches);
      if (!matches) {
        clearOpenTimeout();
      }
    };

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => () => clearOpenTimeout(), []);

  useEffect(() => {
    if (showList) {
      listRef.current?.scrollTo({ top: 0 });
    }
  }, [showList]);

  const icons = useMemo(() => {
    const fill = resolvedTheme === "dark" ? "#fafafa" : "#171717";

    return site.skills.flatMap((skill) => {
      const Icon = skillIcons[skill.icon];
      if (!Icon) return [];
      return [
        <Icon key={skill.name} width={100} height={100} fill={fill} />,
      ];
    });
  }, [site.skills, resolvedTheme]);

  const openList = () => {
    clearOpenTimeout();
    setShowList(true);
  };

  const closeList = () => {
    clearOpenTimeout();
    setShowList(false);
  };

  return (
    <div className="flex min-h-0 flex-col gap-y-3 sm:gap-y-4">
      <BlurFade delay={BLUR_FADE_DELAY * 9}>
        <h2 className="text-xl font-bold">{t.sections.skills}</h2>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 10}>
        <div
          className={cn(
            "relative h-72 w-full sm:h-[400px]",
            !canHover && "cursor-pointer"
          )}
          onMouseEnter={() => {
            if (!canHover) return;
            clearOpenTimeout();
            openTimeoutRef.current = setTimeout(openList, OPEN_DELAY_MS);
          }}
          onMouseLeave={() => {
            if (!canHover) return;
            closeList();
          }}
          onClick={() => {
            if (canHover) return;
            setShowList((value) => !value);
          }}
        >
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-opacity duration-200",
              showList
                ? "pointer-events-none opacity-0"
                : "opacity-100"
            )}
            aria-hidden={showList}
          >
            <IconCloud icons={icons} showControl={false} />
          </div>

          <div
            ref={listRef}
            className={cn(
              "absolute inset-0 overflow-y-auto overscroll-contain transition-opacity duration-200",
              showList
                ? "opacity-100"
                : "pointer-events-none opacity-0"
            )}
            aria-hidden={!showList}
          >
            <div className="flex min-h-full flex-wrap content-start justify-center gap-2 py-1 sm:content-center sm:py-2">
              {site.skills.map((skill) => {
                const Icon = skillIcons[skill.icon];
                return (
                  <div
                    key={skill.name}
                    className="flex h-8 w-fit max-w-full items-center gap-2 rounded-xl border border-border bg-background px-3 ring-2 ring-border/20 sm:px-4"
                  >
                    {Icon ? (
                      <Icon className="size-4 shrink-0 overflow-hidden rounded object-contain" />
                    ) : null}
                    <span className="truncate text-sm font-medium text-foreground">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </BlurFade>
    </div>
  );
}
