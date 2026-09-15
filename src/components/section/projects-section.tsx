"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { useLocale } from "@/components/locale-provider";
import { socialIcons } from "@/lib/icon-registry";

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsSection() {
  const { t } = useLocale();

  if (t.projects.length === 0) {
    return null;
  }

  return (
    <div className="flex min-h-0 flex-col gap-y-6 sm:gap-y-8">
      <div className="flex flex-col items-center justify-center gap-y-3 sm:gap-y-4">
        <div className="flex w-full items-center">
          <div className="h-px flex-1 bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
          <div className="z-10 rounded-xl border bg-primary px-4 py-1">
            <span className="text-sm font-medium text-background">
              {t.sections.projects}
            </span>
          </div>
          <div className="h-px flex-1 bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
        </div>
        <div className="flex flex-col items-center justify-center gap-y-2 px-1 sm:gap-y-3">
          <h2 className="text-center text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
            {t.sections.projectsTitle}
          </h2>
          <p className="text-center text-balance text-sm text-muted-foreground sm:text-base md:text-lg/relaxed">
            {t.sections.projectsDescription}
          </p>
        </div>
      </div>
      <div className="mx-auto grid w-full max-w-[800px] auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2">
        {t.projects.map((project, id) => (
          <BlurFade
            key={project.title}
            delay={BLUR_FADE_DELAY * 12 + id * 0.05}
            className="h-full"
          >
            <ProjectCard
              href={project.href}
              title={project.title}
              description={project.description}
              dates={project.dates}
              tags={project.technologies}
              image={project.image}
              video={project.video}
              links={project.links?.map((link) => {
                const Icon = socialIcons[link.icon] ?? socialIcons.globe;
                return {
                  type: link.type,
                  href: link.href,
                  icon: Icon ? <Icon className="size-3" /> : null,
                };
              })}
            />
          </BlurFade>
        ))}
      </div>
    </div>
  );
}
