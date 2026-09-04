"use client";
import Script from "next/script";
import { usePathname } from "next/navigation";

const BASE_URL = "https://manual.cssi.kbvalbury.com";
const SITE_NAME = "CSSI Manual Book";
const DESCRIPTION = "Complete user manual for the CSSI application ecosystem by KB Valbury";

export function StructuredData() {
  const pathname = usePathname();
  const url = `${BASE_URL}${pathname}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    description: DESCRIPTION,
    url,
    inLanguage: pathname.split("/")[1] || "en",
    publisher: {
      "@type": "Organization",
      name: "KB Valbury",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/{search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
