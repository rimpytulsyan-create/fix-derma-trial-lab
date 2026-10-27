# Fixderma Trial Lab & Quick-Commerce Growth Intelligence (Concept Prototype)

> **Candidate:** Rimpy Tulsyan  
> **Role Context:** Strategic Product & Growth Leadership Prototype for Fixderma  
> **Product Thesis:** *"Results you can trust, because we show our working."*  
> **Disclaimer:** Illustrative / sample data for demonstration. Concept prototype. Not an official commercial website of Fixderma India Pvt. Ltd. All clinical records and participant profiles are deterministically seeded synthetic data. Designed under the principles of India's Digital Personal Data Protection (DPDP) Act, 2023.

---

## 🔬 What is Fixderma Trial Lab?

Fixderma Trial Lab is an open, statistically sound cosmetic efficacy and quick-commerce growth intelligence platform. It bridges formulation substantiation with commercial execution across quick-commerce dark stores (Blinkit, Zepto, Instamart) and digital marketplaces:
1. **Real Fixderma Hero Products:** Evaluated around **Fixderma Shadow SPF 50+ Gel**, **Fixderma Salyzap Gel for Acne**, and **Fixderma Nigrifix Cream**.
2. **Quota-Sampled Indian Demographics:** Stratified across 6 climatic regions and Fitzpatrick III–VI tones.
3. **Blinded Dermatologist Review:** Board-certified dermatologists evaluate before-and-after photo pairs under standardized clinical rubrics without brand identifiers.
4. **Honest Statistics:** Every claim displays sample size ($n$), 95% Wilson score confidence intervals, and conservative intention-to-treat rates with drop-outs counted.
5. **Quick-Commerce Stock-Out Intelligence (`/q-commerce`):** Live in-stock availability tracking across 15 pin codes in Gurgaon and Bangalore on Blinkit, Zepto, and Instamart.
6. **Search Ranking & Share of Voice (`/search-ranking`):** Organic rank vs sponsored ad positioning for "sunscreen", "gel sunscreen", and "acne gel".
7. **Price per ml & Offers Matrix (`/pricing-offers`):** Unit economics benchmarking against The Derma Co, Minimalist, and Aqualogica.
8. **30-60-90 Day Strategic Plan (`/30-60-90-plan`):** Actionable roadmap to lift availability to >95% and capture Top 2 search rank.

---

## 🧭 Routes & User Journeys

The application features an interactive **"View As"** switcher in the navigation bar to walk each stakeholder experience:

### 1. Strategic Growth & Market Intelligence
- `/q-commerce` — **Quick-Commerce In-Stock Availability Tracker:** 15 pin codes across Gurgaon & Bangalore, dark store fulfillment turnaround, and lost revenue leakage calculator.
- `/search-ranking` — **Search Ranking & Share of Voice:** SERP audit for high-intent skincare queries on Blinkit, Zepto, and Amazon.
- `/pricing-offers` — **Price per ml & Offers Benchmarking:** Cost-per-gram comparison across 40g, 75g, and 150g pack sizes vs direct competitors.
- `/30-60-90-plan` — **30-60-90 Day Strategic Plan:** Candidate Rimpy Tulsyan's roadmap to own product, availability, and growth at Fixderma.

### 2. Clinical & Consumer Integrity
- `/` — **Home:** Value proposition, hero story, live platform stats, and contrast explainer.
- `/problem` — **The 22-Person Problem:** Interactive sample size calculator citing BIS IS 4707 and ASCI Clause 1.4 substantiation standards.
- `/shopper` — **Verified Results PDP:** Live Fixderma Shadow SPF 50+ Gel results card with transparent safety reporting (1 discontinuation out of 142 enrolled, 0 hospitalizations).
- `/comparison` — **vs. Sampling Platforms:** Strategic differentiation matrix contrasting Trial Lab with volume sampling channels (Smytten).
- `/participant` — **Participant Portal (Demo Mode):** Read-only simulated onboarding flow with public registration disabled for brand and legal safety.
- `/deck` — **Executive Presentation (.PPTX):** 8-slide business strategy deck with regional spend allocations and exportable slides.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** Next.js 16 (App Router) with Turbopack
- **Styling:** Tailwind CSS with custom clinical design tokens
- **Icons:** Lucide React
- **State Management:** Zustand
- **Charting:** Recharts with Wilson score intervals
- **Seeded Data:** Deterministic PRNG (`mulberry32`)

---

## 🚀 Running Locally

```bash
npm install
npm run dev
# Open http://localhost:3000
```
