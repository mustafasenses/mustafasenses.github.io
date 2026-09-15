"use client";

import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { LocaleToggle } from "@/components/locale-toggle";
import { useLocale } from "@/components/locale-provider";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { navIcons, socialIcons } from "@/lib/icon-registry";
import { withBasePath } from "@/lib/content";
import { useTheme } from "next-themes";

const dockIconClassName =
  "rounded-3xl cursor-pointer size-full bg-background p-0 text-muted-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border transition-colors";

function resolveHref(href: string) {
  return withBasePath(href);
}

export default function Navbar() {
  const { site, t, locale, toggleLocale } = useLocale();
  const { theme, setTheme } = useTheme();
  const nextLocale = locale === "en" ? "TR" : "EN";

  const navLabels: Record<string, string> = {
    home: t.sections.home,
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30 pb-[env(safe-area-inset-bottom,0px)]">
      <Dock className="z-50 pointer-events-auto relative mx-auto flex h-14 w-fit gap-2 border bg-card/90 p-2 shadow-[0_0_10px_3px] shadow-primary/5 backdrop-blur-3xl">
        {site.navbar.map((item) => {
          const isExternal = item.href.startsWith("http");
          const Icon = navIcons[item.icon];
          const label = navLabels[item.icon] ?? item.icon;
          if (!Icon) return null;
          return (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <a
                  href={resolveHref(item.href)}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                >
                  <DockIcon className={dockIconClassName}>
                    <Icon className="size-full rounded-sm overflow-hidden object-contain" />
                  </DockIcon>
                </a>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                sideOffset={8}
                className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
              >
                <p>{label}</p>
                <TooltipArrow className="fill-primary" />
              </TooltipContent>
            </Tooltip>
          );
        })}
        <Separator
          orientation="vertical"
          className="h-2/3 m-auto w-px bg-border"
        />
        {site.contact.social
          .filter((social) => social.navbar)
          .map((social, index) => {
            const href =
              social.icon === "email"
                ? `mailto:${site.contact.email}`
                : social.url;
            const isExternal = href.startsWith("http");
            const IconComponent = socialIcons[social.icon];
            if (!IconComponent) return null;
            return (
              <Tooltip key={`social-${social.name}-${index}`}>
                <TooltipTrigger asChild>
                  <a
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                  >
                    <DockIcon className={dockIconClassName}>
                      <IconComponent className="size-full rounded-sm overflow-hidden object-contain" />
                    </DockIcon>
                  </a>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  sideOffset={8}
                  className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
                >
                  <p>{social.name}</p>
                  <TooltipArrow className="fill-primary" />
                </TooltipContent>
              </Tooltip>
            );
          })}
        <Separator
          orientation="vertical"
          className="h-2/3 m-auto w-px bg-border"
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={toggleLocale}
              aria-label={`Switch to ${nextLocale}`}
              className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <DockIcon className={dockIconClassName}>
                <LocaleToggle />
              </DockIcon>
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            sideOffset={8}
            className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
          >
            <p>{t.sections.language}</p>
            <TooltipArrow className="fill-primary" />
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={t.sections.theme}
              className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <DockIcon className={dockIconClassName}>
                <ModeToggle className="size-full" />
              </DockIcon>
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            sideOffset={8}
            className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
          >
            <p>{t.sections.theme}</p>
            <TooltipArrow className="fill-primary" />
          </TooltipContent>
        </Tooltip>
      </Dock>
    </div>
  );
}
