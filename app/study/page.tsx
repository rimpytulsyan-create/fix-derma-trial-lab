"use client";
// app/study/page.tsx
// Fixderma Trial Lab — Study design page (Section 4.2)
// Calm, read-only explanation with calculators. No data submission forms.

import { useState } from "react";
import { STUDY_PRODUCT } from "@/lib/products";
import { QUOTA_TARGETS, SAMPLE_ENROLLED_COUNT } from "@/data/sampleData";
import { sampleSizePlanner, wilsonCI } from "@/lib/stats";
import { VOUCHER_SENTENCE, LOCKED_ENDPOINT_DATE } from "@/lib/config";
import { SampleDataChip } from "@/components/shared/SampleDataChip";
import { Lock, Mail, Package, Camera, AlertCircle, Award } from "lucide-react";

export default function StudyDesignPage() {
  // Calculator 1: Sample size planner
  const [marginOfError, setMarginOfError] = useState(0.07);
  const [dropoutRate, setDropoutRate] = useState(0.2);
  const calculatedN = sampleSizePlanner(0.5, marginOfError, dropoutRate);

  // Calculator 2: Range demonstrator
  const [sliderN, setSliderN] = useState(22);
  const [observedPct, setObservedPct] = useState(100);
  const k = Math.round((observedPct / 100) * sliderN);
  const rangeResult = wilsonCI(k, sliderN);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-14">
      {/* Page Title */}
      <div>
        <p className="text-xs font-semibold text-clinical-gray-500 uppercase tracking-wider">
          Trial Lab Protocol
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-charcoal mt-1 tracking-tight">
          Study design
        </h1>
        <p className="text-sm text-clinical-gray-600 mt-2">
          Demonstration protocol for consumer-use testing and regional wearability evaluation.
        </p>
      </div>

      {/* 1. The Question */}
      <section className="p-6 rounded-xl border border-clinical-gray-200 bg-white space-y-2">
        <h2 className="text-xs font-semibold text-clinical-gray-500 uppercase tracking-wider">
          1. The question
        </h2>
        <p className="text-lg font-semibold text-charcoal">
          {STUDY_PRODUCT.headlineClaim}
        </p>
        <p className="text-xs text-clinical-gray-600 leading-relaxed">
          Evaluating daily finish, oiliness, shine, and comfort across 7 Indian cities before broad geographic rollout.
        </p>
      </section>

      {/* 2. Who takes part */}
      <section className="p-6 rounded-xl border border-clinical-gray-200 bg-white space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-semibold text-clinical-gray-500 uppercase tracking-wider">
              2. Who takes part
            </h2>
            <p className="text-sm font-semibold text-charcoal mt-0.5">
              Demographic quotas ({SAMPLE_ENROLLED_COUNT} participants)
            </p>
          </div>
          <SampleDataChip />
        </div>

        <p className="text-xs text-clinical-gray-600">
          Quotas balanced across climate zones, age bands, gender, skin types, and Fitzpatrick phototypes III to VI.
          Employees and their households excluded.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-clinical-gray-600">
            <thead>
              <tr className="border-b border-clinical-gray-200 text-charcoal font-semibold">
                <th className="py-2 pr-3">Quota Category</th>
                <th className="py-2 px-3">Segment</th>
                <th className="py-2 px-3">Target Share</th>
                <th className="py-2 px-3">Enrolled</th>
                <th className="py-2 pl-3">Actual Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-clinical-gray-100">
              {QUOTA_TARGETS.map((q, idx) => {
                const actual = Math.round((q.actualCount / SAMPLE_ENROLLED_COUNT) * 100);
                return (
                  <tr key={idx}>
                    <td className="py-1.5 pr-3 font-medium text-charcoal">{q.category}</td>
                    <td className="py-1.5 px-3">{q.group}</td>
                    <td className="py-1.5 px-3">{Math.round(q.targetShare * 100)}%</td>
                    <td className="py-1.5 px-3">{q.actualCount}</td>
                    <td className="py-1.5 pl-3 font-medium text-charcoal">{actual}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. How a study runs (5 static illustrated cards) */}
      <section className="p-6 rounded-xl border border-clinical-gray-200 bg-white space-y-4">
        <h2 className="text-xs font-semibold text-clinical-gray-500 uppercase tracking-wider">
          3. How a study runs
        </h2>
        <p className="text-sm font-semibold text-charcoal">
          Five structured phases from consent to panel scoring
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
          <div className="p-3.5 rounded-lg border border-clinical-gray-100 bg-clinical-gray-50 space-y-1.5">
            <Mail className="w-4 h-4 text-teal-600" />
            <p className="text-xs font-semibold text-charcoal">1. Consent</p>
            <p className="text-[11px] text-clinical-gray-600 leading-normal">
              Digital consent under India’s DPDP Act, 2023.
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-clinical-gray-100 bg-clinical-gray-50 space-y-1.5">
            <Package className="w-4 h-4 text-teal-600" />
            <p className="text-xs font-semibold text-charcoal">2. Kit arrives</p>
            <p className="text-[11px] text-clinical-gray-600 leading-normal">
              Fresh 75g tube delivered to participant home.
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-clinical-gray-100 bg-clinical-gray-50 space-y-1.5">
            <Camera className="w-4 h-4 text-teal-600" />
            <p className="text-xs font-semibold text-charcoal">3. Check-ins</p>
            <p className="text-[11px] text-clinical-gray-600 leading-normal">
              Photos &amp; 5 questions at weeks 0, 2, 4, and 8.
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-clinical-gray-100 bg-clinical-gray-50 space-y-1.5">
            <AlertCircle className="w-4 h-4 text-teal-600" />
            <p className="text-xs font-semibold text-charcoal">4. Safety</p>
            <p className="text-[11px] text-clinical-gray-600 leading-normal">
              Report any skin reaction at any time.
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-clinical-gray-100 bg-clinical-gray-50 space-y-1.5">
            <Award className="w-4 h-4 text-teal-600" />
            <p className="text-xs font-semibold text-charcoal">5. Derm scoring</p>
            <p className="text-[11px] text-clinical-gray-600 leading-normal">
              Dermatologists score photos without participant details.
            </p>
          </div>
        </div>

        <p className="text-xs text-clinical-gray-600 pt-2 border-t border-clinical-gray-100">
          {VOUCHER_SENTENCE}
        </p>
      </section>

      {/* 4. Endpoints locked before recruitment */}
      <section className="p-6 rounded-xl border border-clinical-gray-200 bg-white space-y-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-clinical-gray-100 text-charcoal border border-clinical-gray-200">
            <Lock className="w-3.5 h-3.5 text-teal-600" />
            Locked · {LOCKED_ENDPOINT_DATE}
          </span>
          <h2 className="text-sm font-semibold text-charcoal">4. Pre-locked primary endpoint</h2>
        </div>
        <p className="text-xs text-clinical-gray-600 leading-relaxed">
          Endpoints are locked before recruitment so results cannot be cherry-picked afterwards.
        </p>
        <p className="text-xs text-clinical-gray-500 font-mono">
          Primary endpoint: {STUDY_PRODUCT.primaryEndpointDescription}.
        </p>
      </section>

      {/* 5. How many people do we need? Calculator */}
      <section className="p-6 rounded-xl border border-clinical-gray-200 bg-white space-y-5">
        <div>
          <h2 className="text-xs font-semibold text-clinical-gray-500 uppercase tracking-wider">
            5. Sample size planner
          </h2>
          <p className="text-sm font-semibold text-charcoal mt-0.5">
            How many people do we need to enrol?
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs text-clinical-gray-600 mb-1">
                <span>Target margin of error (E):</span>
                <span className="font-semibold text-charcoal">±{Math.round(marginOfError * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.04"
                max="0.12"
                step="0.01"
                value={marginOfError}
                onChange={(e) => setMarginOfError(parseFloat(e.target.value))}
                className="w-full accent-teal-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-clinical-gray-600 mb-1">
                <span>Anticipated dropout rate:</span>
                <span className="font-semibold text-charcoal">{Math.round(dropoutRate * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.35"
                step="0.05"
                value={dropoutRate}
                onChange={(e) => setDropoutRate(parseFloat(e.target.value))}
                className="w-full accent-teal-600"
              />
            </div>
          </div>

          <div className="p-4 rounded-lg bg-clinical-gray-50 border border-clinical-gray-100 flex flex-col justify-center">
            <p className="text-xs text-clinical-gray-500">Required participants to enrol</p>
            <p className="text-3xl font-bold text-charcoal mt-1">n = {calculatedN}</p>
            <p className="text-[11px] text-clinical-gray-500 mt-2">
              Formula: n = [z² · p(1−p) / E²] ÷ (1 − dropoutRate) with z = 1.96 and p = 0.5.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Why the range matters */}
      <section className="p-6 rounded-xl border border-clinical-gray-200 bg-white space-y-5">
        <div>
          <h2 className="text-xs font-semibold text-clinical-gray-500 uppercase tracking-wider">
            6. Why the range matters
          </h2>
          <p className="text-sm font-semibold text-charcoal mt-0.5">
            Statistical demonstration: Wilson 95% confidence intervals
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs text-clinical-gray-600 mb-1">
                <span>Sample size (n):</span>
                <span className="font-semibold text-charcoal">{sliderN}</span>
              </div>
              <input
                type="range"
                min="5"
                max="500"
                step="5"
                value={sliderN}
                onChange={(e) => setSliderN(parseInt(e.target.value))}
                className="w-full accent-teal-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-clinical-gray-600 mb-1">
                <span>Observed agreement:</span>
                <span className="font-semibold text-charcoal">{observedPct}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                step="5"
                value={observedPct}
                onChange={(e) => setObservedPct(parseInt(e.target.value))}
                className="w-full accent-teal-600"
              />
            </div>
          </div>

          <div className="p-4 rounded-lg bg-clinical-gray-50 border border-clinical-gray-100 flex flex-col justify-center">
            <p className="text-xs text-clinical-gray-500">True population range (95% CI)</p>
            <p className="text-2xl font-bold text-charcoal mt-1">
              {rangeResult.lower}% – {rangeResult.upper}%
            </p>
            <p className="text-[11px] text-clinical-gray-500 mt-2">
              Point estimate: {rangeResult.point}% ({k} of {sliderN})
            </p>
          </div>
        </div>

        <p className="text-xs text-clinical-gray-600 pt-2 border-t border-clinical-gray-100">
          With 22 people, 22 of 22 saying yes could mean the true figure is anywhere from about 85% to 100%.
        </p>
      </section>
    </div>
  );
}
