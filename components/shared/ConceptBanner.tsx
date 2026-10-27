"use client";
// components/shared/ConceptBanner.tsx
import { CONCEPT_DISCLAIMER } from "@/lib/config";
import { AlertCircle } from "lucide-react";

export function ConceptBanner() {
  return (
    <div
      className="concept-banner sticky top-0 z-50 w-full bg-amber-500/95 text-slate-950 font-medium text-xs sm:text-sm px-4 py-2 border-b border-amber-600 shadow-sm"
      role="banner"
      aria-label="Concept prototype disclaimer"
    >
      <div className="max-w-6xl mx-auto flex items-center gap-2 justify-center text-center">
        <AlertCircle className="w-4 h-4 text-slate-950 shrink-0" aria-hidden="true" />
        <span className="font-semibold tracking-wide uppercase text-[11px] bg-slate-950 text-amber-300 px-2 py-0.5 rounded mr-1">Demo Notice</span>
        <span>{CONCEPT_DISCLAIMER}</span>
      </div>
    </div>
  );
}
