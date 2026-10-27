// app/page.tsx
// Fixderma Trial Lab — Simplified homepage (Section 4.1)
// One screen of content, lots of whitespace. No dashboards or metrics on the home page.

import Link from "next/link";
import { Users, Globe2, BarChart2 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-20">
      {/* Hero Section */}
      <section className="space-y-6 pt-4 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-bold text-charcoal tracking-tight leading-tight">
          Know where a new product will work, before you launch it.
        </h1>
        <p className="text-base sm:text-lg text-clinical-gray-600 leading-relaxed font-normal">
          Fixderma Trial Lab runs consumer-use studies across cities and climates, and shows where a new product performs best.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/results"
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-charcoal hover:bg-black text-white text-xs font-semibold transition-colors text-center"
          >
            See a sample study
          </Link>
          <Link
            href="/study"
            className="w-full sm:w-auto px-4 py-3 text-xs font-medium text-clinical-gray-600 hover:text-charcoal transition-colors text-center"
          >
            How a study runs →
          </Link>
        </div>
      </section>

      {/* Three Columns Below the Fold */}
      <section className="pt-10 border-t border-clinical-gray-200 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-2">
          <div className="w-8 h-8 rounded-lg bg-clinical-gray-100 flex items-center justify-center text-teal-700">
            <Users className="w-4 h-4 text-charcoal" />
          </div>
          <h2 className="text-sm font-semibold text-charcoal">Independent participants</h2>
          <p className="text-xs text-clinical-gray-600 leading-relaxed">
            Employees and their households excluded. Every participant is quota-recruited to ensure real user feedback.
          </p>
        </div>

        <div className="space-y-2">
          <div className="w-8 h-8 rounded-lg bg-clinical-gray-100 flex items-center justify-center text-teal-700">
            <Globe2 className="w-4 h-4 text-charcoal" />
          </div>
          <h2 className="text-sm font-semibold text-charcoal">Every region represented</h2>
          <p className="text-xs text-clinical-gray-600 leading-relaxed">
            Strict demographic quotas across city tiers, age bands, skin types, and Fitzpatrick phototypes III to VI.
          </p>
        </div>

        <div className="space-y-2">
          <div className="w-8 h-8 rounded-lg bg-clinical-gray-100 flex items-center justify-center text-teal-700">
            <BarChart2 className="w-4 h-4 text-charcoal" />
          </div>
          <h2 className="text-sm font-semibold text-charcoal">Honest numbers</h2>
          <p className="text-xs text-clinical-gray-600 leading-relaxed">
            Every reported result displays its sample size, Wilson 95% confidence range, and a rate counting everyone who started.
          </p>
        </div>
      </section>
    </div>
  );
}
