"use client";
// app/participant/profile/page.tsx — High-Engagement 3-Step Skin Profile Wizard

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { ArrowRight, ArrowLeft, CheckCircle2, Sparkles, MapPin, ShieldCheck, Flame, Droplets, Sun, Activity } from "lucide-react";

type WizardStep = 1 | 2 | 3;

const REGIONS = [
  { id: "North India", label: "North", desc: "Delhi NCR, UP, Punjab, Rajasthan" },
  { id: "South India", label: "South", desc: "Karnataka, TN, Kerala, AP, Telangana" },
  { id: "West India", label: "West", desc: "Maharashtra, Gujarat, Goa" },
  { id: "East India", label: "East", desc: "WB, Odisha, Bihar, Jharkhand" },
];

const AGE_BANDS = ["18–24", "25–34", "35–44", "45+"];

const SKIN_TYPES = [
  { value: "Dry", label: "Dry / Flaky", icon: "🌵", desc: "Feels tight, lacks moisture" },
  { value: "Oily", label: "Oily / Acne-Prone", icon: "✨", desc: "Excess sebum, shiny T-zone" },
  { value: "Combination", label: "Combination", icon: "⚖️", desc: "Oily T-zone, normal/dry cheeks" },
  { value: "Sensitive", label: "Sensitive", icon: "🌸", desc: "Easily irritated or red" },
];

const SKIN_TONES = [
  { value: "Very Fair", hex: "#FDDBB4", label: "Type I-II · Very Fair" },
  { value: "Fair", hex: "#F0C79A", label: "Type III · Fair / Wheatish" },
  { value: "Medium", hex: "#D4956A", label: "Type IV · Medium Warm" },
  { value: "Olive", hex: "#B07D51", label: "Type IV-V · Olive / Dusky" },
  { value: "Brown", hex: "#7D4E2A", label: "Type V · Deep Brown" },
  { value: "Deep", hex: "#3D1C0E", label: "Type VI · Rich Deep" },
];

const CONCERNS = [
  { id: "Barrier Health", label: "Damaged Barrier", icon: "🛡️" },
  { id: "Dryness", label: "Dryness & Tightness", icon: "💧" },
  { id: "Acne/breakouts", label: "Acne & Clogged Pores", icon: "🎯" },
  { id: "Dark spots", label: "Sun Spots & Marks", icon: "☀️" },
  { id: "Uneven tone", label: "Hyperpigmentation", icon: "🎨" },
  { id: "Redness", label: "Erythema / Redness", icon: "🔥" },
  { id: "Wrinkles/fine lines", label: "Fine Lines & Aging", icon: "⏳" },
  { id: "Dullness", label: "Dull Complexion", icon: "💡" },
];

export default function SkinProfilePage() {
  const router = useRouter();
  const { setParticipantSession } = useAppStore();

  const [step, setStep] = useState<WizardStep>(1);
  const [region, setRegion] = useState("North India");
  const [ageBand, setAgeBand] = useState("25–34");
  const [gender, setGender] = useState("Female");
  const [skinType, setSkinType] = useState("Dry");
  const [skinTone, setSkinTone] = useState("Medium");
  const [concerns, setConcerns] = useState<string[]>(["Barrier Health", "Dryness"]);
  const [isAffiliated, setIsAffiliated] = useState(false);

  function toggleConcern(id: string) {
    setConcerns((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function handleComplete() {
    setParticipantSession({
      region,
      ageBand,
      gender,
      skinType,
      skinTone,
      skinConcerns: concerns,
      independence: isAffiliated ? "Affiliated" : "Independent",
      currentStep: "trials",
    });
    router.push("/participant/trials");
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8 animate-fade-in">
      {/* Visual Step Indicator */}
      <div className="mb-6">
        <div className="flex justify-between items-center text-xs font-bold text-clinical-gray-500 mb-2">
          <span>Step {step} of 3</span>
          <span className="text-teal-600">
            {step === 1 && "Geography & Age"}
            {step === 2 && "Skin Tone & Type"}
            {step === 3 && "Concerns & Matching"}
          </span>
        </div>
        <div className="w-full bg-clinical-gray-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-teal-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* ─── STEP 1: Region & Age ─── */}
      {step === 1 && (
        <div className="card p-6 sm:p-8 bg-white border border-clinical-gray-200 shadow-sm animate-fade-in">
          <h2 className="text-xl font-extrabold text-charcoal mb-1">Where do you live?</h2>
          <p className="text-xs text-clinical-gray-500 mb-6">
            We balance trials across Indian climate zones and municipal water hardness profiles.
          </p>

          <div className="space-y-5">
            {/* Region selection */}
            <div>
              <label className="block text-xs font-bold text-charcoal mb-2">Geographic Zone</label>
              <div className="grid grid-cols-2 gap-2.5">
                {REGIONS.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRegion(r.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      region === r.id
                        ? "border-teal-500 bg-teal-50/80 ring-1 ring-teal-500 text-teal-900"
                        : "border-clinical-gray-200 hover:border-clinical-gray-300 text-clinical-gray-700"
                    }`}
                  >
                    <p className="text-xs font-bold">{r.label}</p>
                    <p className="text-[10px] text-clinical-gray-400 mt-0.5 truncate">{r.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Age Band chips */}
            <div>
              <label className="block text-xs font-bold text-charcoal mb-2">Age Bracket</label>
              <div className="flex gap-2">
                {AGE_BANDS.map((age) => (
                  <button
                    key={age}
                    type="button"
                    onClick={() => setAgeBand(age)}
                    className={`flex-1 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      ageBand === age
                        ? "border-teal-500 bg-teal-500 text-white shadow-xs"
                        : "border-clinical-gray-200 bg-white text-clinical-gray-700 hover:border-clinical-gray-300"
                    }`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>

            {/* Gender chips */}
            <div>
              <label className="block text-xs font-bold text-charcoal mb-2">Gender</label>
              <div className="flex gap-2">
                {["Female", "Male", "Non-binary"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`flex-1 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      gender === g
                        ? "border-teal-500 bg-teal-50/80 text-teal-800 font-extrabold"
                        : "border-clinical-gray-200 bg-white text-clinical-gray-600 hover:border-clinical-gray-300"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full mt-4 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md shadow-teal-500/20 active:scale-98 cursor-pointer text-sm"
            >
              <span>Next: Skin Profile & Tone</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ─── STEP 2: Skin Type & Fitzpatrick Tone ─── */}
      {step === 2 && (
        <div className="card p-6 sm:p-8 bg-white border border-clinical-gray-200 shadow-sm animate-fade-in">
          <button
            onClick={() => setStep(1)}
            className="text-xs font-semibold text-teal-600 mb-4 flex items-center gap-1 hover:underline cursor-pointer"
          >
            ← Back to location
          </button>

          <h2 className="text-xl font-extrabold text-charcoal mb-1">Your Skin Profile</h2>
          <p className="text-xs text-clinical-gray-500 mb-6">
            Formulations behave differently on different Fitzpatrick phototypes.
          </p>

          <div className="space-y-6">
            {/* Skin Type Cards */}
            <div>
              <label className="block text-xs font-bold text-charcoal mb-2">Primary Skin Type</label>
              <div className="grid grid-cols-2 gap-2.5">
                {SKIN_TYPES.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setSkinType(t.value)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      skinType === t.value
                        ? "border-teal-500 bg-teal-50/80 ring-1 ring-teal-500"
                        : "border-clinical-gray-200 hover:border-clinical-gray-300"
                    }`}
                  >
                    <div className="text-lg mb-1">{t.icon}</div>
                    <p className="text-xs font-bold text-charcoal">{t.label}</p>
                    <p className="text-[10px] text-clinical-gray-400 mt-0.5">{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Fitzpatrick Swatches */}
            <div>
              <label className="block text-xs font-bold text-charcoal mb-2">
                Fitzpatrick Phototype (Indian Spectrum)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {SKIN_TONES.map((tone) => (
                  <button
                    key={tone.value}
                    type="button"
                    onClick={() => setSkinTone(tone.value)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      skinTone === tone.value
                        ? "border-teal-500 ring-2 ring-teal-500/20 bg-teal-50/40"
                        : "border-clinical-gray-200 hover:border-clinical-gray-300"
                    }`}
                  >
                    <div
                      className="w-full h-8 rounded-lg shadow-inner mb-1.5 border border-black/10"
                      style={{ backgroundColor: tone.hex }}
                    />
                    <p className="text-[11px] font-bold text-charcoal truncate">{tone.value}</p>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setStep(3)}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md shadow-teal-500/20 active:scale-98 cursor-pointer text-sm"
            >
              <span>Next: Skin Concerns</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ─── STEP 3: Concerns & Trial Matching ─── */}
      {step === 3 && (
        <div className="card p-6 sm:p-8 bg-white border border-clinical-gray-200 shadow-sm animate-fade-in">
          <button
            onClick={() => setStep(2)}
            className="text-xs font-semibold text-teal-600 mb-4 flex items-center gap-1 hover:underline cursor-pointer"
          >
            ← Back to skin type
          </button>

          <h2 className="text-xl font-extrabold text-charcoal mb-1">What are you treating?</h2>
          <p className="text-xs text-clinical-gray-500 mb-5">
            Select concerns to match active formula trials currently recruiting.
          </p>

          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              {CONCERNS.map((c) => {
                const active = concerns.includes(c.id);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => toggleConcern(c.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      active
                        ? "bg-teal-500 text-white shadow-xs"
                        : "bg-clinical-gray-100 text-clinical-gray-700 hover:bg-clinical-gray-200"
                    }`}
                  >
                    <span>{c.icon}</span>
                    <span>{c.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Trial Match Teaser Box */}
            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-teal-900">Matches Found!</p>
                <p className="text-[11px] text-teal-700 mt-0.5">
                  1 Active Trial matches your <strong>{skinType}</strong> profile & location.
                </p>
              </div>
              <span className="text-xl">🎉</span>
            </div>

            {/* Independence Confirmation */}
            <label className="flex items-start gap-2.5 p-3 rounded-xl bg-clinical-gray-50 border border-clinical-gray-200 cursor-pointer text-xs text-clinical-gray-600">
              <input
                type="checkbox"
                checked={isAffiliated}
                onChange={(e) => setIsAffiliated(e.target.checked)}
                className="mt-0.5 rounded text-teal-600 focus:ring-teal-500"
              />
              <span>I confirm I am not an employee or brand influencer of Fixderma.</span>
            </label>

            <button
              onClick={handleComplete}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md shadow-teal-500/20 active:scale-98 cursor-pointer text-base"
            >
              <span>View Matched Trials →</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
