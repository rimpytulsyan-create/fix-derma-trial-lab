"use client";
// components/shared/StatBadge.tsx
// Displays "71% (n=118, 95% CI: 63–78%)" — never a bare percentage.

import { cn } from "@/lib/utils";

interface StatBadgeProps {
  percent: number;
  n: number;
  ciLower: number;
  ciUpper: number;
  label?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "conservative" | "success" | "warning";
}

export function StatBadge({
  percent,
  n,
  ciLower,
  ciUpper,
  label,
  size = "md",
  variant = "default",
}: StatBadgeProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-2xl font-bold",
  };

  const variantClasses = {
    default: "text-teal-700",
    conservative: "text-clinical-gray-600",
    success: "text-lime-700",
    warning: "text-amber-700",
  };

  return (
    <div className="stat-badge flex flex-col gap-0.5">
      {label && (
        <span className="text-xs font-medium text-clinical-gray-500 uppercase tracking-wider">
          {label}
        </span>
      )}
      <div className="flex items-baseline gap-1.5 flex-wrap">
        <span className={cn("font-semibold", sizeClasses[size], variantClasses[variant])}>
          {percent}%
        </span>
        <span className="text-xs text-clinical-gray-500">
          (n={n}, 95% CI: {ciLower}–{ciUpper}%)
        </span>
      </div>
    </div>
  );
}

// Minimal inline version for charts/tables
export function StatInline({ percent, n, ciLower, ciUpper }: Omit<StatBadgeProps, "label" | "size" | "variant">) {
  return (
    <span className="stat-badge text-sm">
      <span className="font-semibold text-teal-700">{percent}%</span>
      <span className="text-clinical-gray-400 text-xs ml-1">(n={n}, CI:{ciLower}–{ciUpper}%)</span>
    </span>
  );
}
