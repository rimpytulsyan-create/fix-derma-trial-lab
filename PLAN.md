# Fixderma Trial Lab & Growth Intelligence — PLAN.md

> Candidate: Rimpy Tulsyan | Concept prototype & strategic growth model for Fixderma | Illustrative / sample data for demonstration

---

## 1. Compliance & Integrity Guidelines (Updated)

| Topic | Decision / Rule |
|---|---|
| **Brand Name** | Strictly **"Fixderma"** (one word, capitalized "F", lowercase "d") across all titles, copy, navigation, buttons, and metadata. |
| **Data Disclaimer** | Explicit banner and pill tags: *"Illustrative / sample data for demonstration"*. Never portray simulated statistics as real clinical records. |
| **Participant Sign-Up Gate** | Live "Join Skin Trial (Earn ₹500)" sign-up form is **completely disabled** into a read-only demo walkthrough. Includes clear notice: *"Demo Walkthrough Only — Public registration is closed. No real participant data collected."* |
| **Medical vs. Cosmetic Claims** | Remove *"Triple blind"*, *"Doctor-verified healing"*, and unqualified *"Clinical trials"*. Replaced with regulatory-compliant cosmetic terminology: *"Dermatologist-evaluated consumer panel"*, *"Independent cosmetic efficacy evaluation"*, and *"Visible skin barrier support & oil control"*. |
| **Data Consistency & Safety** | Safety figures aligned across all dashboards: exactly 1 participant discontinued due to mild contact erythema (accounted for in conservative ITT rates); 0 serious adverse events requiring hospitalization. Rating metrics aligned with Likert distributions (74% marked improvement, 22% moderate improvement, 4% no change/discontinued). |
| **Compensation Transparency** | Clarified as: *"₹0 incentive for positive ratings. Fixed ₹500 store completion voucher provided uniformly to all participants upon completing all check-in weeks, regardless of score or review polarity."* |
| **Hero Products** | Uses real, iconic Fixderma products: **Fixderma Shadow SPF 50+ Gel**, **Fixderma Salyzap Gel for Acne**, and **Fixderma Nigrifix Cream**. |
| **Comparison Sourcing** | Framed against standard Indian cosmetic pilot panels (unstratified 20–30 person sampling without regional/skin-tone quotas) versus Fixderma's stratified 100+ multi-city evaluation model. |

---

## 2. Core Routes Architecture

### A. Clinical & Consumer Evidence Modules
- `/` → Home / Executive Overview with live concept banner & product cards
- `/problem` → The 22-Person Small Panel Problem (interactive methodology comparison)
- `/shopper` → Shopper Verified PDP: **Fixderma Shadow SPF 50+ Gel** with transparent cosmetic evaluation data
- `/participant` → Non-clickable, read-only participant workflow demo with enrollment disabled
- `/participant/profile` → Read-only demo of skin questionnaire
- `/participant/trials` → Browse active simulated evaluation panels
- `/brand` → Brand Evidence Dashboard: enrollment funnels, demographic quotas, adverse event monitoring
- `/reviewer` → Blinded Dermatologist Scoring Queue & photo assessment demo
- `/deck` → Executive Strategy Deck & PowerPoint viewer

### B. New Quick-Commerce & Growth Intelligence Modules
- `/q-commerce` → **Quick-Commerce In-Stock Availability Tracker**:
  - Live tracking of Fixderma products on **Blinkit**, **Zepto**, and **Instamart**.
  - 15 specific pin codes across **Gurgaon** (DLF Phase 1-5, Golf Course Rd, Sohna Rd, Sector 56, Sector 43, Cyber Hub) and **Bangalore** (Indiranagar, Koramangala, HSR Layout, Whitefield, Bellandur, JP Nagar, Jayanagar).
  - Dark store stock-out analysis and estimated revenue loss model.
- `/search-ranking` → **Search Ranking & Share of Voice**:
  - Organic rank vs Sponsored ad positioning for search terms: *"sunscreen"*, *"gel sunscreen"*, *"acne gel"*, *"salicylic acid gel"*.
  - Direct benchmark against The Derma Co, Minimalist, Aqualogica, Dr. Sheth's, and Neutrogena.
- `/pricing-offers` → **Price per ml, Pack Sizes & Offers Matrix**:
  - Comparison of Fixderma Shadow SPF 50+ (40g, 75g, 150g) vs competitor price/ml.
  - Promotional discount tracking, bundle offerings, and sponsored bid intensity.
- `/30-60-90-plan` → **30-60-90 Day Strategic Execution Plan**:
  - Comprehensive roadmap for Rimpy Tulsyan's first 90 days at Fixderma across Q-Commerce Availability, PDP Evidence, Search Ranking, and Retention.

---

## 3. Product Catalog (Real Fixderma Hero Products)

1. **Fixderma Shadow SPF 50+ Gel**
   - Category: Sun Protection
   - Key Actives: Octinoxate, Titanium Dioxide, Avobenzone
   - Claim: Broad-spectrum UVA/UVB protection, non-greasy matte finish, water-resistant
   - Real Pack Sizes: 40g (₹275), 75g (₹495), 150g (₹795)
2. **Fixderma Salyzap Gel for Acne**
   - Category: Acne & Oil Control
   - Key Actives: Salicylic Acid 1.5%, Nicotinamide (Vitamin B3) 4%, Allantoin, Tea Tree Oil
   - Claim: Clears active acne breakouts, regulates sebum, non-comedogenic
   - Real Pack Sizes: 20g (₹290), 50g (₹550)
3. **Fixderma Nigrifix Cream**
   - Category: Targeted Pigmentation
   - Key Actives: Retinol, Lactic Acid, Urea, Tea Tree Oil
   - Claim: Exfoliates and lightens dark, velvety patches (Acanthosis Nigricans)
   - Real Pack Sizes: 50g (₹550), 100g (₹875)

---

## 4. Execution Plan & Milestones

- [x] **Milestone 1**: Update `PLAN.md` with all brand naming, non-medical guidelines, product catalogs, and q-commerce specs.
- [ ] **Milestone 2**: Setup Git repository (`fix-derma-trial-lab`), configure remotes for `rimpytulsyan-create`, and create initial commit.
- [ ] **Milestone 3**: Global text & brand updates (change "Fix Derma" to "Fixderma", update disclaimer to "Illustrative / sample data for demonstration").
- [ ] **Milestone 4**: Disable participant sign-up into a non-clickable demo flow with clear notice.
- [ ] **Milestone 5**: Update trial data to use real Fixderma products (Shadow SPF 50+ Gel & Salyzap Gel) and reconcile all contradiction numbers (safety, ratings, vouchers).
- [ ] **Milestone 6**: Build the Quick-Commerce In-Stock Availability Tracker (`/q-commerce`), Search Ranking & Share of Voice (`/search-ranking`), Pricing & Offers Matrix (`/pricing-offers`), and 30-60-90 Day Plan (`/30-60-90-plan`).
- [ ] **Milestone 7**: Update navigation bar and homepage cards to seamlessly connect all new and updated modules.
- [ ] **Milestone 8**: Build test & validation (`npm run build`).
- [ ] **Milestone 9**: Push to GitHub repository and deploy live to Vercel on `rimpy.tulsyan@gmail.com`.
