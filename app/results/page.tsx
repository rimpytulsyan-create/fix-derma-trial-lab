"use client";
// app/results/page.tsx
// Fixderma Trial Lab — Results by region (The Engine)
// Recomputes all metrics deterministically on Week 0 · 2 · 4 · 8

import { useMemo } from "react";
import { useAppStore } from "@/lib/store";
import {
  getStudyResultsForWeek,
  computeSuggestedLaunchOrder,
  SAFETY_SUMMARY,
  QUOTA_TARGETS,
  type StudyWeek,
} from "@/data/sampleData";
import { STUDY_PRODUCT } from "@/lib/products";
import { SampleDataChip } from "@/components/shared/SampleDataChip";
import { WeekControl } from "@/components/shared/WeekControl";
import { LaunchOrderCard } from "@/components/shared/LaunchOrderCard";
import { VOUCHER_SENTENCE } from "@/lib/config";

export default function ResultsPage() {
  const { studyWeek, setStudyWeek } = useAppStore();

  const summary = useMemo(() => getStudyResultsForWeek(studyWeek), [studyWeek]);
  const launchOrder = useMemo(() => computeSuggestedLaunchOrder(summary), [summary]);

  const zoneEntries = Object.values(summary.zones);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12">
      {/* 1. Study Header */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-clinical-gray-500 uppercase tracking-wider">
              Consumer-use study · {STUDY_PRODUCT.name}
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-charcoal mt-1 tracking-tight">
              Results by region
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-clinical-gray-100 text-clinical-gray-700 border border-clinical-gray-200">
              {studyWeek === 8 ? "Status: Complete" : `Status: Week ${studyWeek} in progress`}
            </span>
            <SampleDataChip />
          </div>
        </div>

        <p className="text-sm text-clinical-gray-600 leading-relaxed">
          Question: <span className="text-charcoal font-medium">{STUDY_PRODUCT.headlineClaim}</span> Enrolled:{" "}
          <span className="text-charcoal font-medium">{summary.enrolledN} participants</span> across 7 cities ·
          Active at Week {studyWeek}: <span className="text-charcoal font-medium">{summary.activeN}</span>.
        </p>

        {/* 2. Study Week Control */}
        <div className="pt-2">
          <WeekControl currentWeek={studyWeek} onWeekChange={(w: StudyWeek) => setStudyWeek(w)} />
        </div>
      </section>

      {/* 3. Headline Result Card */}
      <section className="p-6 rounded-xl border border-clinical-gray-200 bg-white space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-charcoal">Primary endpoint: Comfort &amp; wearability</h2>
          <SampleDataChip />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          {/* Active cohort rate */}
          <div className="p-4 rounded-lg bg-clinical-gray-50 border border-clinical-gray-100">
            <p className="text-xs text-clinical-gray-500">Active participants reporting gel comfortable to wear</p>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-bold text-charcoal">{summary.headlineRatePct}%</span>
              <span className="text-xs text-clinical-gray-500">
                (95% range: {summary.headlineCi.lower}–{summary.headlineCi.upper}%)
              </span>
            </div>
            <p className="text-[12px] text-clinical-gray-500 mt-2">
              {summary.comfortableN} of {summary.activeN} active participants at Week {studyWeek}.
            </p>
          </div>

          {/* Counting everyone who started */}
          <div className="p-4 rounded-lg bg-clinical-gray-50 border border-clinical-gray-100">
            <p className="text-xs text-clinical-gray-500">Counting everyone who started (treating dropouts as not comfortable)</p>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-bold text-charcoal">{summary.conservativeRatePct}%</span>
              <span className="text-xs text-clinical-gray-500">
                (95% range: {summary.conservativeCi.lower}–{summary.conservativeCi.upper}%)
              </span>
            </div>
            <p className="text-[12px] text-clinical-gray-500 mt-2">
              {summary.comfortableN} of {summary.enrolledN} total enrolled participants.
            </p>
          </div>
        </div>

        <p className="text-[12px] text-clinical-gray-500">
          Comfort rating defined as 4 or 5 out of 5 on daily wearability and finish check-in.
        </p>
      </section>

      {/* 4. By Climate Zone (The Key Section) */}
      <section className="p-6 rounded-xl border border-clinical-gray-200 bg-white space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-charcoal">Results by climate zone</h2>
            <p className="text-xs text-clinical-gray-500 mt-0.5">
              Comparison across 3 distinct Indian climate environments
            </p>
          </div>
          <SampleDataChip />
        </div>

        <div className="space-y-4">
          {zoneEntries.map((entry) => (
            <div key={entry.zone.id} className="p-4 rounded-lg border border-clinical-gray-100 bg-clinical-gray-50/70 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-xs font-semibold text-charcoal">{entry.zone.name}</h3>
                  <p className="text-[11px] text-clinical-gray-500">
                    Cities: {entry.zone.cities.join(", ")} · Active n: {entry.activeN}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-base font-bold text-charcoal">{entry.ratePct}%</span>
                  <span className="text-[11px] text-clinical-gray-500 ml-1.5">
                    (95% range: {entry.ci.lower}–{entry.ci.upper}%)
                  </span>
                </div>
              </div>

              {/* Shared axis range bar representation */}
              <div className="space-y-1 pt-1">
                <div className="w-full bg-clinical-gray-200 h-2 rounded-full relative overflow-hidden">
                  <div
                    className="absolute top-0 bottom-0 bg-teal-600 rounded-full"
                    style={{
                      left: `${Math.max(0, entry.ci.lower)}%`,
                      width: `${Math.min(100, entry.ci.upper - entry.ci.lower)}%`,
                    }}
                  />
                  {/* Point estimate marker */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-charcoal -translate-x-1/2"
                    style={{ left: `${entry.ci.point}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-clinical-gray-400 font-mono">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* City breakdown */}
              <div className="pt-2 border-t border-clinical-gray-200/50 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-clinical-gray-600">
                {entry.cities.map((c) => (
                  <span key={c.city}>
                    {c.city}: {c.pct}% ({c.comfortableN}/{c.activeN})
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Suggested Launch Order Card */}
      <section>
        <LaunchOrderCard suggestion={launchOrder} />
      </section>

      {/* 6. Participants Demographics & Quotas */}
      <section className="p-6 rounded-xl border border-clinical-gray-200 bg-white space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-charcoal">Participant mix against quotas</h2>
            <p className="text-xs text-clinical-gray-500 mt-0.5">
              142 independent participants. Employees and their households excluded.
            </p>
          </div>
          <SampleDataChip />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-clinical-gray-600">
            <thead>
              <tr className="border-b border-clinical-gray-200 text-charcoal font-semibold">
                <th className="py-2 pr-3">Quota Category</th>
                <th className="py-2 px-3">Segment</th>
                <th className="py-2 px-3">Target Share</th>
                <th className="py-2 px-3">Enrolled Count</th>
                <th className="py-2 pl-3">Actual Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-clinical-gray-100">
              {QUOTA_TARGETS.map((q, idx) => {
                const actualShare = Math.round((q.actualCount / 142) * 100);
                return (
                  <tr key={idx} className="hover:bg-clinical-gray-50/50">
                    <td className="py-2 pr-3 font-medium text-charcoal">{q.category}</td>
                    <td className="py-2 px-3">{q.group}</td>
                    <td className="py-2 px-3">{Math.round(q.targetShare * 100)}%</td>
                    <td className="py-2 px-3">{q.actualCount}</td>
                    <td className="py-2 pl-3 font-medium text-charcoal">{actualShare}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Dermatologist Panel Scores */}
      <section className="p-6 rounded-xl border border-clinical-gray-200 bg-white space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-charcoal">Dermatologist panel evaluation</h2>
            <p className="text-xs text-clinical-gray-500 mt-0.5">
              Dermatologists score photos without seeing participant details (0 to 3 scale)
            </p>
          </div>
          <SampleDataChip />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div className="p-3.5 rounded-lg bg-clinical-gray-50 border border-clinical-gray-100">
            <p className="text-xs text-clinical-gray-500">Visible white cast</p>
            <p className="text-xl font-bold text-charcoal mt-1">
              {summary.dermPanel.avgWhiteCast}{" "}
              <span className="text-xs font-normal text-clinical-gray-500">/ 3.0</span>
            </p>
            <p className="text-[11px] text-clinical-gray-500 mt-1">
              Negligible visible residue across Fitzpatrick III–VI
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-clinical-gray-50 border border-clinical-gray-100">
            <p className="text-xs text-clinical-gray-500">Visible surface irritation</p>
            <p className="text-xl font-bold text-charcoal mt-1">
              {summary.dermPanel.avgIrritation}{" "}
              <span className="text-xs font-normal text-clinical-gray-500">/ 3.0</span>
            </p>
            <p className="text-[11px] text-clinical-gray-500 mt-1">
              1 moderate reaction documented in safety log
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-clinical-gray-50 border border-clinical-gray-100">
            <p className="text-xs text-clinical-gray-500">Panel photo reviews</p>
            <p className="text-xl font-bold text-charcoal mt-1">{summary.dermPanel.photosScored}</p>
            <p className="text-[11px] text-clinical-gray-500 mt-1">
              Inter-rater agreement: {summary.dermPanel.interRaterAgreementPct}%
            </p>
          </div>
        </div>
      </section>

      {/* 8. Safety Log */}
      <section className="p-6 rounded-xl border border-clinical-gray-200 bg-white space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-charcoal">Safety log</h2>
          <SampleDataChip />
        </div>

        <div className="p-3.5 rounded-lg bg-clinical-gray-50 border border-clinical-gray-100">
          <p className="text-xs font-medium text-charcoal">{SAFETY_SUMMARY.computedStatement}</p>
          <p className="text-[11px] text-clinical-gray-500 mt-1">
            Status: {SAFETY_SUMMARY.statusText}. Treated as non-improvement in conservative rate calculations.
          </p>
        </div>

        <p className="text-xs text-clinical-gray-500">{VOUCHER_SENTENCE}</p>
      </section>
    </div>
  );
}
