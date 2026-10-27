// lib/store.ts
// Fixderma Trial Lab — Minimal Zustand store for Week control
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { StudyWeek } from "@/data/sampleData";

interface AppState {
  studyWeek: StudyWeek;
  setStudyWeek: (week: StudyWeek) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      studyWeek: 8,
      setStudyWeek: (week: StudyWeek) => set({ studyWeek: week }),
    }),
    {
      name: "fixderma-study-week",
    }
  )
);
