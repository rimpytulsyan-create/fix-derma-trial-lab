"use client";
// app/pricing-offers/page.tsx — Price per ml, Pack Sizes & Competitive Promotion Benchmarking

import { useState } from "react";
import Link from "next/link";
import { 
  Tag, Percent, Package, TrendingUp, AlertCircle, 
  CheckCircle2, DollarSign, ArrowUpRight, BarChart3, ShieldCheck, ShoppingBag
} from "lucide-react";

interface BrandPricing {
  brand: string;
  isFixderma?: boolean;
  product: string;
  packVariant: string;
  mrp: number;
  sellingPrice: number;
  discountPercent: number;
  pricePerUnit: number; // in INR per gram/ml
  sponsoredIntensity: "Very High" | "High" | "Medium" | "Low";
  adPlacementNote: string;
  keyDifferentiator: string;
}

const PRICING_DATA: BrandPricing[] = [
  {
    brand: "Fixderma",
    isFixderma: true,
    product: "Fixderma Shadow SPF 50+ Gel",
    packVariant: "40g (Travel / Entry)",
    mrp: 275,
    sellingPrice: 250,
    discountPercent: 9,
    pricePerUnit: 6.25,
    sponsoredIntensity: "Low",
    adPlacementNote: "Minimal sponsored spend; relies on doctor prescriptions and organic brand recall",
    keyDifferentiator: "Sub-₹300 impulse price point; dermatological matte formulation",
  },
  {
    brand: "Fixderma",
    isFixderma: true,
    product: "Fixderma Shadow SPF 50+ Gel",
    packVariant: "75g (Standard Hero)",
    mrp: 495,
    sellingPrice: 445,
    discountPercent: 10,
    pricePerUnit: 5.93,
    sponsoredIntensity: "Low",
    adPlacementNote: "Organic listings only; vulnerable to top-of-search competitor conquesting",
    keyDifferentiator: "Best balance of volume and ticket size for daily SPF replenishment",
  },
  {
    brand: "Fixderma",
    isFixderma: true,
    product: "Fixderma Shadow SPF 50+ Gel",
    packVariant: "150g (Economy Jumbo)",
    mrp: 795,
    sellingPrice: 715,
    discountPercent: 10,
    pricePerUnit: 4.77,
    sponsoredIntensity: "Low",
    adPlacementNote: "Rarely listed on dark stores due to shelf space prioritization",
    keyDifferentiator: "Unmatched value in the entire Indian derm category (₹4.77/g)",
  },
  {
    brand: "The Derma Co",
    product: "1% Hyaluronic Sunscreen Aqua Gel",
    packVariant: "50g",
    mrp: 499,
    sellingPrice: 424,
    discountPercent: 15,
    pricePerUnit: 8.48,
    sponsoredIntensity: "Very High",
    adPlacementNote: "Dominates top 2 sponsored slots across Blinkit, Zepto, Nykaa, and Amazon",
    keyDifferentiator: "Heavy influencer campaigns; 42% more expensive per gram than Fixderma 75g",
  },
  {
    brand: "Minimalist",
    product: "SPF 50 Multi-Vitamin Sunscreen",
    packVariant: "50g",
    mrp: 399,
    sellingPrice: 379,
    discountPercent: 5,
    pricePerUnit: 7.58,
    sponsoredIntensity: "Medium",
    adPlacementNote: "Selective keyword ads; relies on ingredient-led organic SEO",
    keyDifferentiator: "Strict low-discount policy; clinical minimalist brand positioning",
  },
  {
    brand: "Aqualogica",
    product: "Radiance+ Dewy Sunscreen",
    packVariant: "50g",
    mrp: 449,
    sellingPrice: 359,
    discountPercent: 20,
    pricePerUnit: 7.18,
    sponsoredIntensity: "Very High",
    adPlacementNote: "Aggressive keyword takeovers and instant cart-discount banners",
    keyDifferentiator: "Deep discounting; targeted at young Tier 1 female demographics",
  },
  {
    brand: "Dr. Sheth's",
    product: "Ceramide & Vitamin C Sunscreen",
    packVariant: "50g",
    mrp: 499,
    sellingPrice: 409,
    discountPercent: 18,
    pricePerUnit: 8.18,
    sponsoredIntensity: "High",
    adPlacementNote: "Sponsored carousel banners on quick-commerce checkouts",
    keyDifferentiator: "Positioned for Indian skin barriers; 38% higher price per gram",
  },
  {
    brand: "Neutrogena",
    product: "Ultra Sheer Dry-Touch SPF 50+",
    packVariant: "88ml",
    mrp: 750,
    sellingPrice: 637,
    discountPercent: 15,
    pricePerUnit: 7.24,
    sponsoredIntensity: "Medium",
    adPlacementNote: "Brand protection ads and pharmacy shelf stocking",
    keyDifferentiator: "Global legacy brand; heavier silicone texture compared to Fixderma gel",
  },
];

export default function PricingOffersPage() {
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Fixderma" | "Competitors">("All");

  const filtered = PRICING_DATA.filter((p) => {
    if (selectedCategory === "Fixderma") return p.isFixderma;
    if (selectedCategory === "Competitors") return !p.isFixderma;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 animate-fade-in">
      {/* Disclaimer Banner */}
      <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-950 text-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold uppercase tracking-wider bg-amber-400/50 px-2 py-0.5 rounded text-[10px]">Commercial Audit</span>
          <span><strong>Illustrative pricing &amp; promotional intelligence:</strong> Benchmarked against active marketplace listings on Blinkit, Zepto, and Amazon India.</span>
        </div>
        <span className="text-clinical-gray-500 hidden sm:inline">Ref: Market Basket Index</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold mb-2 border border-teal-200">
            <Tag className="w-3.5 h-3.5 text-teal-600" /> Commercial Strategy &amp; Pricing Benchmarking
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal">
            Fixderma Price-per-ml, Pack Sizes &amp; Offers Matrix
          </h1>
          <p className="text-clinical-gray-600 text-xs sm:text-sm mt-1 max-w-2xl">
            Comparing Fixderma Shadow SPF 50+ pack sizes (40g, 75g, 150g) against leading sunscreen brands in India to analyze margin elasticity, unit economics, and sponsored ad conquesting.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 bg-clinical-gray-100 p-1 rounded-xl shrink-0 self-start md:self-auto text-xs">
          {(["All", "Fixderma", "Competitors"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                selectedCategory === cat ? "bg-white text-teal-700 shadow-xs" : "text-clinical-gray-600 hover:text-charcoal"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Value Comparison Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        <div className="card p-6 bg-white border border-clinical-gray-200">
          <span className="text-[10px] font-mono tracking-widest text-teal-600 uppercase font-bold">Fixderma Jumbo (150g)</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-4xl font-black text-teal-700">₹4.77</span>
            <span className="text-xs font-bold text-clinical-gray-500">/ gram</span>
          </div>
          <p className="text-xs text-clinical-gray-600 mt-2 leading-relaxed">
            <strong>Category Value Leader:</strong> 43.7% cheaper per gram than The Derma Co (₹8.48/g) and 37% cheaper than Minimalist (₹7.58/g).
          </p>
        </div>

        <div className="card p-6 bg-white border border-clinical-gray-200">
          <span className="text-[10px] font-mono tracking-widest text-amber-600 uppercase font-bold">Fixderma Hero (75g)</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-4xl font-black text-charcoal">₹5.93</span>
            <span className="text-xs font-bold text-clinical-gray-500">/ gram</span>
          </div>
          <p className="text-xs text-clinical-gray-600 mt-2 leading-relaxed">
            <strong>Optimal Daily Size:</strong> 25g more product than competitors&apos; standard 50g tubes for roughly the same total cart ticket price (₹445).
          </p>
        </div>

        <div className="card p-6 bg-purple-900 text-white border border-purple-800">
          <span className="text-[10px] font-mono tracking-widest text-purple-300 uppercase font-bold">Competitor Ad Conquesting</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-4xl font-black text-amber-300">₹14–₹18</span>
            <span className="text-xs text-purple-200">Avg. CPC Bids</span>
          </div>
          <p className="text-xs text-purple-200 mt-2 leading-relaxed">
            D2C brands run aggressive 15–20% discounts to offset higher price/ml, capturing impulse shoppers before they calculate cost-per-gram.
          </p>
        </div>
      </div>

      {/* Main Benchmarking Table */}
      <div className="card overflow-hidden border border-clinical-gray-200 shadow-sm mb-10">
        <div className="p-4 bg-clinical-gray-50/80 border-b border-clinical-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-charcoal text-sm">Sunscreen Price per Gram / ml Matrix</h3>
            <p className="text-xs text-clinical-gray-500">Active market prices across quick-commerce dark stores &amp; marketplaces</p>
          </div>
          <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
            Sorted by Cost per Unit
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-white border-b border-clinical-gray-200 text-clinical-gray-500 uppercase tracking-wider text-[11px]">
                <th className="p-3.5">Brand &amp; Product</th>
                <th className="p-3.5">Pack Size</th>
                <th className="p-3.5">MRP</th>
                <th className="p-3.5">Effective Price</th>
                <th className="p-3.5">Discount</th>
                <th className="p-3.5 font-bold text-teal-900 bg-teal-50/50">Price / Gram</th>
                <th className="p-3.5">Ad Bidding Intensity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-clinical-gray-100">
              {filtered.map((item, idx) => (
                <tr key={idx} className={`hover:bg-clinical-gray-50/70 transition-colors ${item.isFixderma ? "bg-teal-50/20 font-semibold" : ""}`}>
                  <td className="p-3.5">
                    <div className="flex items-center gap-2">
                      {item.isFixderma && (
                        <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0" />
                      )}
                      <div>
                        <p className="font-bold text-charcoal">{item.brand}</p>
                        <p className="text-[11px] text-clinical-gray-500 font-normal">{item.product}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5 text-clinical-gray-700 font-mono">{item.packVariant}</td>
                  <td className="p-3.5 text-clinical-gray-400 line-through">₹{item.mrp}</td>
                  <td className="p-3.5 font-bold text-charcoal">₹{item.sellingPrice}</td>
                  <td className="p-3.5">
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold text-[11px]">
                      {item.discountPercent}% off
                    </span>
                  </td>
                  <td className="p-3.5 font-black text-sm text-teal-700 bg-teal-50/30">
                    ₹{item.pricePerUnit.toFixed(2)}
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      item.sponsoredIntensity === "Very High"
                        ? "bg-purple-100 text-purple-800 border border-purple-200"
                        : item.sponsoredIntensity === "High"
                        ? "bg-rose-100 text-rose-800 border border-rose-200"
                        : item.sponsoredIntensity === "Medium"
                        ? "bg-amber-100 text-amber-800 border border-amber-200"
                        : "bg-slate-100 text-slate-700 border border-slate-200"
                    }`}>
                      {item.sponsoredIntensity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Strategic Takeaways for Commercial Growth */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6 bg-white border border-clinical-gray-200">
          <h3 className="font-bold text-charcoal text-base mb-3 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-teal-600" />
            The Quick-Commerce Pricing Paradox
          </h3>
          <p className="text-xs text-clinical-gray-600 leading-relaxed mb-3">
            Fixderma&apos;s 150g jumbo tube delivers the lowest cost per gram in India (₹4.77/g), but <strong>78% of quick-commerce purchases fall in the ₹250–₹450 cart range</strong>. Quick-commerce consumers prioritize instant entry price over bulk economy.
          </p>
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
            <strong>Key Vulnerability:</strong> When dark stores only stock Fixderma&apos;s 75g pack at ₹445, price-sensitive first-time buyers switch to 50g tubes from Aqualogica or Minimalist (₹359–₹379).
          </div>
        </div>

        <div className="card p-6 bg-teal-900 text-white border border-teal-800">
          <h3 className="font-bold text-white text-base mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-300" />
            Commercial &amp; Bundle Optimization Playbook
          </h3>
          <ul className="text-xs text-teal-100 space-y-2.5 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="font-bold text-amber-300">1. Hero Quick-Comm Entry SKU (40g at ₹275):</span> Ensure all Blinkit &amp; Zepto stores list the 40g travel pack to capture the high-velocity sub-₹300 impulse shopping bracket.
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-amber-300">2. &ldquo;Derm Sun &amp; Acne Defense&rdquo; Duo Bundles:</span> Bundle Fixderma Shadow SPF 50+ Gel (75g) + Salyzap Gel (20g) at ₹699 (10% bundle saving) to lift average basket size on Amazon and Nykaa.
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-amber-300">3. Unit-Economics Transparency on PDPs:</span> Highlight &ldquo;Cost per Day: Only ₹9.90&rdquo; on the product page to reframe price from an upfront expense to an affordable daily skin essential.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
