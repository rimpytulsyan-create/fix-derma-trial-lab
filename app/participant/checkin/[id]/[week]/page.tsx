"use client";
// app/participant/checkin/[id]/[week]/page.tsx — Check-in wizard

import { useParams, useRouter } from "next/navigation";
import { Suspense, useState, useRef } from "react";
import { Camera, Upload, CheckCircle2, AlertTriangle } from "lucide-react";
import { TRIALS } from "@/data/seed";

const QUESTIONS = [
  { id: "q1", text: "How moisturised does your skin feel right now?", low: "Very dry", high: "Very moisturised" },
  { id: "q2", text: "How much dryness or flakiness are you experiencing?", low: "A lot", high: "None at all" },
  { id: "q3", text: "How comfortable does your skin feel overall?", low: "Very uncomfortable", high: "Very comfortable" },
  { id: "q4", text: "Any tightness or discomfort since last check-in?", low: "Constant", high: "None" },
  { id: "q5", text: "How would you rate overall skin texture?", low: "Very rough", high: "Very smooth" },
];

type Step = "photo" | "survey" | "adherence" | "done";

function CheckInContent() {
  const { id, week } = useParams<{ id: string; week: string }>();
  const router = useRouter();
  const trial = TRIALS.find((t) => t.id === id);
  const weekNum = Number(week);

  const [step, setStep] = useState<Step>("photo");
  const [photoTaken, setPhotoTaken] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [freeText, setFreeText] = useState("");
  const [adherenceDays, setAdherenceDays] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!trial) return <div className="p-8 text-center text-clinical-gray-500">Trial not found.</div>;
  const isBaseline = weekNum === 0;
  const allAnswered = QUESTIONS.every((q) => answers[q.id] !== undefined);

  return (
    <div className="max-w-sm mx-auto px-4 py-8 animate-slide-up">
      {/* Progress */}
      <div className="flex gap-1.5 mb-5">
        {(["photo", "survey", "adherence", "done"] as Step[]).map((s, i) => {
          const current = ["photo", "survey", "adherence", "done"].indexOf(step);
          const idx = i;
          return (
            <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${idx <= current ? "bg-teal-500" : "bg-clinical-gray-200"}`} />
          );
        })}
      </div>

      <h1 className="text-lg font-bold text-charcoal mb-0.5">
        Week {weekNum} check-in
      </h1>
      <p className="text-xs text-clinical-gray-500 mb-5">{trial.product}</p>

      {/* ── Photo step ── */}
      {step === "photo" && (
        <div className="animate-fade-in">
          <div className="mb-4 p-3 bg-teal-50 border border-teal-100 rounded-2xl text-xs text-teal-800 space-y-1">
            <p className="font-semibold">📸 Photo tips for consistent results:</p>
            <ul className="space-y-0.5 list-disc list-inside">
              <li>Natural daylight facing a window (not direct sun)</li>
              <li>Bare face, no makeup or filters</li>
              <li>Same angle and distance as {isBaseline ? "you will use each time" : "your last check-in"}</li>
              <li>Hold phone at arm&apos;s length, face straight ahead</li>
            </ul>
          </div>

          {/* Simulated photo capture */}
          <div
            className="w-full aspect-square bg-gradient-to-br from-peach-100 to-clinical-gray-100 rounded-3xl border-2 border-dashed border-clinical-gray-300 flex flex-col items-center justify-center mb-4 relative overflow-hidden cursor-pointer hover:border-teal-400 transition-colors"
            onClick={() => fileRef.current?.click()}
          >
            {photoTaken ? (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-peach-200 to-clinical-gray-200" />
                <div className="relative text-center">
                  <CheckCircle2 className="w-10 h-10 text-teal-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-teal-700">Simulated photo captured</p>
                  <p className="text-xs text-clinical-gray-500 mt-0.5">Processed on device only — never uploaded</p>
                </div>
              </>
            ) : (
              <div className="text-center">
                <Camera className="w-10 h-10 text-clinical-gray-300 mx-auto mb-2" />
                <p className="text-sm text-clinical-gray-400 font-medium">Tap to take a photo</p>
                <p className="text-xs text-clinical-gray-300 mt-0.5">(Simulated — no real photo taken)</p>
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <div className="w-40 h-52 border-2 border-teal-500 rounded-full" />
            </div>
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={() => setPhotoTaken(true)} aria-label="Take or upload photo" />

          <button
            id="photo-simulate"
            onClick={() => setPhotoTaken(true)}
            className="w-full mb-3 py-3 border border-clinical-gray-200 rounded-2xl text-sm font-medium text-clinical-gray-600 hover:bg-clinical-gray-50 flex items-center justify-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Simulate photo taken
          </button>

          <button
            id="photo-next"
            onClick={() => setStep("survey")}
            disabled={!photoTaken}
            className="w-full py-4 rounded-2xl bg-teal-500 disabled:bg-clinical-gray-300 text-white font-semibold active:scale-95 transition-all"
          >
            Next: Survey →
          </button>

          <div className="mt-3 p-2 bg-clinical-gray-50 rounded-xl flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-clinical-gray-500">
              Not feeling well or had a reaction?{" "}
              <button className="text-teal-600 font-medium underline" onClick={() => router.back()}>
                Report a reaction first
              </button>
            </p>
          </div>
        </div>
      )}

      {/* ── Survey step ── */}
      {step === "survey" && (
        <div className="animate-fade-in space-y-5">
          <p className="text-sm text-clinical-gray-600">Answer honestly — there are no &ldquo;right&rdquo; answers. Your reward is for completing this, not for liking the product.</p>
          {QUESTIONS.map((q) => (
            <div key={q.id}>
              <p className="text-sm font-medium text-charcoal mb-2">{q.text}</p>
              <div className="flex gap-1.5 justify-between">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    id={`${q.id}-${val}`}
                    onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: val }))}
                    className={`w-10 h-10 rounded-xl text-sm font-semibold border-2 transition-all ${answers[q.id] === val ? "bg-teal-500 border-teal-500 text-white scale-110" : "bg-white border-clinical-gray-200 text-clinical-gray-600 hover:border-teal-300"}`}
                    aria-label={`Score ${val}`}
                    aria-pressed={answers[q.id] === val}
                  >
                    {val}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-clinical-gray-400 mt-1">
                <span>{q.low}</span>
                <span>{q.high}</span>
              </div>
            </div>
          ))}
          <div>
            <label htmlFor="freetext" className="text-sm font-medium text-charcoal block mb-1">
              Anything else to share? <span className="text-clinical-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              id="freetext"
              value={freeText}
              onChange={(e) => setFreeText(e.target.value)}
              rows={3}
              placeholder="Any observations about your skin this week…"
              className="w-full px-3 py-2.5 rounded-xl border border-clinical-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 resize-none"
            />
          </div>
          <button
            id="survey-next"
            onClick={() => setStep(isBaseline ? "done" : "adherence")}
            disabled={!allAnswered}
            className="w-full py-4 rounded-2xl bg-teal-500 disabled:bg-clinical-gray-300 text-white font-semibold active:scale-95"
          >
            {isBaseline ? "Submit baseline →" : "Next: Usage →"}
          </button>
        </div>
      )}

      {/* ── Adherence step ── */}
      {step === "adherence" && !isBaseline && (
        <div className="animate-fade-in">
          <h2 className="text-lg font-bold text-charcoal mb-1">Usage this week</h2>
          <p className="text-sm text-clinical-gray-500 mb-5">How many days did you use the serum in the past 7 days? Be honest — this is just for the record.</p>
          <div className="grid grid-cols-4 gap-2 mb-6">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((d) => (
              <button
                key={d}
                id={`adherence-${d}`}
                onClick={() => setAdherenceDays(d)}
                className={`py-3 rounded-2xl text-sm font-semibold border-2 transition-all ${adherenceDays === d ? "bg-teal-500 border-teal-500 text-white scale-105" : "bg-white border-clinical-gray-200 text-clinical-gray-600 hover:border-teal-300"}`}
                aria-pressed={adherenceDays === d}
              >
                {d}
              </button>
            ))}
          </div>
          {adherenceDays !== null && adherenceDays < 4 && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700 mb-4">
              ℹ️ That&apos;s fine — real life happens. Just note this in your optional comments if you&apos;d like.
            </div>
          )}
          <button
            id="adherence-submit"
            onClick={() => setStep("done")}
            disabled={adherenceDays === null}
            className="w-full py-4 rounded-2xl bg-teal-500 disabled:bg-clinical-gray-300 text-white font-semibold active:scale-95"
          >
            Submit check-in →
          </button>
        </div>
      )}

      {/* ── Done ── */}
      {step === "done" && (
        <div className="animate-fade-in text-center py-6">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-xl font-bold text-charcoal mb-1">Check-in submitted!</h2>
          <p className="text-sm text-clinical-gray-500 mb-6">Thank you for your honest feedback. Your next check-in is at Week {trial.checkInWeeks[(trial.checkInWeeks.indexOf(weekNum) + 1)] ?? "final"}.</p>
          {weekNum === 8 && (
            <div className="p-4 bg-lime-50 border border-lime-200 rounded-2xl mb-5 text-sm text-lime-800">
              🎉 You&apos;ve completed the study! Your ₹500 e-voucher + 200 skin points will be credited within 7 days. Results will be published when all reviews are complete.
            </div>
          )}
          <button onClick={() => router.push("/participant/trials")} className="w-full py-3 rounded-2xl bg-teal-500 text-white font-semibold">
            Back to trials
          </button>
        </div>
      )}
    </div>
  );
}

export default function CheckInPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-clinical-gray-500">Loading check-in wizard...</div>}>
      <CheckInContent />
    </Suspense>
  );
}
