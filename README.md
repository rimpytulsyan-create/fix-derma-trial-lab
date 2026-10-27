# Fixderma Trial Lab

A prototype of a **consumer-trial and new-product-development tool** for Fixderma.

> *"See where a new product works best, city by city and climate by climate, before you launch it."*

---

## 1. What the Site Is and Is Not

- **What it is:** A focused prototype demonstrating how regional consumer-use studies (quota-sampled across hot-humid, hot-dry, and temperate climates) establish wearability benchmarks, Wilson 95% confidence intervals, and rule-based launch sequencing before a broad product rollout.
- **What it is not:** An official website of Fixderma India Pvt. Ltd., a medical clinical trial registry, or a live data-collection portal. It contains no forms or submit buttons. All study metrics use seeded sample data.

---

## 2. Site Structure (Five Pages)

Navigation order (no emojis): **Home · Study design · Results · Shopper preview · Collateral**

1. **Home (`/`)**: One screen, clean whitespace. Overview of the trial engine and three core pillars (Independent participants, Every region represented, Honest numbers).
2. **Study design (`/study`)**: Calm, read-only explanation of the protocol for Fixderma Shadow SPF 50+ Gel, demographic quota targets, five static phases, locked endpoints notice, interactive sample size planner, and 95% CI range demonstrator.
3. **Results by region (`/results`)**: The analytical engine. Features the Study week control (Week 0, 2, 4, 8) that dynamically recomputes active cohort rates, conservative rates (counting everyone who started), climate zone breakdowns with shared-axis range bars, a rule-based suggested launch order card, dermatologist panel scores (0 to 3 scale), and the safety log.
4. **Shopper preview (`/shopper`)**: Product page preview showing how completed (Week 8) study results, Wilson confidence intervals, participant mix, and safety reporting appear to everyday shoppers.
5. **Collateral (`/collateral`)**: Clean download cards for the two offline strategy documents.

---

## 3. Brand, Wording & Honesty Rules

- **Brand Name:** Strictly **"Fixderma"** (one word) everywhere.
- **Labeling:** Small neutral "Sample data" chip displayed on every chart and results card.
- **Top Notice:** Quiet single-line header above navigation: *"Concept prototype by Rimpy Tulsyan · Sample data · Not affiliated with Fixderma India Pvt. Ltd."*
- **Excluded Terms:** No medical claims ("healing", "doctor-verified"), no efficacy claims for sunscreens ("protection rate", "favourable protection"), no star ratings, no "Triple blind", no "Intention-to-treat" (phrased as *"counting everyone who started"*), no unsourced comparisons.
- **Voucher Sentence:** Unified across all screens: *"Participants get a ₹500 voucher for completing every check-in, the same for everyone whatever they report."*
- **Safety Log:** Exactly 0 serious reactions and 1 moderate reaction (participant stopped using product; under review by dermatologist panel; never marked "unrelated to product").

---

## 4. The Market Audit PDF & Generator

Market audit data (quick-commerce inventory stockouts, search ranking, pricing unit economics, and 30-60-90 plan) is kept in a separate deliverable: **`Fixderma-Quick-Commerce-Growth-Audit.pdf`** (A4 landscape, max 10 pages).

### Data Kit Directory (`/audit/`)
- `README.md`: Protocol for manual in-app data collection across Blinkit, Zepto, and Instamart.
- `config.json`: Platform definitions, Gurugram and Bengaluru pincodes, competitor lists, and tracked SKU/keyword baskets.
- `availability.csv`: Template with required headers for stockout tracking.
- `search.csv`: Template with required headers for top-10 search rank and sponsored ad flags.
- `commentary.json`: User commentary fields per page.
- `sources.json`: Allowed public industry benchmarks and URLs.

### Generating the PDF
```bash
# Production PDF (requires completed CSVs; refuses to build if empty):
npm run audit:pdf

# Layout preview with diagonal DRAFT watermark:
node scripts/generate-audit-pdf.js --draft
```

---

## 5. Overview Deck & PDF

- Slide deck: 8-slide minimal executive overview.
- Source PPTX: `collateral/source/FixDerma_Trial_Lab_Strategy.pptx`
- Exported PDF: `public/collateral/Fixderma-Trial-Lab-Overview.pdf`
- Rebuild command: `node scripts/generate-deck.js`

---

## 6. Running Tests & Building Locally

```bash
# Run honesty and consistency unit tests
npm test

# Run ESLint
npm run lint

# Compile Next.js production bundle
npm run build
```
