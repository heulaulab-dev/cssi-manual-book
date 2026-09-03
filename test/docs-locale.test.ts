import { describe, expect, it } from "vitest";
import {
  getLanguageHref,
  getLanguageLabel,
  isDocsLanguage,
} from "@/lib/docs-locale";
import { i18n } from "@/lib/i18n";
import { source } from "@/lib/source";

const appSlugs = [
  "portal",
  "crm",
  "flowra",
  "daily-operation",
  "itqm",
  "intranet",
] as const;

const appLabels = [
  "Portal",
  "CRM",
  "Flowra",
  "Daily Operation",
  "ITQM",
  "Intranet",
] as const;

const appDescriptions = [
  "Central access, authentication, announcements, and shared services",
  "Customer, account, sales, and relationship management",
  "Digital account opening and onboarding workflows",
  "IT operational checklists, approvals, and daily reporting",
  "IT quality management and development request workflows",
  "Internal regulations, information, and company resources",
] as const;

const localizedPageSlugs: Record<(typeof i18n.languages)[number], string[]> = {
  en: [
    "",
    "authentication",
    "authentication/first-time-password",
    "authentication/forgot-password",
    "authentication/sign-in",
    "crm",
    "crm/getting-started",
    "daily-operation",
    "daily-operation/getting-started",
    "flowra",
    "flowra/getting-started",
    "getting-started",
    "intranet",
    "intranet/getting-started",
    "itqm",
    "itqm/getting-started",
    "portal",
    "portal/dashboard",
    "portal/getting-started",
    "portal/navigating-applications",
  ],
  id: [
    "",
    "crm",
    "daily-operation",
    "flowra",
    "getting-started",
    "intranet",
    "itqm",
    "portal",
  ],
  ko: [
    "",
    "crm",
    "daily-operation",
    "flowra",
    "getting-started",
    "intranet",
    "itqm",
    "portal",
  ],
};

const localizedRootDescriptions: Record<
  (typeof i18n.languages)[number],
  readonly string[]
> = {
  en: [
    "Central access and cross-application dashboard for CSSI",
    "Customer, account, sales, and trading-related workspace",
    "Account opening and financial workflow automation",
    "Operational checklist, approval, and reporting workspace",
    "IT quality management and development request workflows",
    "Internal regulations, information, and company resources",
  ],
  id: appDescriptions,
  ko: appDescriptions,
};

describe("docs locales", () => {
  it("accepts only configured locales", () => {
    expect(isDocsLanguage("id")).toBe(true);
    expect(isDocsLanguage("en")).toBe(true);
    expect(isDocsLanguage("ko")).toBe(true);
    expect(isDocsLanguage("fr")).toBe(false);
  });

  it("builds a locale-prefixed docs URL", () => {
    expect(getLanguageHref("ko", ["getting-started"])).toBe(
      "/ko/docs/getting-started",
    );
    expect(getLanguageHref("id", undefined)).toBe("/id/docs");
  });

  it("uses the requested navigation labels", () => {
    expect(getLanguageLabel("id")).toBe("Bahasa Indonesia");
    expect(getLanguageLabel("en")).toBe("English");
    expect(getLanguageLabel("ko")).toBe("한국어");
  });

  it("matches the expected page tree for each locale", () => {
    for (const language of i18n.languages) {
      expect(
        source
          .getPages(language)
          .map((page) => page.slugs.join("/"))
          .sort(),
      ).toEqual(localizedPageSlugs[language].slice().sort());
    }
  });

  it("exposes the six applications as native root folders in every locale tree", () => {
    for (const language of i18n.languages) {
      const tree = source.getPageTree(language);
      const rootFolders = tree.children.filter(
        (
          node,
        ): node is Extract<
          (typeof tree.children)[number],
          { type: "folder" }
        > => node.type === "folder" && node.root === true,
      );

      expect(rootFolders.map((folder) => String(folder.name))).toEqual(
        appLabels,
      );
      expect(rootFolders.map((folder) => String(folder.description))).toEqual(
        localizedRootDescriptions[language],
      );
    }
  });

  it("resolves all 18 localized application landing pages", () => {
    for (const language of i18n.languages) {
      for (const slug of appSlugs) {
        expect(source.getPage([slug], language)?.url).toBe(
          `/${language}/docs/${slug}`,
        );
      }
    }
  });
});
