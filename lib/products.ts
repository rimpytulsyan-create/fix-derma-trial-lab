// lib/products.ts
// Fixderma Trial Lab — Product definitions and endpoint rules
// Ensures products cannot be assigned incompatible or misleading endpoints.

export type ProductCategory = "sunscreen" | "acne_treatment" | "pigmentation_cream" | "moisturizer";

export interface EndpointRule {
  allowedPrimaryEndpoints: string[];
  disallowedPatterns: RegExp[];
  rationale: string;
}

export const ENDPOINT_RULES: Record<ProductCategory, EndpointRule> = {
  sunscreen: {
    allowedPrimaryEndpoints: [
      "comfort_and_wearability",
      "shine_and_oil_control",
      "white_cast_tolerance",
      "skin_feel_and_texture",
    ],
    disallowedPatterns: [
      /spf/i,
      /uv\s*protection/i,
      /healing/i,
      /protection\s*rate/i,
      /favourable\s*protection/i,
      /clinical\s*cure/i,
    ],
    rationale:
      "Consumer panels cannot measure UV protection factor or SPF in vivo; SPF requires specialized photometric laboratory testing. Consumer studies for sunscreens must evaluate comfort, wearability, white cast, and tolerance across climates.",
  },
  acne_treatment: {
    allowedPrimaryEndpoints: [
      "blemish_appearance",
      "surface_sebum_control",
      "skin_soothing_feel",
    ],
    disallowedPatterns: [/cure/i, /medical\s*treatment/i, /healing/i],
    rationale: "Cosmetic acne evaluations assess cosmetic appearance and surface sebum, not medical disease treatment.",
  },
  pigmentation_cream: {
    allowedPrimaryEndpoints: [
      "visible_smoothness",
      "surface_exfoliation_feel",
      "evenness_appearance",
    ],
    disallowedPatterns: [/cure/i, /permanent\s*removal/i],
    rationale: "Evaluates cosmetic surface skin feel and visible texture improvement.",
  },
  moisturizer: {
    allowedPrimaryEndpoints: [
      "hydration_feel",
      "barrier_comfort",
      "dryness_relief",
    ],
    disallowedPatterns: [/healing/i, /cure/i],
    rationale: "Evaluates subjective hydration and moisture feel.",
  },
};

export interface StudyProduct {
  id: string;
  name: string;
  category: ProductCategory;
  headlineClaim: string;
  primaryEndpointKey: string;
  primaryEndpointDescription: string;
  dermaEvaluationMetrics: string[];
}

export const STUDY_PRODUCT: StudyProduct = {
  id: "fixderma-shadow-spf-50-gel",
  name: "Fixderma Shadow SPF 50+ Gel",
  category: "sunscreen",
  headlineClaim: "Does it feel comfortable across hot-humid, hot-dry and temperate cities?",
  primaryEndpointKey: "comfort_and_wearability",
  primaryEndpointDescription: "Share of participants rating the gel comfortable to wear (4 or 5 out of 5) at each check-in",
  dermaEvaluationMetrics: [
    "Visible white cast (0 to 3 scale)",
    "Visible surface irritation or redness (0 to 3 scale)",
  ],
};

export function validateProductEndpoint(category: ProductCategory, endpointText: string): { valid: boolean; error?: string } {
  const rule = ENDPOINT_RULES[category];
  if (!rule) return { valid: false, error: "Unknown product category" };
  for (const pattern of rule.disallowedPatterns) {
    if (pattern.test(endpointText)) {
      return {
        valid: false,
        error: `Endpoint text violates category guidelines (${pattern.source}): ${rule.rationale}`,
      };
    }
  }
  return { valid: true };
}
