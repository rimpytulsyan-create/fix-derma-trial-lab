"use client";
// components/shared/WeekControl.tsx
// Segmented control with Week 0 · 2 · 4 · 8 (default Week 8)

import { StudyWeek } from "@/data/sampleData";
import { cn } from "@/lib/utils";

interface WeekControlProps {
  currentWeek: StudyWeek;
  onWeekChange: (week: StudyWeek) => void;
}

const WEEKS: StudyWeek[] = [0, 2, 4, 8];

export function WeekControl({ currentWeek, onWeekChange }: WeekControlProps) {
  return (
    <div className="space-y-1.5">
      <div className="inline-flex p-1 bg-clinical-gray-100 rounded-lg border border-clinical-gray-200">
        {WEEKS.map((w) => {
          const isSelected = currentWeek === w;
          return (
            <button
              key={w}
              type="button"
              onClick={() => onWeekChange(w)}
              className={cn(
                "px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer",
                isSelected
                  ? "bg-white text-charcoal font-semibold shadow-xs"
                  : "text-clinical-gray-500 hover:text-charcoal"
              )}
            >
              Week {w}
            </button>
          );
        })}
      </div>
      <p className="text-[12px] text-clinical-gray-500">
        Sample data. Move through the study to see results build up.
      </p>
    </div>
  );
}
