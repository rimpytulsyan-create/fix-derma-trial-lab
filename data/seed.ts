// data/seed.ts
// Fixderma Trial Lab — Seeded data generator
// All data is deterministic. Same seed = same results every time.

import { mulberry32 } from "@/lib/stats";
import type {
  Trial, Participant, CheckIn, Review, SafetyFlag, Reward, Reviewer,
  Region, CityTier, AgeBand, Gender, SkinType, SkinTone,
  IndependenceStatus, ParticipantStatus, KitStatus, SeverityLevel,
} from "./types";

const SEED = 42;
const rng = mulberry32(SEED);

function pick<T>(arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}
function weighted<T>(items: T[], weights: number[]): T {
  const total = weights.reduce((a, b) => a + b, 0);
  let r = rng() * total;
  for (let i = 0; i < items.length; i++) {
    r -= weights[i];
    if (r <= 0) return items[i];
  }
  return items[items.length - 1];
}
function randInt(min: number, max: number): number {
  return min + Math.floor(rng() * (max - min + 1));
}
function isoDate(daysAgo: number): string {
  const d = new Date("2026-08-01T00:00:00+05:30");
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString();
}

// ─── Trials ─────────────────────────────────────────────────────────────────

export const TRIALS: Trial[] = [
  {
    id: "trial-001",
    product: "Fixderma Shadow SPF 50+ Gel",
    claim: "Provides broad-spectrum UV protection, matte oil control, and visible skin barrier support in 8 weeks",
    status: "Completed",
    durationWeeks: 8,
    checkInWeeks: [0, 2, 4, 8],
    endpointLockedAt: "2026-01-15T10:30:00+05:30",
    primaryEndpoint: "Blinded dermatologist-assessed barrier protection & non-comedogenic score ≥3 on 5-point rubric at Week 8",
    eligibility: {
      ageBands: ["18-24", "25-34", "35-44", "45-54"],
      skinTypes: ["Dry", "Combination", "Sensitive", "Oily"],
      skinConcerns: ["Sun protection", "Excess sebum", "Sensitivity", "Uneven texture"],
      excludedConditions: ["Active eczema flare", "Rosacea (moderate/severe)", "Pregnancy"],
    },
    quotaTargets: {
      region: { North: 0.30, South: 0.25, East: 0.15, West: 0.20, "North-East": 0.05, Central: 0.05 },
      ageBand: { "18-24": 0.20, "25-34": 0.35, "35-44": 0.25, "45-54": 0.15, "55+": 0.05 },
      gender: { Female: 0.70, Male: 0.25, "Non-binary": 0.03, "Prefer not to say": 0.02 },
      skinType: { Normal: 0.05, Dry: 0.30, Oily: 0.35, Combination: 0.20, Sensitive: 0.10 },
      skinTone: { "Very Fair": 0.08, Fair: 0.18, Medium: 0.30, Olive: 0.22, Brown: 0.16, Deep: 0.06 },
    },
    independencePolicy: "include-tagged",
    reward: { amount: 500, currency: "INR", type: "e-voucher", points: 200, description: "₹500 Fixderma e-voucher + 200 skin points on completion (awarded regardless of review score)" },
    targetN: 150,
    enrolledN: 142,
    completedN: 118,
    startDate: "2026-01-20T00:00:00+05:30",
    endDate: "2026-03-20T00:00:00+05:30",
    description: "An 8-week consumer-use evaluation assessing daily UV barrier protection, sebum control, and skin tolerance of Fixderma Shadow SPF 50+ Gel across Indian climates. Participants checked in at weeks 0, 2, 4, and 8, with photo pairs reviewed blindly by panel dermatologists.",
  },
  {
    id: "trial-002",
    product: "Fixderma Salyzap Gel for Acne",
    claim: "Visibly reduces active acne blemishes and calms surface redness in 4 weeks with daily application",
    status: "Recruiting",
    durationWeeks: 4,
    checkInWeeks: [0, 2, 4],
    endpointLockedAt: "2026-09-01T09:00:00+05:30",
    primaryEndpoint: "Dermatologist-evaluated blemish lesion count reduction at Week 4, plus ≥25% participant-reported reduction in oiliness",
    eligibility: {
      ageBands: ["18-24", "25-34", "35-44"],
      skinTypes: ["Oily", "Combination"],
      skinConcerns: ["Active acne", "Post-acne marks", "Clogged pores", "Excess shine"],
      excludedConditions: ["Cystic acne (Grade 4)", "Pregnancy", "Accutane usage within 6 months"],
    },
    quotaTargets: {
      region: { North: 0.25, South: 0.30, East: 0.10, West: 0.25, "North-East": 0.05, Central: 0.05 },
      ageBand: { "18-24": 0.35, "25-34": 0.45, "35-44": 0.15, "45-54": 0.05, "55+": 0.00 },
      gender: { Female: 0.60, Male: 0.35, "Non-binary": 0.03, "Prefer not to say": 0.02 },
      skinType: { Normal: 0.05, Dry: 0.00, Oily: 0.65, Combination: 0.30, Sensitive: 0.00 },
      skinTone: { "Very Fair": 0.05, Fair: 0.15, Medium: 0.30, Olive: 0.25, Brown: 0.20, Deep: 0.05 },
    },
    independencePolicy: "exclude-affiliated",
    reward: { amount: 400, currency: "INR", type: "e-voucher", points: 150, description: "₹400 Fixderma e-voucher + 150 skin points on completion" },
    targetN: 120,
    enrolledN: 47,
    completedN: 0,
    startDate: "2026-09-15T00:00:00+05:30",
    endDate: null,
    description: "A 4-week consumer evaluation on Fixderma Salyzap Gel (Salicylic Acid 1.5% + Nicotinamide 4%). Active recruitment underway across Tier-1 and Tier-2 Indian cities.",
  },
  {
    id: "trial-003",
    product: "Fixderma Nigrifix Cream",
    claim: "Visibly exfoliates and brightens hyperpigmented, thickened skin on neck and body folds in 8 weeks",
    status: "Draft",
    durationWeeks: 8,
    checkInWeeks: [0, 2, 4, 8],
    endpointLockedAt: null,
    primaryEndpoint: "(Draft Protocol) Dermatologist-graded melanin index & skin smoothness improvement at Week 8",
    eligibility: {
      ageBands: ["18-24", "25-34", "35-44", "45-54"],
      skinTypes: ["Normal", "Dry", "Combination"],
      skinConcerns: ["Acanthosis Nigricans", "Dark neck folds", "Dark elbows/knees"],
      excludedConditions: ["Active open wounds", "Contact dermatitis (active)"],
    },
    quotaTargets: {
      region: { North: 0.25, South: 0.25, East: 0.15, West: 0.20, "North-East": 0.10, Central: 0.05 },
      ageBand: { "18-24": 0.25, "25-34": 0.40, "35-44": 0.25, "45-54": 0.10, "55+": 0.00 },
      gender: { Female: 0.65, Male: 0.30, "Non-binary": 0.03, "Prefer not to say": 0.02 },
      skinType: { Normal: 0.20, Dry: 0.40, Oily: 0.10, Combination: 0.30, Sensitive: 0.00 },
      skinTone: { "Very Fair": 0.05, Fair: 0.15, Medium: 0.35, Olive: 0.25, Brown: 0.15, Deep: 0.05 },
    },
    independencePolicy: "exclude-affiliated",
    reward: { amount: 500, currency: "INR", type: "e-voucher", points: 200, description: "₹500 Fixderma e-voucher + 200 skin points on completion" },
    targetN: 100,
    enrolledN: 0,
    completedN: 0,
    startDate: "2026-11-01T00:00:00+05:30",
    endDate: null,
    description: "Protocol draft for Fixderma Nigrifix Cream (Retinol, Lactic Acid, Urea). Endpoint pre-registration in progress.",
  },
];

// ─── Participants (trial-001) ────────────────────────────────────────────────

const REGIONS: Region[] = ["North", "South", "East", "West", "North-East", "Central"];
const REGION_W = [0.30, 0.25, 0.15, 0.20, 0.05, 0.05];
const CITY_TIERS: CityTier[] = ["Tier 1", "Tier 2", "Tier 3"];
const AGE_BANDS: AgeBand[] = ["18-24", "25-34", "35-44", "45-54", "55+"];
const AGE_W = [0.20, 0.35, 0.25, 0.15, 0.05];
const GENDERS: Gender[] = ["Female", "Male", "Non-binary", "Prefer not to say"];
const GENDER_W = [0.70, 0.25, 0.03, 0.02];
const SKIN_TYPES: SkinType[] = ["Normal", "Dry", "Oily", "Combination", "Sensitive"];
const SKIN_TYPE_W = [0.05, 0.40, 0.05, 0.30, 0.20];
const SKIN_TONES: SkinTone[] = ["Very Fair", "Fair", "Medium", "Olive", "Brown", "Deep"];
const SKIN_TONE_W = [0.08, 0.18, 0.30, 0.22, 0.16, 0.06];
const CONCERNS = ["Dryness", "Flakiness", "Sensitivity", "Redness", "Tightness"];
const DROP_OUT_REASONS = [
  "Lost interest",
  "Too busy to complete check-ins",
  "Mild reaction — stopped product",
  "Moved / relocated",
  "Personal reasons",
  "Kit not received in time",
];

export const PARTICIPANTS: Participant[] = Array.from({ length: 142 }, (_, i) => {
  const isAffiliated = i < 12; // first 12 tagged as affiliated
  const isDropped = i >= 118; // ~17% drop-out (24 participants)
  const dropWeek = isDropped ? pick([2, 4]) : undefined;
  const status: ParticipantStatus = isDropped
    ? "DroppedOut"
    : isAffiliated
    ? "Completed"
    : "Completed";

  return {
    id: `P-${String(i + 1).padStart(4, "0")}`,
    trialId: "trial-001",
    region: weighted(REGIONS, REGION_W),
    cityTier: weighted(CITY_TIERS, [0.45, 0.35, 0.20]),
    ageBand: weighted(AGE_BANDS, AGE_W),
    gender: weighted(GENDERS, GENDER_W),
    skinType: weighted(SKIN_TYPES, SKIN_TYPE_W),
    skinTone: weighted(SKIN_TONES, SKIN_TONE_W),
    independence: isAffiliated ? "Affiliated" : "Independent",
    skinConcerns: [pick(CONCERNS), ...(rng() > 0.5 ? [pick(CONCERNS)] : [])].filter(
      (v, idx, arr) => arr.indexOf(v) === idx
    ),
    enrolledAt: isoDate(randInt(180, 200)),
    status,
    adherenceScore: isDropped ? randInt(20, 60) : randInt(65, 100),
    kitStatus: "Delivered",
    dropOutReason: isDropped ? pick(DROP_OUT_REASONS) : undefined,
    dropOutWeek: dropWeek,
  };
});

// Participants for trial-002 (recruiting, skewed North)
const PARTICIPANTS_002: Participant[] = Array.from({ length: 47 }, (_, i) => {
  // Deliberately skewed: North is 60%+ to show drift warning
  const region = weighted(REGIONS, [0.62, 0.12, 0.08, 0.12, 0.04, 0.02]);
  return {
    id: `P2-${String(i + 1).padStart(4, "0")}`,
    trialId: "trial-002",
    region,
    cityTier: weighted(CITY_TIERS, [0.50, 0.35, 0.15]),
    ageBand: weighted(["25-34", "35-44", "45-54", "55+"] as AgeBand[], [0.30, 0.35, 0.20, 0.15]),
    gender: weighted(GENDERS, [0.65, 0.30, 0.03, 0.02]),
    skinType: weighted(SKIN_TYPES, [0.20, 0.05, 0.35, 0.35, 0.05]),
    skinTone: weighted(SKIN_TONES, [0.05, 0.12, 0.28, 0.25, 0.22, 0.08]),
    independence: rng() > 0.05 ? "Independent" : "Affiliated",
    skinConcerns: [pick(["Dark spots", "Uneven tone", "Sun damage", "Post-acne marks"])],
    enrolledAt: isoDate(randInt(10, 30)),
    status: "Enrolled",
    adherenceScore: 0,
    kitStatus: pick(["Confirmed", "Packed", "Shipped", "Delivered"] as KitStatus[]),
    dropOutReason: undefined,
    dropOutWeek: undefined,
  };
});

export const ALL_PARTICIPANTS = [...PARTICIPANTS, ...PARTICIPANTS_002];

// ─── Check-ins ───────────────────────────────────────────────────────────────

const QUESTIONS = [
  { id: "q1", question: "How moisturised does your skin feel today?", type: "likert" as const },
  { id: "q2", question: "How would you rate skin dryness or flakiness?", type: "likert" as const },
  { id: "q3", question: "How comfortable does your skin feel overall?", type: "likert" as const },
  { id: "q4", question: "Any tightness or discomfort since last check-in?", type: "likert" as const },
  { id: "q5", question: "How would you rate overall skin texture?", type: "likert" as const },
];

export const CHECK_INS: CheckIn[] = [];
for (const p of PARTICIPANTS.filter((p) => p.status !== "DroppedOut" || (p.dropOutWeek ?? 99) > 0)) {
  const weeks = p.dropOutWeek ? [0, 2].filter((w) => w < p.dropOutWeek!) : [0, 2, 4, 8];
  for (const week of weeks) {
    const improvement = week === 0 ? 0 : Math.min(week * 0.3, 2.0);
    CHECK_INS.push({
      id: `CI-${p.id}-W${week}`,
      participantId: p.id,
      trialId: "trial-001",
      week,
      photoRef: `gradient-${p.skinTone.toLowerCase().replace(" ", "-")}-w${week}`,
      answers: QUESTIONS.map((q) => ({
        questionId: q.id,
        question: q.question,
        type: q.type,
        value: Math.min(5, Math.max(1, Math.round(2.5 + improvement + (rng() - 0.5) * 1.5))),
      })),
      adherenceDays: week === 0 ? 0 : randInt(4, 7),
      freeText: week === 8 && rng() > 0.6 ? "Skin feels noticeably less tight in the mornings." : undefined,
      submittedAt: isoDate(week === 0 ? 180 : week === 2 ? 166 : week === 4 ? 152 : 124),
      isBaseline: week === 0,
    });
  }
}

// ─── Reviews ─────────────────────────────────────────────────────────────────

export const REVIEWS: Review[] = PARTICIPANTS.filter(
  (p) => p.status === "Completed"
).map((p, i) => {
  const baseScore = rng() > 0.29 ? randInt(3, 5) : randInt(1, 2); // ~71% show improvement (score ≥3)
  return {
    id: `REV-${p.id}`,
    checkInPairId: `CI-${p.id}-W0::CI-${p.id}-W8`,
    participantId: p.id,
    reviewerId: pick(["REV-001", "REV-002", "REV-003"]),
    score: Math.min(5, Math.max(1, baseScore)) as 1 | 2 | 3 | 4 | 5,
    flags: rng() > 0.95 ? (["poor-photo-quality"] as ("poor-photo-quality" | "possible-reaction")[]) : [],
    reviewedAt: isoDate(randInt(5, 30)),
    isBlinded: true,
  };
});

// ─── Safety flags ─────────────────────────────────────────────────────────────

export const SAFETY_FLAGS: SafetyFlag[] = [
  {
    id: "SF-001",
    participantId: "P-0023",
    trialId: "trial-001",
    severity: "Mild",
    location: "Left cheek",
    description: "Slight redness and tingling for about 2 days after first use. Resolved without stopping product.",
    status: "Resolved",
    reportedAt: isoDate(175),
  },
  {
    id: "SF-002",
    participantId: "P-0067",
    trialId: "trial-001",
    severity: "Mild",
    location: "Chin and jawline",
    description: "Mild breakout after week 2. Participant paused use for 3 days then resumed.",
    status: "Resolved",
    reportedAt: isoDate(162),
  },
  {
    id: "SF-003",
    participantId: "P-0119",
    trialId: "trial-001",
    severity: "Moderate",
    location: "Full face",
    description: "Contact erythema (redness and tingling) reported at Day 12. Participant discontinued product immediately under dermatologist review. Logged transparently as product-related discontinuation and treated as non-improvement in conservative ITT stats. 0 hospitalizations.",
    status: "Resolved",
    reportedAt: isoDate(155),
  },
];

// ─── Rewards ─────────────────────────────────────────────────────────────────

export const REWARDS: Reward[] = PARTICIPANTS.filter(
  (p) => p.status === "Completed"
).map((p) => ({
  id: `RWD-${p.id}`,
  participantId: p.id,
  trialId: "trial-001",
  amount: 500,
  currency: "INR",
  points: 200,
  status: rng() > 0.3 ? "Redeemed" : "Unlocked",
  unlockedAt: isoDate(randInt(5, 30)),
}));

// ─── Reviewers ───────────────────────────────────────────────────────────────

export const REVIEWERS: Reviewer[] = [
  { id: "REV-001", name: "Dr. A. Sharma", specialisation: "Dermatology", city: "Delhi", reviewedToday: 12, reviewedTotal: 58 },
  { id: "REV-002", name: "Dr. P. Iyer", specialisation: "Dermatology", city: "Bengaluru", reviewedToday: 8, reviewedTotal: 41 },
  { id: "REV-003", name: "Dr. R. Mehta", specialisation: "Cosmetic Dermatology", city: "Mumbai", reviewedToday: 6, reviewedTotal: 37 },
];

// ─── Computed stats for trial-001 ────────────────────────────────────────────

export function getTrialStats(trialId: string) {
  if (trialId !== "trial-001") return null;
  const completed = REVIEWS.length;
  const improved = REVIEWS.filter((r) => r.score >= 3).length;
  const enrolled = 142;
  const affiliated = PARTICIPANTS.filter((p) => p.independence === "Affiliated").length;
  const independent = enrolled - affiliated;
  return { completed, improved, enrolled, affiliated, independent };
}
