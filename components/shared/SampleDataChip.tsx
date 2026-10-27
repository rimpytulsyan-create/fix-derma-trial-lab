// components/shared/SampleDataChip.tsx
// Fixderma Trial Lab — Small neutral "Sample data" chip
// Displayed on every chart and results card as specified in Section 2 & 5.5

import { cn } from "@/lib/utils";

interface SampleDataChipProps {
  className?: string;
}

export function SampleDataChip({ className }: SampleDataChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-clinical-gray-100 text-clinical-gray-600 border border-clinical-gray-200 tracking-normal",
        className
      )}
    >
      Sample data
    </span>
  );
}
