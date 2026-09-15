import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SKIP_WORDS = new Set([
  "a.ş",
  "a.ş.",
  "a.s",
  "a.s.",
  "aş",
  "as",
  "ltd",
  "ltd.",
  "şti",
  "şti.",
  "sti",
  "sti.",
  "inc",
  "inc.",
  "llc",
  "llc.",
  "co",
  "co.",
  "ve",
  "and",
  "the",
  "of",
]);

/** SoftAi Teknoloji A.Ş. → ST, İstanbul Üniversitesi → İÜ, Freelance → FR */
export function getInitials(name: string): string {
  const words = name
    .split(/[\s,/|+-]+/)
    .map((word) => word.trim())
    .filter(Boolean)
    .filter((word) => !SKIP_WORDS.has(word.toLocaleLowerCase("tr-TR")));

  if (words.length === 0) return "?";

  if (words.length === 1) {
    return Array.from(words[0]).slice(0, 2).join("").toLocaleUpperCase("tr-TR");
  }

  const first = Array.from(words[0])[0] ?? "";
  const second = Array.from(words[1])[0] ?? "";
  return `${first}${second}`.toLocaleUpperCase("tr-TR");
}
