"use client";
// app/comparison/page.tsx — How Trial Lab Differs from Sampling Platforms

import Link from "next/link";
import { CheckCircle2, XCircle, AlertCircle, ArrowRight, ShieldCheck, Scale } from "lucide-react";

export default function ComparisonPage() {
  const comparisons = [
    {
      dimension: "Primary Objective",
      traditional: "Top-of-funnel customer acquisition, sampling volume, and 5-star review generation.",
      trialLab: "Statistically sound, scientifically credible consumer-use efficacy evidence for claims.",
      highlight: true,
    },
    {
      dimension: "Participant Selection",
      traditional: "Self-selecting discount seekers, overwhelmingly Tier 1 metro young females.",
      trialLab: "Pre-set demographic quotas (Region, Age, Fitzpatrick Skin Tone, Skin Type) to reflect India.",
      highlight: false,
    },
    {
      dimension: "Study Endpoints",
      traditional: "Unstructured, post-hoc survey questions written after seeing initial feedback.",
      trialLab: "Primary endpoint mathematically defined and locked before the first sample kit is dispatched.",
      highlight: true,
    },
    {
      dimension: "Evaluation Rigor",
      traditional: "Subjective star ratings by consumers, often incentivized by future discounts.",
      trialLab: "Blinded dermatologist photo grading + longitudinal consumer adherence tracking.",
      highlight: false,
    },
    {
      dimension: "Treatment of Drop-outs",
      traditional: "Non-responders and drop-outs are scrubbed from final rating calculation.",
      trialLab: "Full transparency: drop-out reasons tracked and conservative intention-to-treat rate published.",
      highlight: true,
    },
    {
      dimension: "Statistical Integrity",
      traditional: "Single point percentages without sample size ('98% agreed') or margin of error.",
      trialLab: "Always shows sample size (n) and 95% Wilson confidence intervals beside every headline figure.",
      highlight: true,
    },
    {
      dimension: "Participant Incentive",
      traditional: "Points or coupons tied to writing positive reviews or social media posts.",
      trialLab: "Adherence-only reward (₹500 voucher + points) for completing check-ins, regardless of rating.",
      highlight: false,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-3 border border-teal-200">
          <Scale className="w-4 h-4 text-teal-600" /> Strategic Differentiation
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal mb-3">
          How Trial Lab Differs from Sampling Platforms
        </h1>
        <p className="text-clinical-gray-500 text-sm leading-relaxed">
          Sampling platforms (e.g. Smytten, free-sample portals, influencer seedings) are distribution tools. 
          Trial Lab is an <strong>evidence engine</strong> built for clinical integrity and consumer trust.
        </p>
      </div>

      {/* High-level comparison table */}
      <div className="card overflow-hidden mb-12 border border-clinical-gray-200 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-clinical-gray-50 border-b border-clinical-gray-200 text-xs text-clinical-gray-500 uppercase tracking-wider">
                <th className="p-4 sm:p-5 w-1/4">Dimension</th>
                <th className="p-4 sm:p-5 w-3/8 text-clinical-gray-600">Traditional Sampling Platforms</th>
                <th className="p-4 sm:p-5 w-3/8 bg-teal-50/60 text-teal-800 font-bold">Fixderma Trial Lab</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-clinical-gray-200 text-xs sm:text-sm">
              {comparisons.map((item, idx) => (
                <tr key={idx} className={item.highlight ? "bg-stone-50/40" : "bg-white"}>
                  <td className="p-4 sm:p-5 font-semibold text-charcoal align-top">
                    {item.dimension}
                  </td>
                  <td className="p-4 sm:p-5 text-clinical-gray-600 align-top leading-relaxed">
                    <div className="flex items-start gap-2">
                       <XCircle className="w-4 h-4 text-clinical-gray-400 shrink-0 mt-0.5" />
                      <span>{item.traditional}</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 bg-teal-50/30 text-charcoal font-medium align-top leading-relaxed">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{item.trialLab}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Why both can coexist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="card p-6 bg-white border border-clinical-gray-200">
          <h3 className="font-bold text-charcoal text-base mb-2">When to use Sampling Platforms</h3>
          <p className="text-xs text-clinical-gray-500 leading-relaxed mb-4">
            Use sampling channels (Smytten, Amazon sample bundles) when the sole objective is trial generation, discovery, and getting bottles into 50,000 households at minimum cost.
          </p>
          <ul className="text-xs text-clinical-gray-600 space-y-2">
            <li className="flex items-center gap-2">✓ Brand awareness among deal-seekers</li>
            <li className="flex items-center gap-2">✓ Rapid high-volume review seeding on marketplaces</li>
            <li className="flex items-center gap-2">✓ Low cost-per-contact acquisition</li>
          </ul>
        </div>

        <div className="card p-6 bg-teal-50/50 border border-teal-200">
          <h3 className="font-bold text-teal-900 text-base mb-2">When to use Fixderma Trial Lab</h3>
          <p className="text-xs text-teal-800 leading-relaxed mb-4">
            Use Trial Lab before or during brand marketing launches when you need bulletproof claim substantiation, ASCI compliance, and credible proof that wins over skeptical shoppers and dermatologists.
          </p>
          <ul className="text-xs text-teal-900 space-y-2 font-medium">
            <li className="flex items-center gap-2">✓ ASCI & regulatory claim defense with locked endpoints</li>
            <li className="flex items-center gap-2">✓ Packaging & PDP claim proof with confidence intervals</li>
            <li className="flex items-center gap-2">✓ Trust-building among doctors and science-conscious consumers</li>
          </ul>
        </div>
      </div>

      {/* CTA Strip */}
      <div className="bg-charcoal text-white rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div>
          <h3 className="text-lg font-bold">Ready to see how a trial is built with honest quotas?</h3>
          <p className="text-xs text-clinical-gray-300 mt-1">Explore the 6-step brand trial creator with sample size calculators.</p>
        </div>
        <Link
          href="/brand/create"
          className="bg-teal-500 hover:bg-teal-400 text-white font-semibold text-xs px-6 py-3 rounded-xl flex items-center gap-2 shrink-0 transition-all active:scale-95"
        >
          Open trial creator <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
