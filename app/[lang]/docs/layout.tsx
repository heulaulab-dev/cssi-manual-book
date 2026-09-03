import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { RootProvider } from "fumadocs-ui/provider/next";
import { defineI18nUI } from "fumadocs-ui/i18n";
import { i18n } from "@/lib/i18n";
import {
  getLanguageLabel,
  isDocsLanguage,
  type DocsLanguage,
} from "@/lib/docs-locale";
import { source } from "@/lib/source";
import { DocsSidebarBrand } from "@/components/docs-shell/docs-sidebar-brand";

const ui = defineI18nUI(i18n, {
  id: { displayName: "Bahasa Indonesia" },
  en: { displayName: "English" },
  ko: { displayName: "한국어" },
});

export default async function DocsRootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isDocsLanguage(lang)) {
    notFound();
  }

  const locale = lang as DocsLanguage;

  return (
    <RootProvider
      i18n={{
        ...ui.provider(locale),
        locales: i18n.languages.map((language) => ({
          locale: language,
          name: getLanguageLabel(language),
        })),
      }}
    >
      <DocsLayout
        tree={source.getPageTree(locale)}
        i18n
        searchToggle={{ enabled: true }}
        nav={{
          title: <DocsSidebarBrand />,
          url: `/${locale}/docs`,
        }}
      >
        {children}
      </DocsLayout>
    </RootProvider>
  );
}
