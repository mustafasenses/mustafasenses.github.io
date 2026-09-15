"use client";

import { EntityAvatar } from "@/components/entity-avatar";
import { useLocale } from "@/components/locale-provider";

export default function WorkSection() {
  const { t } = useLocale();

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {t.work.map((work) => (
        <div
          key={work.company}
          className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-x-3"
        >
          <div className="flex min-w-0 flex-1 items-start gap-x-3 sm:items-center">
            <EntityAvatar name={work.company} src={work.logoUrl} />
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <div className="font-semibold leading-snug">{work.company}</div>
              <div className="font-sans text-sm text-muted-foreground">
                {work.title}
              </div>
            </div>
          </div>
          <div className="flex-none pl-12 text-xs tabular-nums text-muted-foreground sm:pl-0 sm:text-right">
            <span>
              {work.start} - {work.end || t.sections.present}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
