# Quick-Commerce Market Audit Protocol & Data Collection Guide

This kit allows manual, outside-in data collection of Fixderma's presence and availability across Blinkit, Zepto, and Swiggy Instamart.

## Important Rule
**Collect by hand in the consumer apps.** Do not scrape or automate: automated requests breach platform terms of service and result in automated IP blocking.

---

## 1. Scope & Minimum Viable Audit
- **Pincodes**: 10 to 15 pincodes spanning Gurugram (e.g. DLF Phase 1-5, Cyber City, Golf Course Road, Sohna Road) and Bengaluru (e.g. Koramangala, Indiranagar, HSR Layout, Whitefield, Bellandur).
- **Platforms**: 3 platforms (Blinkit, Zepto, Swiggy Instamart).
- **SKUs Tracked**: 6 SKUs:
  1. Fixderma Shadow SPF 50+ Gel (40g)
  2. Fixderma Shadow SPF 50+ Gel (75g)
  3. Fixderma Shadow SPF 50+ Cream
  4. Fixderma Salyzap Gel for Acne
  5. Fixderma Salyzap Daily Face Cleanser
  6. Fixderma 17% Vitamin C Face Serum
- **Keywords Tracked (Top 10 slots each)**:
  - `sunscreen`
  - `sunscreen spf 50`
  - `sunscreen for oily skin`
  - `acne gel`
  - `face wash for acne`
  - `vitamin c serum`

**Estimated Time**: Approximately 2.5 to 3 hours for one auditor across 10 pincodes.

---

## 2. Collection Checklist
1. Open the consumer mobile application (or website in normal browser mode).
2. Set the delivery location pin to the designated pincode.
3. For each of the 6 SKUs:
   - Check if listed and in-stock for delivery.
   - Record `price` (current selling price), `mrp`, `pack_size`, and calculate `discount_pct`.
   - Take a clean screenshot and save it under `audit/screenshots/` (e.g., `blinkit_122002_shadow_40g.png`).
   - Append a row to `availability.csv`.
4. For each of the 6 Keywords:
   - Enter the search query.
   - Record the first 10 items in organic/sponsored order (positions 1 through 10).
   - Note whether each slot has an "Ad" / "Sponsored" badge (`is_sponsored: true/false`).
   - Append one row per slot to `search.csv`.
5. Repeat for the next platform and pincode within the same 2-hour observation window.

---

## 3. Generating the Growth Audit PDF
Run:
```bash
npm run audit:pdf
```
- If `availability.csv` or `search.csv` are empty or have fewer than required rows, the script **refuses to build the final production PDF** and reports missing data.
- To inspect the report design and page templates before data collection is finished, run with `--draft`:
```bash
node scripts/generate-audit-pdf.js --draft
```
This writes a watermarked preview (`DRAFT: NO REAL DATA`) to `collateral/drafts/Fixderma-Quick-Commerce-Growth-Audit-DRAFT.pdf` without modifying production files.
