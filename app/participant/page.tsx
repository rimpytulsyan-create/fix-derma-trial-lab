"use client";
// app/participant/page.tsx — High-Engagement Participant Landing & Onboarding

import { useState } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { 
  ShieldCheck, Phone, CheckCircle2, ArrowRight, Sparkles, 
  Gift, Package, Clock, Heart, Zap, Lock 
} from "lucide-react";

type Step = "landing" | "phone" | "otp" | "consent";

export default function ParticipantPage() {
  const router = useRouter();
  const { setParticipantSession } = useAppStore();

  const [step, setStep] = useState<Step>("landing");
  const [phone, setPhone] = useState("9876543210");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [whatsappOptIn, setWhatsappOptIn] = useState(true);
  const [isAffiliated, setIsAffiliated] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);

  function handleAutoFill() {
    setPhone("9876543210");
    setOtp(["1", "2", "3", "4", "5", "6"]);
  }

  function handleOtpChange(index: number, val: string) {
    if (!/^\d*$/.test(val)) return;
    const nextOtp = [...otp];
    nextOtp[index] = val.slice(-1);
    setOtp(nextOtp);
  }

  function handleConsentContinue() {
    setParticipantSession({ currentStep: "profile" });
    router.push("/participant/profile");
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8 animate-fade-in">
      {/* Prominent Legal / Brand Safety Notice */}
      <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 text-amber-950 text-xs leading-relaxed">
        <div className="flex items-center gap-2 font-bold text-amber-900 text-sm mb-1">
          <Lock className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Public Registration Disabled (Concept Mock Only)</span>
        </div>
        <p>
          This is an illustrative candidate prototype demonstrating study workflow architecture. Fixderma does not collect real consumer applications or mobile phone numbers on this demo site.
        </p>
      </div>

      {/* ─── Step 1: Landing (Engaging & Perk-Focused Demo) ─── */}
      {step === "landing" && (
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold mb-3 border border-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-slate-600" /> Consumer Skin Panel UX (Demo Preview)
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight">
              Test Formulations at Home.<br />
              <span className="text-teal-600">Sample UX Architecture.</span>
            </h1>
            <p className="text-xs sm:text-sm text-clinical-gray-500 mt-2">
              Illustrating how Fixderma can reward consumers for honest feedback (even 1-star reviews) without incentive bias.
            </p>
          </div>

          {/* Interactive Digital Perk Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0f172a] via-slate-900 to-black text-white shadow-xl relative overflow-hidden border border-slate-800">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-teal-500/20 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-mono tracking-widest text-teal-400 uppercase font-bold">
                FIXDERMA TRIAL LAB · MEMBER PASS (DEMO)
              </span>
              <Gift className="w-5 h-5 text-amber-400" />
            </div>

            <div className="space-y-1 mb-6">
              <p className="text-xs text-stone-300 font-medium">Standard Completion Reward Model</p>
              <p className="text-3xl font-extrabold text-white tracking-tight">₹500 Voucher + 200 Pts</p>
              <p className="text-[11px] text-teal-300 font-medium">
                Flat adherence voucher · Paid uniformly regardless of rating polarity
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-stone-800 text-[11px] text-stone-300">
              <span>Status: <strong className="text-amber-400 font-bold">Public Enrollment Closed</strong></span>
              <span>Delivery: <strong className="text-white">Courier Sample Kit</strong></span>
            </div>
          </div>

          {/* 3 Step Visual Flow */}
          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="p-3 bg-white rounded-2xl border border-clinical-gray-200">
              <div className="w-8 h-8 mx-auto rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 mb-2 font-bold text-xs">
                1
              </div>
              <p className="text-xs font-bold text-charcoal">Free Kit</p>
              <p className="text-[10px] text-clinical-gray-400 mt-0.5">Delivered home</p>
            </div>

            <div className="p-3 bg-white rounded-2xl border border-clinical-gray-200">
              <div className="w-8 h-8 mx-auto rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 mb-2 font-bold text-xs">
                2
              </div>
              <p className="text-xs font-bold text-charcoal">4 Check-ins</p>
              <p className="text-[10px] text-clinical-gray-400 mt-0.5">Weeks 0, 2, 4, 8</p>
            </div>

            <div className="p-3 bg-white rounded-2xl border border-clinical-gray-200">
              <div className="w-8 h-8 mx-auto rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 mb-2 font-bold text-xs">
                3
              </div>
              <p className="text-xs font-bold text-charcoal">₹500 Reward</p>
              <p className="text-[10px] text-clinical-gray-400 mt-0.5">Adherence-based</p>
            </div>
          </div>

          {/* Anti-Drop-off Core Promise */}
          <div className="p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-2xl text-xs text-emerald-900 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span className="leading-snug">
              <strong>Zero Review Bias:</strong> Adherence rewards are strictly non-contingent on positive feedback. Participants receive the ₹500 store completion credit even with a 1-star evaluation.
            </span>
          </div>

          {/* Non-Clickable Disabled Notice with Demo Option */}
          <div className="space-y-3">
            <div className="w-full bg-slate-100 text-slate-500 font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 border border-slate-300 text-sm cursor-not-allowed select-none">
              <Lock className="w-4 h-4 text-slate-400" />
              <span>Live Public Sign-Up Disabled</span>
            </div>
            
            <button
              id="participant-demo-walkthrough"
              onClick={() => setStep("phone")}
              className="w-full bg-white hover:bg-teal-50 text-teal-700 font-bold py-3 rounded-2xl border-2 border-teal-500/40 flex items-center justify-center gap-2 transition-all text-xs cursor-pointer"
            >
              <span>Explore Simulated Questionnaire Flow (Demo) →</span>
            </button>
          </div>
        </div>
      )}

      {/* ─── Step 2: Mobile Number ─── */}
      {step === "phone" && (
        <div className="card p-6 sm:p-8 bg-white border border-clinical-gray-200 shadow-sm animate-fade-in">
          <button
            onClick={() => setStep("landing")}
            className="text-xs font-semibold text-teal-600 mb-6 flex items-center gap-1 hover:underline cursor-pointer"
          >
            ← Back to details
          </button>

          <div className="text-center mb-6">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600 mb-3">
              <Phone className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-extrabold text-charcoal">Verify Mobile Number</h2>
            <p className="text-xs text-clinical-gray-500 mt-1">
              Required for kit courier dispatch and scheduled check-in reminders.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="phone-input" className="block text-xs font-bold text-charcoal mb-1.5">
                Indian Mobile Number
              </label>
              <div className="flex gap-2">
                <span className="px-3.5 py-3 bg-clinical-gray-100 rounded-xl text-xs font-bold text-clinical-gray-600 border border-clinical-gray-200 flex items-center">
                  +91
                </span>
                <input
                  id="phone-input"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="98765 43210"
                  className="flex-1 px-4 py-3 bg-white rounded-xl border border-clinical-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-teal-400"
                  maxLength={10}
                />
              </div>
            </div>

            {/* Quick Demo Auto-fill Helper */}
            <div className="p-3 bg-teal-50/70 border border-teal-200 rounded-xl flex items-center justify-between text-xs">
              <span className="text-teal-800 font-medium">Testing as reviewer?</span>
              <button
                type="button"
                onClick={handleAutoFill}
                className="px-2.5 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold text-[11px] transition-all cursor-pointer"
              >
                ⚡ 1-Tap Auto-fill
              </button>
            </div>

            <button
              id="phone-send-otp"
              onClick={() => phone.length === 10 && setStep("otp")}
              disabled={phone.length !== 10}
              className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-clinical-gray-300 text-white font-bold py-3.5 rounded-2xl transition-all shadow-sm active:scale-98 text-sm cursor-pointer"
            >
              Send OTP Code →
            </button>
          </div>
        </div>
      )}

      {/* ─── Step 3: OTP Verification ─── */}
      {step === "otp" && (
        <div className="card p-6 sm:p-8 bg-white border border-clinical-gray-200 shadow-sm animate-fade-in">
          <button
            onClick={() => setStep("phone")}
            className="text-xs font-semibold text-teal-600 mb-6 flex items-center gap-1 hover:underline cursor-pointer"
          >
            ← Change phone number
          </button>

          <div className="text-center mb-6">
            <h2 className="text-xl font-extrabold text-charcoal">Enter 6-Digit OTP</h2>
            <p className="text-xs text-clinical-gray-500 mt-1">
              Sent to +91 {phone}. Demo verification code is <strong className="text-teal-600 font-bold">123456</strong>
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex justify-center gap-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className="w-11 h-12 text-center text-lg font-bold bg-clinical-gray-50 border border-clinical-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
                  maxLength={1}
                />
              ))}
            </div>

            {/* Quick Fill Button */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => setOtp(["1", "2", "3", "4", "5", "6"])}
                className="text-xs font-bold text-teal-600 hover:underline cursor-pointer"
              >
                Auto-fill &apos;123456&apos;
              </button>
            </div>

            <button
              id="otp-verify"
              onClick={() => otp.join("").length === 6 && setStep("consent")}
              disabled={otp.join("").length !== 6}
              className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-clinical-gray-300 text-white font-bold py-3.5 rounded-2xl transition-all shadow-sm active:scale-98 text-sm cursor-pointer"
            >
              Verify & Proceed →
            </button>
          </div>
        </div>
      )}

      {/* ─── Step 4: Simple Consent & Independence Declaration ─── */}
      {step === "consent" && (
        <div className="card p-6 sm:p-8 bg-white border border-clinical-gray-200 shadow-sm animate-fade-in">
          <div className="text-center mb-6">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600 mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-extrabold text-charcoal">Simple Participation Agreement</h2>
            <p className="text-xs text-clinical-gray-600 mt-1">
              Your photos and personal details are 100% private and protected.
            </p>
          </div>

          <div className="space-y-4 mb-6 text-xs text-clinical-gray-700 leading-relaxed">
            <label className="flex items-start gap-3 p-3.5 bg-clinical-gray-50 rounded-2xl border border-clinical-gray-200 cursor-pointer">
              <input
                type="checkbox"
                checked={consentGiven}
                onChange={(e) => setConsentGiven(e.target.checked)}
                className="mt-0.5 rounded text-teal-600 focus:ring-teal-500"
              />
              <span className="font-medium text-charcoal">
                I agree to test the product at home, complete 4 quick check-ins, and receive my ₹500 voucher.
              </span>
            </label>

            <label className="flex items-start gap-3 p-3.5 bg-clinical-gray-50 rounded-2xl border border-clinical-gray-200 cursor-pointer">
              <input
                type="checkbox"
                checked={!isAffiliated}
                onChange={(e) => setIsAffiliated(!e.target.checked)}
                className="mt-0.5 rounded text-teal-600 focus:ring-teal-500"
              />
              <span className="font-medium text-charcoal">
                I do NOT work for Fixderma. I will share my honest opinion without any bias.
              </span>
            </label>

            <label className="flex items-start gap-3 p-3.5 bg-clinical-gray-50 rounded-2xl border border-clinical-gray-200 cursor-pointer">
              <input
                type="checkbox"
                checked={whatsappOptIn}
                onChange={(e) => setWhatsappOptIn(e.target.checked)}
                className="mt-0.5 rounded text-teal-600 focus:ring-teal-500"
              />
              <span className="font-medium text-charcoal">
                Send my check-in reminders and ₹500 voucher updates on WhatsApp.
              </span>
            </label>
          </div>

          <button
            id="consent-continue"
            onClick={handleConsentContinue}
            disabled={!consentGiven}
            className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-clinical-gray-300 text-white font-bold py-4 rounded-2xl transition-all shadow-md shadow-teal-500/20 active:scale-98 text-sm cursor-pointer"
          >
            Complete Skin Profile (2 min) →
          </button>
        </div>
      )}
    </div>
  );
}
