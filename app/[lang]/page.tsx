import { redirect, notFound } from "next/navigation";

const locales = ["en", "id", "ko"] as const;

type Locale = (typeof locales)[number];

export default async function LocalePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!locales.includes(lang as Locale)) {
    notFound();
  }

  redirect(`/${lang}/docs`);
}
