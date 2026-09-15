import { content, getAbsoluteUrl, getSiteUrl } from "@/lib/content";

export function JsonLd() {
  const locale = content.defaultLocale;
  const t = content.locales[locale];
  const sameAs = content.contact.social
    .filter((item) => item.url.startsWith("http"))
    .map((item) => item.url);

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${getSiteUrl()}/#person`,
    name: content.name,
    url: getSiteUrl(),
    image: content.avatarUrl ? getAbsoluteUrl(content.avatarUrl) : undefined,
    email: content.contact.email,
    jobTitle: content.seo.jobTitle[locale],
    description: t.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: t.location,
      addressCountry: "TR",
    },
    sameAs,
    knowsAbout: content.skills.map((skill) => skill.name),
    alumniOf: t.education.map((item) => ({
      "@type": "EducationalOrganization",
      name: item.school,
      url: item.href.startsWith("http") ? item.href : undefined,
    })),
    worksFor: t.work.slice(0, 1).map((item) => ({
        "@type": "Organization",
        name: item.company,
        url: item.href.startsWith("http") ? item.href : undefined,
      })),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${getSiteUrl()}/#website`,
    name: content.seo.title[locale],
    url: getSiteUrl(),
    description: t.description,
    inLanguage: [locale === "tr" ? "tr-TR" : "en-US", locale === "tr" ? "en-US" : "tr-TR"],
    publisher: { "@id": `${getSiteUrl()}/#person` },
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [person, website],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
