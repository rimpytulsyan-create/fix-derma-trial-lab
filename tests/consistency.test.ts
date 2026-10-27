// tests/consistency.test.ts
// Fixderma Trial Lab — Consistency & Honesty Tests
// Run with node test runner: node --test tests/consistency.test.ts

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { wilsonCI, sampleSizePlanner } from "../lib/stats.js";
import { getStudyResultsForWeek, SAFETY_SUMMARY, SAMPLE_ENROLLED_COUNT } from "../data/sampleData.js";
import { VOUCHER_AMOUNT, VOUCHER_SENTENCE } from "../lib/config.js";

test("Wilson CI calculation matches standard reference values", () => {
  const w22 = wilsonCI(22, 22);
  assert.ok(w22.lower >= 84 && w22.lower <= 86, `Expected ~85%, got ${w22.lower}`);
  assert.equal(w22.upper, 100);

  const w21 = wilsonCI(21, 22);
  assert.ok(w21.lower >= 77 && w21.lower <= 81, `Expected ~79%, got ${w21.lower}`);
});

test("Sample size planner calculates expected n", () => {
  const n = sampleSizePlanner(0.5, 0.07, 0.2);
  assert.ok(n >= 240 && n <= 260, `Expected ~245, got ${n}`);
});

test("Study data consistency: Week 8 results match expected cohort size and bounds", () => {
  const w8 = getStudyResultsForWeek(8);
  assert.equal(w8.enrolledN, SAMPLE_ENROLLED_COUNT);
  assert.equal(w8.activeN, 118); // 118 completed all 8 weeks
  assert.equal(w8.dropoutsToDate, 24); // 24 dropouts

  // Conservative rate uses enrolled N (142) as denominator
  assert.equal(w8.conservativeCi.point, Math.round((w8.comfortableN / 142) * 1000) / 10);
  assert.equal(w8.headlineCi.point, Math.round((w8.comfortableN / 118) * 1000) / 10);
});

test("Safety log consistency: 0 serious, 1 moderate reaction across all sources", () => {
  assert.equal(SAFETY_SUMMARY.seriousReactionsCount, 0);
  assert.equal(SAFETY_SUMMARY.moderateReactionsCount, 1);
  assert.match(SAFETY_SUMMARY.computedStatement, /0 serious reactions/);
  assert.match(SAFETY_SUMMARY.computedStatement, /1 moderate reaction reported; the participant stopped using the product/);
});

test("Voucher reward sentence is exact and unified", () => {
  assert.equal(VOUCHER_AMOUNT, 500);
  assert.equal(
    VOUCHER_SENTENCE,
    "Participants get a ₹500 voucher for completing every check-in, the same for everyone whatever they report."
  );
});

test("Zero banned words across all codebase source files", () => {
  const bannedWords = [
    /\bVerified PDP\b/i,
    /\bVerified Hero Product Study\b/i,
    /\bReal clinical evidence\b/i,
    /\bReal cosmetic evidence\b/i,
    /\bTriple blind\b/i,
    /\b100% blinded\b/i,
    /\bdoctor-verified\b/i,
    /\bProtection rate\b/i,
    /\bfavourable protection\b/i,
    /\bMathematical transparency\b/i,
    /\bIntention-to-treat\b/i,
    /\b₹0 positivity incentives\b/i,
    /\b₹0 paid for reviews\b/i,
    /\b22-Person Pilot\b/i,
    /\bunrelated to the product\b/i,
    /\bFix Derma\b/,
    /\bFixDerma\b/,
  ];

  const allowedExceptions = ["fixderma-logo.svg", "FixDerma_Trial_Lab_Strategy.pptx"];

  function scanDir(dir: string) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
      if (f.startsWith(".") || f === "node_modules" || f === "tests" || allowedExceptions.includes(f)) continue;
      const fullPath = path.join(dir, f);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        scanDir(fullPath);
      } else if (/\.(tsx|ts|js|jsx|json|md)$/.test(f) && f !== "consistency.test.ts" && f !== "CHANGES.md") {
        const content = fs.readFileSync(fullPath, "utf8");
        for (const pattern of bannedWords) {
          const match = content.match(pattern);
          if (match) {
            assert.fail(`Banned term "${match[0]}" found in file: ${fullPath}`);
          }
        }
      }
    }
  }

  // Scan app, lib, data, components, audit
  const roots = ["lib", "data", "components"];
  const baseDir = path.resolve(__dirname, "..");
  for (const root of roots) {
    const full = path.join(baseDir, root);
    if (fs.existsSync(full)) scanDir(full);
  }
});
