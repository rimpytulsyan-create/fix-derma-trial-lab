"use client";
// app/page.tsx — High-Impact Visual Home Page for Fixderma Trial & Growth Intelligence

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, ShieldCheck, Users, Eye, ShoppingBag, 
  Sparkles, CheckCircle2, ChevronRight, Download, BarChart3,
  Award, RefreshCw, Zap, Presentation, Search, Tag, Target, MapPin
} from "lucide-react";
import { TRIALS } from "@/data/seed";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"trial-lab" | "traditional">("trial-lab");

  const trial = TRIALS[0]; // Fixderma Shadow SPF 50+ Gel

  return (
    <div className="animate-fade-in overflow-hidden">
      {/* ─── Hero Section ─── */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 bg-gradient-to-b from-teal-50/40 via-white to-clinical-gray-50/30">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-teal-400/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 relative z-10 text-center">
          {/* Brand & Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-teal-200/80 shadow-xs mb-8">
            <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-xs font-bold text-teal-800 tracking-wide uppercase">
              Fixderma Clinical &amp; Quick-Commerce Growth Intelligence
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-charcoal tracking-tight max-w-4xl mx-auto leading-[1.12] mb-6">
            Real cosmetic evidence.{" "}
            <span className="bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-600 bg-clip-text text-transparent">
              Tested with integrity.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-clinical-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Independent pan-India consumer trials with pre-locked endpoints, blinded dermatologist photo review, and mathematical transparency across quick-commerce dark stores.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14">
            <Link
              href="/q-commerce"
              id="hero-cta-qcommerce"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-bold text-sm shadow-md shadow-teal-500/20 hover:shadow-teal-500/30 transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Explore Q-Commerce OOS Tracker</span>
            </Link>

            <Link
              href="/30-60-90-plan"
              id="hero-cta-plan"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-clinical-gray-50 text-charcoal font-bold text-sm border border-clinical-gray-300 transition-all hover:border-clinical-gray-400 active:scale-98 flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
            >
              <Target className="w-4 h-4 text-teal-600" />
              <span>View 30-60-90 Day Plan</span>
            </Link>

            <Link
              href="/deck"
              id="hero-cta-deck"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-stone-100 hover:bg-stone-200 text-charcoal font-semibold text-sm transition-all flex items-center justify-center gap-2 border border-stone-200 shadow-2xs"
            >
              <Presentation className="w-4 h-4 text-teal-600" />
              <span>Strategy Presentation</span>
            </Link>
          </div>

          {/* Live Platform Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {[
              { val: "142", label: "Pan-India Evaluators", sub: "Fitzpatrick III to VI" },
              { val: "95% CI", label: "Wilson Score Intervals", sub: "Sample size shown" },
              { val: "100%", label: "Blinded Derm Review", sub: "Independent MD panel" },
              { val: "₹0", label: "Positivity Incentives", sub: "Neutral completion credit" },
            ].map((stat, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-clinical-gray-200/80 shadow-2xs text-center">
                <p className="text-xl sm:text-2xl font-extrabold text-charcoal">{stat.val}</p>
                <p className="text-[11px] font-bold text-teal-700 mt-0.5">{stat.label}</p>
                <p className="text-[10px] text-clinical-gray-400 mt-0.5">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEW: Growth & Quick-Commerce Operational Intelligence Modules ─── */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
            Marketplace &amp; Operations
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal mt-2">
            Commercial &amp; Quick-Commerce Intelligence
          </h2>
          <p className="text-xs sm:text-sm text-clinical-gray-500 mt-1">
            Analyzing inventory stock-outs, search rankings, and price elasticity for Fixderma hero products.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {/* Card 1: Q-Commerce In-Stock Tracker */}
          <Link
            href="/q-commerce"
            className="card p-6 card-hover group flex flex-col justify-between border-clinical-gray-200 hover:border-teal-400 bg-white"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-xl mb-4 group-hover:scale-105 transition-transform">
                ⚡
              </div>
              <h3 className="font-bold text-charcoal text-base group-hover:text-teal-600 transition-colors">
                Q-Commerce Stock-Outs
              </h3>
              <p className="text-xs text-clinical-gray-500 mt-2 leading-relaxed">
                Live availability tracker across 15 pin codes in Gurgaon &amp; Bangalore on Blinkit, Zepto, and Instamart.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-bold text-teal-600">
              <span>View 15 pin codes</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Search Ranking & Share of Voice */}
          <Link
            href="/search-ranking"
            className="card p-6 card-hover group flex flex-col justify-between border-clinical-gray-200 hover:border-teal-400 bg-white"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-xl mb-4 group-hover:scale-105 transition-transform">
                🔍
              </div>
              <h3 className="font-bold text-charcoal text-base group-hover:text-teal-600 transition-colors">
                Search Ranking &amp; SOV
              </h3>
              <p className="text-xs text-clinical-gray-500 mt-2 leading-relaxed">
                Where Fixderma ranks for &ldquo;sunscreen&rdquo; and &ldquo;acne gel&rdquo; vs Derma Co, Minimalist, and Aqualogica.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-bold text-teal-600">
              <span>Inspect search ranking</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Price & Offers Matrix */}
          <Link
            href="/pricing-offers"
            className="card p-6 card-hover group flex flex-col justify-between border-clinical-gray-200 hover:border-teal-400 bg-white"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-xl mb-4 group-hover:scale-105 transition-transform">
                🏷️
              </div>
              <h3 className="font-bold text-charcoal text-base group-hover:text-teal-600 transition-colors">
                Price-per-ml &amp; Packs
              </h3>
              <p className="text-xs text-clinical-gray-500 mt-2 leading-relaxed">
                Compare Fixderma 40g, 75g, 150g pack prices against competitor price/ml and aggressive sponsored ad bids.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-bold text-teal-600">
              <span>Compare unit economics</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: 30-60-90 Day Execution Plan */}
          <Link
            href="/30-60-90-plan"
            className="card p-6 card-hover group flex flex-col justify-between border-clinical-gray-200 hover:border-teal-400 bg-white"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-xl mb-4 group-hover:scale-105 transition-transform">
                🎯
              </div>
              <h3 className="font-bold text-charcoal text-base group-hover:text-teal-600 transition-colors">
                30-60-90 Day Plan
              </h3>
              <p className="text-xs text-clinical-gray-500 mt-2 leading-relaxed">
                Actionable product &amp; category roadmap: Lift availability from 74% to &gt;95% and capture Top 2 search rank.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-bold text-teal-600">
              <span>Read 90-day plan</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* ─── Interactive Contrast: Traditional vs. Fixderma Trial Lab ─── */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        <div className="card p-6 sm:p-8 bg-white border border-clinical-gray-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                Methodology &amp; Regulatory Benchmarking
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-charcoal mt-2">
                Why Standard D2C Skincare Surveys Fail
              </h2>
            </div>

            {/* Toggle */}
            <div className="flex p-1 bg-clinical-gray-100 rounded-xl self-start sm:self-auto">
              <button
                onClick={() => setActiveTab("trial-lab")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "trial-lab"
                    ? "bg-teal-500 text-white shadow-xs"
                    : "text-clinical-gray-600 hover:text-charcoal"
                }`}
              >
                Fixderma Trial Lab
              </button>
              <button
                onClick={() => setActiveTab("traditional")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "traditional"
                    ? "bg-red-500 text-white shadow-xs"
                    : "text-clinical-gray-600 hover:text-charcoal"
                }`}
              >
                Standard 22-Person Pilot
              </button>
            </div>
          </div>

          {activeTab === "trial-lab" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-fade-in">
              <div className="p-5 rounded-2xl bg-teal-50/50 border border-teal-200">
                <p className="text-xs font-bold text-teal-800 uppercase tracking-wider">Cohort Rigor</p>
                <p className="text-3xl font-extrabold text-teal-700 my-2">n = 142</p>
                <p className="text-xs text-clinical-gray-600 leading-relaxed">
                  Representative demographic quotas across 6 geographic zones and Fitzpatrick phototypes III–VI. Employees excluded.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-teal-50/50 border border-teal-200">
                <p className="text-xs font-bold text-teal-800 uppercase tracking-wider">Reported Claim</p>
                <div className="flex items-baseline gap-2 my-2">
                  <span className="text-3xl font-extrabold text-charcoal">73.7%</span>
                  <span className="text-xs font-bold text-teal-600">95% CI: 65.1–80.8%</span>
                </div>
                <p className="text-xs text-clinical-gray-600 leading-relaxed">
                  Tight ±7.8% Wilson confidence interval. Conservative ITT rate (61.3%) transparently published with all 24 drop-outs counted.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-teal-50/50 border border-teal-200">
                <p className="text-xs font-bold text-teal-800 uppercase tracking-wider">Evaluation Method</p>
                <p className="text-3xl font-extrabold text-teal-700 my-2">Blinded Derm Review</p>
                <p className="text-xs text-clinical-gray-600 leading-relaxed">
                  3 independent dermatologists score randomized before/after photo pairs with zero access to brand names or user feedback.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-fade-in">
              <div className="p-5 rounded-2xl bg-red-50/50 border border-red-200">
                <p className="text-xs font-bold text-red-700 uppercase tracking-wider">Sample Size</p>
                <p className="text-3xl font-extrabold text-red-600 my-2">n = 22</p>
                <p className="text-xs text-clinical-gray-600 leading-relaxed">
                  Run inside the brand&apos;s own office. 22 colleagues share the same water, weather, and age bracket. Zero demographic diversity.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-red-50/50 border border-red-200">
                <p className="text-xs font-bold text-red-700 uppercase tracking-wider">Reported Claim</p>
                <div className="flex items-baseline gap-2 my-2">
                  <span className="text-3xl font-extrabold text-red-700">95% agreed</span>
                  <span className="text-xs font-bold text-red-500">CI: 78–99%</span>
                </div>
                <p className="text-xs text-clinical-gray-600 leading-relaxed">
                  Enormous margin of error (±14.5%). A claim of 95% could actually be 78%. Drop-outs are quietly discarded from the denominator.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-red-50/50 border border-red-200">
                <p className="text-xs font-bold text-red-700 uppercase tracking-wider">Evaluation Method</p>
                <p className="text-3xl font-extrabold text-red-600 my-2">Subjective 5-Star</p>
                <p className="text-xs text-clinical-gray-600 leading-relaxed">
                  Self-reported ratings on a WhatsApp form, often incentivized by free product coupons. No clinical photo rubric or doctor verification.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─── Featured Verified Study Card for Fixderma Hero Product ─── */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="p-8 rounded-3xl bg-white border-2 border-teal-500/40 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-100/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Verified Hero Product Study · Fixderma Shadow SPF 50+ Gel</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-charcoal mt-3 mb-2">
                Transparent Sun Protection &amp; Oil Control Panel
              </h3>
              <p className="text-sm text-clinical-gray-700 leading-relaxed font-normal">
                Tested on 142 everyday people across India for 8 weeks. 3 independent skin doctors (dermatologists) graded real before-and-after photos without knowing the brand name.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
                <div className="p-3 bg-teal-50/70 rounded-xl border border-teal-100">
                  <p className="text-[11px] font-bold text-teal-900">118 Completed Study</p>
                  <p className="text-xs text-teal-700 mt-0.5">83% finished all 8 weeks</p>
                </div>
                <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100">
                  <p className="text-[11px] font-bold text-emerald-900">74% Favorable Protection</p>
                  <p className="text-xs text-emerald-700 mt-0.5">Dermatologists scored barrier improvement</p>
                </div>
                <div className="p-3 bg-stone-100/80 rounded-xl border border-stone-200">
                  <p className="text-[11px] font-bold text-charcoal">Flat Adherence Reward</p>
                  <p className="text-xs text-clinical-gray-600 mt-0.5">₹500 voucher (rating-neutral)</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0 self-start md:self-center">
              <Link
                href="/shopper"
                id="home-view-results-cta"
                className="px-6 py-4 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-bold text-sm transition-all text-center shadow-md shadow-teal-500/20 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>See Product Results Card →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
