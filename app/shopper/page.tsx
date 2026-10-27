"use client";
// app/shopper/page.tsx — Verified Results Efficacy Preview for Fixderma Shadow SPF 50+ Gel

import Image from "next/image";
import Link from "next/link";
import { Star, ShieldCheck, CheckCircle2, Info, AlertCircle, Heart, Lock, Check } from "lucide-react";
import { TRIALS, PARTICIPANTS, REVIEWS } from "@/data/seed";
import { wilsonCI, conservativeRate } from "@/lib/stats";

export default function ShopperPage() {
  const trial = TRIALS[0]; // Fixderma Shadow SPF 50+ Gel
  const completedN = PARTICIPANTS.filter((p) => p.trialId === trial.id && p.status === "Completed").length;
  const improvedN = REVIEWS.filter(
    (r) => PARTICIPANTS.find((p) => p.id === r.participantId && p.trialId === trial.id && p.status === "Completed") && r.score >= 3
  ).length;
  const ci = wilsonCI(improvedN, completedN);
  const conservative = conservativeRate(improvedN, trial.enrolledN);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in">
      {/* Sample Data Disclaimer Banner */}
      <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center shrink-0">
            <Lock className="w-4 h-4 text-amber-900" />
          </div>
          <div>
            <p className="text-xs font-bold text-amber-950">
              Illustrative / Sample Data For Demonstration · PDP Evidence Architecture
            </p>
            <p className="text-xs text-amber-900/80 mt-0.5">
              Demonstrating how real Fixderma hero products (like Shadow SPF 50+ Gel) present transparent, doctor-evaluated consumer evidence on e-commerce product pages.
            </p>
          </div>
        </div>
        <span className="text-[11px] font-bold bg-amber-200/60 px-3 py-1 rounded-full border border-amber-400 text-amber-950 shrink-0">
          Sample PDP Architecture
        </span>
      </div>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Product Visual Box */}
        <div className="border border-clinical-gray-200 rounded-3xl bg-white p-8 flex flex-col items-center justify-center relative shadow-sm">
          <div className="absolute top-4 left-4 bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-teal-600" /> Fixderma Tested
          </div>

          <div className="w-48 h-72 rounded-2xl bg-gradient-to-b from-teal-900 via-teal-950 to-slate-950 border-2 border-teal-700 shadow-xl flex flex-col justify-between p-5 my-4 relative text-white">
            <div className="w-20 h-6 mx-auto -mt-9 bg-teal-800 rounded-t-lg border-2 border-teal-600 shadow-xs" />
            <div className="text-center my-auto">
              <span className="text-[10px] tracking-widest font-extrabold uppercase text-amber-400">FIXDERMA SHADOW</span>
              <h3 className="text-lg font-black tracking-tight mt-1 text-white">SPF 50+ GEL</h3>
              <p className="text-[10px] text-teal-200 mt-1 font-medium">Broad Spectrum UVA / UVB</p>
              <div className="w-12 h-0.5 bg-amber-400 mx-auto my-2.5" />
              <p className="text-[9px] text-stone-300">Non-Greasy · Matte Finish</p>
              <p className="text-[9px] text-teal-300 font-semibold mt-1">75g · Dermatologist Tested</p>
            </div>
            <div className="text-center text-[8px] text-teal-200 font-bold uppercase tracking-wider bg-teal-800/60 py-1 rounded-md">
              Hero Sunscreen Formulation
            </div>
          </div>

          <p className="text-xs text-clinical-gray-500 font-medium text-center">
            Fixderma&apos;s #1 dermatologist-prescribed sun protection gel
          </p>
        </div>

        {/* Product Details & Verified Calibration */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-0.5 rounded-full border border-teal-200">
              Consumer Panel Tested
            </span>
            <div className="flex items-center text-amber-500 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-charcoal ml-1 text-xs">4.1 / 5</span>
              <span className="text-clinical-gray-500 ml-1 font-normal">(118 evaluated trialists)</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal mb-2">
            Fixderma Shadow SPF 50+ Gel (75g)
          </h1>
          <p className="text-clinical-gray-700 text-sm leading-relaxed mb-4 font-normal">
            Specially formulated broad-spectrum sunscreen gel for oily, sensitive, and acne-prone Indian skin. Leaves zero white cast and maintains a clean matte feel even in 40°C humid weather.
          </p>

          <div className="flex items-baseline gap-3 mb-5">
            <span className="text-2xl font-black text-charcoal">₹495</span>
            <span className="text-xs text-clinical-gray-500 font-medium">MRP (₹6.60 / g) · Standard Pack 75g</span>
          </div>

          {/* Testing Status Notice */}
          <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 mb-6">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-teal-950">Dermatologist-Scored Cosmetic Efficacy Panel</p>
                <p className="text-xs text-teal-800 mt-1 leading-relaxed">
                  Conducted across 142 everyday participants in 6 Indian regions. Photos evaluated under blinded clinical rubrics by board-certified dermatologists.
                </p>
              </div>
            </div>
          </div>

          {/* Skin Safety Guarantee Badges */}
          <div className="grid grid-cols-2 gap-3 p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-clinical-gray-700">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-teal-600 shrink-0" />
              <span className="font-medium">Zero White Cast</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-teal-600 shrink-0" />
              <span className="font-medium">Non-Comedogenic Matte</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-teal-600 shrink-0" />
              <span className="font-medium">Tested on Indian Skin</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-teal-600 shrink-0" />
              <span className="font-medium">Independent Derm Graded</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── VERIFIED RESULTS CARD (High Contrast, Transparent & Calibrated) ─── */}
      <div className="border-2 border-teal-500/40 rounded-3xl p-6 sm:p-8 bg-white shadow-md mb-8">
        <div className="mb-6 pb-6 border-b border-clinical-gray-200">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold mb-2 border border-teal-200">
            <ShieldCheck className="w-4 h-4 text-teal-600" /> Fixderma Trial Lab · Transparent Results
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-charcoal">
            Consumer Evaluation from 142 Participants Across India
          </h2>
          <p className="text-xs sm:text-sm text-clinical-gray-600 mt-1">
            Standard 8-week daily use testing. Independent skin doctors evaluated photos before and after without brand identifiers.
          </p>
        </div>

        {/* 3 Clear Metric Cards (Calibrated & Transparent) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {/* Card 1: Dermatologist-Scored Protection */}
          <div className="bg-teal-50/60 p-5 rounded-2xl border border-teal-200">
            <p className="text-xs font-bold text-teal-900 uppercase tracking-wider mb-1">Dermatologist-Scored Efficacy</p>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-extrabold text-teal-700">{ci.point}%</span>
              <span className="text-xs font-bold text-teal-900">favorable response</span>
            </div>
            <p className="text-xs text-clinical-gray-700 leading-relaxed">
              <strong>74 out of 100 participants</strong> achieved significant oil reduction and zero sun-induced erythema. 22% saw moderate protection, and 4% saw no change.
            </p>
          </div>

          {/* Card 2: Honest Conservative Rate (Drop-outs counted) */}
          <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200">
            <p className="text-xs font-bold text-charcoal uppercase tracking-wider mb-1">Conservative Rate (Drop-outs Counted)</p>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-extrabold text-charcoal">{conservative.point}%</span>
              <span className="text-xs font-bold text-clinical-gray-600">intention-to-treat</span>
            </div>
            <p className="text-xs text-clinical-gray-700 leading-relaxed">
              Even counting every participant who relocated or stopped early as a failure, <strong>61.3% of all enrolled people</strong> had verified protection outcomes.
            </p>
          </div>

          {/* Card 3: Transparent Safety & Discontinuation Reporting */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-300">
            <p className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">Skin Tolerance & Adverse Events</p>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-extrabold text-slate-800">1 Discontinuation</span>
              <span className="text-xs font-semibold text-slate-600">(141/142 tolerated well)</span>
            </div>
            <p className="text-xs text-clinical-gray-700 leading-relaxed">
              1 participant developed contact redness at Day 12 and discontinued use under doctor guidance. Transparently logged as non-improvement. <strong>0 hospitalizations or severe events.</strong>
            </p>
          </div>
        </div>

        {/* Real Indian Demographics Breakdown */}
        <div className="p-5 rounded-2xl bg-clinical-gray-50/80 border border-clinical-gray-200">
          <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider mb-3">
            Demographic Cohort Tested (8-Week Daily Study):
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-clinical-gray-700">
            <div>
              <p className="text-clinical-gray-500 font-medium">Pan-India Geographic Spread</p>
              <p className="font-bold text-charcoal mt-0.5">North (31%), South (28%), West (24%), East (17%)</p>
            </div>
            <div>
              <p className="text-clinical-gray-500 font-medium">Diverse Fitzpatrick Tones</p>
              <p className="font-bold text-charcoal mt-0.5">Fair, Wheatish, and Deep Brown skin tones</p>
            </div>
            <div>
              <p className="text-clinical-gray-500 font-medium">Primary Skin Profiles</p>
              <p className="font-bold text-charcoal mt-0.5">Oily (35%), Combination (30%), Dry/Sensitive (35%)</p>
            </div>
            <div>
              <p className="text-clinical-gray-500 font-medium">Unbiased Compensation Model</p>
              <p className="font-bold text-charcoal mt-0.5">Flat ₹500 completion credit (neutral to review rating)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Callout */}
      <div className="text-center text-xs text-clinical-gray-500 py-4">
        Fixderma Trial Lab · Independent cosmetic consumer-use evaluation protocol · Illustrative demonstration
      </div>
    </div>
  );
}
