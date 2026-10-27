"use client";
// app/shopper/page.tsx
// Fixderma Trial Lab — Shopper preview (Section 4.4)
// Title: "What a shopper could see". Displays Week 8 results, or placeholder if studyWeek < 8.

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { getStudyResultsForWeek, SAFETY_SUMMARY, SAMPLE_ENROLLED_COUNT } from "@/data/sampleData";
import { STUDY_PRODUCT } from "@/lib/products";
import { SampleDataChip } from "@/components/shared/SampleDataChip";
import { VOUCHER_SENTENCE } from "@/lib/config";

export default function ShopperPreviewPage() {
  const { studyWeek } = useAppStore();
  const summary = useMemo(() => getStudyResultsForWeek(8), []);

  const isCompleted = studyWeek === 8;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10">
      {/* Page Header */}
      <div>
        <p className="text-xs font-semibold text-clinical-gray-500 uppercase tracking-wider">
          E-Commerce Integration
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-charcoal mt-1 tracking-tight">
          What a shopper could see
        </h1>
        <p className="text-xs text-clinical-gray-600 mt-2">
          Preview of how results could appear after a study. Sample data.
        </p>
      </div>

      {/* Main PDP Mock Shell */}
      <div className="p-6 sm:p-8 rounded-xl border border-clinical-gray-200 bg-white space-y-8">
        {/* Product Meta */}
        <div className="flex flex-col sm:flex-row gap-6 pb-6 border-b border-clinical-gray-100">
          <div className="w-24 h-24 rounded-lg bg-clinical-gray-50 border border-clinical-gray-200 flex items-center justify-center shrink-0 p-3">
            <Image
              src="/fixderma-logo.svg"
              alt="Fixderma logo"
              width={80}
              height={26}
              className="object-contain"
            />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-clinical-gray-500 uppercase tracking-wider">
              Sun Protection · Gel Formulation
            </p>
            <h2 className="text-xl font-bold text-charcoal">{STUDY_PRODUCT.name}</h2>
            <p className="text-xs text-clinical-gray-600 leading-relaxed max-w-xl">
              Non-greasy, transparent gel sunscreen designed for high-humidity and high-heat climates.
            </p>
          </div>
        </div>

        {/* Results Card */}
        {isCompleted ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-charcoal">Consumer study results</h3>
              <SampleDataChip />
            </div>

            {/* Key Findings Callout */}
            <div className="p-5 rounded-lg bg-clinical-gray-50 border border-clinical-gray-100 space-y-2">
              <p className="text-base font-semibold text-charcoal leading-snug">
                In a sample study of {SAMPLE_ENROLLED_COUNT} people across 7 cities,{" "}
                <span className="text-teal-700">{summary.headlineRatePct}%</span> rated the gel comfortable to wear{" "}
                <span className="text-xs font-normal text-clinical-gray-500">
                  (95% range: {summary.headlineCi.lower} to {summary.headlineCi.upper}%).
                </span>
              </p>
              <p className="text-xs text-clinical-gray-600">
                118 of {SAMPLE_ENROLLED_COUNT} completed all check-ins.
              </p>
              <p className="text-xs text-clinical-gray-600">
                Counting everyone who started: {summary.conservativeRatePct}%.
              </p>
            </div>

            {/* Demographics & Participant Mix */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-charcoal">Participant mix</h4>
              <p className="text-xs text-clinical-gray-600 leading-relaxed">
                Tested across Mumbai, Chennai, Kolkata, Delhi NCR, Jaipur, Bengaluru, and Pune. Participants represented
                Fitzpatrick phototypes III to VI and normal, oily, dry, and combination skin types.
              </p>
            </div>

            {/* Safety Reporting */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-charcoal">Safety</h4>
              <p className="text-xs text-clinical-gray-600">{SAFETY_SUMMARY.computedStatement}</p>
              <p className="text-[11px] text-clinical-gray-500">Status: {SAFETY_SUMMARY.statusText}.</p>
            </div>

            {/* Reward transparency */}
            <div className="space-y-1 pt-3 border-t border-clinical-gray-100">
              <p className="text-xs text-clinical-gray-500">{VOUCHER_SENTENCE}</p>
            </div>

            {/* What this does not tell you */}
            <div className="p-4 rounded-lg bg-clinical-gray-50 border border-clinical-gray-100 space-y-1.5">
              <h4 className="text-xs font-semibold text-charcoal">What this does not tell you</h4>
              <ul className="text-xs text-clinical-gray-600 space-y-1 list-disc list-inside">
                <li>Small sample size ({SAMPLE_ENROLLED_COUNT} people enrolled).</li>
                <li>Self-reported comfort; individual skin feel and results vary by skin type.</li>
                <li>This is a consumer-use study, not a medical clinical trial.</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="p-8 rounded-lg bg-clinical-gray-50 border border-clinical-gray-200 text-center space-y-2">
            <p className="text-sm font-semibold text-charcoal">Results appear once the study is complete</p>
            <p className="text-xs text-clinical-gray-500">
              The Study week on the results page is currently set to Week {studyWeek}. Switch to Week 8 to view completed findings.
            </p>
            <div className="pt-2">
              <Link
                href="/results"
                className="inline-flex text-xs font-semibold text-teal-700 hover:text-teal-800 underline"
              >
                Go to Results page →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
