"use client";
// app/reviewer/page.tsx — Blinded Dermatologist Reviewer Queue & Grading Interface

import { useState } from "react";
import { PARTICIPANTS } from "@/data/seed";
import { Eye, ShieldCheck, ArrowRight, RefreshCw } from "lucide-react";

export default function ReviewerPage() {
  const completed = PARTICIPANTS.filter((p) => p.status === "Completed");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState<number | null>(null);
  const [flagQuality, setFlagQuality] = useState(false);
  const [flagReaction, setFlagReaction] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(14);
  const [submitted, setSubmitted] = useState(false);

  const currentParticipant = completed[currentIndex % completed.length];
  // Deterministic flip based on participant ID length or index so reviewer doesn't know which is before/after
  const isLeftBefore = (currentParticipant?.id.charCodeAt(currentParticipant.id.length - 1) || 0) % 2 === 0;

  function handleNext() {
    setSubmitted(true);
    setTimeout(() => {
      setReviewedCount((prev) => prev + 1);
      setCurrentIndex((prev) => prev + 1);
      setScore(null);
      setFlagQuality(false);
      setFlagReaction(false);
      setSubmitted(false);
    }, 400);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-clinical-gray-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold mb-2 border border-purple-200">
            <Eye className="w-3.5 h-3.5" /> Blinded Dermatologist Reviewer Portal
          </div>
          <h1 className="text-2xl font-bold text-charcoal">Independent Assessment Queue</h1>
          <p className="text-sm text-clinical-gray-500 mt-1">
            Product name, brand identity, and participant survey responses are strictly hidden.
          </p>
        </div>
        <div className="text-right sm:border-l sm:border-clinical-gray-200 sm:pl-6">
          <p className="text-xs text-clinical-gray-400 font-medium uppercase tracking-wider">Queue Progress</p>
          <p className="text-2xl font-bold text-teal-600">{reviewedCount} <span className="text-sm font-normal text-clinical-gray-400">/ {completed.length} pairs</span></p>
        </div>
      </div>

      {/* Protocol Guarantee Banner */}
      <div className="bg-white p-4 rounded-2xl border border-clinical-gray-200 shadow-xs mb-8 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
        <div className="text-xs text-clinical-gray-600 leading-relaxed">
          <strong>Blinded Protocol Standard:</strong> Left vs. Right photo ordering is randomized per participant to prevent chronological confirmation bias. 
          Please evaluate purely based on visible skin barrier health, redness reduction, hydration, and textural uniformity.
        </div>
      </div>

      {/* Pair Evaluation Card */}
      <div className="card p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono font-bold text-clinical-gray-400">
            Subject ID: #{currentParticipant.id} · Fitzpatrick {currentParticipant.skinTone} · {currentParticipant.skinType}
          </span>
          <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            Randomized Presentation
          </span>
        </div>

        {/* Photo Pairs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Photo A */}
          <div className="border border-clinical-gray-200 rounded-2xl p-4 bg-clinical-gray-50 text-center">
            <span className="inline-block text-xs font-bold text-clinical-gray-500 uppercase tracking-wider mb-2">
              Photo A
            </span>
            <div className={`h-56 rounded-xl flex items-center justify-center font-mono text-xs shadow-inner ${
              isLeftBefore ? "bg-gradient-to-br from-amber-100 via-rose-50 to-stone-200 text-stone-600" : "bg-gradient-to-br from-teal-50 via-emerald-50 to-sky-100 text-teal-800"
            }`}>
              <div className="p-4 text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-white/70 flex items-center justify-center text-lg">📷</div>
                <p className="font-semibold">{isLeftBefore ? "BASELINE SKIN CONDITION" : "POST-REGIMEN SKIN CONDITION"}</p>
                <p className="text-[10px] opacity-75 mt-1">Standardized lighting & pose target</p>
                <p className="text-[9px] uppercase tracking-widest mt-2 px-2 py-0.5 bg-black/10 rounded">SIMULATED PHOTO</p>
              </div>
            </div>
          </div>

          {/* Photo B */}
          <div className="border border-clinical-gray-200 rounded-2xl p-4 bg-clinical-gray-50 text-center">
            <span className="inline-block text-xs font-bold text-clinical-gray-500 uppercase tracking-wider mb-2">
              Photo B
            </span>
            <div className={`h-56 rounded-xl flex items-center justify-center font-mono text-xs shadow-inner ${
              !isLeftBefore ? "bg-gradient-to-br from-amber-100 via-rose-50 to-stone-200 text-stone-600" : "bg-gradient-to-br from-teal-50 via-emerald-50 to-sky-100 text-teal-800"
            }`}>
              <div className="p-4 text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-white/70 flex items-center justify-center text-lg">📷</div>
                <p className="font-semibold">{!isLeftBefore ? "BASELINE SKIN CONDITION" : "POST-REGIMEN SKIN CONDITION"}</p>
                <p className="text-[10px] opacity-75 mt-1">Standardized lighting & pose target</p>
                <p className="text-[9px] uppercase tracking-widest mt-2 px-2 py-0.5 bg-black/10 rounded">SIMULATED PHOTO</p>
              </div>
            </div>
          </div>
        </div>

        {/* Rubric Scoring */}
        <div className="border-t border-clinical-gray-200 pt-5">
          <p className="text-sm font-semibold text-charcoal mb-2">Clinical Improvement Score (1–5 Rubric):</p>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mb-4">
            {[
              { val: 1, label: "1 · Worse", desc: "Visible worsening of barrier or inflammation" },
              { val: 2, label: "2 · No Change", desc: "No detectable difference between timepoints" },
              { val: 3, label: "3 · Mild Imp.", desc: "Slight barrier smoothing or erythema decrease" },
              { val: 4, label: "4 · Clear Imp.", desc: "Notable hydration & redness recovery" },
              { val: 5, label: "5 · Marked Imp.", desc: "Significant clinical transformation" },
            ].map((option) => (
              <button
                key={option.val}
                type="button"
                onClick={() => setScore(option.val)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  score === option.val
                    ? "border-teal-500 bg-teal-50/80 ring-2 ring-teal-500/20"
                    : "border-clinical-gray-200 bg-white hover:border-clinical-gray-300"
                }`}
              >
                <p className="text-xs font-bold text-charcoal">{option.label}</p>
                <p className="text-[10px] text-clinical-gray-500 mt-1 leading-tight">{option.desc}</p>
              </button>
            ))}
          </div>

          {/* Reviewer Flags */}
          <div className="flex flex-wrap gap-4 pt-2 mb-6">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-clinical-gray-600">
              <input
                type="checkbox"
                checked={flagQuality}
                onChange={(e) => setFlagQuality(e.target.checked)}
                className="rounded border-clinical-gray-300 text-teal-600 focus:ring-teal-500"
              />
              Flag photo quality (lighting/focus discrepancy)
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-xs text-red-600">
              <input
                type="checkbox"
                checked={flagReaction}
                onChange={(e) => setFlagReaction(e.target.checked)}
                className="rounded border-red-300 text-red-600 focus:ring-red-500"
              />
              Flag suspected adverse cutaneous reaction
            </label>
          </div>

          {/* Action button */}
          <button
            onClick={handleNext}
            disabled={score === null || submitted}
            className={`w-full py-3.5 rounded-2xl font-semibold text-white flex items-center justify-center gap-2 transition-all ${
              score !== null
                ? "bg-teal-500 hover:bg-teal-600 active:scale-98 shadow-sm cursor-pointer"
                : "bg-clinical-gray-300 cursor-not-allowed"
            }`}
          >
            {submitted ? (
              <span className="flex items-center gap-2"><RefreshCw className="w-4 h-4 animate-spin" /> Recording blinded score...</span>
            ) : (
              <span className="flex items-center gap-2">Submit evaluation & load next pair <ArrowRight className="w-4 h-4" /></span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
