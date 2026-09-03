import { createElement } from "react";
import { loader } from "fumadocs-core/source";
import {
  Building2,
  CircleGauge,
  ClipboardCheck,
  LayoutDashboard,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";
import { i18n } from "@/lib/i18n";
import { docs } from "collections/server";

const icons = {
  LayoutDashboard,
  Users,
  Workflow,
  ClipboardCheck,
  CircleGauge,
  Building2,
  ShieldCheck,
} as const;

export const source = loader({
  source: docs.toFumadocsSource(),
  baseUrl: "/docs",
  i18n,
  icon(icon) {
    if (!icon) {
      return undefined;
    }

    const Icon = icons[icon as keyof typeof icons];

    if (!Icon) {
      return undefined;
    }

    return createElement(Icon);
  },
});
