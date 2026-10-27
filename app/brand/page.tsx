"use client";
// app/brand/page.tsx — Brand team dashboard

import Link from "next/link";
import { TRIALS, ALL_PARTICIPANTS, SAFETY_FLAGS, REVIEWS, PARTICIPANTS } from "@/data/seed";
import { wilsonCI } from "@/lib/stats";
import { formatDate } from "@/lib/utils";
import {
  Users, AlertTriangle, CheckCircle2, TrendingUp, Plus, Eye, FlaskConical,
} from "lucide-react";

export default function BrandDashboardPage() {
  const activeTrial = TRIALS.find((t) => t.status === "Recruiting");
  const completedTrial = TRIALS.find((t) => t.status === "Completed");
  const draftTrial = TRIALS.find((t) => t.status === "Draft");
  const openFlags = SAFETY_FLAGS.filter((f) => f.status !== "Resolved");
  const completedN = PARTICIPANTS.filter((p) => p.status === "Completed").length;
  const improvedN = REVIEWS.filter((r) => r.score >= 3).length;
  const ci = wilsonCI(improvedN, completedN);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-clinical-gray-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold mb-2 border border-teal-200">
            Fixderma Trial Lab · Brand Intelligence
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal">Clinical Study Command Center</h1>
          <p className="text-xs sm:text-sm text-clinical-gray-500 mt-1">
            Real-time enrollment telemetry, quota drift alerts, blinded scoring audits, and publication compliance.
          </p>
        </div>
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <a
            href="/FixDerma_Trial_Lab_Strategy.pptx"
            download
            className="flex items-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-charcoal font-semibold text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 transition-all shadow-2xs"
          >
            <span>Deck (.PPTX)</span>
          </a>
          <Link
            href="/brand/create"
            id="create-trial-btn"
            className="flex items-center gap-1.5 bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Study Protocol</span>
          </Link>
        </div>
      </div>

      {/* ── Summary cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Active trials", value: "2", icon: <FlaskConical className="w-5 h-5 text-teal-500" />, sub: "1 recruiting, 1 completed" },
          { label: "Total enrolled", value: "189", icon: <Users className="w-5 h-5 text-teal-500" />, sub: "Across all trials" },
          { label: "Open safety flags", value: String(openFlags.length), icon: <AlertTriangle className={`w-5 h-5 ${openFlags.length > 0 ? "text-amber-500" : "text-lime-500"}`} />, sub: openFlags.length === 0 ? "All resolved" : "Needs review" },
          { label: "Completion rate", value: `${Math.round((completedN / 142) * 100)}%`, icon: <CheckCircle2 className="w-5 h-5 text-lime-500" />, sub: `${completedN} of 142 enrolled` },
        ].map((card) => (
          <div key={card.label} className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-clinical-gray-500 uppercase tracking-wider">{card.label}</span>
              {card.icon}
            </div>
            <p className="text-2xl font-bold text-charcoal">{card.value}</p>
            <p className="text-xs text-clinical-gray-400 mt-0.5">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Trials list ── */}
      <div className="space-y-4">
        {/* Completed trial with results */}
        {completedTrial && (
          <div className="card p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs bg-clinical-gray-100 text-clinical-gray-600 font-medium px-2 py-0.5 rounded-full">Completed</span>
                  {completedTrial.endpointLockedAt && (
                    <span className="text-xs text-clinical-gray-400">🔒 Endpoint locked {formatDate(completedTrial.endpointLockedAt)}</span>
                  )}
                </div>
                <h2 className="font-bold text-charcoal">{completedTrial.product}</h2>
                <p className="text-xs text-clinical-gray-500 mt-0.5 italic">&ldquo;{completedTrial.claim}&rdquo;</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/brand/trials/${completedTrial.id}`} className="text-xs text-teal-600 font-medium flex items-center gap-1 hover:underline">
                  <Eye className="w-3.5 h-3.5" /> View
                </Link>
                <Link href={`/brand/trials/${completedTrial.id}/publish`} className="text-xs bg-teal-500 text-white font-medium px-3 py-1 rounded-lg hover:bg-teal-600 transition-colors">
                  Publish results
                </Link>
              </div>
            </div>
            {/* Key result */}
            <div className="p-3 bg-teal-50 rounded-xl border border-teal-100">
              <p className="text-xs text-clinical-gray-500 mb-0.5">Primary result (dermatologist-reviewed)</p>
              <p className="text-lg font-bold text-teal-700">
                {ci.point}% showed improvement
              </p>
              <p className="text-xs text-clinical-gray-500">n={completedN}, 95% CI: {ci.lower}–{ci.upper}%</p>
            </div>
          </div>
        )}

        {/* Recruiting trial with drift warning */}
        {activeTrial && (
          <div className="card p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs bg-lime-100 text-lime-700 font-medium px-2 py-0.5 rounded-full">Recruiting</span>
                  <span className="text-xs bg-amber-100 text-amber-700 font-medium px-2 py-0.5 rounded-full">⚠️ Quota drift</span>
                </div>
                <h2 className="font-bold text-charcoal">{activeTrial.product}</h2>
                <p className="text-xs text-clinical-gray-500 mt-0.5 italic">&ldquo;{activeTrial.claim}&rdquo;</p>
              </div>
              <Link href={`/brand/trials/${activeTrial.id}`} className="text-xs text-teal-600 font-medium flex items-center gap-1 hover:underline">
                <Eye className="w-3.5 h-3.5" /> Monitor
              </Link>
            </div>
            {/* Drift warning */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl mb-3">
              <p className="text-xs font-semibold text-amber-800">⚠️ Demographic drift detected</p>
              <p className="text-xs text-amber-700 mt-0.5">
                North India is 62% of enrolled vs. 25% target. Consider pausing recruitment from this region.
              </p>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-clinical-gray-500">{activeTrial.enrolledN} / {activeTrial.targetN} enrolled</span>
              <div className="w-32 h-1.5 bg-clinical-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-lime-500 rounded-full" style={{ width: `${(activeTrial.enrolledN / activeTrial.targetN) * 100}%` }} />
              </div>
            </div>
          </div>
        )}

        {/* Draft trial */}
        {draftTrial && (
          <div className="card p-5 opacity-70">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs bg-clinical-gray-100 text-clinical-gray-500 font-medium px-2 py-0.5 rounded-full">Draft</span>
                <h2 className="font-bold text-charcoal mt-1">{draftTrial.product}</h2>
                <p className="text-xs text-clinical-gray-400 mt-0.5">Endpoint not locked · Cannot recruit</p>
              </div>
              <Link href="/brand/create" className="text-xs text-teal-600 font-medium hover:underline">Edit draft →</Link>
            </div>
          </div>
        )}
      </div>

      {/* ── Safety flags ── */}
      <div className="mt-6">
        <h2 className="font-bold text-charcoal mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          Safety flag inbox
          {openFlags.length === 0 && <span className="text-xs font-normal text-lime-600">— all clear</span>}
        </h2>
        <div className="space-y-2">
          {SAFETY_FLAGS.map((flag) => (
            <div key={flag.id} className={`card p-3 flex gap-3 items-start ${flag.status !== "Resolved" ? "border-l-4 border-amber-400" : ""}`}>
              <div className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${flag.severity === "Mild" ? "bg-yellow-100 text-yellow-700" : flag.severity === "Moderate" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
                {flag.severity}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-charcoal">{flag.description}</p>
                <p className="text-xs text-clinical-gray-400 mt-0.5">
                  {flag.location} · {formatDate(flag.reportedAt)} · {flag.participantId}
                </p>
              </div>
              <span className={`text-xs shrink-0 ${flag.status === "Resolved" ? "text-lime-600" : "text-amber-600"}`}>
                {flag.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
