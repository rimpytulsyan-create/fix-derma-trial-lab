"use client";
// app/participant/trials/[id]/page.tsx — Trial detail + consent + kit tracking + check-in

import { useParams, useRouter } from "next/navigation";
import { TRIALS } from "@/data/seed";
import { Suspense, useState } from "react";
import { CheckCircle2, AlertTriangle, Package, Truck, Clock, Camera } from "lucide-react";
import Link from "next/link";

function TrialDetailContent() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const trial = TRIALS.find((t) => t.id === id);
  const [step, setStep] = useState<"detail" | "consent" | "kit" | "active">("detail");
  const [consented, setConsented] = useState(false);
  const [reactionOpen, setReactionOpen] = useState(false);
  const [reaction, setReaction] = useState({ what: "", where: "", severity: "Mild" });

  if (!trial) return <div className="p-8 text-center text-clinical-gray-500">Trial not found.</div>;

  if (step === "detail") {
    return (
      <div className="max-w-lg mx-auto px-4 py-8 animate-slide-up">
        <Link href="/participant/trials" className="text-sm text-teal-600 mb-4 flex items-center gap-1">← All trials</Link>
        <div className="card p-6 mb-4">
          <div className="flex gap-2 items-start mb-4">
            <div className="flex-1">
              <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200 uppercase tracking-wide">
                Free Consumer Test
              </span>
              <h1 className="text-xl font-bold text-charcoal mt-2">{trial.product}</h1>
              <p className="text-xs text-clinical-gray-600 mt-1">Made to hydrate dry skin and repair skin softness</p>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full shrink-0">
              Open to Join
            </span>
          </div>
          <p className="text-xs text-clinical-gray-700 leading-relaxed mb-4">
            Try a full-sized 50ml bottle at home for free. Apply morning and night. Share a quick phone photo every 2 weeks to earn your ₹500 Fixderma gift coupon.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Trial Duration", value: `${trial.durationWeeks} weeks` },
              { label: "Quick Check-ins", value: "Every 2 weeks" },
              { label: "Completion Reward", value: "₹500 Voucher" },
              { label: "Bottle Cost", value: "₹0 (100% Free)" },
            ].map((item) => (
              <div key={item.label} className="bg-clinical-gray-50 rounded-xl p-3 border border-clinical-gray-200">
                <p className="text-xs text-clinical-gray-500">{item.label}</p>
                <p className="text-sm font-bold text-charcoal">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-4 mb-4 border-l-4 border-amber-400 bg-amber-50/40">
          <h3 className="font-bold text-charcoal text-xs mb-2">⚠️ Simple Safety Tips</h3>
          <ul className="text-xs text-clinical-gray-700 space-y-1 list-disc list-inside">
            <li>On Day 1, test a few drops on your inner wrist. Wait 24 hours.</li>
            <li>If your skin feels itchy or uncomfortable, tap &ldquo;I had a reaction&rdquo; anytime.</li>
            <li>We reward you for honest truth — you still get paid even if the product didn&apos;t suit you.</li>
          </ul>
        </div>

        <button
          id="trial-apply-consent"
          onClick={() => setStep("consent")}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 rounded-2xl text-base shadow-sm active:scale-98 transition-all cursor-pointer"
        >
          Join this trial (Free Bottle) →
        </button>
      </div>
    );
  }

  if (step === "consent") {
    return (
      <div className="max-w-lg mx-auto px-4 py-8 animate-slide-up">
        <button onClick={() => setStep("detail")} className="text-sm text-teal-600 mb-4 cursor-pointer">← Back</button>
        <h2 className="text-xl font-bold text-charcoal mb-2">Simple Trial Agreement</h2>
        <p className="text-xs text-clinical-gray-600 mb-4">Please read these 4 simple points before starting:</p>
        
        <div className="space-y-3 mb-5 text-sm text-clinical-gray-700">
          {[
            { 
              title: "1. Free Test Kit Sent to Your Home", 
              body: "We will ship a 50ml bottle to your address completely free of cost. No hidden delivery charges." 
            },
            { 
              title: "2. Simple Check-ins from Your Phone", 
              body: "Every 2 weeks, take a simple selfie in normal room light and answer 3 quick questions about how your skin feels." 
            },
            { 
              title: "3. ₹500 Voucher for Honest Feedback", 
              body: "You receive your ₹500 gift coupon upon completion. You get rewarded whether your skin improved or not. Never give fake praise." 
            },
            { 
              title: "4. You Can Stop at Any Time", 
              body: "If you feel any discomfort or simply want to stop, tap the red button to exit. You are always in full control." 
            },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-xl p-3.5 border border-clinical-gray-200 shadow-2xs">
              <p className="font-bold text-charcoal text-xs mb-1">{item.title}</p>
              <p className="text-xs text-clinical-gray-600 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
        <label className="flex items-start gap-3 mb-5 cursor-pointer bg-teal-50/50 p-3 rounded-xl border border-teal-200">
          <input type="checkbox" id="trial-consent-check" checked={consented} onChange={(e) => setConsented(e.target.checked)} className="mt-1 w-4 h-4 accent-teal-500 shrink-0" />
          <span className="text-xs font-semibold text-teal-950">
            I understand how the trial works and agree to test the product at home.
          </span>
        </label>
        <button
          id="trial-consent-submit"
          onClick={() => setStep("kit")}
          disabled={!consented}
          className="w-full bg-teal-500 disabled:bg-clinical-gray-300 text-white font-bold py-4 rounded-2xl active:scale-98 transition-all cursor-pointer shadow-sm"
        >
          Confirm & Get Free Kit
        </button>
      </div>
    );
  }

  if (step === "kit") {
    const kitSteps = [
      { icon: <CheckCircle2 className="w-5 h-5" />, label: "Application confirmed", done: true },
      { icon: <Package className="w-5 h-5" />, label: "Kit being packed", done: true },
      { icon: <Truck className="w-5 h-5" />, label: "Shipped (1–3 days)", done: false },
      { icon: <CheckCircle2 className="w-5 h-5" />, label: "Delivered", done: false },
    ];
    return (
      <div className="max-w-sm mx-auto px-4 py-8 animate-slide-up">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">📦</div>
          <h2 className="text-xl font-bold text-charcoal">You&apos;re in!</h2>
          <p className="text-sm text-clinical-gray-500 mt-1">Your kit is being prepared. We&apos;ll send a WhatsApp reminder when it&apos;s shipped.</p>
        </div>
        <div className="card p-5 mb-6">
          <h3 className="font-semibold text-charcoal mb-4 text-sm">Kit delivery status</h3>
          <div className="space-y-3">
            {kitSteps.map((s, i) => (
              <div key={i} className={`flex items-center gap-3 text-sm ${s.done ? "text-teal-600" : "text-clinical-gray-400"}`}>
                <div className={`${s.done ? "text-teal-500" : "text-clinical-gray-300"}`}>{s.icon}</div>
                {s.label}
                {i === 1 && <span className="ml-auto text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">Current</span>}
              </div>
            ))}
          </div>
        </div>
        <button
          id="kit-goto-active"
          onClick={() => setStep("active")}
          className="w-full bg-teal-500 text-white font-semibold py-4 rounded-2xl active:scale-95"
        >
          Preview the check-in flow →
        </button>
      </div>
    );
  }

  // Active trial screen with check-ins
  if (step === "active") {
    return (
      <div className="max-w-sm mx-auto px-4 py-8 animate-slide-up relative">
        {/* Reaction button — always visible */}
        <button
          id="reaction-btn"
          onClick={() => setReactionOpen(true)}
          className="fixed bottom-6 right-4 z-50 flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2.5 rounded-2xl shadow-lg active:scale-95 transition-all"
          aria-label="Report a skin reaction"
        >
          <AlertTriangle className="w-4 h-4" />
          I had a reaction
        </button>

        <h2 className="text-xl font-bold text-charcoal mb-1">{trial.product}</h2>
        <p className="text-sm text-clinical-gray-500 mb-5">Week 0 of {trial.durationWeeks} · Baseline check-in due</p>

        <div className="space-y-3">
          {trial.checkInWeeks.map((week, i) => (
            <Link
              key={week}
              href={`/participant/checkin/${trial.id}/${week}`}
              id={`checkin-week-${week}`}
              className={`card p-4 flex items-center gap-3 hover:no-underline ${i === 0 ? "border-2 border-teal-400" : "opacity-60 pointer-events-none"}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${i === 0 ? "bg-teal-500 text-white" : "bg-clinical-gray-100 text-clinical-gray-400"}`}>
                {i === 0 ? <Camera className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
              </div>
              <div>
                <p className="font-semibold text-charcoal text-sm">Week {week} check-in</p>
                <p className="text-xs text-clinical-gray-500">{week === 0 ? "Due now — baseline photos + survey" : `Unlocks in ${(i) * 2} weeks`}</p>
              </div>
              {i === 0 && <span className="ml-auto text-xs bg-teal-100 text-teal-700 font-medium px-2 py-0.5 rounded-full">Due</span>}
            </Link>
          ))}
        </div>

        {/* Reaction modal */}
        {reactionOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Report a skin reaction">
            <div className="bg-white rounded-3xl p-6 w-full max-w-sm animate-slide-up">
              <h3 className="font-bold text-charcoal text-lg mb-1">Report a reaction</h3>
              <p className="text-sm text-clinical-gray-500 mb-4">Stop using the product now. If the reaction is severe, see a doctor immediately.</p>
              <div className="space-y-3 mb-4">
                <div>
                  <label htmlFor="reaction-what" className="text-xs font-medium text-clinical-gray-700 mb-1 block">What did you notice?</label>
                  <input id="reaction-what" value={reaction.what} onChange={(e) => setReaction({ ...reaction, what: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-clinical-gray-200 text-sm focus:ring-2 focus:ring-teal-300 focus:outline-none" placeholder="Redness, itching, swelling…" />
                </div>
                <div>
                  <label htmlFor="reaction-where" className="text-xs font-medium text-clinical-gray-700 mb-1 block">Where?</label>
                  <input id="reaction-where" value={reaction.where} onChange={(e) => setReaction({ ...reaction, where: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-clinical-gray-200 text-sm focus:ring-2 focus:ring-teal-300 focus:outline-none" placeholder="Left cheek, chin, full face…" />
                </div>
                <div>
                  <label htmlFor="reaction-severity" className="text-xs font-medium text-clinical-gray-700 mb-1 block">Severity</label>
                  <select id="reaction-severity" value={reaction.severity} onChange={(e) => setReaction({ ...reaction, severity: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-clinical-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 bg-white">
                    <option>Mild</option>
                    <option>Moderate</option>
                    <option>Severe</option>
                  </select>
                </div>
              </div>
              {reaction.severity === "Severe" && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 mb-3">
                  ⚠️ For severe reactions: stop product use immediately and consult a dermatologist or go to a clinic.
                </div>
              )}
              <div className="flex gap-2">
                <button onClick={() => setReactionOpen(false)} className="flex-1 py-2.5 rounded-xl border border-clinical-gray-200 text-sm font-medium text-clinical-gray-600">Cancel</button>
                <button
                  id="reaction-submit"
                  onClick={() => { alert("Reaction reported. The brand team has been notified. Please stop using the product and see a doctor if the reaction is severe."); setReactionOpen(false); }}
                  className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold"
                >
                  Submit report
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}

export default function TrialDetailPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-clinical-gray-500">Loading trial details...</div>}>
      <TrialDetailContent />
    </Suspense>
  );
}
