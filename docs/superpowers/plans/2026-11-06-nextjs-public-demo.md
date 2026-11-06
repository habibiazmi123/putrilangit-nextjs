# Next.js Public Demo Implementation Plan

> **For agentic workers:** Execute inline task-by-task with verification checkpoints. Steps use checkbox syntax for tracking. Do not modify the Laravel project.

**Goal:** Build a separate Vercel-ready Next.js static export at `../putrilangit-nextjs` that closely matches the existing public Indonesian and English company website.

**Architecture:** Next.js App Router prerenders `/` and `/en`. A client page component hosts the existing interactive experience; public-facing JSX, data, and CSS are ported from the Laravel/Inertia project, with only framework-specific navigation/head behavior replaced. Public assets are copied unchanged; there is no API or Laravel runtime.

**Tech Stack:** Node.js 24.22.1 available locally, npm 11.19.1, Next.js App Router, React, TypeScript, existing Tailwind CSS 4 / Lucide / Radix dialog dependencies as required by copied components.

## Global Constraints

- Keep all new files inside `../putrilangit-nextjs`; do not modify the existing Laravel repository.
- Implement public pages only; exclude auth, dashboard, settings, and database behavior.
- Preserve `/` for Indonesian and `/en` for English, copy, brand, contacts, product data, styling, and existing interactions.
- Build as static output for Vercel; no runtime API/backend dependency.
- Preserve canonical domain values from current source unless instructed otherwise.
- Do not add comments to code.

---

## File Structure

Create the standalone Next project with:

- `package.json`, `package-lock.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `.gitignore`: Next build, static export, TS, lint, ignore configuration.
- `src/app/(id)/layout.tsx`, `src/app/(en)/layout.tsx`: locale-specific HTML shells with correct initial `lang` values.
- `src/app/(id)/page.tsx`, `src/app/(en)/en/page.tsx`: statically rendered locale entries.
- `src/app/globals.css`: shared global styles.
- `public/sitemap.xml`, `public/robots.txt`: static sitemap and robots declarations.
- `src/components/company-site.tsx`: migrated interactive landing-page UI.
- `src/components/company-about.tsx`, `src/components/company-sections.tsx`: migrated focused section components.
- `src/components/ui/dialog.tsx`, `src/lib/utils.ts`: existing Radix dialog styling and `cn` helper if needed.
- `src/data/company.ts`: product, category, service, contact, and translation data.
- `public/images/`, `public/fonts/`, `public/documents/`: source public assets copied without alteration.
- `docs/superpowers/specs/2026-11-06-nextjs-public-demo-design.md`: approved design.
- `docs/superpowers/plans/2026-11-06-nextjs-public-demo.md`: this implementation plan.

## Task 1: Scaffold the isolated Next.js application

**Files:** project configuration files above; `src/app/(id)/layout.tsx`, `src/app/(en)/layout.tsx`, `src/app/globals.css`; local lint/typecheck setup.

- [ ] Create a Next.js App Router project in the absent sibling directory. Use compatible current versions of Next, React, TypeScript, Tailwind 4, lucide-react, Radix Dialog, clsx, and tailwind-merge. Keep dependencies limited to those required by the source implementation.
- [ ] Configure `output: "export"`, trailing-slash policy consistent with `/en`, TypeScript strict mode, `@/*` alias to `src/*`, Tailwind 4 PostCSS plugin, and npm scripts `dev`, `build`, `lint`, `typecheck`.
- [ ] Create root layout with `lang` default, metadata base `https://putrilangitsukses.com`, viewport/theme color, favicon links, and global stylesheet import.
- [ ] Add a minimal app page during scaffold if required to test configuration; do not keep placeholder when locale page task is complete.
- [ ] Run `npm install`, `npm run typecheck`, and `npm run build`; verify export emits an output directory without a server-only feature error.

## Task 2: Port content data, styles, and public assets

**Files:** `src/data/company.ts`, `src/app/globals.css`, `public/images/**`, `public/fonts/**`, `public/documents/**`.

- [ ] Copy `resources/js/data/company.ts` to `src/data/company.ts`, preserving content exactly apart from formatting needed by the selected linter.
- [ ] Copy `resources/css/company.css` into `src/app/globals.css`, keeping all custom styles and font-face paths. Append/import Tailwind 4 directives and only the minimal CSS reset/theme needed by the source page.
- [ ] Copy the existing public image, font, icon, and document asset trees into the sibling project's `public/` directory; exclude Laravel-generated `public/build`, index.php, hot, and unrelated app artifacts.
- [ ] Verify required files such as `building.webp`, `logo.png`, `social-preview.jpg`, product WebPs, both Roboto/Poppins/Instrument Sans font files, and both company profile PDFs exist and preserve byte size/hash from source.
- [ ] Run typecheck and build after CSS/data/assets are introduced.

## Task 3: Migrate the reusable company sections and dialog

**Files:** `src/components/company-about.tsx`, `src/components/company-sections.tsx`, `src/components/ui/dialog.tsx`, `src/lib/utils.ts`.

- [ ] Copy the two company section components and remove only framework-specific import paths; change aliases to `@/data/company`.
- [ ] Copy the Radix dialog and class utility only if needed by the product dialog. Maintain existing accessible dialog semantics and Escape-to-close behavior.
- [ ] Run typecheck and build; fix missing imports without changing rendered content.

## Task 4: Port the interactive page and locale routes

**Files:** `src/components/company-site.tsx`, `src/app/(id)/page.tsx`, `src/app/(en)/en/page.tsx`.

- [ ] Copy the full public welcome page to `company-site.tsx`, mark it as a client component, remove Inertia `Head`/`Link`, and replace locale links with ordinary anchors `/` and `/en`.
- [ ] Preserve section navigation, active section observer, scroll reveal, responsive mobile menu, product tab selection and arrow/Home/End keyboard controls, product dialog, WhatsApp/contact links, phone/email/map links, and localized PDF downloads.
- [ ] Keep all existing page text and product data unchanged. Use `currentYear` render-safe value if necessary to avoid prerender hydration differences.
- [ ] Add `page.tsx` and `en/page.tsx` as static entries passing locale `id` and `en` respectively to the shared page component.
- [ ] Run typecheck and production build; confirm static export contains `/index.html` and `/en/index.html`.

## Task 5: Add static locale metadata and crawl files

**Files:** `src/app/(id)/page.tsx`, `src/app/(en)/en/page.tsx`, `public/sitemap.xml`, `public/robots.txt`, `src/app/(id)/layout.tsx`, `src/app/(en)/layout.tsx`.

- [ ] Add locale-specific title/description, canonical, Open Graph metadata, alternates/hreflang, and Organization/WebSite JSON-LD using source values.
- [ ] Implement static `sitemap.xml` entries for `/` and `/en` with correct language alternates and a robots declaration allowing public indexing.
- [ ] Ensure metadata generation is compatible with static export and does not introduce dynamic routes/server dependencies.
- [ ] Run build and inspect generated HTML for title, description, canonical, `hreflang`, and JSON-LD in both locale outputs; verify sitemap and robots files exist.

## Task 6: Verify interactions and visual parity

**Files:** adjust only files from Tasks 1–5 as needed.

- [ ] Run `npm run lint`, `npm run typecheck`, and `npm run build` from `../putrilangit-nextjs`.
- [ ] Start the production build locally and inspect `/` and `/en` at desktop and mobile viewport widths.
- [ ] Exercise product category tabs, keyboard tab navigation (arrows/Home/End), product dialog open/close/Escape, mobile menu toggle/close, language switch, section anchors, localized PDF links, WhatsApp/email/telephone/map links.
- [ ] Compare source and Next renders and correct material layout, typography, spacing, imagery, and responsive differences without changing content.
- [ ] Verify every local image/font/PDF request resolves; ensure no missing assets or console errors on both routes.
- [ ] Confirm `git -C ../putrilangit status --short` shows only the pre-existing modified source files (do not stage or commit them), and report any verification limitation honestly.

## Acceptance Checklist

- `/` and `/en` statically export with localized content and metadata.
- Vercel static deployment does not need Laravel, PHP, a database, or a long-running server.
- Website visuals and requested interactions mirror the Laravel public site; public assets and PDFs work.
- Original Laravel repo remains unchanged by this implementation.
