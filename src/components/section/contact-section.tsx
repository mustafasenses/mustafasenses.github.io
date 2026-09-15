"use client";

import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { useLocale } from "@/components/locale-provider";
import { interpolate } from "@/lib/content";
import Markdown from "react-markdown";

export default function ContactSection() {
  const { site, t } = useLocale();
  const email = site.contact.email;
  const description = interpolate(t.sections.contactDescription, { email });

  return (
    <div className="relative rounded-xl border p-6 sm:p-10">
      <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 rounded-xl border bg-primary px-4 py-1">
        <span className="text-sm font-medium text-background">
          {t.sections.contact}
        </span>
      </div>
      <div className="absolute inset-x-0 top-0 h-1/2 overflow-hidden rounded-xl">
        <FlickeringGrid
          className="h-full w-full"
          squareSize={2}
          gridGap={2}
          style={{
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
      </div>
      <div className="relative flex flex-col items-center gap-3 text-center sm:gap-4">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-5xl">
          {t.sections.contactTitle}
        </h2>
        <div className="prose prose-sm mx-auto max-w-lg text-balance text-muted-foreground dark:prose-invert prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline prose-a:underline-offset-4">
          <Markdown
            components={{
              a: ({ href, children }) => {
                const isMailto = href?.startsWith("mailto:");
                return (
                  <a
                    href={href}
                    target={isMailto ? undefined : "_blank"}
                    rel={isMailto ? undefined : "noopener noreferrer"}
                    className="rounded-sm text-blue-500 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {children}
                  </a>
                );
              },
              p: ({ children }) => <p className="m-0">{children}</p>,
            }}
          >
            {description}
          </Markdown>
        </div>
      </div>
    </div>
  );
}
