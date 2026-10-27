// data/types.ts
// Fixderma Trial Lab — TypeScript data model

export type Region = "North" | "South" | "East" | "West" | "North-East" | "Central";
export type CityTier = "Tier 1" | "Tier 2" | "Tier 3";
export type AgeBand = "18-24" | "25-34" | "35-44" | "45-54" | "55+";
export type Gender = "Female" | "Male" | "Non-binary" | "Prefer not to say";
export type SkinType = "Normal" | "Dry" | "Oily" | "Combination" | "Sensitive";
export type SkinTone = "Very Fair" | "Fair" | "Medium" | "Olive" | "Brown" | "Deep";
export type IndependenceStatus = "Independent" | "Affiliated";
export type TrialStatus = "Draft" | "Recruiting" | "Active" | "Completed" | "Paused";
export type ParticipantStatus = "Applied" | "Enrolled" | "Active" | "Completed" | "DroppedOut" | "Excluded";
export type SeverityLevel = "Mild" | "Moderate" | "Severe";
export type KitStatus = "Confirmed" | "Packed" | "Shipped" | "Delivered";

export interface QuotaTarget {
  region: Record<Region, number>;
  ageBand: Record<AgeBand, number>;
  gender: Record<Gender, number>;
  skinType: Record<SkinType, number>;
  skinTone: Record<SkinTone, number>;
}

export interface Trial {
  id: string;
  product: string;
  claim: string;
  status: TrialStatus;
  durationWeeks: number;
  checkInWeeks: number[];
  endpointLockedAt: string | null; // ISO timestamp
  primaryEndpoint: string;
  eligibility: {
    ageBands: AgeBand[];
    skinTypes: SkinType[];
    skinConcerns: string[];
    excludedConditions: string[];
  };
  quotaTargets: QuotaTarget;
  independencePolicy: "exclude-affiliated" | "include-tagged";
  reward: {
    amount: number;
    currency: "INR";
    type: "e-voucher";
    points: number;
    description: string;
  };
  targetN: number;
  enrolledN: number;
  completedN: number;
  startDate: string;
  endDate: string | null;
  description: string;
}

export interface Participant {
  id: string;
  trialId: string;
  region: Region;
  cityTier: CityTier;
  ageBand: AgeBand;
  gender: Gender;
  skinType: SkinType;
  skinTone: SkinTone;
  independence: IndependenceStatus;
  skinConcerns: string[];
  enrolledAt: string;
  status: ParticipantStatus;
  adherenceScore: number; // 0-100
  kitStatus: KitStatus;
  dropOutReason?: string;
  dropOutWeek?: number;
}

export interface CheckInAnswer {
  questionId: string;
  question: string;
  type: "likert" | "number" | "text" | "boolean";
  value: number | string | boolean;
}

export interface CheckIn {
  id: string;
  participantId: string;
  trialId: string;
  week: number;
  photoRef: string; // simulated gradient reference
  answers: CheckInAnswer[];
  adherenceDays: number; // days used product this week
  freeText?: string;
  submittedAt: string;
  isBaseline: boolean;
}

export interface Review {
  id: string;
  checkInPairId: string; // links baseline + endpoint checkIn IDs
  participantId: string;
  reviewerId: string;
  score: 1 | 2 | 3 | 4 | 5; // improvement rubric
  flags: ("poor-photo-quality" | "possible-reaction")[];
  reviewedAt: string;
  isBlinded: boolean;
}

export interface SafetyFlag {
  id: string;
  participantId: string;
  trialId: string;
  severity: SeverityLevel;
  location: string;
  description: string;
  status: "Open" | "Under review" | "Resolved";
  reportedAt: string;
}

export interface Reward {
  id: string;
  participantId: string;
  trialId: string;
  amount: number;
  currency: "INR";
  points: number;
  status: "Pending" | "Unlocked" | "Redeemed";
  unlockedAt: string | null;
}

export interface Reviewer {
  id: string;
  name: string;
  specialisation: string;
  city: string;
  reviewedToday: number;
  reviewedTotal: number;
}
