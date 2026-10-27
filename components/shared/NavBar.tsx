"use client";
// components/shared/NavBar.tsx
import Link from "next/link";
import Image from "next/image";
import { useAppStore, type ViewRole } from "@/lib/store";
import { useState } from "react";
import { Menu, X, ChevronDown, Download, Sparkles, Presentation } from "lucide-react";
import { cn } from "@/lib/utils";

const VIEW_ROLES: { value: ViewRole; label: string; emoji: string; href: string }[] = [
  { value: "participant", label: "Participant", emoji: "👤", href: "/participant" },
  { value: "brand", label: "Brand Team", emoji: "📊", href: "/brand" },
  { value: "reviewer", label: "Dermatologist", emoji: "🔬", href: "/reviewer" },
  { value: "shopper", label: "Shopper", emoji: "🛍️", href: "/shopper" },
];

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/q-commerce", label: "⚡ Q-Commerce OOS" },
  { href: "/search-ranking", label: "🔍 Search Ranking" },
  { href: "/pricing-offers", label: "🏷️ Price & Pack Sizes" },
  { href: "/30-60-90-plan", label: "🎯 30-60-90 Plan" },
  { href: "/shopper", label: "Verified PDP" },
  { href: "/brand", label: "Brand Lab" },
];

export function NavBar() {
  const { viewAs, setViewAs } = useAppStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);

  const current = VIEW_ROLES.find((r) => r.value === viewAs)!;

  function handleRoleSelect(role: ViewRole) {
    setViewAs(role);
    setViewerOpen(false);
  }

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-clinical-gray-200 sticky top-0 z-40 transition-all" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="Fixderma Trial Lab home">
          <Image
            src="/fixderma-logo.svg"
            alt="Fixderma logo"
            width={125}
            height={42}
            className="h-8 w-auto object-contain"
            priority
          />
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
            <Sparkles className="w-3 h-3 text-teal-600" /> Trial &amp; Growth Lab
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-2.5 py-1.5 text-xs font-semibold text-clinical-gray-600 hover:text-teal-600 hover:bg-teal-50/70 rounded-xl transition-all"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Actions & Role Switcher */}
        <div className="flex items-center gap-2.5">
          {/* Deck view link */}
          <Link
            href="/deck"
            title="View Strategy Presentation (.PPTX)"
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-charcoal bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-xl transition-all shadow-2xs"
          >
            <Presentation className="w-3.5 h-3.5 text-teal-600" />
            <span>View Presentation</span>
          </Link>

          {/* View-as switcher */}
          <div className="relative">
            <button
              onClick={() => setViewerOpen(!viewerOpen)}
              className="flex items-center gap-2 px-3 py-1.5 bg-teal-50 border border-teal-200/80 rounded-xl text-xs font-bold text-teal-800 hover:bg-teal-100/70 transition-all cursor-pointer shadow-2xs"
              aria-expanded={viewerOpen}
              aria-haspopup="listbox"
              aria-label="Switch view role"
            >
              <span>{current.emoji}</span>
              <span className="hidden sm:inline">{current.label}</span>
              <span className="sm:hidden">Role</span>
              <ChevronDown className="w-3.5 h-3.5 text-teal-600" aria-hidden="true" />
            </button>

            {viewerOpen && (
              <div
                className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-clinical-gray-200 overflow-hidden z-50 animate-fade-in"
                role="listbox"
                aria-label="Select view role"
              >
                <div className="px-3 py-2 border-b border-clinical-gray-100 bg-clinical-gray-50/70">
                  <p className="text-[10px] font-bold text-clinical-gray-400 uppercase tracking-wider">
                    Interactive Role Preview
                  </p>
                </div>
                <div className="p-1.5">
                  {VIEW_ROLES.map((role) => (
                    <Link
                      key={role.value}
                      href={role.href}
                      onClick={() => handleRoleSelect(role.value)}
                      className={cn(
                        "w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl text-left transition-colors",
                        viewAs === role.value
                          ? "bg-teal-50 text-teal-800 font-bold"
                          : "text-charcoal hover:bg-clinical-gray-50"
                      )}
                      role="option"
                      aria-selected={viewAs === role.value}
                    >
                      <span className="text-base">{role.emoji}</span>
                      <span>{role.label}</span>
                      {viewAs === role.value && (
                        <span className="ml-auto text-teal-600 font-bold">✓</span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl text-clinical-gray-600 hover:bg-clinical-gray-100"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-clinical-gray-200 bg-white px-4 py-3 space-y-1 shadow-lg animate-fade-in">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-clinical-gray-700 hover:bg-teal-50 hover:text-teal-700"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/deck"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold text-charcoal bg-stone-100 mt-2"
          >
            <Presentation className="w-4 h-4 text-teal-600" />
            <span>View Presentation (.PPTX)</span>
          </Link>
        </div>
      )}
    </nav>
  );
}
