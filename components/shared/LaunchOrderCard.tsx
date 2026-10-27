// components/shared/LaunchOrderCard.tsx
// Fixderma Trial Lab — Rule-based suggested launch order card (Section 4.3)
// Computed entirely by rule: non-overlapping Wilson CI = clear recommendation; overlapping = insufficient difference.

import { LaunchOrderSuggestion } from "@/data/sampleData";
import { SampleDataChip } from "./SampleDataChip";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface LaunchOrderCardProps {
  suggestion: LaunchOrderSuggestion;
}

export function LaunchOrderCard({ suggestion }: LaunchOrderCardProps) {
  const { hasClearSeparation, headlineRecommendation, detailRationale, rankedZones, requiredAdditionalN } =
    suggestion;

  return (
    <div className="p-5 rounded-xl border border-clinical-gray-200 bg-white">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          {hasClearSeparation ? (
            <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-clinical-gray-400 shrink-0" />
          )}
          <h3 className="text-sm font-semibold text-charcoal">Suggested launch order</h3>
        </div>
        <SampleDataChip />
      </div>

      <p className="text-base font-semibold text-charcoal mb-2 leading-snug">
        {headlineRecommendation}
      </p>

      <p className="text-xs text-clinical-gray-600 leading-relaxed mb-4">
        {detailRationale}
      </p>

      {/* Ranked Zones overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 border-t border-clinical-gray-100">
        {rankedZones.map((z, idx) => (
          <div key={z.zoneId} className="p-2.5 rounded-lg bg-clinical-gray-50 border border-clinical-gray-100">
            <div className="flex items-center justify-between text-[11px] text-clinical-gray-500 mb-1">
              <span>Priority {idx + 1}</span>
              <span className="font-semibold text-charcoal">{z.ratePct}%</span>
            </div>
            <p className="text-xs font-medium text-charcoal truncate">{z.name}</p>
            <p className="text-[11px] text-clinical-gray-500 mt-0.5">
              95% range: {z.ci.lower}–{z.ci.upper}%
            </p>
          </div>
        ))}
      </div>

      {/* Show required additional participants if overlapping */}
      {!hasClearSeparation && requiredAdditionalN && (
        <div className="mt-3.5 p-2.5 rounded-lg bg-clinical-gray-50 border border-clinical-gray-100 text-[11px] text-clinical-gray-600">
          <span className="font-medium text-charcoal">Estimated recruitment required to separate ranges:</span>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-clinical-gray-500">
            <span>Temperate: +{requiredAdditionalN.temperate}</span>
            <span>Hot-dry: +{requiredAdditionalN.hot_dry}</span>
            <span>Hot-humid: +{requiredAdditionalN.hot_humid}</span>
          </div>
        </div>
      )}
    </div>
  );
}
