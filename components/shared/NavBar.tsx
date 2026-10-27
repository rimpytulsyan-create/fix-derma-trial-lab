"use client";
// components/shared/NavBar.tsx
// Fixderma Trial Lab — Simplified navigation (Section 3 & 7)
// Order: Home · Study design · Results · Shopper preview · Collateral
// No emojis, no role dropdown switcher, no extra buttons.

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/study", label: "Study design" },
  { href: "/results", label: "Results" },
  { href: "/shopper", label: "Shopper preview" },
  { href: "/collateral", label: "Collateral" },
];

export function NavBar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="bg-white border-b border-clinical-gray-200 sticky top-0 z-40 transition-colors"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0"
          aria-label="Fixderma Trial Lab home"
        >
          <Image
            src="/fixderma-logo.svg"
            alt="Fixderma logo"
            width={110}
            height={36}
            className="h-7 w-auto object-contain"
            priority
          />
          <span className="text-xs font-semibold text-clinical-gray-700 tracking-tight">
            Trial Lab
          </span>
        </Link>

        {/* Desktop 5-page Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-lg transition-colors",
                  isActive
                    ? "text-charcoal font-semibold bg-clinical-gray-100"
                    : "text-clinical-gray-500 hover:text-charcoal hover:bg-clinical-gray-50"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 rounded-lg text-clinical-gray-600 hover:text-charcoal hover:bg-clinical-gray-100"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-clinical-gray-200 bg-white px-4 py-2 space-y-1">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block px-3 py-2 text-xs font-medium rounded-lg",
                  isActive
                    ? "text-charcoal font-semibold bg-clinical-gray-100"
                    : "text-clinical-gray-600 hover:bg-clinical-gray-50"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
