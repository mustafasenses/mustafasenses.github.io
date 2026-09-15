import type { MetadataRoute } from "next";
import { content } from "@/lib/content";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  const locale = content.defaultLocale;
  const t = content.locales[locale];

  return {
    name: content.seo.title[locale],
    short_name: content.name,
    description: t.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0a0a0a",
    lang: locale,
    icons: [
      {
        src: "/me.jpg",
        sizes: "460x460",
        type: "image/jpeg",
        purpose: "any",
      },
    ],
  };
}
