import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found — CSSI Manual Book",
  description: "The page you're looking for doesn't exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <div className="text-center space-y-4 max-w-md">
        <p className="text-8xl font-bold text-fd-primary tracking-tight">
          404
        </p>
        <h1 className="text-2xl font-semibold text-foreground">
          Page not found
        </h1>
        <p className="text-fd-muted-foreground">
          The documentation page you&apos;re looking for doesn&apos;t exist or
          has been moved.
        </p>
        <Link
          href="/en/docs"
          className="inline-flex items-center gap-2 px-4 py-2 bg-fd-primary text-fd-primary-foreground rounded-lg text-sm font-medium hover:bg-fd-primary/90 transition-colors"
        >
          Back to Documentation
        </Link>
      </div>
    </div>
  );
}
