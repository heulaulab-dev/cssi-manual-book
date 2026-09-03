# Playbook

Development and operations guide for CSSI Manual Book.

---

## First-Time Setup

```bash
# Clone the repo
git clone git@github.com:heulaulab-dev/cssi-manual-book.git
cd cssi-manual-book

# Install dependencies
bun install

# Start dev server
bun run dev
```

Open `http://localhost:3000`.

---

## Daily Development

### Starting work

```bash
git checkout main
git pull origin main
git checkout -b feature/your-name/task-slug

bun run dev
```

### Before committing

Always run the full check suite:

```bash
bun run fix          # auto-format code
bun run typecheck    # type check + MDX codegen
bun run test         # run unit tests
```

### Commit conventions

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add ITQM troubleshooting guide
fix: correct Korean meta.json page order
docs: update authentication getting-started
chore: upgrade fumadocs to 16.15.4
```

---

## Adding Documentation

### New language

1. Create `content/docs/{lang}/` directory
2. Add `meta.json` with page ordering
3. Add `index.mdx` landing page
4. Add app folders (portal, crm, etc.) with `index.mdx` and `meta.json`
5. Update `lib/i18n.ts` to include the new language code
6. Test: `bun run typecheck && bun run test`

### New application docs

1. Create `content/docs/{lang}/app-name/index.mdx`
2. Create `content/docs/{lang}/app-name/meta.json`
3. Add the app to each language's root `meta.json` `pages` array
4. Add a `<Card>` in `content/docs/{lang}/index.mdx`
5. Add the app slug to `test/docs-locale.test.ts` test data

### Page template

```mdx
---
title: App Name
description: Brief description of the application.
---

# App Name

Overview of what this application does.

## Getting Started

Steps to access and use the application.

## Features

### Feature One

Description of feature one.

### Feature Two

Description of feature two.
```

---

## Testing

### Unit tests

```bash
bun run test              # run all tests
bun run test:coverage     # run with coverage report
```

Tests live in `test/` and use Vitest. Existing test files:

- `test/docs-locale.test.ts` — locale routing, page tree, app listing
- `test/urls.test.ts` — URL normalization and active state
- `test/merge-refs.test.ts` — React ref merging utility

### After adding docs

Run the locale test to verify your new pages are picked up:

```bash
bun run test -- test/docs-locale.test.ts
```

If tests fail, update the test expectations in `localizedPageSlugs` and `localizedRootDescriptions`.

---

## Build & Deploy

### Local production build

```bash
bun run build
bun run start
```

### Environment variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | No | API base URL (defaults to self) |

No `.env` file is needed for local development.

### Build troubleshooting

**MDX codegen fails:**
```bash
npx fumadocs-mdx
```

**TypeScript errors after pulling:**
```bash
bun install
bun run typecheck
```

**Stale `.source/` directory:**
```bash
rm -rf .source
bun run typecheck   # regenerates .source/
```

---

## Project Conventions

### File naming

- **kebab-case** for files: `my-component.tsx`, `auth-service.ts`
- **PascalCase** for React components: `export function MyComponent() {}`

### Imports

Always use the `@/` alias — never relative `../../`:

```tsx
// Good
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";

// Bad
import { cn } from "../../lib/cn";
```

### i18n

- Default language: `id` (Bahasa Indonesia)
- Languages: `id`, `en`, `ko`
- URL structure: `/{lang}/docs/{slug}`
- Language detection: directory-based (`/en/docs/...`)

### Content structure

Each language must have identical app folders. If an app exists in English, it must exist in Indonesian and Korean (even if just a stub `index.mdx`).

---

## Key Files Reference

| File | Purpose |
|---|---|
| `lib/i18n.ts` | Language configuration |
| `lib/source.ts` | Fumadocs source loader |
| `content/docs/*/meta.json` | Page ordering per language |
| `source.config.ts` | MDX content directory |
| `next.config.mjs` | Next.js + Fumadocs config |
| `vitest.config.ts` | Test configuration |
| `test/docs-locale.test.ts` | Locale routing tests |

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `bun run dev` shows 404 | Check `lib/i18n.ts` has correct languages |
| New page not appearing | Add to `meta.json` `pages` array |
| Build fails on MDX | Run `npx fumadocs-mdx` to regenerate |
| Tests fail after adding docs | Update `test/docs-locale.test.ts` expectations |
| Type errors | Run `bun run typecheck` — triggers MDX codegen first |
