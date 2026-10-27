# Codebase Audit & Migration Plan (v4)

Following the Antigravity v4 Brief: "Simplify the website, move the market audit to a PDF".

## Summary of Decisions

- **Website Purpose**: Pure prototype of a consumer-trial and new-product-development tool: *"See where a new product works best, city by city and climate by climate, before you launch it."*
- **Market Audit**: Moved completely out of the website into a standalone PDF: `Fixderma-Quick-Commerce-Growth-Audit.pdf`.
- **Navigation (5 pages, no emojis)**: `Home` · `Study design` · `Results` · `Shopper preview` · `Collateral`
- **Data Integrity**: Single source of truth in `data/sampleData.ts`, product configuration in `lib/products.ts`, audit data kit in `/audit/`, and unit tests enforcing consistency and brand wording rules.

---

## 1. Routes Audit (`app/`)

| Route | Status | Decision & Notes |
|---|---|---|
| `app/page.tsx` | **CHANGE** | Simplify to single-screen hero: *"Know where a new product will work, before you launch it."* Lots of whitespace, 1 primary button ("See a sample study" -> `/results`), 1 quiet link ("How a study runs" -> `/study`), 3 below-the-fold columns. No metrics/dashboards. |
| `app/study/page.tsx` | **NEW** | Calm, read-only study design explainer: The question, quotas table (by climate zone, age, gender, skin type, Fitzpatrick III-VI), static illustrated step cards, locked endpoints badge, interactive sample size planner and range demonstrator. No submit forms. |
| `app/results/page.tsx` | **NEW** | The engine: Product header, Study week control (Week 0, 2, 4, 8), headline result with 95% range & counting everyone who started, breakdown by 3 climate zones (Hot-humid coast, Hot-dry & composite, Temperate), rule-based suggested launch order card, participant mix vs quotas, dermatologist panel scores, safety log. |
| `app/shopper/page.tsx` | **CHANGE** | "What a shopper could see": Clean product preview card for Fixderma Shadow SPF 50+ Gel showing comfort rate, completion, counting everyone who started, participant mix, computed safety counts. Shows placeholder if week < 8. |
| `app/collateral/page.tsx` | **NEW** | Two simple download cards: 1. "Quick-commerce and growth audit (PDF)" (`/collateral/Fixderma-Quick-Commerce-Growth-Audit.pdf`), 2. "Trial Lab overview (PDF)" (`/collateral/Fixderma-Trial-Lab-Overview.pdf`). |
| `app/q-commerce/` | **DELETE & REDIRECT** | Move all quick-commerce OOS content to the audit PDF. Add permanent redirect to `/collateral`. |
| `app/search-ranking/` | **DELETE & REDIRECT** | Move search ranking content to the audit PDF. Add permanent redirect to `/collateral`. |
| `app/pricing-offers/` | **DELETE & REDIRECT** | Move price & pack sizes to the audit PDF. Add permanent redirect to `/collateral`. |
| `app/30-60-90-plan/` | **DELETE & REDIRECT** | Move 30-60-90 plan to the audit PDF (page 8) and overview deck. Add permanent redirect to `/collateral`. |
| `app/deck/` | **DELETE & REDIRECT** | Remove inline PPTX presentation viewer. Add permanent redirect to `/collateral`. |
| `app/brand/` | **DELETE & REDIRECT** | Obsolete brand builder/create pages. Add permanent redirect to `/results`. |
| `app/participant/` | **DELETE** | Remove all non-functional participant sign-up and check-in mock routes. |
| `app/problem/` | **DELETE** | Useful statistical concepts merged into `/study`. |
| `app/comparison/` | **DELETE** | Remove unsourced comparison pages. |
| `app/about/` | **DELETE** | Consolidate any necessary context into quiet header notice & footer. |
| `app/for-hiring-team/`| **DELETE** | Not part of the 5-page structure. |
| `app/reviewer/` | **DELETE** | Derm scoring criteria displayed directly on `/results`. |
| `app/layout.tsx` | **CHANGE** | Add quiet single-line top notice (12px, neutral gray, no orange banner), remove ConceptBanner, clean footer, add `robots: { index: false, follow: false }`. |
| `app/globals.css` | **CHANGE** | Strip gradients, glow animations, orange/gold shimmers. Retain single Fixderma teal accent + neutral grays, clean typography, spacious layout. |

---

## 2. Components Audit (`components/`)

| File / Component | Status | Decision & Notes |
|---|---|---|
| `components/shared/NavBar.tsx` | **CHANGE** | 5 clean text links in exact order: `Home` · `Study design` · `Results` · `Shopper preview` · `Collateral`. No emojis, no role dropdown switcher, no buttons. |
| `components/shared/ConceptBanner.tsx` | **DELETE** | Replaced by quiet top notice in `layout.tsx`. |
| `components/shared/StatBadge.tsx` | **DELETE / CHANGE** | Replace with clean `SampleDataChip` ("Sample data" chip on charts/cards). |
| `components/shared/SampleDataChip.tsx` | **NEW** | Small neutral "Sample data" chip for every chart and results card. |
| `components/shared/LaunchOrderCard.tsx` | **NEW** | Rule-based engine calculating launch order based on Wilson CI overlap between climate zones. |
| `components/shared/WeekControl.tsx` | **NEW** | Segmented control for Week 0, 2, 4, 8 with caption. |

---

## 3. Library & Data Files Audit (`lib/`, `data/`)

| File | Status | Decision & Notes |
|---|---|---|
| `data/seed.ts` | **CHANGE -> MOVE TO data/sampleData.ts** | Reorganize into pure single source of truth `sampleData.ts`. Deterministic records for 142 enrolled participants, check-ins across weeks 0, 2, 4, 8, dermatologist scores (0-3 scale for cast & irritation), and exact safety log (1 moderate reaction, 0 serious). |
| `data/sampleData.ts` | **NEW** | Single source of truth containing participants, week-by-week aggregations, climate zone classifications, and safety log counts. |
| `data/types.ts` | **CHANGE** | Update types to reflect wearability endpoints (comfort rating 1-5, white cast, visible irritation) and remove unused trial creation schemas. |
| `lib/products.ts` | **NEW** | Product catalogue and endpoint validation rule mapping product categories to allowed endpoints (sunscreen cannot measure SPF/protection efficacy in consumer panels). |
| `lib/stats.ts` | **KEEP** | Retain Wilson CI, sample size planner, Cohen's kappa, bootstrap CI, and representativeness score. |
| `lib/config.ts` | **CHANGE** | Set reward constant (₹500 voucher) and standardized wording helpers. |
| `lib/store.ts` | **KEEP / SIMPLIFY**| Week state management (weeks 0, 2, 4, 8). |
| `lib/utils.ts` | **KEEP** | Utility functions (`cn`). |

---

## 4. Audit Data Kit & Deliverables (`audit/`, `scripts/`, `collateral/`)

| Path | Status | Decision & Notes |
|---|---|---|
| `audit/README.md` | **NEW** | Plain-language checklist and protocol for manual app data collection across Blinkit, Zepto, and Instamart. |
| `audit/config.json` | **NEW** | Platforms, pincodes (Gurugram & Bengaluru), competitor list, SKU basket, keyword list. |
| `audit/availability.csv` | **NEW** | Required headers for stock availability tracking. |
| `audit/search.csv` | **NEW** | Required headers for top-10 search rank and sponsored flag. |
| `audit/commentary.json` | **NEW** | Optional user commentary fields per page. |
| `audit/sources.json` | **NEW** | Whitelisted external citations (D2C Insider, BW Retail World, base.blog, afaqs) with full URLs. |
| `scripts/generate-audit-pdf.js` | **NEW** | Playwright-powered generator compiling `Fixderma-Quick-Commerce-Growth-Audit.pdf` (max 10 pages). Fails without real CSV data unless `--draft` is supplied (which applies a "DRAFT: NO REAL DATA" watermark). |
| `scripts/generate-deck.js` | **CHANGE** | Update 8-slide presentation to match v4 simplified structure and output `Fixderma-Trial-Lab-Overview.pdf` into `public/collateral/`, keeping source PPTX in `collateral/source/`. |
| `tests/consistency.test.ts` | **NEW** | Unit tests enforcing: (1) `/shopper` Week 8 matches `/results` Week 8, (2) safety reaction counts match, (3) zero banned words, (4) "Fix Derma" does not appear, (5) Wilson CI formula validity. |

---

## 5. Ambiguity Log & Simplification Choices
- *Ambiguity:* How should `/deck` and old market pages be handled for existing shared links?
  *Choice:* Configure 308 permanent redirects in `next.config.ts` routing `/deck`, `/q-commerce`, `/search-ranking`, `/pricing-offers`, and `/30-60-90-plan` to `/collateral`, and `/brand` to `/results`.
- *Ambiguity:* Should the overview deck be HTML-to-PDF or PPTX export?
  *Choice:* Generate PPTX in `collateral/source/` and export high-resolution PDF `Fixderma-Trial-Lab-Overview.pdf` to `public/collateral/`.
