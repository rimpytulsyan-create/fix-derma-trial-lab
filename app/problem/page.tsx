"use client";
// app/problem/page.tsx — The 22-Person Problem interactive explainer

import { useState, useMemo } from "react";
import { wilsonCI } from "@/lib/stats";
import {
  ResponsiveContainer, ComposedChart, Bar, ErrorBar, XAxis, YAxis,
  Tooltip, ReferenceLine, CartesianGrid, Cell,
} from "recharts";

const PRESETS = [
  {
    id: "22-employees",
    label: "22 employees at HQ",
    n: 22,
    k: 22,
    biasWarning: true,
    color: "#F59E0B",
  },
  {
    id: "142-independent",
    label: "142 independent, quota-sampled",
    n: 142,
    k: 101,
    biasWarning: false,
    color: "#00AEBD",
  },
];

export default function ProblemPage() {
  const [n, setN] = useState(22);
  const [k, setK] = useState(22);

  const percent = n > 0 ? Math.round((k / n) * 100) : 0;
  const ci = useMemo(() => wilsonCI(k, n), [k, n]);

  const chartData = useMemo(
    () =>
      PRESETS.map((p) => {
        const c = wilsonCI(p.k, p.n);
        return {
          name: p.label,
          point: c.point,
          lower: c.lower,
          upper: c.upper,
          error: [[c.point - c.lower, c.upper - c.point]] as [[number, number]],
          color: p.color,
        };
      }),
    []
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
          📊 Interactive Explainer
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-charcoal mb-3">
          The 22-Person Problem
        </h1>
        <p className="text-lg text-clinical-gray-600 max-w-2xl mx-auto">
          Most skincare launch surveys can&apos;t support the claims they make. Here&apos;s why — and what honest numbers look like.
        </p>
      </div>

      {/* ── Interactive sliders ── */}
      <div className="card p-6 mb-8">
        <h2 className="font-bold text-charcoal mb-4 text-lg">Try it yourself</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="slider-n" className="block text-sm font-medium text-clinical-gray-700 mb-2">
              Sample size (n): <span className="text-teal-600 font-bold">{n}</span>
            </label>
            <input
              id="slider-n"
              type="range"
              min={5}
              max={500}
              value={n}
              onChange={(e) => {
                const newN = Number(e.target.value);
                setN(newN);
                setK(Math.min(k, newN));
              }}
              className="w-full accent-teal-500"
              aria-label="Sample size n"
            />
            <div className="flex justify-between text-xs text-clinical-gray-400 mt-1">
              <span>5</span><span>500</span>
            </div>
          </div>
          <div>
            <label htmlFor="slider-k" className="block text-sm font-medium text-clinical-gray-700 mb-2">
              Observed saying it worked: <span className="text-teal-600 font-bold">{k}</span> ({percent}%)
            </label>
            <input
              id="slider-k"
              type="range"
              min={0}
              max={n}
              value={k}
              onChange={(e) => setK(Number(e.target.value))}
              className="w-full accent-teal-500"
              aria-label="Number who said it worked"
            />
            <div className="flex justify-between text-xs text-clinical-gray-400 mt-1">
              <span>0</span><span>{n}</span>
            </div>
          </div>
        </div>

        {/* Live CI result */}
        <div className="mt-6 p-4 bg-teal-50 rounded-2xl border border-teal-100">
          <p className="text-sm text-clinical-gray-600 mb-1">
            <strong className="text-teal-700">With {n} people</strong>, {percent}% saying it worked means:
          </p>
          <p className="text-xl font-bold text-charcoal">
            The true figure is anywhere from{" "}
            <span className="text-teal-600">{ci.lower}%</span> to{" "}
            <span className="text-teal-600">{ci.upper}%</span>
          </p>
          <p className="text-xs text-clinical-gray-500 mt-1">(95% Wilson score confidence interval)</p>
          {ci.upper - ci.lower > 20 && (
            <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
              ⚠️ This confidence interval is {Math.round(ci.upper - ci.lower)} percentage points wide — too wide to support a precise claim.
            </div>
          )}
        </div>
      </div>

      {/* ── Preset comparison chart ── */}
      <div className="card p-6 mb-8">
        <h2 className="font-bold text-charcoal mb-1 text-lg">The difference a sample size makes</h2>
        <p className="text-sm text-clinical-gray-500 mb-4">
          Comparing a typical brand survey vs. an independent, quota-sampled Trial Lab study.
        </p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(value: any, name: any) => [`${value}%`, name === "point" ? "Observed %" : name]}
              />
              <ReferenceLine y={50} stroke="#9CA3AF" strokeDasharray="4 4" label={{ value: "50%", fontSize: 10 }} />
              <Bar dataKey="point" radius={[8, 8, 0, 0]} label={{ position: "top", formatter: (v: any) => `${v}%`, fontSize: 11 }}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
                <ErrorBar dataKey="error" width={8} strokeWidth={2} stroke="#374151" />
              </Bar>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-clinical-gray-400 text-center mt-2">
          Error bars show 95% Wilson score confidence intervals. All data simulated.
        </p>
      </div>

      {/* ── Bias warning for employee survey ── */}
      <div className="card p-6 mb-8 border-l-4 border-amber-400">
        <h2 className="font-bold text-charcoal mb-3 flex items-center gap-2">
          <span className="text-amber-500">⚠️</span> The 22-employee survey: three compounding problems
        </h2>
        <div className="space-y-4">
          {[
            {
              n: "1", title: "Tiny sample",
              body: "With n=22, even 100% agreement gives a CI lower bound near 85%. With 21/22, the lower bound is around 79%. A headline of \"95% saw results\" could be wrong — the true rate might be much lower.",
            },
            {
              n: "2", title: "No demographic diversity",
              body: "22 people at a head office in Gurugram share a region, a water supply, a climate, and probably similar age and lifestyle. Results may not generalise to skin types in Chennai, Kolkata, or Srinagar.",
            },
            {
              n: "3", title: "Conflict of interest",
              body: "Employees want their product to succeed. This creates expectation effects (they expect improvement) and social pressure (they feel disloyal rating it poorly). Even honest participants aren't immune.",
            },
          ].map((item) => (
            <div key={item.n} className="flex gap-3">
              <div className="shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center">
                {item.n}
              </div>
              <div>
                <p className="font-semibold text-charcoal text-sm">{item.title}</p>
                <p className="text-sm text-clinical-gray-600 leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Regulatory & Methodological Sourcing ── */}
      <div className="card p-6 mt-8 bg-slate-50 border border-slate-200">
        <h2 className="font-bold text-charcoal mb-2 text-sm uppercase tracking-wider flex items-center gap-2">
          <span>📚</span> Regulatory & Methodological Reference
        </h2>
        <div className="text-xs text-clinical-gray-600 space-y-2 leading-relaxed">
          <p>
            <strong>Industry Context & Regulatory Grounding:</strong> Under typical cosmetic pilot testing in India (governed by <em>Bureau of Indian Standards IS 4707</em> and <em>CDSCO Cosmetic Rules 2020</em>), initial formulation tolerance panels frequently enroll small pilot cohorts of 20 to 25 localized subjects.
          </p>
          <p>
            <strong>ASCI Compliance Mandate:</strong> The <em>Advertising Standards Council of India (ASCI) Guidelines for Disclaimers in Commercial Advertising (Clause 1.4: Substantiation of Claims)</em> requires claim statistics like &quot;95% agreed&quot; to carry a statistically robust sample denominator and disclose test parameters. Without demographic and regional stratification, a cohort of 22 participants yields an uncertainty band of ±18%, failing to satisfy clinical rigor.
          </p>
          <p>
            Fixderma Trial Lab addresses this by establishing stratified consumer cohorts (n=140+) across 6 Indian climatic zones and Fitzpatrick skin types, reviewed blindly by board-certified dermatologists.
          </p>
        </div>
      </div>
    </div>
  );
}
