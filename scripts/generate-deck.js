// scripts/generate-deck.js
// Fixderma Trial Lab — 8-Slide Overview Deck & PDF Generator (Section 10)
// Outputs:
// - collateral/source/FixDerma_Trial_Lab_Strategy.pptx
// - public/collateral/Fixderma-Trial-Lab-Overview.pdf

const pptxgen = require('pptxgenjs');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const rootDir = path.resolve(__dirname, '..');
const sourceDir = path.join(rootDir, 'collateral', 'source');
const collateralDir = path.join(rootDir, 'public', 'collateral');

async function buildDeckAndPdf() {
  if (!fs.existsSync(sourceDir)) fs.mkdirSync(sourceDir, { recursive: true });
  if (!fs.existsSync(collateralDir)) fs.mkdirSync(collateralDir, { recursive: true });

  // 1. Generate PPTX
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Rimpy Tulsyan';
  pptx.company = 'Fixderma Trial Lab';
  pptx.title = 'Fixderma Trial Lab — Overview';

  const slidesData = [
    {
      num: 1,
      title: 'Fixderma Trial Lab',
      subtitle: 'See where a new product works best, before you launch it.',
      body: 'A quota-sampled consumer-use testing and regional wearability evaluation engine.',
      footer: 'Concept prototype. Sample data.',
    },
    {
      num: 2,
      title: 'Problem: Small samples give very wide ranges',
      subtitle: 'With 22 people, 22 of 22 saying yes means the true rate could be 85% to 100%.',
      body: 'In contrast, n = 142 provides a tight ±7% margin of error across climates with pre-locked endpoints.',
      speakerNotes: 'Saw a launch survey run on a company’s own employees, without naming the company.',
      footer: 'Concept prototype. Sample data.',
    },
    {
      num: 3,
      title: 'The Idea: Study → Regions → Launch Order',
      subtitle: 'Regional evidence guides distribution before national rollout.',
      body: '1. Structured consumer panel across 3 climate zones.\n2. Weekly blinded photo and wearability reviews.\n3. Rule-based suggested launch order for dark stores and retail.',
      footer: 'Concept prototype. Sample data.',
    },
    {
      num: 4,
      title: 'How a Study Runs: Five Static Phases',
      subtitle: 'Transparent, standardized, DPDP-compliant workflow.',
      body: '• Digital Consent under India DPDP Act\n• Fresh kit arrives at participant residence\n• Structured check-ins at weeks 0, 2, 4, 8\n• Ongoing safety reaction logging\n• Dermatologists score photos without participant details\n\nParticipants get a ₹500 voucher for completing every check-in, the same for everyone whatever they report.',
      footer: 'Concept prototype. Sample data.',
    },
    {
      num: 5,
      title: 'Results by Region: The Engine',
      subtitle: 'Live data progression across hot-humid, hot-dry, and temperate zones.',
      body: '• Temperate: 89% comfortable (95% range: 77–95%)\n• Hot-dry: 81% comfortable (95% range: 69–90%)\n• Hot-humid: 67% comfortable (95% range: 53–79%)\n\nSuggested launch order card rule: Non-overlapping ranges recommend launching in Temperate & Hot-dry first.',
      footer: 'Concept prototype. Sample data.',
    },
    {
      num: 6,
      title: 'Honest Numbers: Shopper Preview',
      subtitle: 'Clear, defensible product page evidence.',
      body: '• Sample size: 142 enrolled, 118 completed\n• Active comfort rate: 79% (95% range: 71–85%)\n• Counting everyone who started: 65%\n• Safety log: 0 serious reactions; 1 moderate reaction reported (participant stopped product)\n• Zero efficacy claims; wearability and comfort only.',
      footer: 'Concept prototype. Sample data.',
    },
    {
      num: 7,
      title: 'Beyond the Lab: The 90-Day Plan',
      subtitle: 'Lifting dark-store availability from 69% to >95%.',
      body: '• Days 1–30: Baseline platform vendor portals and fix core listing basics\n• Days 31–60: Close dark-store gaps in Gurugram & Bengaluru; target ad spend\n• Days 61–90: Scale replenishment SOP and align inventory to Trial Lab regional findings\n\nFull details available in the Quick-Commerce Growth Audit PDF.',
      footer: 'Concept prototype. Sample data.',
    },
    {
      num: 8,
      title: 'Next Step: A 90-Day Pilot on One Launch',
      subtitle: 'Operationalize Trial Lab on a single hero SKU.',
      body: 'Run an end-to-end 90-day pilot on one upcoming formulation across 7 cities, validate wearability across climates, and execute the dark-store growth playbook.',
      footer: 'Concept prototype. Sample data.',
    },
  ];

  for (const s of slidesData) {
    const slide = pptx.addSlide();
    slide.background = { color: 'F9FAFB' };

    slide.addText(`SLIDE ${s.num} OF 8`, {
      x: 0.8,
      y: 0.5,
      w: 4.0,
      h: 0.3,
      fontSize: 8.5,
      fontFace: 'Arial',
      color: '007C87',
      bold: true,
      letterSpacing: 1.5,
    });

    slide.addText(s.title, {
      x: 0.8,
      y: 0.8,
      w: 11.5,
      h: 0.6,
      fontSize: 22,
      fontFace: 'Arial',
      color: '111827',
      bold: true,
    });

    slide.addText(s.subtitle, {
      x: 0.8,
      y: 1.45,
      w: 11.5,
      h: 0.45,
      fontSize: 13,
      fontFace: 'Arial',
      color: '007C87',
      bold: false,
    });

    slide.addText(s.body, {
      x: 0.8,
      y: 2.2,
      w: 11.5,
      h: 4.0,
      fontSize: 12,
      fontFace: 'Arial',
      color: '374151',
      lineSpacingMultiple: 1.4,
    });

    slide.addText(`${s.footer} · Fixderma Trial Lab`, {
      x: 0.8,
      y: 6.7,
      w: 11.5,
      h: 0.3,
      fontSize: 8,
      fontFace: 'Arial',
      color: '9CA3AF',
    });

    if (s.speakerNotes) {
      slide.addNotes(s.speakerNotes);
    }
  }

  const pptxPath = path.join(sourceDir, 'FixDerma_Trial_Lab_Strategy.pptx');
  await pptx.writeFile({ fileName: pptxPath });
  console.log(`Saved source PPTX to: ${pptxPath}`);

  // 2. Generate PDF from HTML
  const deckHtml = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @page { size: A4 landscape; margin: 0; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 0;
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #111827;
    background: #ffffff;
    -webkit-print-color-adjust: exact;
  }
  .slide {
    width: 297mm;
    height: 210mm;
    page-break-after: always;
    padding: 22mm 26mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #F9FAFB;
    border-bottom: 1px solid #E5E7EB;
  }
  .tag { font-size: 8pt; font-weight: 700; color: #007C87; text-transform: uppercase; letter-spacing: 0.1em; }
  h1 { font-size: 24pt; font-weight: 700; color: #111827; margin: 3mm 0 2mm 0; line-height: 1.2; }
  h2 { font-size: 13pt; font-weight: 500; color: #007C87; margin: 0 0 6mm 0; line-height: 1.4; }
  .content { font-size: 11pt; color: #374151; line-height: 1.6; white-space: pre-line; max-width: 230mm; }
  .footer { font-size: 8pt; color: #9CA3AF; border-top: 1px solid #E5E7EB; padding-top: 3mm; display: flex; justify-content: space-between; }
</style>
</head>
<body>
${slidesData
  .map(
    (s) => `
  <div class="slide">
    <div>
      <div class="tag">Slide ${s.num} of 8</div>
      <h1>${s.title}</h1>
      <h2>${s.subtitle}</h2>
      <div class="content">${s.body}</div>
    </div>
    <div class="footer">
      <span>${s.footer}</span>
      <span>Fixderma Trial Lab Overview</span>
    </div>
  </div>
`
  )
  .join('')}
</body>
</html>
`;

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(deckHtml, { waitUntil: 'networkidle' });

  const pdfPath = path.join(collateralDir, 'Fixderma-Trial-Lab-Overview.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    landscape: true,
    printBackground: true,
  });

  await browser.close();
  console.log(`Saved Overview PDF to: ${pdfPath}`);
}

buildDeckAndPdf().catch((err) => {
  console.error('Error generating deck & PDF:', err);
  process.exit(1);
});
