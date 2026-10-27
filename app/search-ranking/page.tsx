"use client";
// app/search-ranking/page.tsx — Search Ranking & Share of Voice Intelligence

import { useState } from "react";
import Link from "next/link";
import { 
  Search, TrendingUp, Award, AlertCircle, CheckCircle2, 
  ExternalLink, ArrowUpRight, BarChart2, Zap, Shield, Sparkles 
} from "lucide-react";

interface RankingItem {
  query: string;
  platform: string;
  fixdermaRank: number;
  fixdermaProduct: string;
  isSponsored: boolean;
  topCompetitorSponsored: string;
  topCompetitorOrganic: string;
  fixdermaSOV: string;
  competitorSOV: string;
}

const RANKINGS: RankingItem[] = [
  {
    query: "sunscreen",
    platform: "Blinkit (NCR)",
    fixdermaRank: 8,
    fixdermaProduct: "Fixderma Shadow SPF 50+ Gel (75g)",
    isSponsored: false,
    topCompetitorSponsored: "The Derma Co 1% Hyaluronic Aqua Gel",
    topCompetitorOrganic: "Minimalist SPF 50 Sunscreen",
    fixdermaSOV: "4.2%",
    competitorSOV: "Derma Co: 38.5% | Aqualogica: 27.2%",
  },
  {
    query: "sunscreen",
    platform: "Zepto (Bangalore)",
    fixdermaRank: 7,
    fixdermaProduct: "Fixderma Shadow SPF 50+ Gel (75g)",
    isSponsored: false,
    topCompetitorSponsored: "Aqualogica Radiance+ Dewy Sunscreen",
    topCompetitorOrganic: "Dr. Sheth's Ceramide & Vitamin C",
    fixdermaSOV: "5.1%",
    competitorSOV: "Aqualogica: 34.0% | Minimalist: 22.5%",
  },
  {
    query: "gel sunscreen",
    platform: "Blinkit (NCR)",
    fixdermaRank: 2,
    fixdermaProduct: "Fixderma Shadow SPF 50+ Gel (75g)",
    isSponsored: false,
    topCompetitorSponsored: "The Derma Co 1% Hyaluronic Aqua Gel",
    topCompetitorOrganic: "The Derma Co 1% Hyaluronic Aqua Gel",
    fixdermaSOV: "18.4%",
    competitorSOV: "Derma Co: 42.1% | Aqualogica: 21.0%",
  },
  {
    query: "gel sunscreen",
    platform: "Amazon India",
    fixdermaRank: 3,
    fixdermaProduct: "Fixderma Shadow SPF 50+ Gel (75g)",
    isSponsored: false,
    topCompetitorSponsored: "Dr. Sheth's Ceramide Sunscreen",
    topCompetitorOrganic: "The Derma Co Aqua Gel",
    fixdermaSOV: "14.2%",
    competitorSOV: "Derma Co: 31.0% | Minimalist: 26.5%",
  },
  {
    query: "acne gel",
    platform: "Blinkit (NCR)",
    fixdermaRank: 3,
    fixdermaProduct: "Fixderma Salyzap Gel for Acne (20g)",
    isSponsored: false,
    topCompetitorSponsored: "Sebogel (Salicylic Acid & Nicotinamide)",
    topCompetitorOrganic: "Sebogel (Pharma OTC)",
    fixdermaSOV: "16.8%",
    competitorSOV: "Sebogel: 44.0% | Derma Co: 21.5%",
  },
  {
    query: "salicylic acid gel",
    platform: "Zepto (Bangalore)",
    fixdermaRank: 4,
    fixdermaProduct: "Fixderma Salyzap Gel for Acne (20g)",
    isSponsored: false,
    topCompetitorSponsored: "The Derma Co 2% Salicylic Acid Mask/Gel",
    topCompetitorOrganic: "Minimalist 2% Salicylic Acid Serum",
    fixdermaSOV: "12.5%",
    competitorSOV: "Minimalist: 38.0% | Derma Co: 28.5%",
  },
];

export default function SearchRankingPage() {
  const [selectedQuery, setSelectedQuery] = useState("sunscreen");

  const currentItems = RANKINGS.filter((r) => r.query === selectedQuery);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 animate-fade-in">
      {/* Disclaimer Banner */}
      <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-950 text-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold uppercase tracking-wider bg-amber-400/50 px-2 py-0.5 rounded text-[10px]">Strategic Analysis</span>
          <span><strong>Illustrative market share &amp; visibility model:</strong> Competitive search positioning on Blinkit, Zepto, and Amazon India for Fixderma hero products.</span>
        </div>
        <span className="text-clinical-gray-500 hidden sm:inline">Ref: Q-Commerce &amp; Marketplace Search Index</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold mb-2 border border-teal-200">
          <Search className="w-3.5 h-3.5 text-teal-600" /> Visibility &amp; Share of Voice Audit
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal">
          Fixderma Search Ranking &amp; Keyword Share of Voice
        </h1>
        <p className="text-clinical-gray-600 text-xs sm:text-sm mt-1 max-w-2xl">
          Analyzing where Fixderma ranks when shoppers search for high-intent queries like <em>&quot;sunscreen&quot;</em>, <em>&quot;gel sunscreen&quot;</em>, and <em>&quot;acne gel&quot;</em> across quick-commerce and marketplace channels.
        </p>
      </div>

      {/* Query Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6">
        {["sunscreen", "gel sunscreen", "acne gel", "salicylic acid gel"].map((q) => (
          <button
            key={q}
            onClick={() => setSelectedQuery(q)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedQuery === q
                ? "bg-teal-500 text-white shadow-sm"
                : "bg-white text-clinical-gray-600 border border-clinical-gray-200 hover:border-teal-300"
            }`}
          >
            Query: &ldquo;{q}&rdquo;
          </button>
        ))}
      </div>

      {/* Hero Breakdown for Selected Query */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Visual Mock of Quick Commerce Search Result Page */}
        <div className="lg:col-span-1 card p-5 bg-white border border-clinical-gray-200 shadow-sm">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-clinical-gray-100">
            <span className="text-[11px] font-bold text-clinical-gray-500 uppercase tracking-wider">Search SERP Layout Mock</span>
            <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono">Blinkit App</span>
          </div>

          {/* Search Input Bar Mock */}
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-clinical-gray-100 text-xs font-medium text-charcoal mb-4">
            <Search className="w-3.5 h-3.5 text-clinical-gray-400" />
            <span className="font-bold">&ldquo;{selectedQuery}&rdquo;</span>
          </div>

          {/* SERP Slots */}
          <div className="space-y-2.5 text-xs">
            {/* Slot 1: Sponsored Conquest */}
            <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200 flex items-start justify-between">
              <div>
                <span className="text-[9px] font-extrabold uppercase bg-purple-200 text-purple-900 px-1.5 py-0.2 rounded">Sponsored #1</span>
                <p className="font-bold text-charcoal mt-1">The Derma Co 1% Hyaluronic Aqua Gel</p>
                <p className="text-[10px] text-clinical-gray-500">Bidding aggressively on generic keywords</p>
              </div>
              <span className="text-xs font-extrabold text-purple-900">Ad</span>
            </div>

            {/* Slot 2: Sponsored Ad 2 */}
            <div className="p-3 rounded-xl bg-yellow-50/70 border border-yellow-200 flex items-start justify-between">
              <div>
                <span className="text-[9px] font-extrabold uppercase bg-yellow-200 text-yellow-900 px-1.5 py-0.2 rounded">Sponsored #2</span>
                <p className="font-bold text-charcoal mt-1">Aqualogica Radiance+ Dewy</p>
                <p className="text-[10px] text-clinical-gray-500">High discount &amp; bundle promotion</p>
              </div>
              <span className="text-xs font-extrabold text-yellow-900">Ad</span>
            </div>

            {/* Slot 3: Organic 1 */}
            <div className="p-3 rounded-xl bg-clinical-gray-50 border border-clinical-gray-200">
              <span className="text-[9px] font-extrabold uppercase bg-clinical-gray-200 text-clinical-gray-700 px-1.5 py-0.2 rounded">Organic #1</span>
              <p className="font-bold text-charcoal mt-1">
                {selectedQuery.includes("acne") ? "Sebogel (Salicylic Acid)" : "Minimalist SPF 50 Sunscreen"}
              </p>
              <p className="text-[10px] text-clinical-gray-500">High organic review velocity</p>
            </div>

            {/* Slot 4: Where Fixderma appears */}
            <div className="p-3 rounded-xl bg-teal-50 border-2 border-teal-500 text-teal-950 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-extrabold uppercase bg-teal-600 text-white px-2 py-0.5 rounded">
                  {selectedQuery === "gel sunscreen" ? "Organic #2" : selectedQuery === "acne gel" ? "Organic #3" : "Organic #8 (Scroll Required)"}
                </span>
                <span className="text-[10px] font-bold text-teal-700">Fixderma</span>
              </div>
              <p className="font-extrabold text-charcoal mt-1.5">
                {selectedQuery.includes("acne") ? "Fixderma Salyzap Gel" : "Fixderma Shadow SPF 50+ Gel"}
              </p>
              <p className="text-[10px] text-teal-800 mt-0.5">
                {selectedQuery === "sunscreen"
                  ? "Requires 2 full screen scrolls on mobile app — major click drop-off"
                  : "High organic conversion when user specifies 'gel' formulation"}
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Audit Table for the Query */}
        <div className="lg:col-span-2 space-y-4">
          <div className="card p-6 bg-white border border-clinical-gray-200">
            <h3 className="font-bold text-charcoal text-base mb-4 flex items-center justify-between">
              <span>Channel Performance for &ldquo;{selectedQuery}&rdquo;</span>
              <span className="text-xs text-clinical-gray-500 font-normal">Real-time simulated audit</span>
            </h3>

            <div className="space-y-4">
              {currentItems.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-clinical-gray-50/80 border border-clinical-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-charcoal text-sm">{item.platform}</span>
                      <span className="text-xs bg-teal-100 text-teal-800 font-bold px-2.5 py-0.5 rounded-full">
                        Fixderma Rank: #{item.fixdermaRank}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-semibold text-clinical-gray-500">
                      Fixderma SOV: <strong className="text-teal-700">{item.fixdermaSOV}</strong>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-white rounded-xl border border-clinical-gray-200">
                      <p className="text-clinical-gray-400 font-bold text-[10px] uppercase">Top Competitor Ad Conquesting</p>
                      <p className="font-bold text-charcoal mt-1 text-rose-800">{item.topCompetitorSponsored}</p>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-clinical-gray-200">
                      <p className="text-clinical-gray-400 font-bold text-[10px] uppercase">Top Organic Leader</p>
                      <p className="font-bold text-charcoal mt-1">{item.topCompetitorOrganic}</p>
                    </div>
                  </div>

                  <p className="text-[11px] text-clinical-gray-500 mt-2.5">
                    <strong>Competitor Keyword Dominance:</strong> {item.competitorSOV}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Insight Box */}
          <div className="p-5 rounded-2xl bg-teal-900 text-white border border-teal-800">
            <h4 className="font-bold text-sm text-amber-300 flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              Strategic Growth Unlock for Fixderma
            </h4>
            <p className="text-xs text-teal-100 leading-relaxed font-normal">
              On broad generic terms like <em>&quot;sunscreen&quot;</em>, Fixderma loses organic traffic because D2C brands (The Derma Co, Aqualogica) spend ₹12–₹18 CPC on sponsored ads. However, on formulation-specific terms like <em>&quot;gel sunscreen&quot;</em>, Fixderma instantly leaps to <strong>Rank #2</strong> because dermatologists and educated consumers specifically seek Fixderma&apos;s non-comedogenic matte formulation.
            </p>
          </div>
        </div>
      </div>

      {/* Actionable Keyword & Optimization Blueprint */}
      <div className="card p-6 bg-white border border-clinical-gray-200">
        <h3 className="font-bold text-charcoal text-base mb-4">
          SEO &amp; Search Optimization Playbook (Moving from Rank #8 to Top 3)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs text-clinical-gray-600">
          <div className="p-4 rounded-xl bg-clinical-gray-50 border border-clinical-gray-200">
            <p className="font-bold text-charcoal text-sm mb-1.5">1. Title Tag &amp; Metadata Hygiene</p>
            <p className="leading-relaxed">
              Update marketplace title from generic &quot;Shadow SPF 50&quot; to: <strong>&ldquo;Fixderma Shadow SPF 50+ Matte Gel Sunscreen for Oily &amp; Acne-Prone Skin (Zero White Cast, 75g)&rdquo;</strong> to capture both broad and long-tail query volume.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-clinical-gray-50 border border-clinical-gray-200">
            <p className="font-bold text-charcoal text-sm mb-1.5">2. Primary Thumbnail Proof Badge</p>
            <p className="leading-relaxed">
              Include a standardized <em>&ldquo;Dermatologist Prescribed · Non-Comedogenic Tested&rdquo;</em> micro-badge on Image #1 of the listing to boost Click-Through-Rate (CTR) by an estimated +24% over generic packaging shots.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-clinical-gray-50 border border-clinical-gray-200">
            <p className="font-bold text-charcoal text-sm mb-1.5">3. Defensive Brand Conquest Bidding</p>
            <p className="leading-relaxed">
              Set up modest exact-match defensive bids on Blinkit/Zepto for <em>&ldquo;Fixderma sunscreen&rdquo;</em> and <em>&ldquo;Shadow gel&rdquo;</em> to prevent competitors (Derma Co) from hijacking Fixderma brand intent at the top of the search grid.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
