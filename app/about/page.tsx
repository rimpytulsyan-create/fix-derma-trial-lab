"use client";
// app/about/page.tsx — About Fixderma Trial Lab Concept Prototype

import Link from "next/link";
import { Info, ShieldCheck, HeartHandshake, CheckCircle2, Lock, ArrowRight } from "lucide-react";

export default function AboutPage() {
  const honestyRules = [
    {
      num: "01",
      title: "Pre-Locked Primary Endpoints",
      desc: "Endpoints and success criteria must be locked with a cryptographic timestamp before the first product unit is dispatched. Post-hoc hypothesis modifications are barred.",
    },
    {
      num: "02",
      title: "Wilson 95% Confidence Intervals Always Shown",
      desc: "Every percentage shown on any dashboard or customer-facing touchpoint must state its sample size (n) and confidence interval. Never show '95% saw results' without showing 'n=118, 95% CI: 89–98%'.",
    },
    {
      num: "03",
      title: "Representative Quotas Enforced",
      desc: "Recruitment must adhere to pre-defined demographic brackets reflecting India's diversity in region, age, gender, and Fitzpatrick skin phototypes (III to VI). Quota drift is flagged immediately.",
    },
    {
      num: "04",
      title: "Honest Accounting of Drop-Outs",
      desc: "Drop-outs are never deleted or ignored. All calculations present both the completer rate and the conservative intention-to-treat rate where all drop-outs count as 'no improvement'.",
    },
    {
      num: "05",
      title: "Blinded Dermatologist Review",
      desc: "Consumer self-reported sentiment is supplemented with blinded, randomized before-after photo assessment by independent dermatologists who see no product names or participant ratings.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-3 border border-teal-200">
          <Info className="w-4 h-4 text-teal-600" /> About this Concept
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal mb-3">
          Why Fixderma Trial Lab Was Built
        </h1>
        <p className="text-clinical-gray-500 text-sm leading-relaxed">
          A concept prototype designed by <strong>Rimpy Tulsyan</strong> as part of an application for a senior product role at Fixderma India.
        </p>
      </div>

      {/* Origin Story */}
      <div className="card p-6 sm:p-8 mb-8 bg-white border border-clinical-gray-200">
        <h2 className="text-lg font-bold text-charcoal mb-3 flex items-center gap-2">
          <HeartHandshake className="w-5 h-5 text-teal-600" />
          <span>The Origin of the Concept</span>
        </h2>
        <div className="space-y-4 text-xs sm:text-sm text-clinical-gray-600 leading-relaxed">
          <p>
            Skincare in India is undergoing a generational shift. Consumers who once bought purely on celebrity endorsements or television commercials are now reading ingredient concentrations, researching active percentages, and demanding clinical substantiation.
          </p>
          <p>
            However, consumer-use survey claims have reached a credibility crisis. The infamous &ldquo;99% of women agreed&rdquo; claim — frequently conducted on 22 brand employees in a single office room — has become a running meme among dermatologists and savvy shoppers alike.
          </p>
          <p>
            <strong>Fixderma Trial Lab</strong> is conceived as the antidote: an open, mathematically rigorous clinical consumer-use testing platform that transforms claims into Fixderma&apos;s greatest competitive moat.
          </p>
        </div>
      </div>

      {/* 5 Honesty Rules */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-charcoal mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5 text-teal-600" />
          <span>The Five Non-Negotiable Honesty Rules</span>
        </h2>
        <div className="space-y-3">
          {honestyRules.map((rule) => (
            <div key={rule.num} className="card p-5 bg-clinical-gray-50/70 border border-clinical-gray-200 flex gap-4 items-start">
              <span className="font-mono text-sm font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200 shrink-0">
                {rule.num}
              </span>
              <div>
                <h3 className="font-bold text-charcoal text-sm">{rule.title}</h3>
                <p className="text-xs text-clinical-gray-500 mt-1 leading-relaxed">{rule.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="card p-6 mb-10 bg-white border border-clinical-gray-200">
        <h3 className="font-bold text-charcoal text-base mb-3">Technical Architecture</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-clinical-gray-50 rounded-xl">
            <p className="text-clinical-gray-400 font-medium">Framework</p>
            <p className="font-bold text-charcoal mt-1">Next.js 16 (Turbopack)</p>
          </div>
          <div className="p-3 bg-clinical-gray-50 rounded-xl">
            <p className="text-clinical-gray-400 font-medium">Styling</p>
            <p className="font-bold text-charcoal mt-1">Tailwind CSS + Tokens</p>
          </div>
          <div className="p-3 bg-clinical-gray-50 rounded-xl">
            <p className="text-clinical-gray-400 font-medium">Data Model</p>
            <p className="font-bold text-charcoal mt-1">TypeScript Strict Mode</p>
          </div>
          <div className="p-3 bg-clinical-gray-50 rounded-xl">
            <p className="text-clinical-gray-400 font-medium">Visualization</p>
            <p className="font-bold text-charcoal mt-1">Recharts Interactive</p>
          </div>
        </div>
      </div>

      {/* Legal & Privacy Compliance */}
      <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed mb-8">
        <strong>Disclaimer & DPDP Compliance:</strong> This is a design and engineering concept prototype created solely for candidate evaluation. 
        It is not an official commercial deployment of Fixderma India Pvt. Ltd. All clinical records and participant profiles are deterministically seeded synthetic data.
        In an actual deployment, participant rights strictly mirror India&apos;s Digital Personal Data Protection Act, 2023.
      </div>

      {/* Return to home CTA */}
      <div className="text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-semibold text-sm transition-all shadow-sm active:scale-95"
        >
          Return to Trial Lab Home <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
