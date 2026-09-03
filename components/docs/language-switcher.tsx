"use client";

import { useParams, useRouter } from "next/navigation";
import {
  getLanguageHref,
  isDocsLanguage,
  type DocsLanguage,
  getLanguageLabel,
} from "@/lib/docs-locale";

const languages: DocsLanguage[] = ["id", "en", "ko"];

export function LanguageSwitcher() {
  const router = useRouter();
  const params = useParams<{ lang?: string; slug?: string[] }>();
  const currentLanguage =
    params.lang && isDocsLanguage(params.lang) ? params.lang : "id";
  const currentSlug = params.slug;

  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <span className="text-fd-muted-foreground">Language</span>
      <select
        className="rounded-md border border-fd-border bg-fd-background px-2 py-1 text-fd-foreground"
        value={currentLanguage}
        onChange={(event) => {
          const nextLanguage = event.target.value as DocsLanguage;
          router.push(getLanguageHref(nextLanguage, currentSlug));
        }}
      >
        {languages.map((language) => (
          <option key={language} value={language}>
            {getLanguageLabel(language)}
          </option>
        ))}
      </select>
    </label>
  );
}
