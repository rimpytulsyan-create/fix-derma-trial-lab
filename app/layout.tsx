import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/components/shared/NavBar";
import { TOP_NOTICE_TEXT } from "@/lib/config";

export const metadata: Metadata = {
  title: "Fixderma Trial Lab",
  description:
    "Know where a new product will work, before you launch it. Fixderma Trial Lab runs consumer-use studies across cities and climates.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Fixderma Trial Lab",
    description: "Consumer-use studies and regional wearability testing.",
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
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-charcoal antialiased selection:bg-teal-500/10 selection:text-teal-900">
        {/* Quiet Top Notice (Section 7) */}
        <div className="w-full bg-white text-clinical-gray-500 text-[12px] px-4 py-1.5 border-b border-clinical-gray-200 text-center">
          {TOP_NOTICE_TEXT}
        </div>

        <NavBar />

        <main id="main-content" className="pt-0">
          {children}
        </main>

        <footer className="border-t border-clinical-gray-200 bg-white mt-24 py-10 px-4">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-clinical-gray-500">
            <div className="space-y-1">
              <p className="font-semibold text-charcoal text-xs">Fixderma Trial Lab</p>
              <p>Concept prototype by Rimpy Tulsyan. Not affiliated with Fixderma India Pvt. Ltd.</p>
            </div>
            <div>
              <p className="text-[11px] text-clinical-gray-400">
                Designed under India&apos;s DPDP Act, 2023.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
