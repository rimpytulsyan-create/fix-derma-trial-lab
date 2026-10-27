// app/collateral/page.tsx
// Fixderma Trial Lab — Collateral downloads (Section 4.5)
// Two simple cards with download buttons for the Audit PDF and Trial Lab Overview PDF.

import { FileText, Download } from "lucide-react";

export default function CollateralPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10">
      {/* Page Title */}
      <div>
        <p className="text-xs font-semibold text-clinical-gray-500 uppercase tracking-wider">
          Documentation &amp; Strategy
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-charcoal mt-1 tracking-tight">
          Collateral
        </h1>
        <p className="text-xs text-clinical-gray-600 mt-2">
          Project documents and outside-in market audits available for download.
        </p>
      </div>

      {/* Two Download Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Card 1: Quick-commerce and growth audit */}
        <div className="p-6 rounded-xl border border-clinical-gray-200 bg-white flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="w-9 h-9 rounded-lg bg-clinical-gray-100 flex items-center justify-center text-charcoal">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-charcoal">
                Quick-commerce and growth audit (PDF)
              </h2>
              <p className="text-xs text-clinical-gray-600 mt-1.5 leading-relaxed">
                How Fixderma shows up on Blinkit, Zepto and Instamart today, and a 90-day plan.
              </p>
            </div>
          </div>

          <a
            href="/collateral/Fixderma-Quick-Commerce-Growth-Audit.pdf"
            download
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-charcoal hover:bg-black text-white text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Audit (PDF)</span>
          </a>
        </div>

        {/* Card 2: Trial Lab overview */}
        <div className="p-6 rounded-xl border border-clinical-gray-200 bg-white flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="w-9 h-9 rounded-lg bg-clinical-gray-100 flex items-center justify-center text-charcoal">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-charcoal">
                Trial Lab overview (PDF)
              </h2>
              <p className="text-xs text-clinical-gray-600 mt-1.5 leading-relaxed">
                The idea in eight slides.
              </p>
            </div>
          </div>

          <a
            href="/collateral/Fixderma-Trial-Lab-Overview.pdf"
            download
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-charcoal hover:bg-black text-white text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Overview (PDF)</span>
          </a>
        </div>
      </div>

      <p className="text-xs text-clinical-gray-500 pt-4 border-t border-clinical-gray-200">
        Both documents use sample or outside-in data and are not affiliated with Fixderma India Pvt. Ltd.
      </p>
    </div>
  );
}
