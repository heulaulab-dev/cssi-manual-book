# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [1.0.0] - 2026-09-03

### Added

- Initial release as standalone repository
- Extracted from `cssi-api-docs/frontend/` into independent `cssi-manual-book` repo
- Next.js 16 (App Router) with Fumadocs 16.15 documentation engine
- Trilingual support: Bahasa Indonesia (default), English, Korean
- Documentation for 6 CSSI applications: Portal, CRM, Flowra, Daily Operation, ITQM, Intranet
- Authentication guides (sign-in, first-time password, forgot password)
- Global search via `/api/search`
- Dark/light theme switching
- Unit tests (Vitest) — 19 tests passing
- Production build verified

### Changed

- Package renamed from `cssi-api-docs-frontend` to `cssi-manual-book`
- README rewritten for standalone repo setup
- `.gitignore` expanded for standalone use (coverage, editor configs)
