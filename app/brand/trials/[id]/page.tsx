"use client";
// app/brand/trials/[id]/page.tsx — Trial detail: results tabs

import { useParams, useRouter } from "next/navigation";
import { TRIALS, PARTICIPANTS, REVIEWS, SAFETY_FLAGS, CHECK_INS } from "@/data/seed";
import { wilsonCI, conservativeRate, representativenessScore } from "@/lib/stats";
import { StatBadge } from "@/components/shared/StatBadge";
import { Suspense, useState } from "react";
import Link from "next/link";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell, PieChart, Pie, Legend,
} from "recharts";
import { Lock, ArrowLeft } from "lucide-react";

type Tab = "summary" | "demographics" | "derm" | "dropouts" | "safety" | "methodology";
const TABS: { id: Tab; label: string }[] = [
  { id: "summary", label: "Summary" },
  { id: "demographics", label: "Demographics" },
  { id: "derm", label: "Derm Scores" },
  { id: "dropouts", label: "Drop-outs" },
  { id: "safety", label: "Safety" },
  { id: "methodology", label: "Methodology" },
];

const REGION_COLORS = ["#00AEBD", "#A8C542", "#F0B8A0", "#374151", "#8B5CF6", "#F59E0B"];

function TrialResultsContent() {
  const { id } = useParams<{ id: string }>();
  const trial = TRIALS.find((t) => t.id === id);
  const [tab, setTab] = useState<Tab>("summary");

  if (!trial) return <div className="p-8 text-center text-clinical-gray-500">Trial not found.</div>;

  const trialParticipants = PARTICIPANTS.filter((p) => p.trialId === id);
  const completedParticipants = trialParticipants.filter((p) => p.status === "Completed");
  const droppedParticipants = trialParticipants.filter((p) => p.status === "DroppedOut");
  const affiliatedCompleted = completedParticipants.filter((p) => p.independence === "Affiliated");
  const reviews = REVIEWS.filter((r) => completedParticipants.find((p) => p.id === r.participantId));

  const improved = reviews.filter((r) => r.score >= 3);
  const completedN = completedParticipants.length;
  const enrolledN = trial.enrolledN;

  const headlineCI = wilsonCI(improved.length, completedN);
  const conservCI = conservativeRate(improved.length, enrolledN);

  // Region counts for representativeness
  const actualRegion: Record<string, number> = {};
  trialParticipants.forEach((p) => {
    const key = p.region;
    actualRegion[key] = ((actualRegion[key] ?? 0) + 1) / trialParticipants.length;
  });
  const repScore = representativenessScore(actualRegion, trial.quotaTargets.region);

  // Demographics charts
  const regionData = Object.entries(trial.quotaTargets.region).map(([region, target]) => {
    const actual = trialParticipants.filter((p) => p.region === region).length / trialParticipants.length;
    return { region, target: Math.round(target * 100), actual: Math.round(actual * 100) };
  });

  const skinTypeData = Object.entries(
    trialParticipants.reduce((acc, p) => { acc[p.skinType] = (acc[p.skinType] ?? 0) + 1; return acc; }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  const scoreDistribution = [1, 2, 3, 4, 5].map((score) => ({
    score: `Score ${score}`,
    count: reviews.filter((r) => r.score === score).length,
    improved: score >= 3,
  }));

  const dropReasons = droppedParticipants.reduce((acc, p) => {
    if (p.dropOutReason) acc[p.dropOutReason] = (acc[p.dropOutReason] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <Link href="/brand" className="flex items-center gap-1 text-sm text-teal-600 mb-4"><ArrowLeft className="w-4 h-4" /> Dashboard</Link>

      <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-charcoal">{trial.product}</h1>
          <p className="text-sm text-clinical-gray-500 mt-0.5 italic">&ldquo;{trial.claim}&rdquo;</p>
          {trial.endpointLockedAt && (
            <div className="flex items-center gap-1 text-xs text-clinical-gray-400 mt-1">
              <Lock className="w-3 h-3 text-teal-500" />
              Primary endpoint locked {new Date(trial.endpointLockedAt).toLocaleDateString("en-IN")}
            </div>
          )}
        </div>
        {trial.status === "Completed" && (
          <Link href={`/brand/trials/${id}/publish`} className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-colors">
            Publish results →
          </Link>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-clinical-gray-100 p-1 rounded-xl mb-6 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.id}
            id={`tab-${t.id}`}
            onClick={() => setTab(t.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${tab === t.id ? "bg-white text-teal-700 shadow-sm" : "text-clinical-gray-500 hover:text-clinical-gray-700"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Summary tab ── */}
      {tab === "summary" && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="card p-5">
              <p className="text-xs text-clinical-gray-500 uppercase tracking-wider mb-2">Primary result</p>
              <StatBadge percent={headlineCI.point} n={completedN} ciLower={headlineCI.lower} ciUpper={headlineCI.upper} size="lg" />
              <p className="text-xs text-clinical-gray-400 mt-2">Showed ≥3/5 improvement on derm review</p>
            </div>
            <div className="card p-5">
              <p className="text-xs text-clinical-gray-500 uppercase tracking-wider mb-2">Conservative rate (worst-case)</p>
              <StatBadge percent={conservCI.point} n={enrolledN} ciLower={conservCI.lower} ciUpper={conservCI.upper} size="lg" variant="conservative" />
              <p className="text-xs text-clinical-gray-400 mt-2">Counting all {enrolledN - completedN} drop-outs as "no improvement"</p>
            </div>
            <div className="card p-5">
              <p className="text-xs text-clinical-gray-500 uppercase tracking-wider mb-2">Representativeness</p>
              <p className="text-2xl font-bold text-charcoal">{Math.round(repScore * 100)}%</p>
              <p className="text-xs text-clinical-gray-400 mt-2">Match to demographic quota targets</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: "Enrolled", val: enrolledN },
              { label: "Completed", val: completedN },
              { label: "Drop-outs", val: enrolledN - completedN },
              { label: "Affiliated", val: affiliatedCompleted.length },
              { label: "Independent", val: completedN - affiliatedCompleted.length },
              { label: "Safety flags", val: SAFETY_FLAGS.filter((f) => f.trialId === id).length },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl p-3 border border-clinical-gray-100">
                <p className="text-xl font-bold text-charcoal">{s.val}</p>
                <p className="text-xs text-clinical-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Demographics tab ── */}
      {tab === "demographics" && (
        <div className="space-y-6 animate-fade-in">
          <div className="card p-5">
            <h3 className="font-semibold text-charcoal mb-4">Region: Actual vs Target</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionData} margin={{ left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="region" tick={{ fontSize: 10 }} />
                  <YAxis tickFormatter={(v) => `${v}%`} tick={{ fontSize: 10 }} />
                  <Tooltip formatter={(v: any) => `${v}%`} />
                  <Bar dataKey="target" name="Target %" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="actual" name="Actual %" fill="#00AEBD" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="card p-5">
            <h3 className="font-semibold text-charcoal mb-4">Skin types (n={trialParticipants.length})</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={skinTypeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={({ name, percent }: { name?: string; percent?: number }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`} labelLine={false} fontSize={11}>
                    {skinTypeData.map((_, i) => <Cell key={i} fill={REGION_COLORS[i % REGION_COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* ── Derm Scores tab ── */}
      {tab === "derm" && (
        <div className="space-y-4 animate-fade-in">
          <div className="card p-5">
            <h3 className="font-semibold text-charcoal mb-1">Score distribution (1–5 rubric)</h3>
            <p className="text-xs text-clinical-gray-500 mb-4">Score 3–5 = improvement. Score 1–2 = no improvement. All reviews conducted blind (no product name shown to reviewer).</p>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scoreDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="score" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" name="Participants" radius={[4, 4, 0, 0]}>
                    {scoreDistribution.map((entry, i) => <Cell key={i} fill={entry.improved ? "#00AEBD" : "#D1D5DB"} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-3 text-xs mt-2">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-teal-500 inline-block" />Improvement (score 3–5)</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-clinical-gray-300 inline-block" />No improvement (score 1–2)</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Drop-outs tab ── */}
      {tab === "dropouts" && (
        <div className="card p-5 animate-fade-in">
          <h3 className="font-semibold text-charcoal mb-3">Drop-out summary</h3>
          <div className="grid sm:grid-cols-3 gap-3 mb-5">
            <div className="bg-clinical-gray-50 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-charcoal">{enrolledN - completedN}</p>
              <p className="text-xs text-clinical-gray-500">Total drop-outs</p>
            </div>
            <div className="bg-clinical-gray-50 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-charcoal">{Math.round(((enrolledN - completedN) / enrolledN) * 100)}%</p>
              <p className="text-xs text-clinical-gray-500">Drop-out rate</p>
            </div>
            <div className="bg-teal-50 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-charcoal">{Math.round((completedN / enrolledN) * 100)}%</p>
              <p className="text-xs text-teal-600">Completion rate</p>
            </div>
          </div>
          <h4 className="text-sm font-medium text-clinical-gray-700 mb-2">Reasons given:</h4>
          <div className="space-y-2">
            {Object.entries(dropReasons).sort(([, a], [, b]) => b - a).map(([reason, count]) => (
              <div key={reason} className="flex items-center gap-3">
                <div className="flex-1 bg-clinical-gray-100 rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: `${(count / (enrolledN - completedN)) * 100}%` }} />
                </div>
                <span className="text-xs text-clinical-gray-600 w-32 shrink-0">{reason}</span>
                <span className="text-xs font-semibold text-charcoal w-5 shrink-0">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Safety tab ── */}
      {tab === "safety" && (
        <div className="space-y-3 animate-fade-in">
          {SAFETY_FLAGS.filter((f) => f.trialId === id).map((flag) => (
            <div key={flag.id} className="card p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${flag.severity === "Mild" ? "bg-yellow-100 text-yellow-700" : "bg-amber-100 text-amber-700"}`}>{flag.severity}</span>
                <span className={`text-xs ${flag.status === "Resolved" ? "text-lime-600" : "text-amber-600"}`}>{flag.status}</span>
              </div>
              <p className="text-sm text-charcoal">{flag.description}</p>
              <p className="text-xs text-clinical-gray-400 mt-1">{flag.location} · {new Date(flag.reportedAt).toLocaleDateString("en-IN")}</p>
            </div>
          ))}
          <div className="card p-4 bg-lime-50 border-lime-200">
            <p className="text-sm font-semibold text-lime-800 mb-1">Safety summary</p>
            <p className="text-xs text-lime-700">
              3 reactions reported. All classified Mild or Moderate. 0 severe. 0 resulted in trial suspension. 
              All resolved without medical intervention beyond stopping product use.
            </p>
          </div>
        </div>
      )}

      {/* ── Methodology tab ── */}
      {tab === "methodology" && (
        <div className="space-y-3 animate-fade-in text-sm text-clinical-gray-600">
          {[
            { title: "Study design", body: "Single-arm, open-label consumer-use study. 8 weeks, check-ins at weeks 0, 2, 4, 8." },
            { title: "Primary endpoint", body: trial.primaryEndpoint + (trial.endpointLockedAt ? ` (Locked: ${new Date(trial.endpointLockedAt).toLocaleDateString("en-IN")})` : "") },
            { title: "Participants", body: `${enrolledN} enrolled via the Fixderma Skin Panel. Employees and affiliates tagged at sign-up (${affiliatedCompleted.length} in completed group). Quota sampling by region, age, gender, skin type, and skin tone.` },
            { title: "Blinded review", body: "Before/after photo pairs reviewed by 3 independent dermatologists. Reviewers saw no product name, brand, or participant survey data. Left/right order randomised." },
            { title: "Statistics", body: "Proportions shown with Wilson score 95% confidence intervals. Conservative rate counts all drop-outs as 'no improvement'. Bootstrap CI used for mean score change." },
            { title: "Reward integrity", body: "Participants received ₹500 e-voucher + 200 points for completing all check-ins — not for positive ratings. This is stated explicitly at sign-up." },
          ].map((item) => (
            <div key={item.title} className="card p-4">
              <p className="font-semibold text-charcoal text-sm mb-1">{item.title}</p>
              <p className="leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function TrialResultsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-clinical-gray-500">Loading trial results...</div>}>
      <TrialResultsContent />
    </Suspense>
  );
}
