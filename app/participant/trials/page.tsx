"use client";
// app/participant/trials/page.tsx — High-Impact Browse & Matched Trials Directory

import Link from "next/link";
import { TRIALS } from "@/data/seed";
import { Clock, Users, Gift, CheckCircle2, XCircle, AlertCircle, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { formatINR } from "@/lib/utils";

const STATUS_BADGES: Record<string, { bg: string; text: string; label: string }> = {
  Completed: { bg: "bg-clinical-gray-100", text: "text-clinical-gray-600", label: "Study Completed" },
  Recruiting: { bg: "bg-emerald-50 border border-emerald-200", text: "text-emerald-700 font-bold", label: "● Enrolling Now" },
  Active: { bg: "bg-teal-50 border border-teal-200", text: "text-teal-700", label: "In Progress" },
  Draft: { bg: "bg-clinical-gray-100", text: "text-clinical-gray-500", label: "Protocol Pending" },
};

export default function TrialsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-clinical-gray-200">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold mb-2 border border-teal-200">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" /> Active Skin Matching
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal">Available Formulation Trials</h1>
          <p className="text-xs sm:text-sm text-clinical-gray-500 mt-1">
            Eligible trials matched to your region, skin phototype, and primary concerns.
          </p>
        </div>
        <Link
          href="/participant/profile"
          className="text-xs font-bold text-teal-600 bg-teal-50 border border-teal-200 px-3.5 py-2 rounded-xl hover:bg-teal-100 transition-all self-start sm:self-auto cursor-pointer"
        >
          Edit Profile ✏️
        </Link>
      </div>

      {/* Trial Cards Grid */}
      <div className="space-y-5">
        {TRIALS.map((trial) => {
          const badge = STATUS_BADGES[trial.status] || STATUS_BADGES.Draft;
          const isRecruiting = trial.status === "Recruiting";
          const isCompleted = trial.status === "Completed";
          const fillPercent = Math.min(100, Math.round((trial.enrolledN / trial.targetN) * 100));

          return (
            <div
              key={trial.id}
              className={`card p-6 card-hover border-2 transition-all ${
                isRecruiting
                  ? "border-teal-400/80 bg-gradient-to-br from-white via-teal-50/10 to-white shadow-sm"
                  : "border-clinical-gray-200 bg-white"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold text-clinical-gray-400">
                      ID: #{trial.id.toUpperCase()}
                    </span>
                    <span className={`text-[11px] px-2.5 py-0.5 rounded-full ${badge.bg} ${badge.text}`}>
                      {badge.label}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-charcoal">{trial.product}</h2>
                  <p className="text-xs text-clinical-gray-500 italic mt-0.5">&ldquo;{trial.claim}&rdquo;</p>
                </div>

                <div className="text-right sm:text-right shrink-0 bg-amber-50 border border-amber-200/80 px-3 py-1.5 rounded-xl">
                  <p className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Perk</p>
                  <p className="text-sm font-extrabold text-charcoal">{formatINR(trial.reward.amount)} voucher</p>
                </div>
              </div>

              {/* Metrics strip */}
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-clinical-gray-100 mb-4 text-xs">
                <div>
                  <span className="text-clinical-gray-400">Duration</span>
                  <p className="font-bold text-charcoal">{trial.durationWeeks} weeks</p>
                </div>
                <div>
                  <span className="text-clinical-gray-400">Quota Enrolled</span>
                  <p className="font-bold text-charcoal">{trial.enrolledN} / {trial.targetN}</p>
                </div>
                <div>
                  <span className="text-clinical-gray-400">Protocol</span>
                  <p className="font-bold text-charcoal">Blinded Derm Review</p>
                </div>
              </div>

              {/* Quota Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-[11px] text-clinical-gray-500 mb-1">
                  <span>Target Demographics Quota Fill</span>
                  <span className="font-bold text-charcoal">{fillPercent}%</span>
                </div>
                <div className="h-2 bg-clinical-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      fillPercent > 90 ? "bg-amber-500" : "bg-teal-500"
                    }`}
                    style={{ width: `${fillPercent}%` }}
                  />
                </div>
              </div>

              {/* Action CTA */}
              <div className="flex items-center justify-between pt-1">
                {isRecruiting && (
                  <>
                    <span className="text-xs font-semibold text-amber-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-600" />
                      <span>Simulated Cohort · Public Enrollment Closed</span>
                    </span>
                    <span
                      className="px-4 py-2 rounded-xl bg-slate-100 text-slate-500 font-bold text-xs flex items-center gap-1.5 cursor-not-allowed select-none"
                    >
                      <span>Demo Mode (Closed)</span>
                    </span>
                  </>
                )}

                {isCompleted && (
                  <>
                    <span className="text-xs text-clinical-gray-500">
                      Study completed · Cosmetic data published
                    </span>
                    <Link
                      href="/shopper"
                      className="px-4 py-2 rounded-xl bg-clinical-gray-100 hover:bg-clinical-gray-200 text-charcoal font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <span>View Verified PDP</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </>
                )}

                {trial.status === "Draft" && (
                  <span className="text-xs text-amber-700 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
                    Endpoint currently under locking procedure
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Honest Quota Note */}
      <div className="mt-8 p-4 rounded-2xl bg-clinical-gray-50 border border-clinical-gray-200 text-xs text-clinical-gray-600 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Why Quotas Matter:</strong> To avoid skewed claims, Fixderma caps recruitment once a specific age, region, or skin tone bucket is satisfied. If a study is full for your profile, you will automatically be queued for the next batch.
        </p>
      </div>
    </div>
  );
}
