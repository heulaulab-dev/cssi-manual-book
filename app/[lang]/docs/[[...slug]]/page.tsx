import { notFound } from "next/navigation";
import type { MDXComponents } from "mdx/types";
import { DocsBody, DocsPage } from "fumadocs-ui/page";
import { isDocsLanguage } from "@/lib/docs-locale";
import { getMDXComponents } from "@/components/docs/mdx-components";
import { source } from "@/lib/source";

export default async function DocsPageRoute({
  params,
}: {
  params: Promise<{ lang: string; slug?: string[] }>;
}) {
  const { lang, slug } = await params;

  if (!isDocsLanguage(lang)) {
    notFound();
  }

  const page = source.getPage(slug, lang);

  if (!page) {
    notFound();
  }

  const MDXContent = page.data.body;

  return (
    <DocsPage toc={page.data.toc}>
      <DocsBody>
        <MDXContent components={getMDXComponents({}) satisfies MDXComponents} />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}
