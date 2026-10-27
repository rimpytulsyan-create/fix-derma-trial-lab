// data/sampleData.ts
// Fixderma Trial Lab — Single source of truth for all study numbers
// All numbers on /study, /results, /shopper come directly from this file.

import { wilsonCI, CI } from "@/lib/stats";
import { VOUCHER_AMOUNT, VOUCHER_SENTENCE, SAMPLE_ENROLLED_COUNT } from "@/lib/config";

export type StudyWeek = 0 | 2 | 4 | 8;

export type ClimateZoneId = "hot_humid" | "hot_dry" | "temperate";

export interface ClimateZoneInfo {
  id: ClimateZoneId;
  name: string;
  description: string;
  cities: string[];
}

export const CLIMATE_ZONES: Record<ClimateZoneId, ClimateZoneInfo> = {
  hot_humid: {
    id: "hot_humid",
    name: "Hot-humid coast",
    description: "High humidity, prolonged perspiration, heavy sebum challenge",
    cities: ["Mumbai", "Chennai", "Kolkata"],
  },
  hot_dry: {
    id: "hot_dry",
    name: "Hot-dry and composite",
    description: "Intense dry heat, high UV exposure, rapid sweat evaporation",
    cities: ["Delhi NCR", "Jaipur"],
  },
  temperate: {
    id: "temperate",
    name: "Temperate",
    description: "Moderate temperatures, variable daily microclimates",
    cities: ["Bengaluru", "Pune"],
  },
};

export interface QuotaTarget {
  category: string;
  group: string;
  targetShare: number; // e.g. 0.35
  actualCount: number; // out of 142
}

export interface ParticipantRecord {
  id: string;
  city: string;
  zone: ClimateZoneId;
  ageBand: "18-24" | "25-34" | "35-44" | "45-54" | "55+";
  gender: "Female" | "Male" | "Non-binary";
  skinType: "Oily" | "Combination" | "Dry" | "Normal";
  skinTone: "Fitzpatrick III" | "Fitzpatrick IV" | "Fitzpatrick V" | "Fitzpatrick VI";
  completedWeek: StudyWeek; // max week completed
  ratings: Record<StudyWeek, number>; // 1-5 comfort score at each check-in
  dermScores: {
    whiteCast: 0 | 1 | 2 | 3;
    visibleIrritation: 0 | 1 | 2 | 3;
  };
}

// ─── Deterministic Seed Generator for 142 Participants ───────────────────────

function createSampleParticipants(): ParticipantRecord[] {
  const list: ParticipantRecord[] = [];
  const cityZoneMap: { city: string; zone: ClimateZoneId }[] = [
    { city: "Mumbai", zone: "hot_humid" },
    { city: "Chennai", zone: "hot_humid" },
    { city: "Kolkata", zone: "hot_humid" },
    { city: "Delhi NCR", zone: "hot_dry" },
    { city: "Jaipur", zone: "hot_dry" },
    { city: "Bengaluru", zone: "temperate" },
    { city: "Pune", zone: "temperate" },
  ];

  const ageBands: ParticipantRecord["ageBand"][] = ["18-24", "25-34", "35-44", "45-54", "55+"];
  const skinTones: ParticipantRecord["skinTone"][] = [
    "Fitzpatrick III",
    "Fitzpatrick IV",
    "Fitzpatrick V",
    "Fitzpatrick VI",
  ];
  const skinTypes: ParticipantRecord["skinType"][] = ["Oily", "Combination", "Dry", "Normal"];

  // Zone distribution:
  // Temperate (Bengaluru, Pune): ~44 participants, very high comfort in light gel (starts ~82%, ends ~89%)
  // Hot-dry (Delhi NCR, Jaipur): ~52 participants, high comfort in matte gel (starts ~75%, ends ~81%)
  // Hot-humid (Mumbai, Chennai, Kolkata): ~46 participants, moderate comfort due to intense humidity (starts ~59%, ends ~67%)
  
  for (let i = 0; i < SAMPLE_ENROLLED_COUNT; i++) {
    const id = `P-${String(i + 1).padStart(3, "0")}`;
    
    // Distribute across cities/zones deterministically
    let czIndex: number;
    if (i < 46) {
      czIndex = i % 3; // Mumbai, Chennai, Kolkata (hot_humid)
    } else if (i < 98) {
      czIndex = 3 + ((i - 46) % 2); // Delhi NCR, Jaipur (hot_dry)
    } else {
      czIndex = 5 + ((i - 98) % 2); // Bengaluru, Pune (temperate)
    }
    const { city, zone } = cityZoneMap[czIndex];

    const ageBand = ageBands[i % ageBands.length];
    const skinTone = skinTones[i % skinTones.length];
    const skinType = skinTypes[i % skinTypes.length];

    // Dropouts: exactly 24 dropouts overall (118 complete all 8 weeks)
    // P-042 (i === 41) is the moderate reaction participant who discontinued at week 2 (completedWeek = 0)
    // Plus 23 other dropouts: i from 119 to 141
    let completedWeek: StudyWeek = 8;
    if (i === 41) {
      completedWeek = 0; // discontinued due to moderate contact redness
    } else if (i >= 119 && i < 126) {
      completedWeek = 0; // dropped out before week 2
    } else if (i >= 126 && i < 134) {
      completedWeek = 2; // dropped out before week 4
    } else if (i >= 134) {
      completedWeek = 4; // dropped out before week 8
    }

    // Ratings progression based on climate zone
    // Rating 4 or 5 is "comfortable"
    const ratings: Record<StudyWeek, number> = { 0: 3, 2: 3, 4: 4, 8: 4 };

    // Deterministic pseudo-variation based on index
    const mod = (i * 7 + 13) % 100;

    // Temperate: ~89% comfortable at W8
    if (zone === "temperate") {
      ratings[0] = mod > 30 ? 4 : 3;
      ratings[2] = mod > 20 ? 4 : 3;
      ratings[4] = mod > 15 ? 4 : (mod > 5 ? 5 : 2);
      ratings[8] = mod > 12 ? (mod % 2 === 0 ? 5 : 4) : 2;
    }
    // Hot-dry: ~81% comfortable at W8
    else if (zone === "hot_dry") {
      ratings[0] = mod > 40 ? 4 : 3;
      ratings[2] = mod > 30 ? 4 : (mod < 10 ? 2 : 3);
      ratings[4] = mod > 25 ? 4 : (mod % 3 === 0 ? 5 : 2);
      ratings[8] = mod > 20 ? 4 : (mod < 8 ? 2 : 3);
    }
    // Hot-humid: ~67% comfortable at W8 (sweating/shine slightly lowers subjective comfort)
    else {
      ratings[0] = mod > 50 ? 4 : (mod < 20 ? 2 : 3);
      ratings[2] = mod > 42 ? 4 : (mod < 15 ? 2 : 3);
      ratings[4] = mod > 38 ? 4 : (mod < 18 ? 2 : 3);
      ratings[8] = mod > 33 ? 4 : (mod < 20 ? 2 : 3);
    }

    // Derm scores (0 to 3 scale)
    // Shadow Gel has minimal to zero white cast and very low irritation
    const whiteCast = (mod % 10 === 0 ? 1 : 0) as 0 | 1 | 2 | 3;
    const visibleIrritation = (i === 41 ? 2 : mod % 18 === 0 ? 1 : 0) as 0 | 1 | 2 | 3;

    list.push({
      id,
      city,
      zone,
      ageBand,
      gender: i % 4 === 0 ? "Male" : i % 25 === 0 ? "Non-binary" : "Female",
      skinType,
      skinTone,
      completedWeek,
      ratings,
      dermScores: {
        whiteCast,
        visibleIrritation,
      },
    });
  }

  return list;
}

export const SAMPLE_PARTICIPANTS: ParticipantRecord[] = createSampleParticipants();

// ─── Safety Log ─────────────────────────────────────────────────────────────

export interface SafetyIncident {
  id: string;
  participantId: string;
  severity: "serious" | "moderate" | "mild";
  category: string;
  city: string;
  zone: ClimateZoneId;
  description: string;
  actionTaken: string;
  reviewStatus: string;
}

export const SAFETY_LOG: SafetyIncident[] = [
  {
    id: "SF-01",
    participantId: "P-042",
    severity: "moderate",
    category: "Contact erythema & tingling",
    city: "Mumbai",
    zone: "hot_humid",
    description: "Reported moderate contact redness and facial tingling on Day 9 of application.",
    actionTaken: "Participant stopped using the product; followed up through full resolution.",
    reviewStatus: "Under review by the dermatologist panel",
  },
];

export const SAFETY_SUMMARY = {
  seriousReactionsCount: 0,
  moderateReactionsCount: 1,
  mildReactionsCount: 0,
  computedStatement:
    "0 serious reactions. 1 moderate reaction reported; the participant stopped using the product.",
  statusText: "Under review by the dermatologist panel",
};

// ─── Quota Demographics ─────────────────────────────────────────────────────

export const QUOTA_TARGETS: QuotaTarget[] = [
  // Climate Zones
  { category: "Climate zone", group: "Hot-humid coast", targetShare: 0.32, actualCount: 46 },
  { category: "Climate zone", group: "Hot-dry & composite", targetShare: 0.36, actualCount: 52 },
  { category: "Climate zone", group: "Temperate", targetShare: 0.32, actualCount: 44 },
  // Age Bands
  { category: "Age band", group: "18-24", targetShare: 0.20, actualCount: 29 },
  { category: "Age band", group: "25-34", targetShare: 0.40, actualCount: 57 },
  { category: "Age band", group: "35-44", targetShare: 0.25, actualCount: 35 },
  { category: "Age band", group: "45-54", targetShare: 0.15, actualCount: 21 },
  // Skin Tone (Fitzpatrick III to VI)
  { category: "Skin tone", group: "Fitzpatrick III", targetShare: 0.25, actualCount: 36 },
  { category: "Skin tone", group: "Fitzpatrick IV", targetShare: 0.35, actualCount: 49 },
  { category: "Skin tone", group: "Fitzpatrick V", targetShare: 0.25, actualCount: 36 },
  { category: "Skin tone", group: "Fitzpatrick VI", targetShare: 0.15, actualCount: 21 },
  // Skin Type
  { category: "Skin type", group: "Oily", targetShare: 0.40, actualCount: 57 },
  { category: "Skin type", group: "Combination", targetShare: 0.35, actualCount: 50 },
  { category: "Skin type", group: "Dry", targetShare: 0.15, actualCount: 21 },
  { category: "Skin type", group: "Normal", targetShare: 0.10, actualCount: 14 },
];

// ─── Query Engine for Week 0, 2, 4, 8 ──────────────────────────────────────

export interface ZoneWeekResult {
  zone: ClimateZoneInfo;
  enrolledN: number;
  activeN: number;
  comfortableN: number;
  ratePct: number;
  ci: CI;
  cities: { city: string; activeN: number; comfortableN: number; pct: number }[];
}

export interface StudyWeekSummary {
  week: StudyWeek;
  enrolledN: number;
  activeN: number;
  dropoutsToDate: number;
  comfortableN: number;
  headlineRatePct: number;
  headlineCi: CI;
  conservativeRatePct: number; // counting everyone who started
  conservativeCi: CI;
  zones: Record<ClimateZoneId, ZoneWeekResult>;
  dermPanel: {
    photosScored: number;
    avgWhiteCast: number; // 0 to 3
    avgIrritation: number; // 0 to 3
    interRaterAgreementPct: number;
  };
}

export function getStudyResultsForWeek(week: StudyWeek): StudyWeekSummary {
  // Participants active at this week (completedWeek >= week)
  const activeParticipants = SAMPLE_PARTICIPANTS.filter((p) => p.completedWeek >= week);
  const activeN = activeParticipants.length;
  const dropoutsToDate = SAMPLE_ENROLLED_COUNT - activeN;

  // Comfortable = rating 4 or 5
  const comfortableParticipants = activeParticipants.filter((p) => (p.ratings[week] ?? 0) >= 4);
  const comfortableN = comfortableParticipants.length;

  const headlineCi = wilsonCI(comfortableN, activeN);
  const conservativeCi = wilsonCI(comfortableN, SAMPLE_ENROLLED_COUNT);

  // Group by zone
  const zoneEntries = (Object.keys(CLIMATE_ZONES) as ClimateZoneId[]).map((zoneKey) => {
    const zoneInfo = CLIMATE_ZONES[zoneKey];
    const zoneActive = activeParticipants.filter((p) => p.zone === zoneKey);
    const zoneEnrolled = SAMPLE_PARTICIPANTS.filter((p) => p.zone === zoneKey).length;
    const zoneComf = zoneActive.filter((p) => (p.ratings[week] ?? 0) >= 4).length;
    const ci = wilsonCI(zoneComf, zoneActive.length);

    const cityStats = zoneInfo.cities.map((city) => {
      const cityActive = zoneActive.filter((p) => p.city === city);
      const cityComf = cityActive.filter((p) => (p.ratings[week] ?? 0) >= 4).length;
      const pct = cityActive.length > 0 ? Math.round((cityComf / cityActive.length) * 1000) / 10 : 0;
      return { city, activeN: cityActive.length, comfortableN: cityComf, pct };
    });

    return [
      zoneKey,
      {
        zone: zoneInfo,
        enrolledN: zoneEnrolled,
        activeN: zoneActive.length,
        comfortableN: zoneComf,
        ratePct: ci.point,
        ci,
        cities: cityStats,
      },
    ] as const;
  });

  const zones = Object.fromEntries(zoneEntries) as Record<ClimateZoneId, ZoneWeekResult>;

  // Dermatologist scoring stats
  const photosScored = activeN * (week === 0 ? 1 : 2); // baseline + check-in photo pairs
  const avgWhiteCast = 0.08; // negligible cast in transparent gel formulation
  const avgIrritation = 0.06; // very low irritation
  const interRaterAgreementPct = 92.4;

  return {
    week,
    enrolledN: SAMPLE_ENROLLED_COUNT,
    activeN,
    dropoutsToDate,
    comfortableN,
    headlineRatePct: headlineCi.point,
    headlineCi,
    conservativeRatePct: conservativeCi.point,
    conservativeCi,
    zones,
    dermPanel: {
      photosScored,
      avgWhiteCast,
      avgIrritation,
      interRaterAgreementPct,
    },
  };
}

// ─── Rule-Based Suggested Launch Order Engine ───────────────────────────────

export interface LaunchOrderSuggestion {
  week: StudyWeek;
  hasClearSeparation: boolean;
  rankedZones: {
    zoneId: ClimateZoneId;
    name: string;
    ratePct: number;
    ci: CI;
  }[];
  headlineRecommendation: string;
  detailRationale: string;
  requiredAdditionalN?: Record<ClimateZoneId, number>;
}

export function computeSuggestedLaunchOrder(summary: StudyWeekSummary): LaunchOrderSuggestion {
  const zoneList = (Object.keys(summary.zones) as ClimateZoneId[]).map((key) => {
    const z = summary.zones[key];
    return {
      zoneId: key,
      name: z.zone.name,
      ratePct: z.ratePct,
      ci: z.ci,
      activeN: z.activeN,
    };
  });

  // Sort descending by point estimate
  zoneList.sort((a, b) => b.ratePct - a.ratePct);

  const top = zoneList[0];
  const second = zoneList[1];
  const bottom = zoneList[2];

  const topBottomOverlap = !(top.ci.lower > bottom.ci.upper);

  if (summary.week < 4) {
    return {
      week: summary.week,
      hasClearSeparation: false,
      rankedZones: zoneList,
      headlineRecommendation: "Not enough difference to separate these regions yet",
      detailRationale:
        `At Week ${summary.week}, confidence intervals across climate zones overlap widely. Complete subsequent check-ins to establish statistical separation.`,
      requiredAdditionalN: {
        temperate: 35,
        hot_dry: 40,
        hot_humid: 45,
      },
    };
  }

  if (!topBottomOverlap) {
    return {
      week: summary.week,
      hasClearSeparation: true,
      rankedZones: zoneList,
      headlineRecommendation: `Launch in ${top.name} and ${second.name} first; optimize communication for ${bottom.name}`,
      detailRationale:
        `${top.name} demonstrates a higher comfort score (${top.ci.point}%, 95% range: ${top.ci.lower}–${top.ci.upper}%) with no overlap against ${bottom.name} (${bottom.ci.point}%, 95% range: ${bottom.ci.lower}–${bottom.ci.upper}%). We suggest prioritizing distribution and marketing in temperate and hot-dry urban corridors first.`,
    };
  }

  return {
    week: summary.week,
    hasClearSeparation: false,
    rankedZones: zoneList,
    headlineRecommendation: "Not enough difference to separate these regions yet",
    detailRationale:
      `The 95% ranges for ${top.name} (${top.ci.lower}–${top.ci.upper}%) and ${bottom.name} (${bottom.ci.lower}–${bottom.ci.upper}%) continue to overlap. Recommend continuing to Week 8 evaluation before finalizing geographic allocation.`,
    requiredAdditionalN: {
      temperate: 24,
      hot_dry: 26,
      hot_humid: 30,
    },
  };
}

// ─── Exported Constants ─────────────────────────────────────────────────────
export { VOUCHER_AMOUNT, VOUCHER_SENTENCE, SAMPLE_ENROLLED_COUNT };
