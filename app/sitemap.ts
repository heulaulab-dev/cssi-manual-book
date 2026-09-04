import { type Metadata } from "next";

const BASE_URL = "https://manual.cssi.kbvalbury.com";

const PAGES = [
  // English
  { lang: "en", slug: "", priority: 1.0 },
  { lang: "en", slug: "getting-started", priority: 0.9 },
  { lang: "en", slug: "authentication", priority: 0.7 },
  { lang: "en", slug: "authentication/sign-in", priority: 0.6 },
  { lang: "en", slug: "authentication/first-time-password", priority: 0.6 },
  { lang: "en", slug: "authentication/forgot-password", priority: 0.6 },
  { lang: "en", slug: "guides", priority: 0.8 },
  { lang: "en", slug: "guides/account-settings", priority: 0.7 },
  { lang: "en", slug: "guides/notifications", priority: 0.7 },
  { lang: "en", slug: "guides/app-navigation", priority: 0.7 },
  { lang: "en", slug: "guides/admin-panel", priority: 0.7 },
  { lang: "en", slug: "guides/common-ui-patterns", priority: 0.7 },
  { lang: "en", slug: "portal", priority: 0.9 },
  { lang: "en", slug: "portal/getting-started", priority: 0.8 },
  { lang: "en", slug: "portal/dashboard", priority: 0.8 },
  { lang: "en", slug: "portal/navigating-applications", priority: 0.8 },
  { lang: "en", slug: "portal/account-settings", priority: 0.8 },
  { lang: "en", slug: "portal/notifications", priority: 0.8 },
  { lang: "en", slug: "portal/admin-panel", priority: 0.8 },
  { lang: "en", slug: "crm", priority: 0.9 },
  { lang: "en", slug: "crm/getting-started", priority: 0.8 },
  { lang: "en", slug: "crm/dashboard", priority: 0.8 },
  { lang: "en", slug: "crm/sales", priority: 0.8 },
  { lang: "en", slug: "crm/stock", priority: 0.8 },
  { lang: "en", slug: "crm/trend-catch", priority: 0.8 },
  { lang: "en", slug: "flowra", priority: 0.9 },
  { lang: "en", slug: "flowra/getting-started", priority: 0.8 },
  { lang: "en", slug: "flowra/dashboard", priority: 0.8 },
  { lang: "en", slug: "flowra/opening-accounts", priority: 0.8 },
  { lang: "en", slug: "flowra/agreements", priority: 0.8 },
  { lang: "en", slug: "flowra/digital-signing", priority: 0.8 },
  { lang: "en", slug: "daily-operation", priority: 0.9 },
  { lang: "en", slug: "daily-operation/getting-started", priority: 0.8 },
  { lang: "en", slug: "daily-operation/dashboard", priority: 0.8 },
  { lang: "en", slug: "daily-operation/today-checklist", priority: 0.8 },
  { lang: "en", slug: "daily-operation/approvals", priority: 0.8 },
  { lang: "en", slug: "daily-operation/history", priority: 0.8 },
  { lang: "en", slug: "daily-operation/it-config", priority: 0.8 },
  { lang: "en", slug: "itqm", priority: 0.9 },
  { lang: "en", slug: "itqm/getting-started", priority: 0.8 },
  { lang: "en", slug: "itqm/dashboard", priority: 0.8 },
  { lang: "en", slug: "itqm/development-requests", priority: 0.8 },
  { lang: "en", slug: "itqm/done-report", priority: 0.8 },
  { lang: "en", slug: "itqm/issues", priority: 0.8 },
  { lang: "en", slug: "itqm/config", priority: 0.8 },
  { lang: "en", slug: "intranet", priority: 0.9 },
  { lang: "en", slug: "intranet/getting-started", priority: 0.8 },
  { lang: "en", slug: "intranet/dashboard", priority: 0.8 },
  { lang: "en", slug: "intranet/announcements", priority: 0.8 },
  { lang: "en", slug: "intranet/regulations", priority: 0.8 },
  { lang: "en", slug: "intranet/admin", priority: 0.8 },
  // Indonesian
  { lang: "id", slug: "", priority: 1.0 },
  { lang: "id", slug: "getting-started", priority: 0.9 },
  { lang: "id", slug: "portal", priority: 0.9 },
  { lang: "id", slug: "crm", priority: 0.9 },
  { lang: "id", slug: "flowra", priority: 0.9 },
  { lang: "id", slug: "daily-operation", priority: 0.9 },
  { lang: "id", slug: "itqm", priority: 0.9 },
  { lang: "id", slug: "intranet", priority: 0.9 },
  // Korean
  { lang: "ko", slug: "", priority: 1.0 },
  { lang: "ko", slug: "getting-started", priority: 0.9 },
  { lang: "ko", slug: "portal", priority: 0.9 },
  { lang: "ko", slug: "crm", priority: 0.9 },
  { lang: "ko", slug: "flowra", priority: 0.9 },
  { lang: "ko", slug: "daily-operation", priority: 0.9 },
  { lang: "ko", slug: "itqm", priority: 0.9 },
  { lang: "ko", slug: "intranet", priority: 0.9 },
];

export const metadata: Metadata = {
  alternates: {
    canonical: `${BASE_URL}/en/docs`,
    languages: Object.fromEntries(
      PAGES.filter((p) => p.slug === "").map((p) => [
        p.lang,
        `${BASE_URL}/${p.lang}/docs`,
      ]),
    ),
  },
};

export default async function sitemap() {
  return PAGES.map((p) => ({
    url: `${BASE_URL}/${p.lang}/docs/${p.slug}`,
    lastmod: new Date().toISOString().split("T")[0],
    changeFrequency: p.slug === "" ? "weekly" : "monthly",
    priority: p.priority,
  }));
}
