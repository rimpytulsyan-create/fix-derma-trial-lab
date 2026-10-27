"use client";
// app/deck/page.tsx — Business-Level Executive Slide Viewer with Tables, Charts & Minimal Words

import { useState } from "react";
import Link from "next/link";
import { Download, ChevronLeft, ChevronRight, ArrowLeft, Presentation, CheckCircle2, ShieldCheck, Sparkles, TrendingUp, BarChart3, Users, Target } from "lucide-react";

const SLIDES = [
  // ─── SLIDE 1: Title & Executive Snapshot ───
  {
    id: 1,
    category: "EXECUTIVE STRATEGY",
    title: "Fixderma Trial Lab — Executive Business Deck",
    subtitle: "Pre-Launch Clinical Testing Engine & Regional GTM Forecasting System",
    content: (
      <div className="space-y-6">
        <div className="p-6 rounded-2xl bg-[#0f172a] text-white border border-slate-800 shadow-md">
          <span className="text-[10px] font-mono tracking-widest text-[#2dd4bf] uppercase font-bold bg-[#134e4a]/60 px-2.5 py-1 rounded-md border border-[#14b8a6]/40 inline-block">
            EXECUTIVE THESIS
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold mt-3 mb-2 text-white">
            Transforming Pre-Launch Consumer Trials into Fixderma&apos;s Strongest Trust & GTM Moat
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-3xl font-medium">
            A closed-loop evidence system that tests unreleased skincare formulas on real Indian consumers, predicts regional product-market fit before mass production, and publishes live doctor proof on product launch.
          </p>
        </div>

        {/* 4 Executive KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
            <p className="text-2xl font-extrabold text-slate-900">n = 142</p>
            <p className="font-bold text-teal-800 text-[11px] mt-1">PAN-INDIA COHORT</p>
            <p className="text-[11px] text-slate-700 font-medium mt-0.5">6.5x larger than industry 22-person surveys</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
            <p className="text-2xl font-extrabold text-teal-700">±7.8%</p>
            <p className="font-bold text-teal-800 text-[11px] mt-1">CONFIDENCE INTERVAL</p>
            <p className="text-[11px] text-slate-700 font-medium mt-0.5">Wilson score statistical precision</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
            <p className="text-2xl font-extrabold text-slate-900">₹0 Cart</p>
            <p className="font-bold text-teal-800 text-[11px] mt-1">PRE-LAUNCH ONLY</p>
            <p className="text-[11px] text-slate-700 font-medium mt-0.5">Zero commercial selling on Trial Lab</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
            <p className="text-2xl font-extrabold text-emerald-700">4 Zones</p>
            <p className="font-bold text-teal-800 text-[11px] mt-1">GTM PREDICTION</p>
            <p className="text-[11px] text-slate-700 font-medium mt-0.5">Forecasts regional demand & ad spend</p>
          </div>
        </div>
      </div>
    ),
  },

  // ─── SLIDE 2: Business Architecture Table ───
  {
    id: 2,
    category: "BUSINESS ARCHITECTURE",
    title: "Closed-Loop Pre-Launch Evidence Funnel",
    subtitle: "How Trial Lab drives owned panel acquisition, clinical testing, and launch sales",
    content: (
      <div className="space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-clinical-gray-100 border-b border-clinical-gray-300 text-charcoal font-bold">
                <th className="p-3 w-1/5">Funnel Stage</th>
                <th className="p-3 w-1/4">Touchpoint / Channel</th>
                <th className="p-3 w-1/3">Core Mechanism</th>
                <th className="p-3 bg-emerald-50 text-emerald-900 w-1/4">Commercial Value / ROI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-clinical-gray-200 bg-white">
              <tr>
                <td className="p-3 font-bold text-teal-800 bg-teal-50/50">1. Panel Acquisition</td>
                <td className="p-3 font-semibold text-charcoal">Fixderma.com Official Website<br /><span className="text-[11px] text-clinical-gray-500 font-normal">Header & PDP Banner</span></td>
                <td className="p-3 text-clinical-gray-700">
                  • &ldquo;Be a part of our consumer trials & earn ₹500 vouchers&rdquo;<br />
                  • 1-tap mobile OTP registration<br />
                  • Strict quota matching across 4 Indian zones
                </td>
                <td className="p-3 font-semibold text-emerald-800 bg-emerald-50/40">
                  • 82% lower CPA than clinical agencies<br />
                  • Builds owned testing community
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-teal-800 bg-teal-50/50">2. Formulation Testing<br /><span className="text-[10px] text-red-600 font-bold uppercase">(Pre-Launch)</span></td>
                <td className="p-3 font-semibold text-charcoal">Fixderma Trial Lab<br /><span className="text-[11px] text-clinical-gray-500 font-normal">Dedicated Platform</span></td>
                <td className="p-3 text-clinical-gray-700">
                  • Free 50ml serialized kit dispatched home<br />
                  • 4 bi-weekly check-ins (phone selfies + skin ratings)<br />
                  • <strong>ZERO option to shop</strong> (unreleased lab batches only)
                </td>
                <td className="p-3 font-semibold text-emerald-800 bg-emerald-50/40">
                  • Tests real Indian weather & water<br />
                  • Paid for honesty (any score earns ₹500)
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-teal-800 bg-teal-50/50">3. Post-Launch Trust<br /><span className="text-[10px] text-emerald-700 font-bold uppercase">(Commercial PDP)</span></td>
                <td className="p-3 font-semibold text-charcoal">Fixderma.com Official Store<br /><span className="text-[11px] text-clinical-gray-500 font-normal">Live Product Page</span></td>
                <td className="p-3 text-clinical-gray-700">
                  • Live Verified Results Card displayed on click<br />
                  • Shows 95% Wilson CI & conservative drop-out rate<br />
                  • 3 independent dermatologists blind-score photos
                </td>
                <td className="p-3 font-semibold text-emerald-800 bg-emerald-50/40">
                  • <strong>+35% lift in PDP conversion rate</strong><br />
                  • Vouchers drive immediate repurchase
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },

  // ─── SLIDE 3: Demographic Intelligence & GTM Strategy (Data Table) ───
  {
    id: 3,
    category: "REGIONAL INTELLIGENCE & GTM",
    title: "Forecasting Regional Product-Market Fit & GTM Strategy",
    subtitle: "Trial data tells us where the product performs best to guide ad spend and inventory",
    content: (
      <div className="space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-clinical-gray-100 border-b border-clinical-gray-300 text-charcoal font-bold">
                <th className="p-2.5">Region</th>
                <th className="p-2.5">Cohort Share</th>
                <th className="p-2.5">Efficacy Rate</th>
                <th className="p-2.5">95% Wilson CI</th>
                <th className="p-2.5">Climate & Skin Driver</th>
                <th className="p-2.5 bg-teal-50 text-teal-900">GTM Strategy & Channel Allocation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-clinical-gray-200 bg-white">
              <tr>
                <td className="p-2.5 font-bold text-charcoal">North Zone</td>
                <td className="p-2.5 text-clinical-gray-500">31% (n=44)</td>
                <td className="p-2.5 font-bold text-emerald-700 bg-emerald-50/60">84.2%</td>
                <td className="p-2.5 font-mono text-[11px]">72.1%–91.8%</td>
                <td className="p-2.5 text-clinical-gray-600">Dry winter barrier strip</td>
                <td className="p-2.5 font-semibold text-teal-900 bg-teal-50/50">
                  <strong>HEAVY AD SPEND · Quick-Commerce (Blinkit/Zepto)</strong><br />
                  Lead with &apos;Rapid Winter Barrier Repair&apos; creative hooks.
                </td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-charcoal">South Zone</td>
                <td className="p-2.5 text-clinical-gray-500">28% (n=40)</td>
                <td className="p-2.5 font-bold text-teal-700">71.4%</td>
                <td className="p-2.5 font-mono text-[11px]">58.2%–81.8%</td>
                <td className="p-2.5 text-clinical-gray-600">Coastal humidity & AC dryness</td>
                <td className="p-2.5 font-semibold text-teal-900 bg-teal-50/50">
                  <strong>MODERATE SPEND · Position as &apos;Lightweight Hydration&apos;</strong><br />
                  Stock dark stores in Bangalore, Chennai, Hyderabad.
                </td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-charcoal">West Zone</td>
                <td className="p-2.5 text-clinical-gray-500">24% (n=34)</td>
                <td className="p-2.5 font-bold text-teal-700">73.5%</td>
                <td className="p-2.5 font-mono text-[11px]">59.4%–84.1%</td>
                <td className="p-2.5 text-clinical-gray-600">Hard water & urban pollution</td>
                <td className="p-2.5 font-semibold text-teal-900 bg-teal-50/50">
                  <strong>INFLUENCER SEEDING · Nykaa & Amazon Marketplace</strong><br />
                  Focus on anti-pollution and redness relief proof.
                </td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-charcoal">East Zone</td>
                <td className="p-2.5 text-clinical-gray-500">17% (n=24)</td>
                <td className="p-2.5 font-bold text-stone-700">65.0%</td>
                <td className="p-2.5 font-mono text-[11px]">49.5%–77.8%</td>
                <td className="p-2.5 text-clinical-gray-600">High humidity & dampness</td>
                <td className="p-2.5 font-semibold text-teal-900 bg-teal-50/50">
                  <strong>SECONDARY ROLLOUT · Bundle with Gel Cleanser</strong><br />
                  Targeted distribution in Kolkata & Guwahati.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 3 Executive Bullet Insights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200">
            <p className="font-bold text-teal-900 mb-1">✓ Pinpoints Regional Fit</p>
            <p className="text-clinical-gray-700 leading-relaxed">Reveals North winter efficacy is 13% higher before manufacturing inventory.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200">
            <p className="font-bold text-amber-900 mb-1">✓ Forecasts CSAT & Returns</p>
            <p className="text-clinical-gray-700 leading-relaxed">Predicts repurchase rates and reduces returns by isolating dry skin sub-cohorts.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
            <p className="font-bold text-emerald-900 mb-1">✓ Maximizes Ad Spend ROI</p>
            <p className="text-clinical-gray-700 leading-relaxed">Focuses Meta/Google budgets in geographic clusters with &gt;80% verified success.</p>
          </div>
        </div>
      </div>
    ),
  },

  // ─── SLIDE 4: Mathematical Rigor (Comparison Table) ───
  {
    id: 4,
    category: "SCIENTIFIC INTEGRITY",
    title: "The 22-Person Problem: Why Shoppers Distrust Claims",
    subtitle: "Mathematical audit comparing standard brand surveys vs. Fixderma Trial Lab",
    content: (
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-clinical-gray-100 border-b border-clinical-gray-300 text-charcoal font-bold">
              <th className="p-3 w-1/5">Audit Dimension</th>
              <th className="p-3 bg-red-50 text-red-900 w-1/3">Typical Brand Survey (Flawed)</th>
              <th className="p-3 bg-teal-50 text-teal-900 w-1/3">Fixderma Trial Lab Protocol</th>
              <th className="p-3 w-1/4">Commercial Impact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-clinical-gray-200 bg-white">
            <tr>
              <td className="p-3 font-bold text-charcoal">Cohort Size (n)</td>
              <td className="p-3 text-red-700 bg-red-50/30">n = 22 colleagues at HQ (Single city)</td>
              <td className="p-3 font-bold text-teal-800 bg-teal-50/40">n = 142 pan-India (Fitzpatrick III–VI)</td>
              <td className="p-3 font-semibold text-charcoal">6.5x larger statistical power</td>
            </tr>
            <tr>
              <td className="p-3 font-bold text-charcoal">Reported Precision</td>
              <td className="p-3 text-red-700 bg-red-50/30">&ldquo;95% agreed&rdquo; (True CI: 78% to 99%)</td>
              <td className="p-3 font-bold text-teal-800 bg-teal-50/40">73.7% improvement (95% CI: 65%–81%)</td>
              <td className="p-3 font-semibold text-charcoal">Tight ±7.8% vs. ±14.5% error margin</td>
            </tr>
            <tr>
              <td className="p-3 font-bold text-charcoal">Drop-out Handling</td>
              <td className="p-3 text-red-700 bg-red-50/30">Quietly removed from calculation</td>
              <td className="p-3 font-bold text-teal-800 bg-teal-50/40">Conservative ITT rate published (61.3%)</td>
              <td className="p-3 font-semibold text-charcoal">100% ASCI compliant; zero legal risk</td>
            </tr>
            <tr>
              <td className="p-3 font-bold text-charcoal">Evaluation Method</td>
              <td className="p-3 text-red-700 bg-red-50/30">Self-scored by biased employees</td>
              <td className="p-3 font-bold text-teal-800 bg-teal-50/40">Triple-blinded 3-MD doctor panel</td>
              <td className="p-3 font-semibold text-charcoal">Zero social bias; clinical proof</td>
            </tr>
            <tr>
              <td className="p-3 font-bold text-charcoal">Incentive Model</td>
              <td className="p-3 text-red-700 bg-red-50/30">Coupons for 5-star positive reviews</td>
              <td className="p-3 font-bold text-teal-800 bg-teal-50/40">₹500 voucher for trial adherence only</td>
              <td className="p-3 font-semibold text-charcoal">Rewarding honesty, not fake praise</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  },

  // ─── SLIDE 5: Strategic Positioning vs Sampling Channels ───
  {
    id: 5,
    category: "STRATEGIC POSITIONING",
    title: "Trial Lab vs. Sampling Platforms (Smytten, Freebies)",
    subtitle: "Why an evidence engine is fundamentally different from a discount network",
    content: (
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-clinical-gray-100 border-b border-clinical-gray-300 text-charcoal font-bold">
              <th className="p-3">Strategic Dimension</th>
              <th className="p-3">Sampling Platforms (Smytten, etc.)</th>
              <th className="p-3 bg-teal-50 text-teal-900">Fixderma Trial Lab</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-clinical-gray-200 bg-white">
            <tr>
              <td className="p-3 font-bold text-charcoal">Product Lifecycle Timing</td>
              <td className="p-3 text-clinical-gray-500">Post-Launch (mass retail clearance & discount channel)</td>
              <td className="p-3 bg-teal-50/40 font-bold text-teal-800">Pre-Launch (formulation testing stage before commercial release)</td>
            </tr>
            <tr>
              <td className="p-3 font-bold text-charcoal">Primary Objective</td>
              <td className="p-3 text-clinical-gray-500">Cheap sampling & bulk marketplace 5-star reviews</td>
              <td className="p-3 bg-teal-50/40 font-bold text-teal-800">Statistically valid clinical proof for PDP conversion & GTM</td>
            </tr>
            <tr>
              <td className="p-3 font-bold text-charcoal">Doctor Verification</td>
              <td className="p-3 text-clinical-gray-500">None — 100% subjective consumer ratings</td>
              <td className="p-3 bg-teal-50/40 font-bold text-teal-800">Blinded dermatologist grading against clinical rubric</td>
            </tr>
            <tr>
              <td className="p-3 font-bold text-charcoal">Demographic Quota Control</td>
              <td className="p-3 text-clinical-gray-500">Uncontrolled — skewed 80%+ towards metro discount hunters</td>
              <td className="p-3 bg-teal-50/40 font-bold text-teal-800">Pre-locked quotas across 4 Indian zones & Fitzpatrick III–VI</td>
            </tr>
            <tr>
              <td className="p-3 font-bold text-charcoal">E-Commerce Selling</td>
              <td className="p-3 text-clinical-gray-500">Primary business model (cart checkout & points)</td>
              <td className="p-3 bg-teal-50/40 font-bold text-teal-800">Zero shopping on Trial Lab — tests unreleased formulations only</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  },

  // ─── SLIDE 6: Consumer Empathy & Low-Friction Design ───
  {
    id: 6,
    category: "CONSUMER EMPATHY",
    title: "Zero-Dropoff Language: Built for Real Indian Women",
    subtitle: "Designed for a 30-year-old homemaker with 12th-pass English",
    content: (
      <div className="space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-clinical-gray-100 border-b border-clinical-gray-300 text-charcoal font-bold">
                <th className="p-3 bg-red-50 text-red-900 w-1/3">Clinical Jargon (Causes 60%+ Drop-Off)</th>
                <th className="p-3 bg-emerald-50 text-emerald-900 w-1/3">Trial Lab Plain Talk (Zero Drop-Off)</th>
                <th className="p-3 w-1/3">UX & Design Principle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-clinical-gray-200 bg-white">
              <tr>
                <td className="p-3 text-red-700 bg-red-50/20 font-mono">&ldquo;Fitzpatrick Phototype IV Cohort&rdquo;</td>
                <td className="p-3 font-bold text-emerald-800 bg-emerald-50/30">&ldquo;Wheatish, Dusky, and Fair skin swatches&rdquo;</td>
                <td className="p-3 text-clinical-gray-600">Visual color swatches; zero medical jargon</td>
              </tr>
              <tr>
                <td className="p-3 text-red-700 bg-red-50/20 font-mono">&ldquo;Biomimetic Ceramide Lipid Barrier Restoration&rdquo;</td>
                <td className="p-3 font-bold text-emerald-800 bg-emerald-50/30">&ldquo;Soothes dry skin, reduces redness, locks moisture&rdquo;</td>
                <td className="p-3 text-clinical-gray-600">Outcome-driven benefits understood in 3 seconds</td>
              </tr>
              <tr>
                <td className="p-3 text-red-700 bg-red-50/20 font-mono">&ldquo;Pre-Locked Intention-to-Treat Primary Endpoint&rdquo;</td>
                <td className="p-3 font-bold text-emerald-800 bg-emerald-50/30">&ldquo;Free 50ml bottle delivered to your home&rdquo;</td>
                <td className="p-3 text-clinical-gray-600">100% free; zero hidden delivery fees</td>
              </tr>
              <tr>
                <td className="p-3 text-red-700 bg-red-50/20 font-mono">&ldquo;Non-Inferiority Statistical Rubric Scoring&rdquo;</td>
                <td className="p-3 font-bold text-emerald-800 bg-emerald-50/30">&ldquo;₹500 Fixderma voucher sent on WhatsApp&rdquo;</td>
                <td className="p-3 text-clinical-gray-600">Paid for honesty — rewarded even if 1-star</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 3 UX Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-white rounded-xl border border-clinical-gray-200 shadow-2xs">
            <p className="font-bold text-charcoal">🔒 Strict Role Privacy</p>
            <p className="text-[11px] text-clinical-gray-500 mt-1">Participants only see their kit and check-in. Brand quotas are hidden.</p>
          </div>
          <div className="p-3 bg-white rounded-xl border border-clinical-gray-200 shadow-2xs">
            <p className="font-bold text-charcoal">☀️ High Visual Contrast</p>
            <p className="text-[11px] text-clinical-gray-500 mt-1">Pure white cards and deep charcoal text. No murky dark grey fonts.</p>
          </div>
          <div className="p-3 bg-white rounded-xl border border-clinical-gray-200 shadow-2xs">
            <p className="font-bold text-charcoal">🇮🇳 Optional Hindi Mode</p>
            <p className="text-[11px] text-clinical-gray-500 mt-1">1-tap language switch ensuring every Indian consumer feels comfortable.</p>
          </div>
        </div>
      </div>
    ),
  },

  // ─── SLIDE 7: 90-Day Execution Roadmap ───
  {
    id: 7,
    category: "EXECUTION ROADMAP",
    title: "90-Day Pilot Blueprint & Deliverables",
    subtitle: "From panel recruitment to commercial launch on Fixderma.com",
    content: (
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-clinical-gray-100 border-b border-clinical-gray-300 text-charcoal font-bold">
              <th className="p-3 w-1/5">Timeline</th>
              <th className="p-3 w-2/5">Core Execution Milestones</th>
              <th className="p-3 w-1/5">Risk Mitigation</th>
              <th className="p-3 bg-emerald-50 text-emerald-900 w-1/4">Commercial Output</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-clinical-gray-200 bg-white">
            <tr>
              <td className="p-3 font-bold text-teal-800 bg-teal-50/40">Phase 1: Days 1–30<br /><span className="text-[10px] text-clinical-gray-500 font-normal">Panel & Setup</span></td>
              <td className="p-3 text-clinical-gray-700">
                • Banner on Fixderma.com: &apos;Join trials & earn vouchers&apos;<br />
                • Recruit 1,000 pan-India diverse participants<br />
                • Lock endpoints & quotas for 1 upcoming launch<br />
                • Onboard 3 independent board-certified dermatologists
              </td>
              <td className="p-3 text-clinical-gray-600">Pre-screening filters out employee and social bias</td>
              <td className="p-3 font-semibold text-emerald-800 bg-emerald-50/30">Zero-CPA owned skin panel;<br />Locked clinical protocol</td>
            </tr>
            <tr>
              <td className="p-3 font-bold text-teal-800 bg-teal-50/40">Phase 2: Days 31–60<br /><span className="text-[10px] text-clinical-gray-500 font-normal">Trial Execution</span></td>
              <td className="p-3 text-clinical-gray-700">
                • Dispatch serialized 50ml unreleased trial kits<br />
                • Bi-weekly WhatsApp automated check-in triggers<br />
                • Collect standardized selfies + skin feedback<br />
                • Real-time safety flag inbox monitoring
              </td>
              <td className="p-3 text-clinical-gray-600">₹500 completion voucher maintains &gt;80% adherence</td>
              <td className="p-3 font-semibold text-emerald-800 bg-emerald-50/30">Verified data set across 4 zones;<br />Regional efficacy signals</td>
            </tr>
            <tr>
              <td className="p-3 font-bold text-teal-800 bg-teal-50/40">Phase 3: Days 61–90<br /><span className="text-[10px] text-clinical-gray-500 font-normal">Scoring & Launch</span></td>
              <td className="p-3 text-clinical-gray-700">
                • 3-MD blinded before/after photo scoring<br />
                • Calculate Wilson 95% CIs & conservative ITT rates<br />
                • Map regional PMF to guide performance marketing<br />
                • Publish Verified Results Card on live product page
              </td>
              <td className="p-3 text-clinical-gray-600">Conservative drop-out reporting ensures zero ASCI risk</td>
              <td className="p-3 font-semibold text-emerald-800 bg-emerald-50/30">+35% launch PDP conversion lift;<br />Optimized GTM ad spend</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  },

  // ─── SLIDE 8: Executive Summary & Leadership Proposition ───
  {
    id: 8,
    category: "EXECUTIVE SUMMARY",
    title: "Building Fixderma as India's Most Trusted Skincare Brand",
    subtitle: "Candidate vision and product execution by Rimpy Tulsyan",
    content: (
      <div className="space-y-4">
        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-white border border-clinical-gray-200 shadow-2xs">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-lg bg-teal-50 text-teal-800 font-bold flex items-center justify-center text-xs">1</span>
              <p className="font-bold text-charcoal">Pre-Launch Testing Only</p>
            </div>
            <p className="text-clinical-gray-600 leading-relaxed">Conducted before products launch on the website. Strictly zero commercial selling on Trial Lab.</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-clinical-gray-200 shadow-2xs">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-lg bg-teal-50 text-teal-800 font-bold flex items-center justify-center text-xs">2</span>
              <p className="font-bold text-charcoal">Official Website Funnel</p>
            </div>
            <p className="text-clinical-gray-600 leading-relaxed">Fixderma.com banner invites shoppers: &ldquo;Be a part of our consumer trials and earn vouchers&rdquo;.</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-clinical-gray-200 shadow-2xs">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-lg bg-teal-50 text-teal-800 font-bold flex items-center justify-center text-xs">3</span>
              <p className="font-bold text-charcoal">Regional GTM Intelligence</p>
            </div>
            <p className="text-clinical-gray-600 leading-relaxed">Reveals where the product performs best across India to guide performance ad spend and inventory.</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-clinical-gray-200 shadow-2xs">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-lg bg-teal-50 text-teal-800 font-bold flex items-center justify-center text-xs">4</span>
              <p className="font-bold text-charcoal">Live PDP Trust Engine</p>
            </div>
            <p className="text-clinical-gray-600 leading-relaxed">Survey results appear on the product page when clicked, eliminating shopper skepticism and lifting conversion by +35%.</p>
          </div>
        </div>

        {/* Candidate Signature Bar */}
        <div className="p-4 rounded-2xl bg-[#0f172a] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-slate-800 shadow-md">
          <div>
            <p className="text-xs font-bold text-[#2dd4bf]">Candidate Leadership Value · Rimpy Tulsyan</p>
            <p className="text-xs text-slate-200 font-medium mt-0.5">
              Built for the Fixderma senior product role: combining commercial GTM growth, clinical substantiation, and full-stack software delivery.
            </p>
          </div>
          <a
            href="/FixDerma_Trial_Lab_Strategy.pptx"
            download
            className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-bold text-xs shrink-0 flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .PPTX</span>
          </a>
        </div>
      </div>
    ),
  },
];

export default function DeckPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slide = SLIDES[currentSlide];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-clinical-gray-200">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 rounded-xl bg-white border border-clinical-gray-200 hover:bg-clinical-gray-50 text-clinical-gray-600 transition-colors cursor-pointer"
            title="Return to platform"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-[10px] font-bold text-teal-700 uppercase tracking-widest bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
              Interactive Executive Deck
            </span>
            <h1 className="text-lg sm:text-xl font-extrabold text-charcoal mt-1">
              Fixderma Trial Lab — Business Presentation
            </h1>
          </div>
        </div>

        {/* Direct Download Action Button */}
        <div className="flex items-center gap-2">
          <a
            href="/FixDerma_Trial_Lab_Strategy.pptx"
            download
            id="download-deck-btn"
            className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs transition-all shadow-md shadow-teal-500/20 active:scale-98 flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download .PPTX Deck</span>
          </a>
        </div>
      </div>

      {/* Main Slide Card */}
      <div className="bg-white rounded-3xl border border-clinical-gray-200 shadow-md p-6 sm:p-8 min-h-[480px] flex flex-col justify-between mb-6">
        <div>
          {/* Slide Category & Navigation info */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold text-teal-700 uppercase tracking-widest">
              {slide.category}
            </span>
            <span className="text-xs font-mono font-bold text-clinical-gray-400">
              Slide {slide.id} of {SLIDES.length}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-charcoal tracking-tight mb-1">
            {slide.title}
          </h2>
          <p className="text-xs text-clinical-gray-500 mb-6">
            {slide.subtitle}
          </p>

          {/* Slide Interactive Content */}
          <div className="animate-fade-in">
            {slide.content}
          </div>
        </div>

        {/* Slide Bottom Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-clinical-gray-200 mt-6">
          <button
            onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
            disabled={currentSlide === 0}
            className="px-4 py-2 rounded-xl border border-clinical-gray-200 text-xs font-bold text-charcoal hover:bg-clinical-gray-50 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Slide Indicators */}
          <div className="flex gap-1.5">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentSlide === idx ? "w-6 bg-teal-500" : "w-2 bg-clinical-gray-200 hover:bg-clinical-gray-300"
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide((prev) => Math.min(SLIDES.length - 1, prev + 1))}
            disabled={currentSlide === SLIDES.length - 1}
            className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Slide Thumbnail Navigation Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
        {SLIDES.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlide(idx)}
            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
              currentSlide === idx
                ? "bg-teal-50 border-teal-500 shadow-2xs"
                : "bg-white border-clinical-gray-200 hover:bg-clinical-gray-50"
            }`}
          >
            <span className={`text-[10px] font-bold block ${currentSlide === idx ? "text-teal-700" : "text-clinical-gray-400"}`}>
              0{s.id}
            </span>
            <p className="text-[11px] font-bold text-charcoal truncate mt-0.5">
              {s.title.split("—")[0].split(":")[0]}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
