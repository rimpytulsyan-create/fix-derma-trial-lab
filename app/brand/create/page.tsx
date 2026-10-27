"use client";
// app/brand/create/page.tsx — Create trial wizard (6 steps)

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, CheckCircle2, Info } from "lucide-react";
import { sampleSizePlanner } from "@/lib/stats";

type WizardStep = "product" | "endpoint" | "eligibility" | "quotas" | "policy" | "review";
const STEPS: { id: WizardStep; label: string }[] = [
  { id: "product", label: "Product" },
  { id: "endpoint", label: "Endpoint" },
  { id: "eligibility", label: "Eligibility" },
  { id: "quotas", label: "Quotas" },
  { id: "policy", label: "Policy" },
  { id: "review", label: "Review & launch" },
];

export default function CreateTrialPage() {
  const router = useRouter();
  const [stepIdx, setStepIdx] = useState(0);
  const currentStep = STEPS[stepIdx].id;
  const [launched, setLaunched] = useState(false);

  // Form state
  const [product, setProduct] = useState("");
  const [claim, setClaim] = useState("");
  const [duration, setDuration] = useState(8);
  const [endpoint, setEndpoint] = useState("");
  const [endpointLocked, setEndpointLocked] = useState(false);
  const [lockedAt, setLockedAt] = useState<string | null>(null);
  const [targetN, setTargetN] = useState(120);
  const [dropoutRate, setDropoutRate] = useState(0.2);
  const [marginError, setMarginError] = useState(0.07);
  const [reward, setReward] = useState(400);
  const [independencePolicy, setIndependencePolicy] = useState<"exclude" | "include-tagged">("exclude");

  const suggestedN = sampleSizePlanner(0.5, marginError, dropoutRate);

  function lockEndpoint() {
    setEndpointLocked(true);
    setLockedAt(new Date().toISOString());
  }

  function next() {
    if (stepIdx < STEPS.length - 1) setStepIdx(stepIdx + 1);
  }
  function back() {
    if (stepIdx > 0) setStepIdx(stepIdx - 1);
  }

  if (launched) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center animate-slide-up">
        <div className="text-5xl mb-4">🚀</div>
        <h1 className="text-2xl font-bold text-charcoal mb-2">Trial launched!</h1>
        <p className="text-clinical-gray-500 mb-2">{product || "Your trial"} is now live in the recruitment queue.</p>
        <p className="text-xs text-clinical-gray-400 mb-6">Endpoint locked. Recruitment opens immediately.</p>
        <button onClick={() => router.push("/brand")} className="bg-teal-500 text-white font-semibold px-6 py-3 rounded-2xl">
          Go to dashboard →
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-in">
      {/* Stepper */}
      <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-2">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center gap-1 shrink-0">
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors ${i === stepIdx ? "bg-teal-500 text-white" : i < stepIdx ? "bg-teal-100 text-teal-700" : "bg-clinical-gray-100 text-clinical-gray-400"}`}>
              {i < stepIdx && <CheckCircle2 className="w-3 h-3" />}
              {s.label}
            </div>
            {i < STEPS.length - 1 && <div className="w-3 h-px bg-clinical-gray-200" />}
          </div>
        ))}
      </div>

      {/* ── Step: Product ── */}
      {currentStep === "product" && (
        <div className="animate-fade-in space-y-4">
          <h1 className="text-xl font-bold text-charcoal">Product details</h1>
          <div>
            <label htmlFor="product-name" className="text-sm font-medium text-clinical-gray-700 block mb-1">Product name</label>
            <input id="product-name" value={product} onChange={(e) => setProduct(e.target.value)} placeholder="Barrier Repair Serum (concept)" className="w-full px-4 py-3 rounded-xl border border-clinical-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300" />
          </div>
          <div>
            <label htmlFor="claim-text" className="text-sm font-medium text-clinical-gray-700 block mb-1">Claim being tested (plain words)</label>
            <textarea id="claim-text" value={claim} onChange={(e) => setClaim(e.target.value)} placeholder="Reduces the appearance of dark spots in 8 weeks" rows={2} className="w-full px-4 py-3 rounded-xl border border-clinical-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 resize-none" />
            <p className="text-xs text-clinical-gray-400 mt-1">Write it as you would on a pack or ad. Avoid "guarantees" or "100%".</p>
          </div>
          <div>
            <label htmlFor="duration" className="text-sm font-medium text-clinical-gray-700 block mb-1">Study duration: <span className="text-teal-600 font-bold">{duration} weeks</span></label>
            <input id="duration" type="range" min={2} max={16} value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="w-full accent-teal-500" />
            <div className="flex justify-between text-xs text-clinical-gray-400 mt-1"><span>2 wks</span><span>16 wks</span></div>
          </div>
          <div>
            <label htmlFor="reward-amount" className="text-sm font-medium text-clinical-gray-700 block mb-1">Completion reward (INR)</label>
            <input id="reward-amount" type="number" value={reward} onChange={(e) => setReward(Number(e.target.value))} className="w-full px-4 py-3 rounded-xl border border-clinical-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300" />
            <p className="text-xs text-teal-600 mt-1 flex items-center gap-1"><Info className="w-3 h-3" /> Reward is always for completion, never for positive ratings.</p>
          </div>
        </div>
      )}

      {/* ── Step: Endpoint ── */}
      {currentStep === "endpoint" && (
        <div className="animate-fade-in space-y-4">
          <h2 className="text-xl font-bold text-charcoal">Primary endpoint</h2>
          <p className="text-sm text-clinical-gray-500">
            Define exactly how you will measure success <em>before</em> recruiting. This cannot be changed after locking.
            Locking prevents cherry-picking endpoints after seeing results.
          </p>
          <div>
            <label htmlFor="endpoint-text" className="text-sm font-medium text-clinical-gray-700 block mb-1">Primary endpoint (specific and measurable)</label>
            <textarea
              id="endpoint-text"
              value={endpoint}
              onChange={(e) => !endpointLocked && setEndpoint(e.target.value)}
              disabled={endpointLocked}
              placeholder="e.g. Dermatologist-assessed improvement score ≥3/5 at Week 8, plus ≥20% self-reported improvement in skin brightness"
              rows={3}
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 resize-none ${endpointLocked ? "bg-clinical-gray-50 text-clinical-gray-500 cursor-not-allowed border-clinical-gray-200" : "border-clinical-gray-200"}`}
            />
          </div>

          {!endpointLocked ? (
            <button
              id="lock-endpoint-btn"
              onClick={lockEndpoint}
              disabled={!endpoint.trim()}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:bg-clinical-gray-300 text-white font-semibold px-5 py-3 rounded-xl transition-colors"
            >
              <Lock className="w-4 h-4" />
              Lock endpoint (irreversible)
            </button>
          ) : (
            <div className="flex items-center gap-2 p-3 bg-lime-50 border border-lime-200 rounded-xl">
              <Lock className="w-4 h-4 text-lime-600 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-lime-800">Endpoint locked</p>
                <p className="text-xs text-lime-600">Locked at {lockedAt ? new Date(lockedAt).toLocaleString("en-IN") : "N/A"} · Cannot be changed</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Step: Eligibility ── */}
      {currentStep === "eligibility" && (
        <div className="animate-fade-in space-y-4">
          <h2 className="text-xl font-bold text-charcoal">Eligibility rules</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: "Age bands", options: ["18-24", "25-34", "35-44", "45-54", "55+"] },
              { label: "Skin types", options: ["Normal", "Dry", "Oily", "Combination", "Sensitive"] },
              { label: "Skin concerns (include if has)", options: ["Dryness", "Dark spots", "Acne", "Redness", "Sensitivity", "Uneven tone"] },
              { label: "Exclude if has", options: ["Active eczema", "Pregnancy", "Photosensitivity", "Active rosacea"] },
            ].map((group) => (
              <div key={group.label}>
                <p className="text-sm font-medium text-clinical-gray-700 mb-2">{group.label}</p>
                <div className="flex flex-wrap gap-1.5">
                  {group.options.map((opt) => (
                    <button key={opt} className="px-2.5 py-1 rounded-full text-xs border border-clinical-gray-200 text-clinical-gray-600 hover:border-teal-300 hover:text-teal-700 transition-colors">
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Step: Quotas ── */}
      {currentStep === "quotas" && (
        <div className="animate-fade-in space-y-5">
          <h2 className="text-xl font-bold text-charcoal">Quota matrix + sample size</h2>

          {/* Sample size helper */}
          <div className="card p-4 bg-teal-50 border-teal-100">
            <h3 className="font-semibold text-charcoal mb-3 text-sm">📐 Sample size helper</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-clinical-gray-600 block mb-1">Margin of error (±): <strong>{Math.round(marginError * 100)}pp</strong></label>
                <input type="range" min={3} max={15} value={Math.round(marginError * 100)} onChange={(e) => setMarginError(Number(e.target.value) / 100)} className="w-full accent-teal-500" />
              </div>
              <div>
                <label className="text-xs text-clinical-gray-600 block mb-1">Expected drop-out: <strong>{Math.round(dropoutRate * 100)}%</strong></label>
                <input type="range" min={0} max={40} value={Math.round(dropoutRate * 100)} onChange={(e) => setDropoutRate(Number(e.target.value) / 100)} className="w-full accent-teal-500" />
              </div>
            </div>
            <div className="mt-3 p-2 bg-white rounded-xl border border-teal-200 text-center">
              <p className="text-xs text-clinical-gray-500">Suggested target n (p=0.5, z=1.96, inflated for drop-out)</p>
              <p className="text-2xl font-bold text-teal-600">{suggestedN}</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-clinical-gray-700 block mb-1">Your target n</label>
            <input type="number" value={targetN} onChange={(e) => setTargetN(Number(e.target.value))} className="w-full px-4 py-3 rounded-xl border border-clinical-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300" />
          </div>

          {/* Quota targets */}
          <div>
            <p className="text-sm font-medium text-clinical-gray-700 mb-2">Region targets (%)</p>
            <div className="grid grid-cols-3 gap-2">
              {["North", "South", "East", "West", "North-East", "Central"].map((r, i) => (
                <div key={r} className="bg-clinical-gray-50 rounded-xl p-2">
                  <label className="text-xs text-clinical-gray-500">{r}</label>
                  <input type="number" defaultValue={[30, 25, 15, 20, 5, 5][i]} className="w-full text-sm font-semibold text-charcoal bg-transparent focus:outline-none" />
                </div>
              ))}
            </div>
            <p className="text-xs text-clinical-gray-400 mt-1">Targets must sum to 100%. Drift warnings fire when ±15% off target.</p>
          </div>
        </div>
      )}

      {/* ── Step: Policy ── */}
      {currentStep === "policy" && (
        <div className="animate-fade-in space-y-4">
          <h2 className="text-xl font-bold text-charcoal">Independence policy</h2>
          <div className="space-y-2">
            {[
              { value: "exclude", label: "Exclude affiliated participants", desc: "Employees and affiliates are not allowed to enrol. Strictest approach." },
              { value: "include-tagged", label: "Include but tag separately", desc: "Affiliated participants can enrol. Their results are shown separately in the dashboard and can be excluded from the headline figure." },
            ].map((opt) => (
              <button key={opt.value} onClick={() => setIndependencePolicy(opt.value as "exclude" | "include-tagged")} className={`w-full flex gap-3 items-start p-4 rounded-2xl border text-left transition-all ${independencePolicy === opt.value ? "bg-teal-50 border-teal-400" : "bg-white border-clinical-gray-200 hover:border-teal-200"}`}>
                <div className={`shrink-0 mt-1 w-4 h-4 rounded-full border-2 ${independencePolicy === opt.value ? "border-teal-500 bg-teal-500" : "border-clinical-gray-300"}`} />
                <div>
                  <p className="font-medium text-sm text-charcoal">{opt.label}</p>
                  <p className="text-xs text-clinical-gray-500 mt-0.5">{opt.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Step: Review & launch ── */}
      {currentStep === "review" && (
        <div className="animate-fade-in space-y-4">
          <h2 className="text-xl font-bold text-charcoal">Review & launch</h2>
          <div className="space-y-2">
            {[
              { label: "Product", value: product || "(not set)" },
              { label: "Claim", value: claim || "(not set)" },
              { label: "Duration", value: `${duration} weeks` },
              { label: "Target n", value: String(targetN) },
              { label: "Reward", value: `₹${reward} (completion only)` },
              { label: "Endpoint locked", value: endpointLocked ? `Yes — ${lockedAt ? new Date(lockedAt).toLocaleDateString("en-IN") : ""}` : "⚠️ Not locked" },
              { label: "Independence policy", value: independencePolicy === "exclude" ? "Exclude affiliated" : "Include, tag separately" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between gap-4 py-2 border-b border-clinical-gray-100">
                <span className="text-sm text-clinical-gray-500">{item.label}</span>
                <span className={`text-sm font-medium text-right ${item.value.startsWith("⚠️") ? "text-amber-600" : "text-charcoal"}`}>{item.value}</span>
              </div>
            ))}
          </div>
          {!endpointLocked && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
              ⚠️ You must lock the primary endpoint before launching. Go back to Step 2.
            </div>
          )}
          <button
            id="launch-trial-btn"
            onClick={() => endpointLocked && product && setLaunched(true)}
            disabled={!endpointLocked || !product}
            className="w-full py-4 rounded-2xl bg-teal-500 disabled:bg-clinical-gray-300 text-white font-bold text-lg active:scale-95 transition-all"
          >
            Launch trial 🚀
          </button>
        </div>
      )}

      {/* Navigation */}
      {!launched && (
        <div className="flex gap-3 mt-6">
          {stepIdx > 0 && (
            <button onClick={back} className="flex-1 py-3 rounded-2xl border border-clinical-gray-200 text-sm font-medium text-clinical-gray-600 hover:bg-clinical-gray-50">
              ← Back
            </button>
          )}
          {stepIdx < STEPS.length - 1 && (
            <button
              id="wizard-next-btn"
              onClick={next}
              className="flex-1 py-3 rounded-2xl bg-teal-500 text-white font-semibold text-sm active:scale-95"
            >
              Next →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
