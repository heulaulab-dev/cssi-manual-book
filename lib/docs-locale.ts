import { i18n } from "@/lib/i18n";

export type DocsLanguage = (typeof i18n.languages)[number];

const labels: Record<DocsLanguage, string> = {
  id: "Bahasa Indonesia",
  en: "English",
  ko: "한국어",
};

export function isDocsLanguage(value: string): value is DocsLanguage {
  return (i18n.languages as readonly string[]).includes(value);
}

export function getLanguageLabel(language: DocsLanguage) {
  return labels[language];
}

export function getLanguageHref(language: DocsLanguage, slug?: string[]) {
  const suffix = slug?.length
    ? `/${slug.map(encodeURIComponent).join("/")}`
    : "";
  return `/${language}/docs${suffix}`;
}
