# Integrated Solutions Section — Design Spec

Date: 2026-11-06

## Goal

Redesign the visual layout of the `SOLUSI TERINTEGRASI` section (`#proses`) so the seven service steps read as one connected journey. Copy, step titles, step order, and section positioning stay unchanged.

## Scope

- In scope: markup for the process steps in `src/components/company-sections.tsx`, and the related `.process-*` styles in `src/app/company.css`.
- Out of scope: `process` data in `src/data/company.ts`, section heading/eyebrow/description copy, other sections, and page routing or metadata.

## Current state

The section renders a heading block followed by `.process-grid`, a single seven-column row. Each `.process-step` holds a numbered circle (`01`–`07`), an arrow icon except on the last step, an `h3` title, and a description. On tablets the grid becomes four columns, and on mobile two columns. Seven narrow columns make each step cramped on desktop, and the arrow icons add noise without conveying flow.

## Design

### Layout

- Desktop (≥ 1024px): a 4-column grid where steps 01–04 fill row one and steps 05–07 fill row two, left-aligned. The second row starts under step 01, giving the group a staggered, zigzag silhouette instead of a rigid seven-up strip.
- The grid uses a consistent 32px column gap and 40px row gap so both rows share the same rhythm.
- Tablet (768–1023px): 2 columns, four rows, with the last cell intentionally empty so the stagger is preserved.
- Mobile (< 768px): single column timeline. Steps stack vertically with the numbered node on the left and content on the right, joined by a continuous vertical connector that stops at the last step.

### Step card

Each step is a bordered card:

- Background `#fff`, border `1px solid #dfe8de`, radius `5px` to match existing cards, padding 26px.
- Top row: a 39px circular numbered node (`01`–`07`) with `1px solid #d1e2d6` border, `#f4f8f2` fill, and `#084f43` text, followed by a hairline connector that extends to the card's right edge on desktop.
- The arrow icons are removed. The connector line carries the flow instead.
- Title uses the existing 15px/600 weight treatment. Description keeps 14px, `#7d887e`, 1.85 line height.
- Hover: border shifts to `#bcd4c5` with a subtle 2px lift and soft shadow, disabled under `prefers-reduced-motion`.

### Connector

A 1px `#d1e2d6` line runs from the right edge of each numbered node toward the next step, horizontally within the card's top row. The final step of each visual run (step 04 and step 07 on desktop) has no trailing line, so the flow reads left-to-right then resets to the next row.

On mobile the connector becomes vertical: a 1px line from the bottom of each node to the node below, omitted after step 07.

### Accessibility and behavior

- Keep the existing `data-scroll-reveal="true"` section behavior unchanged.
- Steps remain plain markup in document order; no interactive controls are added, so no new keyboard behavior is required.
- Numbers stay as visible text (`01`–`07`) so the order is conveyed without relying on the connector line.
- Contrast: existing color tokens meet AA against the white card background; no new color pairs are introduced.

## Verification

- `npm run build` completes with no type or lint errors.
- At 1440px, 1024px, 768px, and 390px widths the section shows 4+3, 4+3, 2-up, and single-column layouts respectively, with no overflow or orphaned connector lines.
- Both `/` and `/en` render the section with correct localized copy.
- Reduced-motion users see no hover lift animation.

## Non-goals

- Rewriting step titles or descriptions.
- Adding icons, imagery, or step metadata such as durations.
- Changing the section heading, eyebrow, or description.
