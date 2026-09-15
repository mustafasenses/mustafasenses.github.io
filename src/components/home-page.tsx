"use client";

import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { PixelImage } from "@/components/ui/pixel-image";
import { useLocale } from "@/components/locale-provider";
import Link from "next/link";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import ProjectsSection from "@/components/section/projects-section";
import SkillsSection from "@/components/section/skills-section";
import WorkSection from "@/components/section/work-section";
import { EntityAvatar } from "@/components/entity-avatar";
import { ArrowUpRight } from "lucide-react";
import { interpolate, withBasePath } from "@/lib/content";
import { BottomConfetti } from "@/components/bottom-confetti";

const BLUR_FADE_DELAY = 0.04;

export default function HomePage() {
  const { site, t } = useLocale();
  const firstName = site.name.split(" ")[0];
  const greeting = interpolate(t.greeting, { name: firstName });

  return (
    <main className="relative flex min-h-dvh flex-col gap-10 sm:gap-14">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-6 sm:space-y-8">
          <div className="flex flex-col items-center justify-between gap-5 md:flex-row md:items-start md:gap-2 md:gap-y-6">
            <div className="order-2 flex w-full flex-col gap-2 text-center md:order-1 md:text-left">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="justify-center text-3xl font-semibold tracking-tighter sm:text-4xl md:justify-start lg:text-5xl"
                yOffset={8}
                text={greeting}
                as="h1"
              />
              <BlurFadeText
                className="mx-auto max-w-[600px] justify-center text-muted-foreground md:mx-0 md:justify-start md:text-lg lg:text-xl"
                delay={BLUR_FADE_DELAY}
                text={t.description}
                as="p"
              />
            </div>
            {site.avatarUrl ? (
              <BlurFade
                delay={BLUR_FADE_DELAY}
                className="order-1 shrink-0 md:order-2"
              >
                <PixelImage
                  src={withBasePath(site.avatarUrl)}
                  alt={`${site.name} — ${site.seo.jobTitle[site.defaultLocale]}`}
                  grid="8x8"
                  className="size-24 overflow-hidden rounded-full border shadow-lg ring-4 ring-muted md:size-32 dark:grayscale"
                  imgClassName="rounded-full"
                />
              </BlurFade>
            ) : null}
          </div>
        </div>
      </section>
      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-3 sm:gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold">{t.sections.about}</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-full text-pretty font-sans text-[15px] leading-relaxed text-muted-foreground sm:text-base dark:prose-invert">
              <Markdown>{t.summary}</Markdown>
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-4 sm:gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">{t.sections.work}</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <WorkSection />
          </BlurFade>
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-4 sm:gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">{t.sections.education}</h2>
          </BlurFade>
          <div className="flex flex-col gap-6 sm:gap-8">
            {t.education.map((education, index) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 8 + index * 0.05}
              >
                <Link
                  href={education.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-x-3"
                >
                  <div className="flex min-w-0 flex-1 items-start gap-x-3 sm:items-center">
                    <EntityAvatar
                      name={education.school}
                      src={education.logoUrl}
                    />
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <div className="flex items-center gap-2 font-semibold leading-snug">
                        <span className="min-w-0">{education.school}</span>
                        <ArrowUpRight
                          className="hidden h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-all duration-200 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 sm:block"
                          aria-hidden
                        />
                      </div>
                      <div className="font-sans text-sm text-muted-foreground">
                        {education.degree}
                      </div>
                    </div>
                  </div>
                  <div className="flex-none pl-12 text-xs tabular-nums text-muted-foreground sm:pl-0 sm:text-right">
                    <span>
                      {education.start} - {education.end}
                    </span>
                  </div>
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="skills">
        <SkillsSection />
      </section>
      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <ProjectsSection />
        </BlurFade>
      </section>
      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 12}>
          <ContactSection />
        </BlurFade>
      </section>
      <BottomConfetti />
    </main>
  );
}
