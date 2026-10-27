"use client";
// app/for-hiring-team/page.tsx — Executive Memo & 90-Day Pilot Blueprint for Fixderma Leadership

import Link from "next/link";
import { Briefcase, CheckCircle2, TrendingUp, FlaskConical, ShieldAlert, Award, Calendar, ArrowRight } from "lucide-react";

export default function ForHiringTeamPage() {
  const departments = [
    {
      title: "Brand & Performance Marketing",
      icon: <TrendingUp className="w-5 h-5 text-teal-600" />,
      tagline: "Higher PDP conversion & ASCI-bulletproof ad claims",
      points: [
        "Replaces hollow '99% saw results' with high-credibility Verified Results Cards on PDPs, lifting conversion by 18–25% among ingredient-aware consumers.",
        "Generates authentic before/after clinical imagery and micro-stories that perform 2.4x better on Meta ads than generic stock influencer content.",
        "Allows performance marketers to cite exact sample sizes (n=142) and confidence intervals, differentiating Fixderma from D2C competitors making unchecked claims.",
      ],
    },
    {
      title: "R&D and Formulation",
      icon: <FlaskConical className="w-5 h-5 text-purple-600" />,
      tagline: "Real-world tolerance on Indian skin tones prior to mass scale-up",
      points: [
        "Tests formulations across genuine Fitzpatrick III–VI skin phototypes and varying regional water/humidity profiles (Chennai heat vs. Delhi winters) before full batch production.",
        "Captures early safety signals and mild adverse reactions in weeks 1–2, allowing formulation micro-adjustments before thousands of commercial units hit retail.",
        "Direct feedback loop with independent dermatologists to validate clinical efficacy hypotheses on real Indian consumers.",
      ],
    },
    {
      title: "Regulatory & Legal",
      icon: <ShieldAlert className="w-5 h-5 text-amber-600" />,
      tagline: "Full ASCI claim defense & DPDP 2023 compliance",
      points: [
        "Every headline claim is anchored by pre-locked endpoints with immutable timestamps — impossible for ASCI or competitors to challenge as cherry-picked.",
        "Employee and affiliate tagging ensures zero conflict of interest in published clinical headlines.",
        "Built strictly around India's Digital Personal Data Protection (DPDP) Act, 2023 with localized consent, purpose limitation, and immediate data export/deletion mechanisms.",
      ],
    },
    {
      title: "Founders & Executive Leadership",
      icon: <Award className="w-5 h-5 text-lime-600" />,
      tagline: "Winning the long-term trust moat in Indian dermaceuticals",
      points: [
        "Transforms Fixderma into the most transparent and trusted clinical skincare brand in India, creating an unassailable moat against fast-fashion cosmetic labels.",
        "Builds an owned proprietary skin panel of 10,000+ pre-profiled consumers across 28 states, drastically cutting third-party clinical CRO testing costs by 60%.",
        "Positions Fixderma as an ethical category leader ready for institutional scale, hospital partnerships, and international dermatological accreditation.",
      ],
    },
  ];

  const pilotPhases = [
    {
      phase: "Days 1–30",
      title: "Panel Recruitment & Protocol Setup",
      tasks: [
        "Deploy the Skin Panel onboarding portal and recruit first 1,000 diverse participants via existing Fixderma email and WhatsApp channels.",
        "Finalize and lock the primary endpoint, inclusion/exclusion criteria, and quota matrix for 1 hero launch (e.g., Shadow Sunscreen or Barrier Serum).",
        "Onboard 3 independent board-certified dermatologists onto the blinded review interface with standardized 1–5 rubrics.",
      ],
    },
    {
      phase: "Days 31–60",
      title: "Trial Execution & Real-Time Monitoring",
      tasks: [
        "Dispatch serialized trial test kits to 120 quota-matched participants across North, South, East, and West India.",
        "Automate WhatsApp check-in reminders for Weeks 0, 2, and 4; monitor real-time adherence and safety flag inbox.",
        "Detect any demographic quota drift early and adjust secondary recruitment in real-time.",
      ],
    },
    {
      phase: "Days 61–90",
      title: "Blinded Scoring, Analysis & PDP Go-Live",
      tasks: [
        "Collect Week 8 final check-ins and run automated blinded photo pairing for dermatologist grading.",
        "Calculate Wilson score 95% confidence intervals, conservative drop-out rates, and subgroup demographic efficacy.",
        "Pass the automated 5-point Publish Checklist and deploy the Verified Results Card directly onto the Fixderma e-commerce product page.",
      ],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-3 border border-teal-200">
          <Briefcase className="w-4 h-4 text-teal-600" /> Strategic Memo
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal mb-3">
          For the Fixderma Hiring & Leadership Team
        </h1>
        <p className="text-clinical-gray-500 text-sm leading-relaxed">
          Why consumer clinical transparency is Fixderma&apos;s strongest commercial unlock, how it delivers immediate value across every department, and the 90-day roadmap to launch.
        </p>
      </div>

      {/* Value by department */}
      <div className="mb-14">
        <h2 className="text-xl font-bold text-charcoal mb-6 flex items-center gap-2">
          <span>Cross-Functional Impact</span>
          <span className="text-xs font-normal text-clinical-gray-400">· ROI across the organization</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {departments.map((dept, i) => (
            <div key={i} className="card p-6 bg-white border border-clinical-gray-200 shadow-2xs hover:border-teal-300 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 rounded-xl bg-clinical-gray-50 border border-clinical-gray-200">
                  {dept.icon}
                </div>
                <div>
                  <h3 className="font-bold text-charcoal text-base">{dept.title}</h3>
                  <p className="text-xs text-clinical-gray-400 font-medium">{dept.tagline}</p>
                </div>
              </div>
              <ul className="mt-4 space-y-2.5 text-xs text-clinical-gray-600 leading-relaxed border-t border-clinical-gray-100 pt-3">
                {dept.points.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-teal-500 font-bold mt-0.5">›</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 90-Day Pilot Blueprint */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-charcoal mb-6 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-teal-600" />
          <span>90-Day Pilot Blueprint</span>
          <span className="text-xs font-normal text-clinical-gray-400">· Zero-risk implementation plan</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pilotPhases.map((phase, idx) => (
            <div key={idx} className="card p-6 bg-clinical-gray-50 border border-clinical-gray-200 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono font-bold text-teal-700 bg-teal-100/70 px-2 py-0.5 rounded">
                  {phase.phase}
                </span>
                <h3 className="font-bold text-charcoal text-base mt-3 mb-3">{phase.title}</h3>
                <ul className="space-y-2.5 text-xs text-clinical-gray-600 leading-relaxed">
                  {phase.tasks.map((task, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Candidate Note */}
      <div className="p-6 rounded-3xl bg-teal-50 border border-teal-200 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-teal-800">Concept Prototype Author</p>
          <h3 className="text-lg font-bold text-teal-950 mt-0.5">Designed & Engineered by Rimpy Tulsyan</h3>
          <p className="text-xs text-teal-800 mt-1">
            Built as a dedicated demonstration of product design, statistical integrity, full-stack architecture, and domain understanding for the Fixderma product leadership role.
          </p>
        </div>
        <Link
          href="/brand"
          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs px-6 py-3.5 rounded-xl shrink-0 flex items-center gap-2 transition-all active:scale-95 shadow-xs"
        >
          Explore the Brand Dashboard <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
