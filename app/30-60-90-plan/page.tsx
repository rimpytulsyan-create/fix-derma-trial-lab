"use client";
// app/30-60-90-plan/page.tsx — Executive 30-60-90 Day Strategic Plan for Rimpy Tulsyan at Fixderma

import { useState } from "react";
import Link from "next/link";
import { 
  Calendar, CheckCircle2, TrendingUp, ShieldCheck, Target, 
  ArrowRight, Award, Zap, Building, ShoppingBag, Sparkles, Clock, AlertCircle
} from "lucide-react";

export default function ThirtySixtyNinetyPlanPage() {
  const [activeTab, setActiveTab] = useState<"all" | "30" | "60" | "90">("all");

  const phases = [
    {
      id: "30",
      days: "Days 1–30",
      title: "Diagnostic Audit & Availability Recovery",
      tagline: "Fix the leaks, map dark store stock-outs, and establish baseline claim rigor.",
      color: "teal",
      kpis: [
        { label: "Dark Store In-Stock Rate Audit", target: "50 Pin Codes in NCR & BLR", current: "Baseline Mapped" },
        { label: "Search Leakage Identified", target: "Top 20 Search Queries", current: "Audit Complete" },
        { label: "OOS Alerting System", target: "Daily Automated Trigger", current: "Implemented" },
      ],
      deliverables: [
        {
          title: "Quick-Commerce Stock-Out Diagnostic",
          desc: "Audit Blinkit, Zepto, and Instamart dark stores across 50 high-velocity micro-markets in NCR and Bangalore. Identify why replenishments lag (18.5 hours avg.) and quantify lost revenue (₹18.4L/mo across 15 pin codes).",
        },
        {
          title: "Marketplace Search & Metadata Hygiene",
          desc: "Overhaul product titles, bullets, and backend keywords for Fixderma Shadow SPF 50+ Gel and Salyzap Gel. Target high-intent queries like 'matte gel sunscreen for oily skin' to lift organic discovery.",
        },
        {
          title: "Standardized Claim Substantiation Audit",
          desc: "Align all consumer study claims with ASCI Chapter 1 and BIS IS 4707 standards. Ensure transparent denominators (n=142) and confidence intervals replace vague '99% agreed' marketing copy.",
        },
      ],
    },
    {
      id: "60",
      days: "Days 31–60",
      title: "Distribution Execution & Conversion Optimization",
      tagline: "Restore dark store inventory, launch entry pack sizes, and deploy verified evidence on PDPs.",
      color: "amber",
      kpis: [
        { label: "Quick-Commerce In-Stock Availability", target: ">92% (from 74%)", current: "Primary Goal" },
        { label: "Replenishment Turnaround Lag", target: "<8 Hours (from 18.5h)", current: "Supply Chain Metric" },
        { label: "Entry SKU Dark Store Listing", target: "100% of NCR & BLR stores", current: "40g at ₹275" },
      ],
      deliverables: [
        {
          title: "Dedicated Quick-Commerce Buffer Stocks",
          desc: "Establish localized 5-day distributor buffers in Okhla (NCR) and Peenya (Bangalore) dedicated exclusively to quick-commerce replenishment, cutting dark-store restock time from 18.5 hours to under 8 hours.",
        },
        {
          title: "Sub-₹300 Impulse SKU Onboarding (40g at ₹275)",
          desc: "List Fixderma Shadow SPF 50+ 40g travel pack on all Blinkit/Zepto dark stores to capture the 78% of quick-commerce shoppers who abandon carts when only the ₹445 75g pack is available.",
        },
        {
          title: "Verified Evidence PDP Deployment",
          desc: "Launch the transparent 'Fixderma Trial Lab Verified Results Card' on Fixderma.com, Amazon A+ content, and Nykaa brand store, giving skeptical shoppers doctor-graded proof and confidence intervals.",
        },
      ],
    },
    {
      id: "90",
      days: "Days 61–90",
      title: "Category Dominance, Scale & Retention Moat",
      tagline: "Achieve >95% availability in 100+ dark stores, top 3 search rank, and automated trial loops.",
      color: "emerald",
      kpis: [
        { label: "Sustained Dark Store In-Stock Rate", target: ">95% in 100+ stores", current: "Category Gold Standard" },
        { label: "Search Rank for 'Gel Sunscreen'", target: "Top 2 Organic Rank", current: "25% Share of Voice" },
        { label: "Incremental Quarterly Revenue", target: "+₹45 Lakhs / Quarter", current: "Via Eliminated OOS" },
      ],
      deliverables: [
        {
          title: "Top 3 Organic Search Dominance & Defensive Bidding",
          desc: "Pair high-converting clinical thumbnails with exact-match defensive keyword bids on Blinkit and Zepto, locking out aggressive competitor conquesting from The Derma Co and Aqualogica.",
        },
        {
          title: "Multi-Product Routine Bundling (AOV Expansion)",
          desc: "Introduce 'Sun & Acne Defense' duo packs (Shadow SPF 50+ Gel + Salyzap Gel) at ₹699 on marketplaces, increasing average order values while maintaining high gross margins.",
        },
        {
          title: "Institutionalized Pre-Launch Consumer Feedback Loop",
          desc: "Integrate Fixderma Trial Lab into standard R&D workflows. Pre-test 2 new seasonal pipeline formulations (e.g. Fixderma Nigrifix Cream) with 100+ stratified Indian consumers before mass production.",
        },
      ],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 animate-fade-in">
      {/* Executive Memo Header */}
      <div className="mb-8 border-b border-clinical-gray-200 pb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200">
            <Target className="w-3.5 h-3.5 text-teal-600" /> Strategic Executive Blueprint
          </span>
          <span className="text-xs text-clinical-gray-500 font-medium">
            Candidate: <strong>Rimpy Tulsyan</strong> | Target: Product &amp; Growth Leadership, Fixderma
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal">
          30-60-90 Day Strategic Plan for Fixderma
        </h1>
        <p className="text-clinical-gray-600 text-sm mt-2 max-w-3xl leading-relaxed">
          How Rimpy Tulsyan will diagnose quick-commerce stock-outs, restore in-stock availability to &gt;95%, capture search share of voice, and turn clinical evidence into Fixderma&apos;s strongest commercial moat.
        </p>

        {/* Tab Filter */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === "all" ? "bg-teal-500 text-white shadow-xs" : "bg-clinical-gray-100 text-clinical-gray-600 hover:text-charcoal"
            }`}
          >
            All 90 Days
          </button>
          <button
            onClick={() => setActiveTab("30")}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === "30" ? "bg-teal-500 text-white shadow-xs" : "bg-clinical-gray-100 text-clinical-gray-600 hover:text-charcoal"
            }`}
          >
            Days 1–30 (Diagnostics)
          </button>
          <button
            onClick={() => setActiveTab("60")}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === "60" ? "bg-teal-500 text-white shadow-xs" : "bg-clinical-gray-100 text-clinical-gray-600 hover:text-charcoal"
            }`}
          >
            Days 31–60 (Execution)
          </button>
          <button
            onClick={() => setActiveTab("90")}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === "90" ? "bg-teal-500 text-white shadow-xs" : "bg-clinical-gray-100 text-clinical-gray-600 hover:text-charcoal"
            }`}
          >
            Days 61–90 (Scale &amp; Moat)
          </button>
        </div>
      </div>

      {/* High-Impact Executive Summary Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="card p-5 bg-white border border-clinical-gray-200">
          <p className="text-[11px] font-bold text-clinical-gray-500 uppercase tracking-wider">Availability Target</p>
          <p className="text-3xl font-black text-teal-700 mt-1">74% → 96%</p>
          <p className="text-xs text-clinical-gray-600 mt-1.5">
            Eliminating dark store stock-outs in 100+ stores across NCR &amp; Bangalore.
          </p>
        </div>

        <div className="card p-5 bg-white border border-clinical-gray-200">
          <p className="text-[11px] font-bold text-clinical-gray-500 uppercase tracking-wider">Search Rank Goal</p>
          <p className="text-3xl font-black text-amber-600 mt-1">Rank #8 → Top 2</p>
          <p className="text-xs text-clinical-gray-600 mt-1.5">
            Dominating high-intent queries like &quot;gel sunscreen&quot; on Blinkit &amp; Zepto.
          </p>
        </div>

        <div className="card p-5 bg-teal-900 text-white border border-teal-800">
          <p className="text-[11px] font-bold text-teal-300 uppercase tracking-wider">Revenue Impact</p>
          <p className="text-3xl font-black text-amber-400 mt-1">+₹45L / Qtr</p>
          <p className="text-xs text-teal-200 mt-1.5">
            Recaptured lost substitution sales + increased cart sizes via entry 40g SKUs.
          </p>
        </div>
      </div>

      {/* Phases Detailed Breakdown */}
      <div className="space-y-10">
        {phases
          .filter((p) => activeTab === "all" || activeTab === p.id)
          .map((phase) => (
            <div key={phase.id} className="card p-6 sm:p-8 bg-white border border-clinical-gray-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-6 border-b border-clinical-gray-100">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider bg-teal-100 text-teal-900 px-3 py-1 rounded-full">
                    {phase.days}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-charcoal mt-2">
                    {phase.title}
                  </h2>
                  <p className="text-xs text-clinical-gray-500 mt-0.5">{phase.tagline}</p>
                </div>
              </div>

              {/* KPI Targets */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                {phase.kpis.map((kpi, idx) => (
                  <div key={idx} className="p-3.5 bg-clinical-gray-50 rounded-xl border border-clinical-gray-200">
                    <p className="text-[10px] font-bold text-clinical-gray-500 uppercase tracking-wider">{kpi.label}</p>
                    <p className="text-sm font-extrabold text-teal-800 mt-0.5">{kpi.target}</p>
                    <p className="text-[11px] text-clinical-gray-400 mt-0.5">{kpi.current}</p>
                  </div>
                ))}
              </div>

              {/* Action Items List */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-clinical-gray-500 uppercase tracking-wider">Key Strategic Deliverables</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {phase.deliverables.map((deliv, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-teal-50/40 border border-teal-200 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-teal-900 mb-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span>{deliv.title}</span>
                        </div>
                        <p className="text-xs text-clinical-gray-700 leading-relaxed font-normal">
                          {deliv.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Bottom Hiring Pitch Banner */}
      <div className="mt-12 p-8 rounded-3xl bg-charcoal text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div>
          <h3 className="text-lg font-bold">Why Rimpy Tulsyan is Ready to Own this Role</h3>
          <p className="text-xs text-clinical-gray-300 mt-1 max-w-xl leading-relaxed">
            Combining rigorous product intuition, full-stack software prototyping, consumer psychology, and supply-chain discipline to make Fixderma India&apos;s most scientifically trusted dermatological skincare brand.
          </p>
        </div>
        <Link
          href="/for-hiring-team"
          className="px-6 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-bold text-xs shrink-0 transition-all active:scale-95 flex items-center gap-2"
        >
          <span>View Leadership Memo →</span>
        </Link>
      </div>
    </div>
  );
}
