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
  "Central access and cross-application dashboard for CSSI",
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
    "crm/dashboard",
    "crm/getting-started",
    "crm/sales",
    "crm/stock",
    "crm/trend-catch",
    "daily-operation",
    "daily-operation/approvals",
    "daily-operation/dashboard",
    "daily-operation/getting-started",
    "daily-operation/history",
    "daily-operation/it-config",
    "daily-operation/today-checklist",
    "flowra",
    "flowra/agreements",
    "flowra/dashboard",
    "flowra/digital-signing",
    "flowra/getting-started",
    "flowra/opening-accounts",
    "getting-started",
    "guides/account-settings",
    "guides/admin-panel",
    "guides/app-navigation",
    "guides/common-ui-patterns",
    "guides/notifications",
    "intranet",
    "intranet/admin",
    "intranet/announcements",
    "intranet/dashboard",
    "intranet/getting-started",
    "intranet/regulations",
    "itqm",
    "itqm/config",
    "itqm/dashboard",
    "itqm/development-requests",
    "itqm/done-report",
    "itqm/getting-started",
    "itqm/issues",
    "portal",
    "portal/account-settings",
    "portal/admin-panel",
    "portal/dashboard",
    "portal/getting-started",
    "portal/navigating-applications",
    "portal/notifications",
  ],
  id: [
    "",
    "authentication",
    "authentication/first-time-password",
    "authentication/forgot-password",
    "authentication/sign-in",
    "crm",
    "crm/dashboard",
    "crm/getting-started",
    "crm/sales",
    "crm/stock",
    "crm/trend-catch",
    "daily-operation",
    "daily-operation/approvals",
    "daily-operation/dashboard",
    "daily-operation/getting-started",
    "daily-operation/history",
    "daily-operation/it-config",
    "daily-operation/today-checklist",
    "flowra",
    "flowra/agreements",
    "flowra/dashboard",
    "flowra/digital-signing",
    "flowra/getting-started",
    "flowra/opening-accounts",
    "getting-started",
    "guides/account-settings",
    "guides/admin-panel",
    "guides/app-navigation",
    "guides/common-ui-patterns",
    "guides/notifications",
    "intranet",
    "intranet/admin",
    "intranet/announcements",
    "intranet/dashboard",
    "intranet/getting-started",
    "intranet/regulations",
    "itqm",
    "itqm/config",
    "itqm/dashboard",
    "itqm/development-requests",
    "itqm/done-report",
    "itqm/getting-started",
    "itqm/issues",
    "portal",
    "portal/account-settings",
    "portal/admin-panel",
    "portal/dashboard",
    "portal/getting-started",
    "portal/navigating-applications",
    "portal/notifications",
  ],
  ko: [
    "",
    "authentication",
    "authentication/first-time-password",
    "authentication/forgot-password",
    "authentication/sign-in",
    "crm",
    "crm/dashboard",
    "crm/getting-started",
    "crm/sales",
    "crm/stock",
    "crm/trend-catch",
    "daily-operation",
    "daily-operation/approvals",
    "daily-operation/dashboard",
    "daily-operation/getting-started",
    "daily-operation/history",
    "daily-operation/it-config",
    "daily-operation/today-checklist",
    "flowra",
    "flowra/agreements",
    "flowra/dashboard",
    "flowra/digital-signing",
    "flowra/getting-started",
    "flowra/opening-accounts",
    "getting-started",
    "guides/account-settings",
    "guides/admin-panel",
    "guides/app-navigation",
    "guides/common-ui-patterns",
    "guides/notifications",
    "intranet",
    "intranet/admin",
    "intranet/announcements",
    "intranet/dashboard",
    "intranet/getting-started",
    "intranet/regulations",
    "itqm",
    "itqm/config",
    "itqm/dashboard",
    "itqm/development-requests",
    "itqm/done-report",
    "itqm/getting-started",
    "itqm/issues",
    "portal",
    "portal/account-settings",
    "portal/admin-panel",
    "portal/dashboard",
    "portal/getting-started",
    "portal/navigating-applications",
    "portal/notifications",
  ],
};

const localizedRootDescriptions: Record<
  (typeof i18n.languages)[number],
  readonly string[]
> = {
  en: [
    "Central access and cross-application dashboard for CSSI",
    "Sales, trading, and customer relationship workspace",
    "Account opening and financial workflow automation",
    "Operational checklist, approval, and reporting workspace",
    "IT quality management and development request workflows",
    "Internal regulations, information, and company resources",
  ],
  id: [
    "Akses pusat dan dasbor lintas aplikasi untuk CSSI",
    "Ruang kerja penjualan, perdagangan, dan manajemen hubungan pelanggan",
    "Pembukaan akun dan otomatisasi alur kerja keuangan",
    "Ruang kerja daftar periksa operasional, persetujuan, dan pelaporan",
    "Manajemen kualitas TI dan alur kerja permintaan pengembangan",
    "Regulasi internal, informasi, dan sumber daya perusahaan",
  ],
  ko: [
    "CSSI의 중앙 접근 및 크로스 애플리케이션 대시보드",
    "영업, 거래 및 고객 관계 작업 공간",
    "계정 개설 및 금융 워크플로우 자동화",
    "운영 체크리스트, 승인 및 보고 작업 공간",
    "IT 품질 관리 및 개발 요청 워크플로우",
    "내부 규정, 정보 및 회사 자원",
  ],
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
