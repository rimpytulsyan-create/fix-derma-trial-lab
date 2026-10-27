import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/components/shared/NavBar";
import { ConceptBanner } from "@/components/shared/ConceptBanner";

export const metadata: Metadata = {
  title: "Fixderma Trial Lab — Evidence & Quick-Commerce Growth Intelligence",
  description:
    "An open, quota-sampled cosmetic testing and quick-commerce growth intelligence platform for Fixderma, built with mathematical honesty and blinded dermatologist evaluation.",
  openGraph: {
    title: "Fixderma Trial Lab",
    description: "Transparent cosmetic evidence and quick-commerce availability for Fixderma.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-off-white text-charcoal antialiased selection:bg-teal-500/20 selection:text-teal-900">
        <ConceptBanner />
        <NavBar />
        <main id="main-content" className="pt-0">
          {children}
        </main>
        <footer className="border-t border-clinical-gray-200 bg-white mt-20 py-10 px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-clinical-gray-500">
            <div className="space-y-1.5 max-w-xl">
              <p className="font-semibold text-charcoal text-sm">Fixderma Trial Lab</p>
              <p>
                Standardized consumer-use studies with quota sampling across India, blinded dermatologist review, and quick-commerce availability intelligence.
              </p>
              <p className="text-[11px] text-clinical-gray-400">
                Designed under India&apos;s DPDP Act, 2023. Concept prototype by Rimpy Tulsyan. Not affiliated with Fixderma India Pvt. Ltd.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/FixDerma_Trial_Lab_Strategy.pptx"
                download
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-charcoal text-white hover:bg-black font-medium transition-all shadow-2xs"
              >
                <span>Download Strategy Deck (.PPTX)</span>
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
