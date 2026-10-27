// lib/store.ts
// Fixderma Trial Lab — Zustand global state
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ViewRole = "participant" | "brand" | "reviewer" | "shopper";

interface ParticipantSession {
  phone?: string;
  region?: string;
  ageBand?: string;
  gender?: string;
  skinType?: string;
  skinTone?: string;
  skinConcerns?: string[];
  independence?: "Independent" | "Affiliated";
  enrolledTrialId?: string;
  currentStep?: string;
  otpVerified?: boolean;
}

interface AppState {
  viewAs: ViewRole;
  setViewAs: (role: ViewRole) => void;
  participantSession: ParticipantSession;
  setParticipantSession: (updates: Partial<ParticipantSession>) => void;
  clearParticipantSession: () => void;
  activeCheckInWeek: number | null;
  setActiveCheckInWeek: (week: number | null) => void;
  reviewerQueue: string[];
  markReviewed: (id: string) => void;
}

function safeStorage() {
  try {
    localStorage.setItem("__test__", "1");
    localStorage.removeItem("__test__");
    return typeof window !== "undefined"
      ? window.localStorage
      : undefined;
  } catch {
    return undefined;
  }
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      viewAs: "participant",
      setViewAs: (role) => set({ viewAs: role }),
      participantSession: {},
      setParticipantSession: (updates) =>
        set((state) => ({
          participantSession: { ...state.participantSession, ...updates },
        })),
      clearParticipantSession: () => set({ participantSession: {} }),
      activeCheckInWeek: null,
      setActiveCheckInWeek: (week) => set({ activeCheckInWeek: week }),
      reviewerQueue: ["REV-P-0001", "REV-P-0004", "REV-P-0009", "REV-P-0015", "REV-P-0022"],
      markReviewed: (id) =>
        set((state) => ({
          reviewerQueue: state.reviewerQueue.filter((x) => x !== id),
        })),
    }),
    {
      name: "fixderma-triallab-store",
      storage: {
        getItem: (key) => {
          try {
            const store = safeStorage();
            if (!store) return null;
            const item = store.getItem(key);
            return item ? JSON.parse(item) : null;
          } catch {
            return null;
          }
        },
        setItem: (key, value) => {
          try {
            const store = safeStorage();
            store?.setItem(key, JSON.stringify(value));
          } catch {
            // storage unavailable — silent fail
          }
        },
        removeItem: (key) => {
          try {
            const store = safeStorage();
            store?.removeItem(key);
          } catch {
            // silent fail
          }
        },
      },
    }
  )
);
