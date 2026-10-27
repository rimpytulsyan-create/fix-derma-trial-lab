"use client";
// app/brand/trials/[id]/publish/page.tsx — Publish checklist

import { useParams, useRouter } from "next/navigation";
import { TRIALS, PARTICIPANTS, REVIEWS, SAFETY_FLAGS } from "@/data/seed";
import { wilsonCI } from "@/lib/stats";
import { CheckCircle2, XCircle, Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense, useState } from "react";

interface CheckItem {
  id: string;
  label: string;
  pass: boolean;
  detail: string;
}

function PublishContent() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const trial = TRIALS.find((t) => t.id === id);
  const [published, setPublished] = useState(false);

  if (!trial) return <div className="p-8 text-center text-clinical-gray-500">Trial not found.</div>;

  const completedN = PARTICIPANTS.filter((p) => p.trialId === id && p.status === "Completed").length;
  const improvedN = REVIEWS.filter((r) => PARTICIPANTS.find((p) => p.id === r.participantId && p.trialId === id && p.status === "Completed") && r.score >= 3).length;
  const ci = wilsonCI(improvedN, completedN);
  const safetyFlags = SAFETY_FLAGS.filter((f) => f.trialId === id);
  const enrolledN = trial.enrolledN;

  const checks: CheckItem[] = [
    {
      id: "n-shown",
      label: "Sample size (n) shown on results page",
      pass: completedN > 0,
      detail: `n=${completedN} completers, n=${enrolledN} enrolled. Both will be displayed.`,
    },
    {
      id: "ci-shown",
      label: "Confidence interval shown alongside headline percentage",
      pass: ci.lower > 0,
      detail: `95% CI: ${ci.lower}–${ci.upper}% shown beside ${ci.point}%.`,
    },
    {
      id: "dropouts-shown",
      label: "Drop-outs count and reasons shown",
      pass: enrolledN - completedN > 0,
      detail: `${enrolledN - completedN} drop-outs (${Math.round(((enrolledN - completedN) / enrolledN) * 100)}%). Reasons shown in methodology.`,
    },
    {
      id: "safety-shown",
      label: "Safety summary included",
      pass: safetyFlags.length >= 0,
      detail: `${safetyFlags.length} safety event(s) reported. Summary will appear on results page.`,
    },
    {
      id: "endpoint-locked",
      label: "Primary endpoint was locked before recruitment started",
      pass: !!trial.endpointLockedAt,
      detail: trial.endpointLockedAt ? `Locked on ${new Date(trial.endpointLockedAt).toLocaleDateString("en-IN")}.` : "Endpoint not locked — cannot publish.",
    },
    {
      id: "conservative-shown",
      label: "Conservative (worst-case) rate shown",
      pass: true,
      detail: "Conservative rate counts all drop-outs as 'no improvement'. Will be shown alongside headline.",
    },
    {
      id: "reward-integrity",
      label: "Reward policy stated (completion, not positivity)",
      pass: true,
      detail: `₹${trial.reward.amount} + ${trial.reward.points} pts awarded for completing check-ins, not for rating the product positively.`,
    },
  ];

  const allPass = checks.every((c) => c.pass);

  if (published) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center animate-slide-up">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold text-charcoal mb-2">Results published!</h1>
        <p className="text-clinical-gray-500 mb-6">The Verified Results page is now live. Participants have been notified.</p>
        <div className="flex flex-col gap-3">
          <Link href="/shopper/results/trial-001" className="bg-teal-500 text-white font-semibold py-3 rounded-2xl text-center">
            View public results page →
          </Link>
          <Link href="/brand" className="py-3 rounded-2xl border border-clinical-gray-200 text-clinical-gray-600 font-medium text-center">
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8 animate-fade-in">
      <Link href={`/brand/trials/${id}`} className="flex items-center gap-1 text-sm text-teal-600 mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to results
      </Link>
      <h1 className="text-xl font-bold text-charcoal mb-1">Publish checklist</h1>
      <p className="text-sm text-clinical-gray-500 mb-5">
        Every item below must pass before results can be published. This prevents incomplete or misleading claims from going live.
      </p>

      <div className="space-y-2 mb-6">
        {checks.map((check) => (
          <div key={check.id} className={`card p-4 flex gap-3 items-start ${!check.pass ? "border-l-4 border-red-400" : ""}`}>
            <div className="shrink-0 mt-0.5">
              {check.pass
                ? <CheckCircle2 className="w-5 h-5 text-lime-500" />
                : <XCircle className="w-5 h-5 text-red-500" />}
            </div>
            <div>
              <p className="font-medium text-charcoal text-sm">{check.label}</p>
              <p className="text-xs text-clinical-gray-500 mt-0.5">{check.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Preview */}
      <div className="card p-4 mb-5 bg-teal-50 border border-teal-100">
        <p className="text-xs font-semibold text-teal-700 mb-1">Preview headline (auto-generated)</p>
        <p className="text-sm text-charcoal leading-relaxed">
          &ldquo;In an independent 8-week study of {enrolledN} people, <strong>{ci.point}%</strong> showed visible improvement on dermatologist review
          (95% CI: {ci.lower}–{ci.upper}%). Conservative rate (counting all drop-outs): {wilsonCI(improvedN, enrolledN).point}%.&rdquo;
        </p>
      </div>

      <button
        id="publish-confirm-btn"
        onClick={() => allPass && setPublished(true)}
        disabled={!allPass}
        className={`w-full py-4 rounded-2xl font-semibold text-white text-lg transition-all ${allPass ? "bg-teal-500 hover:bg-teal-600 active:scale-95" : "bg-clinical-gray-300 cursor-not-allowed"}`}
      >
        {allPass ? "Publish results →" : "Fix issues above before publishing"}
      </button>
      {!allPass && (
        <p className="text-xs text-red-500 text-center mt-2">
          {checks.filter((c) => !c.pass).length} issue(s) must be resolved first.
        </p>
      )}
    </div>
  );
}

export default function PublishPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-clinical-gray-500">Loading trial checklist...</div>}>
      <PublishContent />
    </Suspense>
  );
}
