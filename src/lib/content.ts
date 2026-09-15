import site from "../../content.json";
import en from "../../en-content.json";
import tr from "../../tr-content.json";

export const LOCALES = ["en", "tr"] as const;
export type Locale = (typeof LOCALES)[number];

export type SocialLink = {
  name: string;
  url: string;
  icon: string;
  navbar: boolean;
};

export type Skill = {
  name: string;
  icon: string;
};

export type WorkItem = {
  company: string;
  href: string;
  location: string;
  title: string;
  logoUrl: string;
  start: string;
  end: string;
};

export type EducationItem = {
  school: string;
  href: string;
  degree: string;
  logoUrl: string;
  start: string;
  end: string;
};

export type ProjectLink = {
  type: string;
  href: string;
  icon: string;
};

export type ProjectItem = {
  title: string;
  href: string;
  dates?: string;
  active?: boolean;
  description: string;
  technologies: string[];
  links?: ProjectLink[];
  image?: string;
  video?: string;
};

export type LocaleContent = {
  location: string;
  description: string;
  summary: string;
  greeting: string;
  sections: {
    about: string;
    work: string;
    education: string;
    skills: string;
    projects: string;
    projectsTitle: string;
    projectsDescription: string;
    contact: string;
    contactTitle: string;
    contactDescription: string;
    home: string;
    theme: string;
    language: string;
    present: string;
  };
  work: WorkItem[];
  education: EducationItem[];
  projects: ProjectItem[];
};

export type PortfolioContent = {
  name: string;
  initials: string;
  url: string;
  avatarUrl: string;
  locationLink: string;
  defaultLocale: Locale;
  seo: {
    jobTitle: Record<Locale, string>;
    title: Record<Locale, string>;
    keywords: string[];
  };
  contact: {
    email: string;
    social: SocialLink[];
  };
  skills: Skill[];
  navbar: { href: string; icon: string }[];
  locales: Record<Locale, LocaleContent>;
};

export const content: PortfolioContent = {
  ...(site as Omit<PortfolioContent, "locales">),
  defaultLocale: site.defaultLocale as Locale,
  locales: {
    en: en as LocaleContent,
    tr: tr as LocaleContent,
  },
};

/** Optional base path for project Pages sites (e.g. `/repo`). Empty for user sites. */
export function getBasePath(): string {
  return (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
}

/** Prefix public asset paths when a base path is set. */
export function withBasePath(path: string): string {
  if (!path || path.startsWith("http://") || path.startsWith("https://") || path.startsWith("mailto:") || path.startsWith("#")) {
    return path;
  }

  const base = getBasePath();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, "");

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProduction) return `https://${vercelProduction}`.replace(/\/$/, "");

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) return `https://${vercelUrl}`.replace(/\/$/, "");

  return content.url.replace(/\/$/, "");
}

export function getAbsoluteUrl(path = "/"): string {
  const base = getSiteUrl();
  if (!path || path === "/") return base;

  const normalized = path.startsWith("/") ? path : `/${path}`;
  const basePath = getBasePath();
  if (basePath && normalized.startsWith(`${basePath}/`)) {
    return `${base}${normalized.slice(basePath.length)}`;
  }

  return `${base}${normalized}`;
}

export function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function getLocaleContent(locale: Locale): LocaleContent {
  return content.locales[locale];
}

export function interpolate(
  template: string,
  vars: Record<string, string>
): string {
  return Object.entries(vars).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, value),
    template
  );
}
