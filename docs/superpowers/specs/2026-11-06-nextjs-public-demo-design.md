# Next.js Demo Port — Design Spec

Date: 2026-11-06

## Goal

Create a separate, Vercel-deployable Next.js project at `../putrilangit-nextjs` that reproduces the current public PT Putri Langit Sukses website as closely as possible. Keep the Laravel project unchanged. Scope is the public company website only; auth, dashboard, and settings are excluded.

## Current public surface

The existing public entry points are Indonesian `/` and English `/en`. The page includes a responsive header and mobile menu, hero, company profile, product categories/tabs and product detail dialog, advantages/industries/process/Wilo/vision sections, contact methods and footer. It also links to localized PDF company profiles. Existing source material is in `resources/js/pages/welcome.tsx`, `resources/js/components/company-about.tsx`, `resources/js/components/company-sections.tsx`, `resources/js/data/company.ts`, and `resources/css/company.css`; images, fonts, and PDFs are in `public/`.

## Recommended approach

Port the existing React page and its data/styles rather than redesigning it. Use Next.js App Router with static generation/export and React client components only where existing browser interactions require state or DOM APIs. Keep `/` and `/en` as the exact locale paths. Use a standard Vercel-compatible Next build with static output; no Laravel runtime, database, external API, or server-side application state is required.

Copy the relevant site assets to the Next project's `public/` tree, including images, fonts, icons, and both PDF documents. Avoid copying Laravel-only generated assets and auth/settings pages. Preserve the product tab keyboard behavior, modal Escape handling, mobile menu, scroll-section highlighting/reveal behavior, language switching, downloads, and contact links.

## Metadata and routing

Provide localized title, description, canonical, Open Graph locale/title/description/URL, hreflang, Organization/WebSite JSON-LD, favicon, robots, and `sitemap.xml`. Preserve the current official-domain canonical/metadata values from the source unless the user later supplies a demo-domain override. Use static files/routes compatible with Next static export and ensure `/en` resolves as its own generated page.

## Non-goals

- Laravel authentication, register/login, dashboard, profile, settings, or two-factor flows.
- API/database integration or form submission.
- Changing copy, product data, visual identity, official contact details, SEO claims, or the existing Laravel project.
- Deployment to Vercel or publication of a live URL; this project prepares the deployable demo source.

## Verification and acceptance

- Next.js production build completes with static export and no Laravel runtime dependency.
- Both `/` and `/en` are generated and contain localized page content/metadata.
- Local asset references resolve, including product/company photos, fonts, icon, and localized PDFs.
- Product categories and details, mobile menu, language switch, navigation, contact links, and PDF downloads work.
- Visually compare desktop and mobile rendering against the Laravel source and fix material differences.
- The original Laravel working tree is not modified by this port.

## Delivery layout

`../putrilangit-nextjs/` is a standalone project. This spec is stored at `../putrilangit-nextjs/docs/superpowers/specs/2026-11-06-nextjs-public-demo-design.md`. No git commit is made as part of this task.
