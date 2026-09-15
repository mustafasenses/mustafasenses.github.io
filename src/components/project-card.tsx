/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { withBasePath } from "@/lib/content";
import { skillIcons } from "@/lib/icon-registry";
import { ArrowUpRight, Code2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Markdown from "react-markdown";

const TECH_ICON_KEYS: Record<string, string> = {
  ".net": "dotnet",
  ".net core": "dotnet",
  csharp: "csharp",
  "c#": "csharp",
  nextjs: "nextjs",
  "next.js": "nextjs",
  react: "react",
  typescript: "typescript",
  javascript: "javascript",
  mysql: "mysql",
  docker: "docker",
  tailwind: "tailwind",
  "tailwind css": "tailwind",
  html: "html",
  github: "github",
  swagger: "swagger",
  nodejs: "nodejs",
  "node.js": "nodejs",
};

function resolveTechIcons(tags: readonly string[]) {
  const seen = new Set<string>();
  const icons: { key: string; Icon: (typeof skillIcons)[string] }[] = [];

  for (const tag of tags) {
    const mapped = TECH_ICON_KEYS[tag.toLowerCase()];
    if (!mapped || seen.has(mapped)) continue;
    const Icon = skillIcons[mapped];
    if (!Icon) continue;
    seen.add(mapped);
    icons.push({ key: mapped, Icon });
  }

  return icons.slice(0, 6);
}

function ProjectCover({
  title,
  tags,
}: {
  title: string;
  tags: readonly string[];
}) {
  const icons = resolveTechIcons(tags);
  const initial = title.trim().charAt(0).toUpperCase() || "#";

  return (
    <div className="relative flex h-48 w-full items-center justify-center overflow-hidden bg-muted">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.7_0.05_250/0.25),transparent_55%),radial-gradient(ellipse_at_bottom_left,oklch(0.65_0.08_160/0.2),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top_right,oklch(0.4_0.06_250/0.35),transparent_55%),radial-gradient(ellipse_at_bottom_left,oklch(0.35_0.08_160/0.3),transparent_50%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:20px_20px]"
      />

      {icons.length > 0 ? (
        <div className="relative z-[1] flex flex-wrap items-center justify-center gap-3 px-6">
          {icons.map(({ key, Icon }) => (
            <div
              key={key}
              className="flex size-11 items-center justify-center rounded-xl border border-border/60 bg-background/80 shadow-sm backdrop-blur-sm sm:size-12"
            >
              <Icon className="size-5 text-foreground sm:size-6" />
            </div>
          ))}
        </div>
      ) : (
        <div className="relative z-[1] flex size-16 items-center justify-center rounded-2xl border border-border/60 bg-background/80 shadow-sm backdrop-blur-sm">
          {initial.match(/[A-Za-z0-9]/) ? (
            <span className="text-2xl font-semibold tracking-tight text-foreground">
              {initial}
            </span>
          ) : (
            <Code2 className="size-7 text-muted-foreground" aria-hidden />
          )}
        </div>
      )}
    </div>
  );
}

function ProjectMedia({
  title,
  tags,
  image,
  video,
}: {
  title: string
  tags: readonly string[]
  image?: string
  video?: string
}) {
  const [imageFailed, setImageFailed] = useState(false)
  const resolvedImage = image?.trim() ? withBasePath(image) : ""
  const hasVideo = Boolean(video?.trim())

  if (hasVideo) {
    return (
      <video
        src={video}
        autoPlay
        loop
        muted
        playsInline
        className="h-48 w-full object-cover"
      />
    )
  }

  if (resolvedImage && !imageFailed) {
    return (
      <img
        src={resolvedImage}
        alt={title}
        className="h-48 w-full object-cover"
        onError={() => setImageFailed(true)}
      />
    )
  }

  return <ProjectCover title={title} tags={tags} />
}

interface Props {
  title: string;
  href?: string;
  description: string;
  dates?: string;
  tags: readonly string[];
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  image,
  video,
  links,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-border transition-all duration-200 hover:ring-2 hover:ring-muted",
        className
      )}
    >
      <div className="relative shrink-0">
        <Link
          href={href || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <ProjectMedia
            title={title}
            tags={tags}
            image={image}
            video={video}
          />
        </Link>
        {links && links.length > 0 && (
          <div className="absolute top-2 right-2 flex flex-wrap gap-2">
            {links.map((link, idx) => (
              <Link
                href={link.href}
                key={idx}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <Badge
                  className="flex items-center gap-1.5 bg-black text-xs text-white hover:bg-black/90"
                  variant="default"
                >
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-6">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 flex-col gap-1">
            <h3 className="font-semibold leading-snug">{title}</h3>
            {dates ? (
              <time className="text-xs text-muted-foreground">{dates}</time>
            ) : null}
          </div>
          <Link
            href={href || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label={`Open ${title}`}
          >
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="prose max-w-full flex-1 text-pretty font-sans text-xs leading-relaxed text-muted-foreground dark:prose-invert">
          <Markdown>{description}</Markdown>
        </div>
        {tags && tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge
                key={tag}
                className="h-6 w-fit border border-border px-2 text-[11px] font-medium"
                variant="outline"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
