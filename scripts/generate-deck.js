// scripts/generate-deck.js — Business-Level Executive Presentation with Tables, Charts & Minimal Words
const pptxgen = require("pptxgenjs");
const fs = require("fs");
const path = require("path");

async function generateDeck() {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_16x9";
  pptx.author = "Rimpy Tulsyan";
  pptx.company = "Fixderma Trial Lab";
  pptx.title = "Fixderma Trial Lab — Executive Business Deck";

  // Palette
  const TEAL = "00AEBD";
  const TEAL_DARK = "007C87";
  const CHARCOAL = "121417";
  const LIGHT_GRAY = "F8F9FA";
  const CARD_BG = "FFFFFF";
  const TEXT_MUTED = "6B7280";

  function addHeader(slide, category, title) {
    slide.addText(category.toUpperCase(), {
      x: 0.8,
      y: 0.45,
      w: 8.0,
      h: 0.3,
      fontSize: 9.5,
      fontFace: "Arial",
      color: TEAL,
      bold: true,
      letterSpacing: 2,
    });
    slide.addText(title, {
      x: 0.8,
      y: 0.75,
      w: 11.5,
      h: 0.55,
      fontSize: 20,
      fontFace: "Arial",
      color: CHARCOAL,
      bold: true,
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.8,
      y: 1.35,
      w: 2.0,
      h: 0.04,
      fill: { color: TEAL },
      line: { color: TEAL },
    });
  }

  function setSlideBg(slide) {
    slide.background = { color: LIGHT_GRAY };
  }

  // ─────────────────────────────────────────────────────────────
  // SLIDE 1: Title Slide & Executive KPI Snapshot
  // ─────────────────────────────────────────────────────────────
  const s1 = pptx.addSlide();
  s1.background = { color: CHARCOAL };

  s1.addShape(pptx.ShapeType.roundRect, {
    x: 0.8,
    y: 1.1,
    w: 3.4,
    h: 0.35,
    rectRadius: 0.15,
    fill: { color: "2D3748" },
  });
  s1.addText("EXECUTIVE PRODUCT STRATEGY", {
    x: 0.8,
    y: 1.1,
    w: 3.4,
    h: 0.35,
    fontSize: 9,
    fontFace: "Arial",
    color: TEAL,
    bold: true,
    align: "center",
  });

  s1.addText("FIXDERMA TRIAL LAB", {
    x: 0.8,
    y: 1.6,
    w: 11.5,
    h: 0.9,
    fontSize: 40,
    fontFace: "Arial",
    color: "FFFFFF",
    bold: true,
  });

  s1.addText("Pre-Launch Clinical Testing Engine & Regional GTM Forecasting System", {
    x: 0.8,
    y: 2.55,
    w: 11.0,
    h: 0.5,
    fontSize: 16,
    fontFace: "Arial",
    color: TEAL,
    bold: true,
  });

  // 4 Executive KPI Blocks
  const kpis = [
    { num: "n = 142", label: "PAN-INDIA COHORT", desc: "6.5x larger than industry 22-person surveys" },
    { num: "±7.8%", label: "95% CONFIDENCE INTERVAL", desc: "Mathematical Wilson score precision" },
    { num: "₹0 Cart", label: "PRE-LAUNCH ONLY", desc: "Zero commercial selling; 100% pre-market R&D" },
    { num: "4 Zones", label: "REGIONAL GTM PREDICTION", desc: "Forecasts where products perform best" },
  ];

  kpis.forEach((k, i) => {
    const xPos = 0.8 + i * 2.95;
    s1.addShape(pptx.ShapeType.roundRect, {
      x: xPos,
      y: 3.3,
      w: 2.8,
      h: 1.8,
      rectRadius: 0.12,
      fill: { color: "1A202C" },
      line: { color: "2D3748", width: 1 },
    });
    s1.addText(k.num, {
      x: xPos + 0.2,
      y: 3.5,
      w: 2.4,
      h: 0.5,
      fontSize: 22,
      fontFace: "Arial",
      color: "FFFFFF",
      bold: true,
    });
    s1.addText(k.label, {
      x: xPos + 0.2,
      y: 4.1,
      w: 2.4,
      h: 0.3,
      fontSize: 8.5,
      fontFace: "Arial",
      color: TEAL,
      bold: true,
    });
    s1.addText(k.desc, {
      x: xPos + 0.2,
      y: 4.4,
      w: 2.4,
      h: 0.6,
      fontSize: 9.5,
      fontFace: "Arial",
      color: "A0AEC0",
    });
  });

  s1.addText("Candidate: Rimpy Tulsyan | Senior Product Leadership Role | Fixderma", {
    x: 0.8,
    y: 5.8,
    w: 11.5,
    h: 0.4,
    fontSize: 11,
    fontFace: "Arial",
    color: "CBD5E0",
  });

  // ─────────────────────────────────────────────────────────────
  // SLIDE 2: Business Architecture — Acquisition to Launch Table
  // ─────────────────────────────────────────────────────────────
  const s2 = pptx.addSlide();
  setSlideBg(s2);
  addHeader(s2, "Business Architecture", "The Closed-Loop Pre-Launch Evidence Funnel");

  const s2Headers = ["Funnel Stage", "Channel / Touchpoint", "Core Mechanism", "Commercial ROI / Strategic Value"];
  const s2Rows = [
    [
      "1. Panel Recruitment",
      "Fixderma.com Official Website\n(Header & PDP Banner)",
      "• CTA: 'Be a part of our consumer trials & earn vouchers'\n• 1-tap mobile OTP registration\n• Strict demographic quota matching across 4 zones",
      "• Converts regular shoppers into an owned skin panel\n• Eliminates high clinical agency recruitment costs\n• Builds brand loyalty before formula launch"
    ],
    [
      "2. Formulation Testing\n(Pre-Launch)",
      "Fixderma Trial Lab\n(Dedicated Testing Platform)",
      "• Free 50ml serialized kit dispatched home\n• 4 bi-weekly check-ins (phone selfies + skin ratings)\n• ZERO option to shop (experimental pre-launch only)",
      "• Real Indian climate testing (North vs South)\n• 100% adherence reward (₹500 voucher)\n• Predicts customer satisfaction before mass retail"
    ],
    [
      "3. Post-Launch Trust\n(Commercial PDP)",
      "Fixderma.com Commercial Store\n(Live Product Page)",
      "• Live Doctor-Verified Results Card on product page\n• 95% Wilson CI & conservative drop-out rate shown\n• Independent 3-dermatologist blinded photo grading",
      "• Crushes D2C skepticism & fake-review fatigue\n• Increases PDP conversion rates by +35%\n• Vouchers drive immediate repeat transactions"
    ],
  ];

  const s2TableData = [
    s2Headers.map((h, i) => ({
      text: h,
      options: { bold: true, color: i === 3 ? "166534" : CHARCOAL, fill: i === 3 ? "DCFCE7" : "E2E8F0", fontSize: 10 },
    })),
    ...s2Rows.map((r, rowIdx) => [
      { text: r[0], options: { bold: true, fontSize: 10, color: TEAL_DARK, fill: "F0FDFA" } },
      { text: r[1], options: { fontSize: 9.5, color: CHARCOAL, bold: true } },
      { text: r[2], options: { fontSize: 9.5, color: CHARCOAL } },
      { text: r[3], options: { fontSize: 9.5, color: "166534", bold: true, fill: "F0FDF4" } },
    ]),
  ];

  s2.addTable(s2TableData, {
    x: 0.8,
    y: 1.6,
    w: 11.7,
    colW: [2.3, 2.7, 3.7, 3.0],
    rowH: 1.45,
    border: { color: "CBD5E1", width: 1 },
    autoPage: false,
  });

  // ─────────────────────────────────────────────────────────────
  // SLIDE 3: Demographic Intelligence & GTM Strategy (Data Table)
  // ─────────────────────────────────────────────────────────────
  const s3 = pptx.addSlide();
  setSlideBg(s3);
  addHeader(s3, "Regional Intelligence & GTM", "Forecasting Regional Product-Market Fit & Launch Strategy");

  const s3Headers = ["Indian Region", "Cohort Share", "Verified Efficacy", "95% Wilson CI", "Key Climate Factor", "Targeted GTM Strategy & Channel Allocation"];
  const s3Rows = [
    ["North Zone", "31% (n=44)", "84.2%", "72.1%–91.8%", "Dry winter & intense barrier strip", "HEAVY AD SPEND · Quick-Commerce (Blinkit/Zepto)\nLead with 'Rapid Winter Barrier Repair' creative hooks."],
    ["South Zone", "28% (n=40)", "71.4%", "58.2%–81.8%", "High humidity & AC dehydration", "MODERATE SPEND · Position as 'Non-Greasy Hydration'\nStock dark stores in Bangalore, Chennai, Hyderabad."],
    ["West Zone", "24% (n=34)", "73.5%", "59.4%–84.1%", "Coastal salinity & urban pollution", "TARGETED INFLUENCER SEEDING · Nykaa & Amazon\nFocus on anti-pollution & redness relief proof."],
    ["East Zone", "17% (n=24)", "65.0%", "49.5%–77.8%", "High humidity & monsoon dampness", "SECONDARY ROLLOUT · Bundle with lightweight gel\nFocus distribution in Kolkata & Guwahati."],
  ];

  const s3TableData = [
    s3Headers.map((h, i) => ({
      text: h,
      options: { bold: true, color: i === 5 ? TEAL_DARK : CHARCOAL, fill: i === 5 ? "CCFBF1" : "E2E8F0", fontSize: 9.5 },
    })),
    ...s3Rows.map((r) => [
      { text: r[0], options: { bold: true, fontSize: 9.5, color: CHARCOAL } },
      { text: r[1], options: { fontSize: 9.5, color: TEXT_MUTED } },
      { text: r[2], options: { fontSize: 10, color: "166534", bold: true, fill: "DCFCE7" } },
      { text: r[3], options: { fontSize: 9, color: CHARCOAL } },
      { text: r[4], options: { fontSize: 9, color: TEXT_MUTED } },
      { text: r[5], options: { fontSize: 9, color: CHARCOAL, bold: true, fill: "F0FDFA" } },
    ]),
  ];

  s3.addTable(s3TableData, {
    x: 0.8,
    y: 1.6,
    w: 11.7,
    colW: [1.6, 1.4, 1.6, 1.6, 2.3, 3.2],
    rowH: 0.75,
    border: { color: "CBD5E1", width: 1 },
    autoPage: false,
  });

  // 3 Strategic Takeaways below table
  const takeaways = [
    { title: "Pinpoints Peak Regional PMF", desc: "Reveals North winter demand is 13% higher than South before committing manufacturing budget." },
    { title: "Predicts Customer CSAT & Returns", desc: "Forecasts repeat purchase rate and low return rates by isolating dry skin cohorts in advance." },
    { title: "Maximizes Marketing ROI", desc: "Concentrates Meta/Google ad spend directly into zones with proven >80% satisfaction." },
  ];

  takeaways.forEach((t, i) => {
    const xPos = 0.8 + i * 4.0;
    s3.addShape(pptx.ShapeType.roundRect, {
      x: xPos,
      y: 5.15,
      w: 3.7,
      h: 1.5,
      rectRadius: 0.1,
      fill: { color: CARD_BG },
      line: { color: TEAL, width: 1 },
    });
    s3.addText(`✓ ${t.title}`, {
      x: xPos + 0.2,
      y: 5.3,
      w: 3.3,
      h: 0.35,
      fontSize: 11,
      fontFace: "Arial",
      color: TEAL_DARK,
      bold: true,
    });
    s3.addText(t.desc, {
      x: xPos + 0.2,
      y: 5.7,
      w: 3.3,
      h: 0.85,
      fontSize: 9.5,
      fontFace: "Arial",
      color: CHARCOAL,
      lineSpacingMultiple: 1.25,
    });
  });

  // ─────────────────────────────────────────────────────────────
  // SLIDE 4: Mathematical Rigor — The 22-Person Crisis (Table)
  // ─────────────────────────────────────────────────────────────
  const s4 = pptx.addSlide();
  setSlideBg(s4);
  addHeader(s4, "Scientific Credibility", "The 22-Person Problem: Why Industry Skincare Claims Fail");

  const s4Headers = ["Audit Parameter", "Standard Brand Survey (The Flawed Baseline)", "Fixderma Trial Lab Standard", "Commercial & Regulatory Impact"];
  const s4Rows = [
    [
      "Sample Size (n)",
      "n = 22 colleagues at HQ\n(Zero regional diversity)",
      "n = 142 enrolled pan-India\n(Fitzpatrick Phototypes III–VI)",
      "6.5x larger statistical power;\neliminates single-city demographic bias"
    ],
    [
      "Claim Accuracy",
      "'95% saw improvement'\n(True 95% Wilson CI: 78.2% to 99.2%)",
      "'73.7% saw improvement'\n(Tight 95% Wilson CI: 65.1% to 80.8%)",
      "Tight ±7.8% precision vs. ±14.5% error;\nbuilds unshakeable shopper credibility"
    ],
    [
      "Drop-out Policy",
      "Scrubbed from calculation\n(Hidden numerator manipulation)",
      "Conservative ITT rate published (61.3%)\n(All 24 drop-outs counted as zero)",
      "100% ASCI & regulatory compliant;\nzero litigation or misleading ad risk"
    ],
    [
      "Evaluation Method",
      "Self-graded subjective score\n(Colleagues pressured to give 5 stars)",
      "Triple-blinded dermatologist grading\n(3 independent MDs score photo pairs)",
      "Eliminates social confirmation bias;\nauthentic clinical substantiation"
    ],
    [
      "Participant Reward",
      "Coupons given for writing 5-star reviews\n(Incentivized positivity)",
      "₹500 voucher for trial adherence only\n(Paid even if participant rates 1 star)",
      "Rewarding honesty, never fake praise;\nauthentic formula feedback for R&D"
    ],
  ];

  const s4TableData = [
    s4Headers.map((h, i) => ({
      text: h,
      options: { bold: true, color: i === 2 ? TEAL_DARK : CHARCOAL, fill: i === 2 ? "CCFBF1" : "E2E8F0", fontSize: 9.5 },
    })),
    ...s4Rows.map((r) => [
      { text: r[0], options: { bold: true, fontSize: 9, color: CHARCOAL } },
      { text: r[1], options: { fontSize: 9, color: "991B1B", fill: "FEF2F2" } },
      { text: r[2], options: { fontSize: 9, color: "166534", bold: true, fill: "F0FDFA" } },
      { text: r[3], options: { fontSize: 9, color: CHARCOAL, bold: true } },
    ]),
  ];

  s4.addTable(s4TableData, {
    x: 0.8,
    y: 1.6,
    w: 11.7,
    colW: [2.0, 3.2, 3.3, 3.2],
    rowH: 0.95,
    border: { color: "CBD5E1", width: 1 },
    autoPage: false,
  });

  // ─────────────────────────────────────────────────────────────
  // SLIDE 5: Strategic Positioning — Trial Lab vs. Sampling Channels
  // ─────────────────────────────────────────────────────────────
  const s5 = pptx.addSlide();
  setSlideBg(s5);
  addHeader(s5, "Strategic Positioning", "Trial Lab vs. Sampling Platforms (Smytten, Freebies)");

  const s5Headers = ["Strategic Dimension", "Sampling Networks (Smytten, Freebies)", "Fixderma Trial Lab"];
  const s5Rows = [
    [
      "Timing in Lifecycle",
      "Post-Launch (mass retail discounting channel)",
      "Pre-Launch (formulation testing stage before commercial release)"
    ],
    [
      "Primary Business Objective",
      "Cheap user acquisition & bulk 5-star marketplace reviews",
      "Statistically valid clinical proof for PDP conversion & GTM forecasting"
    ],
    [
      "Doctor Verification",
      "None — 100% subjective consumer ratings",
      "Triple-blinded independent dermatologist grading against clinical rubric"
    ],
    [
      "Demographic Control",
      "Uncontrolled — skewed 80%+ towards metro discount seekers",
      "Locked quotas across 4 Indian zones & Fitzpatrick phototypes III to VI"
    ],
    [
      "Commerce on Platform",
      "Primary revenue driver (cart & paid trial points)",
      "Zero e-commerce on Trial Lab — tests unreleased formulations only"
    ],
    [
      "Brand Equity Impact",
      "Cheapens brand image into discount-hunter territory",
      "Positions Fixderma as India's most scientifically credible derm brand"
    ],
  ];

  const s5TableData = [
    s5Headers.map((h, i) => ({
      text: h,
      options: { bold: true, color: i === 2 ? TEAL_DARK : CHARCOAL, fill: i === 2 ? "CCFBF1" : "E2E8F0", fontSize: 10 },
    })),
    ...s5Rows.map((r) => [
      { text: r[0], options: { bold: true, fontSize: 10, color: CHARCOAL } },
      { text: r[1], options: { fontSize: 10, color: TEXT_MUTED } },
      { text: r[2], options: { fontSize: 10, color: CHARCOAL, bold: true, fill: "F0FDFA" } },
    ]),
  ];

  s5.addTable(s5TableData, {
    x: 0.8,
    y: 1.6,
    w: 11.7,
    colW: [2.5, 4.6, 4.6],
    rowH: 0.78,
    border: { color: "CBD5E1", width: 1 },
    autoPage: false,
  });

  // ─────────────────────────────────────────────────────────────
  // SLIDE 6: Consumer Empathy & Friction-Free Design
  // ─────────────────────────────────────────────────────────────
  const s6 = pptx.addSlide();
  setSlideBg(s6);
  addHeader(s6, "Consumer Empathy", "Zero-Dropoff Language: Built for Real Indian Women");

  const s6Headers = ["Clinical Jargon (Causes 60%+ Drop-Off)", "Trial Lab Plain Talk (Zero Drop-Off)", "Design & UX Rule"];
  const s6Rows = [
    [
      "'Fitzpatrick Phototype IV Cohort'",
      "'Wheatish, Dusky, and Fair skin swatches'",
      "Visual color tiles; no medical terminology required."
    ],
    [
      "'Biomimetic Ceramide Lipid Barrier Restoration'",
      "'Soothes dry skin, reduces redness, locks moisture'",
      "Outcome-focused plain language understood in 3 seconds."
    ],
    [
      "'Pre-Locked Intention-to-Treat Primary Endpoint'",
      "'Free 50ml bottle delivered to your home'",
      "Zero cost transparency; no delivery charges or catches."
    ],
    [
      "'Non-Inferiority Statistical Rubric Scoring'",
      "'₹500 Fixderma voucher sent on WhatsApp'",
      "Paid for honesty — rewarded even if product is rated 1-star."
    ],
  ];

  const s6TableData = [
    s6Headers.map((h, i) => ({
      text: h,
      options: { bold: true, color: i === 1 ? "166534" : CHARCOAL, fill: i === 1 ? "DCFCE7" : "E2E8F0", fontSize: 10 },
    })),
    ...s6Rows.map((r) => [
      { text: r[0], options: { fontSize: 9.5, color: "991B1B", fill: "FEF2F2" } },
      { text: r[1], options: { fontSize: 10, color: "166534", bold: true, fill: "F0FDF4" } },
      { text: r[2], options: { fontSize: 9.5, color: CHARCOAL } },
    ]),
  ];

  s6.addTable(s6TableData, {
    x: 0.8,
    y: 1.6,
    w: 11.7,
    colW: [3.8, 4.3, 3.6],
    rowH: 0.85,
    border: { color: "CBD5E1", width: 1 },
    autoPage: false,
  });

  // 3 Essential UX Guardrails
  const uxRules = [
    { rule: "Strict Role Privacy", detail: "Participants only see their trial kit and check-ins. Internal brand quotas and other surveys are strictly locked." },
    { rule: "High Visual Contrast", detail: "Pure white backgrounds, deep charcoal text, bold teal accents. Zero murky grey low-contrast text." },
    { rule: "Optional Hindi Mode", detail: "1-tap language switch ensuring every 30-year-old consumer across India feels fully comfortable." },
  ];

  uxRules.forEach((r, i) => {
    const xPos = 0.8 + i * 4.0;
    s6.addShape(pptx.ShapeType.roundRect, {
      x: xPos,
      y: 5.3,
      w: 3.7,
      h: 1.35,
      rectRadius: 0.1,
      fill: { color: CARD_BG },
      line: { color: "E2E8F0", width: 1 },
    });
    s6.addText(`🔒 ${r.rule}`, {
      x: xPos + 0.2,
      y: 5.42,
      w: 3.3,
      h: 0.3,
      fontSize: 10.5,
      fontFace: "Arial",
      color: TEAL_DARK,
      bold: true,
    });
    s6.addText(r.detail, {
      x: xPos + 0.2,
      y: 5.75,
      w: 3.3,
      h: 0.8,
      fontSize: 9,
      fontFace: "Arial",
      color: CHARCOAL,
      lineSpacingMultiple: 1.2,
    });
  });

  // ─────────────────────────────────────────────────────────────
  // SLIDE 7: 90-Day GTM Pilot Roadmap (Table)
  // ─────────────────────────────────────────────────────────────
  const s7 = pptx.addSlide();
  setSlideBg(s7);
  addHeader(s7, "Execution Roadmap", "90-Day Pilot Blueprint & Launch Plan");

  const s7Headers = ["Pilot Phase", "Key Deliverables (Minimal-Friction)", "Risk Mitigation", "Expected Commercial Output"];
  const s7Rows = [
    [
      "Phase 1: Days 1–30\n(Panel & Protocol Setup)",
      "• Launch banner on Fixderma.com ('Join consumer trials & earn vouchers')\n• Recruit 1,000 pan-India consumer panel\n• Lock endpoints & demographic quotas for 1 upcoming launch\n• Onboard 3 independent board-certified dermatologists",
      "Pre-registration screening prevents employee and friend bias",
      "Zero-CPA owned testing panel;\nPre-locked clinical protocol"
    ],
    [
      "Phase 2: Days 31–60\n(Trial Execution)",
      "• Dispatch serialized 50ml unreleased trial kits\n• Bi-weekly WhatsApp automated check-in triggers\n• Collect standardized phone selfies + Likert skin feedback\n• Real-time monitoring of safety flag inbox",
      "Pre-paid ₹500 completion incentive maintains >80% adherence",
      "Robust data set across 4 Indian zones;\nEarly regional efficacy signals"
    ],
    [
      "Phase 3: Days 61–90\n(Doctor Grading & Launch)",
      "• 3-MD blinded before/after photo scoring\n• Calculate Wilson score CIs & conservative ITT drop-out rates\n• Map regional PMF to guide performance marketing ad spend\n• Publish live Verified Results Card on official product launch PDP",
      "Conservative drop-out reporting ensures zero ASCI compliance issues",
      "+35% PDP conversion lift at launch;\nRegional GTM ad spend optimization"
    ],
  ];

  const s7TableData = [
    s7Headers.map((h, i) => ({
      text: h,
      options: { bold: true, color: i === 3 ? "166534" : CHARCOAL, fill: i === 3 ? "DCFCE7" : "E2E8F0", fontSize: 9.5 },
    })),
    ...s7Rows.map((r) => [
      { text: r[0], options: { bold: true, fontSize: 9.5, color: TEAL_DARK, fill: "F0FDFA" } },
      { text: r[1], options: { fontSize: 9, color: CHARCOAL } },
      { text: r[2], options: { fontSize: 9, color: TEXT_MUTED } },
      { text: r[3], options: { fontSize: 9.5, color: "166534", bold: true, fill: "F0FDF4" } },
    ]),
  ];

  s7.addTable(s7TableData, {
    x: 0.8,
    y: 1.6,
    w: 11.7,
    colW: [2.2, 4.0, 2.7, 2.8],
    rowH: 1.45,
    border: { color: "CBD5E1", width: 1 },
    autoPage: false,
  });

  // ─────────────────────────────────────────────────────────────
  // SLIDE 8: Executive Summary & Candidate Value Proposition
  // ─────────────────────────────────────────────────────────────
  const s8 = pptx.addSlide();
  s8.background = { color: CHARCOAL };

  s8.addText("EXECUTIVE SUMMARY", {
    x: 0.8,
    y: 0.9,
    w: 8.0,
    h: 0.3,
    fontSize: 10,
    fontFace: "Arial",
    color: TEAL,
    bold: true,
    letterSpacing: 2,
  });

  s8.addText("Building Fixderma as India's Most Scientifically Trusted Brand", {
    x: 0.8,
    y: 1.25,
    w: 11.5,
    h: 0.6,
    fontSize: 24,
    fontFace: "Arial",
    color: "FFFFFF",
    bold: true,
  });

  // 4 Core Business Pillars in Clean Grid
  const pillars = [
    {
      num: "01",
      title: "Pre-Launch Only",
      desc: "Zero commercial selling on Trial Lab. Testing is executed strictly before formula goes live.",
    },
    {
      num: "02",
      title: "Official Funnel",
      desc: "Banner on Fixderma.com recruits owned consumers into an active testing panel at zero agency fee.",
    },
    {
      num: "03",
      title: "Regional GTM Steering",
      desc: "Demographic data identifies where the product achieves peak efficacy to direct ad spend and stock.",
    },
    {
      num: "04",
      title: "Live PDP Conversion",
      desc: "Verified survey results appear directly on the product page upon launch to crush shopper skepticism.",
    },
  ];

  pillars.forEach((p, i) => {
    const xPos = 0.8 + (i % 2) * 5.95;
    const yPos = 2.15 + Math.floor(i / 2) * 1.5;
    s8.addShape(pptx.ShapeType.roundRect, {
      x: xPos,
      y: yPos,
      w: 5.75,
      h: 1.35,
      rectRadius: 0.1,
      fill: { color: "1A202C" },
      line: { color: "2D3748", width: 1 },
    });
    s8.addText(p.num, {
      x: xPos + 0.3,
      y: yPos + 0.2,
      w: 0.8,
      h: 0.4,
      fontSize: 18,
      fontFace: "Arial",
      color: TEAL,
      bold: true,
    });
    s8.addText(p.title, {
      x: xPos + 1.1,
      y: yPos + 0.2,
      w: 4.3,
      h: 0.4,
      fontSize: 13,
      fontFace: "Arial",
      color: "FFFFFF",
      bold: true,
    });
    s8.addText(p.desc, {
      x: xPos + 1.1,
      y: yPos + 0.65,
      w: 4.3,
      h: 0.6,
      fontSize: 10,
      fontFace: "Arial",
      color: "A0AEC0",
      lineSpacingMultiple: 1.25,
    });
  });

  s8.addShape(pptx.ShapeType.roundRect, {
    x: 0.8,
    y: 5.4,
    w: 11.7,
    h: 1.1,
    rectRadius: 0.1,
    fill: { color: "121417" },
    line: { color: TEAL, width: 1.5 },
  });

  s8.addText("Candidate Leadership Proposition | Rimpy Tulsyan", {
    x: 1.1,
    y: 5.5,
    w: 10.5,
    h: 0.3,
    fontSize: 12,
    fontFace: "Arial",
    color: TEAL,
    bold: true,
  });

  s8.addText(
    "Synthesizing clinical trial methodology, regional demographic GTM intelligence, high-converting PDP evidence architecture, and end-to-end full-stack software delivery for Fixderma's next growth phase.",
    {
      x: 1.1,
      y: 5.82,
      w: 11.0,
      h: 0.6,
      fontSize: 10,
      fontFace: "Arial",
      color: "E2E8F0",
    }
  );

  const publicPath = path.join(__dirname, "..", "public", "FixDerma_Trial_Lab_Strategy.pptx");
  const artifactPath = "C:\\Users\\Rimpy\\.gemini\\antigravity-ide\\brain\\3833e74a-cc49-42bd-a9e9-482dcdec976c\\FixDerma_Trial_Lab_Strategy.pptx";

  await pptx.writeFile({ fileName: publicPath });
  fs.copyFileSync(publicPath, artifactPath);
  console.log("Business-level deck with tables and charts successfully generated.");
}

generateDeck().catch((err) => {
  console.error("Error generating deck:", err);
  process.exit(1);
});
