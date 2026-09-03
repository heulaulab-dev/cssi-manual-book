# CSSI Manual Book

Internal documentation platform for the CSSI application ecosystem at KB Valbury Securities.

Built with [Next.js](https://nextjs.org/) 16 and [Fumadocs](https://fumadocs.vercel.app/) 16.15.

## Applications Documented

| Application | Description |
|---|---|
| **Portal** | Central entry point and cross-application dashboard |
| **CRM** | Sales, customer, account, and trading workspace |
| **Flowra** | Account opening and financial workflow automation |
| **Daily Operation** | Operational checklist, approval, and reporting |
| **ITQM** | IT quality management and development requests |
| **Intranet** | Internal information, regulations, and company comms |

## Quick Start

```bash
# Install dependencies
bun install

# Start dev server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/id/docs`.

## Scripts

| Command | Description |
|---|---|
| `bun run dev` | Start development server |
| `bun run build` | Production build |
| `bun run start` | Start production server |
| `bun run test` | Run unit tests (Vitest) |
| `bun run test:coverage` | Run tests with coverage report |
| `bun run lint` | ESLint check |
| `bun run fix` | Prettier + oxlint auto-fix |
| `bun run typecheck` | Fumadocs MDX codegen + TypeScript check |

## Docs Routes

| Route | Language |
|---|---|
| `/id/docs` | Bahasa Indonesia (default) |
| `/en/docs` | English |
| `/ko/docs` | 한국어 |
| `/api/search` | Search API |

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Docs Engine:** Fumadocs 16.15 (MDX)
- **UI:** Radix UI + Tailwind CSS 4
- **Testing:** Vitest + Istanbul coverage
- **Linting:** ESLint 9 + oxlint + Prettier
- **Runtime:** Bun

## Project Structure

```
cssi-manual-book/
├── app/              # Next.js app routes
│   ├── [lang]/       # i18n dynamic routes
│   │   ├── docs/     # Documentation pages
│   │   └── page.tsx  # Language root
│   ├── api/          # API routes (search)
│   └── layout.tsx    # Root layout
├── components/       # React components
│   ├── docs/         # MDX components, language switcher
│   ├── docs-sidebar/ # Sidebar navigation
│   ├── toc/          # Table of contents
│   └── ui/           # Shared UI primitives
├── content/          # MDX documentation
│   └── docs/
│     ├── en/         # English docs
│     ├── id/         # Indonesian docs
│     └── ko/         # Korean docs
├── layouts/          # Page layouts (docs, shared)
├── lib/              # Utilities (i18n, source, urls)
├── public/           # Static assets
└── test/             # Unit tests
```

## Documentation Structure

Each language has app-specific folders:

```
content/docs/{lang}/
├── index.mdx              # Landing page
├── getting-started.mdx    # Getting started guide
├── authentication/        # Auth guides
├── portal/                # Portal docs
├── crm/                   # CRM docs
├── flowra/                # Flowra docs
├── daily-operation/       # Daily Operation docs
├── itqm/                  # ITQM docs
└── intranet/              # Intranet docs
```

## Contributing

1. Create a feature branch: `git checkout -b feature/your-name/your-task`
2. Make your changes
3. Run checks: `bun run fix && bun run typecheck && bun run test`
4. Commit and push
5. Open a pull request

## License

Private — KB Valbury Securities internal use only.
