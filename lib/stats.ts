// lib/stats.ts
// Fixderma Trial Lab — Statistics library
// All formulas documented inline.

export interface CI {
  point: number;
  lower: number;
  upper: number;
}

/**
 * Wilson score confidence interval for a proportion.
 * https://en.wikipedia.org/wiki/Binomial_proportion_confidence_interval#Wilson_score_interval
 * Default z = 1.96 (95% CI).
 * Check: wilsonCI(22,22).lower ≈ 85%, wilsonCI(21,22).lower ≈ 79%
 */
export function wilsonCI(k: number, n: number, z = 1.96): CI {
  if (n === 0) return { point: 0, lower: 0, upper: 0 };
  const p = k / n;
  const z2 = z * z;
  const denominator = 1 + z2 / n;
  const centre = (p + z2 / (2 * n)) / denominator;
  const margin =
    (z / denominator) * Math.sqrt((p * (1 - p)) / n + z2 / (4 * n * n));
  return {
    point: Math.round(p * 1000) / 10,
    lower: Math.round(Math.max(0, centre - margin) * 1000) / 10,
    upper: Math.round(Math.min(1, centre + margin) * 1000) / 10,
  };
}

/**
 * Simple seeded PRNG (Mulberry32) — pure function, no external deps.
 */
export function mulberry32(seed: number): () => number {
  let s = seed;
  return function () {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Bootstrap mean CI with seeded RNG.
 * B = number of bootstrap resamples (default 2000).
 */
export function bootstrapMeanCI(
  arr: number[],
  seed: number,
  B = 2000,
  z = 1.96
): CI {
  if (arr.length === 0) return { point: 0, lower: 0, upper: 0 };
  const rng = mulberry32(seed);
  const n = arr.length;
  const means: number[] = [];
  for (let b = 0; b < B; b++) {
    let sum = 0;
    for (let i = 0; i < n; i++) {
      sum += arr[Math.floor(rng() * n)];
    }
    means.push(sum / n);
  }
  means.sort((a, b) => a - b);
  const lo = Math.floor((B * (1 - 0.95)) / 2);
  const hi = B - 1 - lo;
  const point = arr.reduce((s, v) => s + v, 0) / n;
  return {
    point: Math.round(point * 10) / 10,
    lower: Math.round(means[lo] * 10) / 10,
    upper: Math.round(means[hi] * 10) / 10,
  };
}

/**
 * Conservative (worst-case) rate:
 * Count all drop-outs and missing reviews as "not improved".
 * improved / enrolled
 */
export function conservativeRate(improved: number, enrolled: number): CI {
  return wilsonCI(improved, enrolled);
}

/**
 * Representativeness score.
 * 1 − 0.5 × Σ |actual_share − target_share|
 * Returns 0–1; 1 = perfect match.
 */
export function representativenessScore(
  actual: Record<string, number>,
  target: Record<string, number>
): number {
  const keys = Object.keys(target);
  let sumDiff = 0;
  for (const k of keys) {
    sumDiff += Math.abs((actual[k] ?? 0) - (target[k] ?? 0));
  }
  return Math.round((1 - 0.5 * sumDiff) * 100) / 100;
}

/**
 * Sample size planner.
 * n = z² · p(1−p) / E²  then inflated by dropout rate.
 * p = expected proportion (default 0.5 = most conservative)
 * E = margin of error (e.g. 0.07 for ±7 pp)
 * dropoutRate = fraction expected to drop out (e.g. 0.2 for 20%)
 */
export function sampleSizePlanner(
  p = 0.5,
  E = 0.07,
  dropoutRate = 0.2,
  z = 1.96
): number {
  const base = Math.ceil((z * z * p * (1 - p)) / (E * E));
  return Math.ceil(base / (1 - dropoutRate));
}

/**
 * Cohen's kappa for inter-rater agreement.
 */
export function cohensKappa(rater1: number[], rater2: number[]): number {
  const n = rater1.length;
  if (n === 0) return 0;
  const cats = Array.from(new Set([...rater1, ...rater2])).sort();
  let agree = 0;
  for (let i = 0; i < n; i++) if (rater1[i] === rater2[i]) agree++;
  const po = agree / n;
  let pe = 0;
  for (const c of cats) {
    const p1 = rater1.filter((x) => x === c).length / n;
    const p2 = rater2.filter((x) => x === c).length / n;
    pe += p1 * p2;
  }
  if (pe >= 1) return 1;
  return Math.round(((po - pe) / (1 - pe)) * 1000) / 1000;
}

/**
 * Percent agreement between two raters.
 */
export function percentAgreement(rater1: number[], rater2: number[]): number {
  const n = rater1.length;
  if (n === 0) return 0;
  let agree = 0;
  for (let i = 0; i < n; i++) if (rater1[i] === rater2[i]) agree++;
  return Math.round((agree / n) * 1000) / 10;
}
