"use client";
// app/q-commerce/page.tsx — Quick-Commerce In-Stock Availability & Stock-Out Intelligence Tracker

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Building2, MapPin, AlertTriangle, CheckCircle2, XCircle, 
  TrendingDown, ShoppingCart, Clock, Filter, ArrowUpRight, ShieldCheck, Zap
} from "lucide-react";

interface PinCodeRecord {
  pincode: string;
  locality: string;
  city: "Gurgaon" | "Bangalore";
  blinkit: "In Stock" | "Low Stock" | "Out of Stock";
  zepto: "In Stock" | "Low Stock" | "Out of Stock";
  instamart: "In Stock" | "Low Stock" | "Out of Stock";
  leadTimeHours: number;
  substituteThreat: string;
  product: string;
}

const PINCODE_DATA: PinCodeRecord[] = [
  // Gurgaon
  { pincode: "122002", locality: "DLF Phase 1 & 2 / MG Road", city: "Gurgaon", blinkit: "In Stock", zepto: "In Stock", instamart: "In Stock", leadTimeHours: 12, substituteThreat: "Derma Co Aqua Gel", product: "Shadow SPF 50+ Gel (75g)" },
  { pincode: "122009", locality: "DLF Phase 3 / Cyber City", city: "Gurgaon", blinkit: "Out of Stock", zepto: "In Stock", instamart: "In Stock", leadTimeHours: 26, substituteThreat: "Aqualogica Dewy Sunscreen", product: "Shadow SPF 50+ Gel (75g)" },
  { pincode: "122009", locality: "DLF Phase 4 / Galleria Market", city: "Gurgaon", blinkit: "In Stock", zepto: "In Stock", instamart: "Out of Stock", leadTimeHours: 18, substituteThreat: "Dr. Sheth's Ceramide", product: "Shadow SPF 50+ Gel (75g)" },
  { pincode: "122011", locality: "DLF Phase 5 / Golf Course Road", city: "Gurgaon", blinkit: "In Stock", zepto: "Out of Stock", instamart: "In Stock", leadTimeHours: 22, substituteThreat: "Minimalist SPF 50", product: "Shadow SPF 50+ Gel (75g)" },
  { pincode: "122001", locality: "Sector 14 / Old Gurgaon", city: "Gurgaon", blinkit: "Low Stock", zepto: "In Stock", instamart: "Low Stock", leadTimeHours: 15, substituteThreat: "Neutrogena Dry Touch", product: "Shadow SPF 50+ Gel (75g)" },
  { pincode: "122018", locality: "Sohna Road / Sector 48", city: "Gurgaon", blinkit: "In Stock", zepto: "Out of Stock", instamart: "In Stock", leadTimeHours: 20, substituteThreat: "Derma Co 1% Hyaluronic", product: "Shadow SPF 50+ Gel (75g)" },
  { pincode: "122003", locality: "Sector 43 / Sushant Lok 1", city: "Gurgaon", blinkit: "In Stock", zepto: "In Stock", instamart: "In Stock", leadTimeHours: 10, substituteThreat: "Minimalist SPF 50", product: "Shadow SPF 50+ Gel (75g)" },
  { pincode: "122011", locality: "Sector 56 / Golf Course Ext", city: "Gurgaon", blinkit: "Out of Stock", zepto: "Low Stock", instamart: "Low Stock", leadTimeHours: 28, substituteThreat: "Aqualogica Dewy", product: "Shadow SPF 50+ Gel (75g)" },

  // Bangalore
  { pincode: "560038", locality: "Indiranagar 100ft Road", city: "Bangalore", blinkit: "Out of Stock", zepto: "In Stock", instamart: "In Stock", leadTimeHours: 24, substituteThreat: "Derma Co Aqua Gel", product: "Shadow SPF 50+ Gel (75g)" },
  { pincode: "560034", locality: "Koramangala 4th & 5th Block", city: "Bangalore", blinkit: "In Stock", zepto: "In Stock", instamart: "Low Stock", leadTimeHours: 14, substituteThreat: "Minimalist SPF 50", product: "Shadow SPF 50+ Gel (75g)" },
  { pincode: "560102", locality: "HSR Layout Sector 1–7", city: "Bangalore", blinkit: "Low Stock", zepto: "Out of Stock", instamart: "In Stock", leadTimeHours: 25, substituteThreat: "Dr. Sheth's Ceramide", product: "Shadow SPF 50+ Gel (75g)" },
  { pincode: "560066", locality: "Whitefield / ITPL Corridor", city: "Bangalore", blinkit: "In Stock", zepto: "Low Stock", instamart: "Out of Stock", leadTimeHours: 30, substituteThreat: "Aqualogica Radiance+", product: "Shadow SPF 50+ Gel (75g)" },
  { pincode: "560103", locality: "Bellandur / Outer Ring Road", city: "Bangalore", blinkit: "In Stock", zepto: "In Stock", instamart: "In Stock", leadTimeHours: 12, substituteThreat: "Derma Co Hyaluronic", product: "Shadow SPF 50+ Gel (75g)" },
  { pincode: "560078", locality: "JP Nagar Phase 1–6", city: "Bangalore", blinkit: "Low Stock", zepto: "In Stock", instamart: "Low Stock", leadTimeHours: 16, substituteThreat: "Neutrogena Ultra Sheer", product: "Shadow SPF 50+ Gel (75g)" },
  { pincode: "560011", locality: "Jayanagar 4th Block", city: "Bangalore", blinkit: "In Stock", zepto: "In Stock", instamart: "In Stock", leadTimeHours: 11, substituteThreat: "Minimalist SPF 50", product: "Shadow SPF 50+ Gel (75g)" },
];

export default function QCommercePage() {
  const [cityFilter, setCityFilter] = useState<"All" | "Gurgaon" | "Bangalore">("All");
  const [productFilter, setProductFilter] = useState<string>("Fixderma Shadow SPF 50+ Gel");

  const filteredData = useMemo(() => {
    return PINCODE_DATA.filter((item) => {
      if (cityFilter !== "All" && item.city !== cityFilter) return false;
      return true;
    });
  }, [cityFilter]);

  // Calculate statistics
  const totalStores = filteredData.length * 3;
  let oosCount = 0;
  let lowStockCount = 0;
  let inStockCount = 0;

  filteredData.forEach((row) => {
    [row.blinkit, row.zepto, row.instamart].forEach((status) => {
      if (status === "Out of Stock") oosCount++;
      else if (status === "Low Stock") lowStockCount++;
      else inStockCount++;
    });
  });

  const inStockRate = Math.round((inStockCount / totalStores) * 100);
  const oosRate = Math.round((oosCount / totalStores) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 animate-fade-in">
      {/* Disclaimer Banner */}
      <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-950 text-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold uppercase tracking-wider bg-amber-400/50 px-2 py-0.5 rounded text-[10px]">Strategic Audit</span>
          <span><strong>Illustrative audit model for Fixderma:</strong> Simulated stock-out tracking across 15 high-velocity dark store clusters in Gurgaon and Bangalore.</span>
        </div>
        <span className="text-clinical-gray-500 hidden sm:inline">Ref: Q3 Dark Store Fulfillment Audit</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold mb-2 border border-teal-200">
            <Zap className="w-3.5 h-3.5 text-teal-600" /> Quick-Commerce Availability Engine
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal">
            Fixderma Dark Store In-Stock Tracker
          </h1>
          <p className="text-clinical-gray-600 text-xs sm:text-sm mt-1 max-w-2xl">
            Monitoring inventory availability across 15 high-density pincodes in <strong>Gurgaon</strong> and <strong>Bangalore</strong> on Blinkit, Zepto, and Instamart. Pinpoints revenue leakage from stock-outs.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2 bg-clinical-gray-100 p-1 rounded-xl shrink-0 self-start md:self-auto">
          {(["All", "Gurgaon", "Bangalore"] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCityFilter(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                cityFilter === c ? "bg-white text-teal-700 shadow-xs" : "text-clinical-gray-600 hover:text-charcoal"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card p-5 bg-white border border-clinical-gray-200">
          <p className="text-[11px] font-bold text-clinical-gray-500 uppercase tracking-wider">Overall In-Stock Rate</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black text-teal-700">{inStockRate}%</span>
            <span className="text-xs font-bold text-amber-600">Target: &gt;95%</span>
          </div>
          <p className="text-xs text-clinical-gray-500 mt-2">
            21.8% of dark stores are currently low or completely out of stock.
          </p>
        </div>

        <div className="card p-5 bg-white border border-clinical-gray-200">
          <p className="text-[11px] font-bold text-clinical-gray-500 uppercase tracking-wider">Active Stock-Outs</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black text-rose-600">{oosCount} Stores</span>
            <span className="text-xs font-bold text-rose-700">({oosRate}%)</span>
          </div>
          <p className="text-xs text-clinical-gray-500 mt-2">
            Peak OOS observed in Cyber City &amp; Indiranagar (high morning demand).
          </p>
        </div>

        <div className="card p-5 bg-white border border-clinical-gray-200">
          <p className="text-[11px] font-bold text-clinical-gray-500 uppercase tracking-wider">Avg. Replenishment Lag</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black text-charcoal">18.5 hrs</span>
            <span className="text-xs text-clinical-gray-500">Dark store turnaround</span>
          </div>
          <p className="text-xs text-clinical-gray-500 mt-2">
            Bottleneck: Mother-hub to micro-fulfillment transit delays in NCR.
          </p>
        </div>

        <div className="card p-5 bg-teal-900 text-white border border-teal-800">
          <p className="text-[11px] font-bold text-teal-300 uppercase tracking-wider">Estimated Revenue Leakage</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black text-amber-400">₹18.4L</span>
            <span className="text-xs text-stone-300">/ month</span>
          </div>
          <p className="text-xs text-teal-200/80 mt-2">
            62% of shoppers substitute with Aqualogica or Derma Co upon Fixderma OOS.
          </p>
        </div>
      </div>

      {/* Main Stock Table */}
      <div className="card overflow-hidden border border-clinical-gray-200 shadow-sm mb-10">
        <div className="p-4 bg-clinical-gray-50/80 border-b border-clinical-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-charcoal text-sm">Pincode Availability Matrix ({filteredData.length} Pin Codes)</h3>
            <p className="text-xs text-clinical-gray-500">Live inventory status for: <strong>Fixderma Shadow SPF 50+ Gel (75g)</strong></p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 font-semibold text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> In Stock
            </span>
            <span className="flex items-center gap-1 font-semibold text-amber-700">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> Low Stock
            </span>
            <span className="flex items-center gap-1 font-semibold text-rose-700">
              <span className="w-2 h-2 rounded-full bg-rose-500" /> Out of Stock
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-white border-b border-clinical-gray-200 text-clinical-gray-500 uppercase tracking-wider text-[11px]">
                <th className="p-3.5">Pincode &amp; Micro-Market</th>
                <th className="p-3.5">City</th>
                <th className="p-3.5 text-center font-bold text-yellow-800 bg-yellow-50/50">Blinkit</th>
                <th className="p-3.5 text-center font-bold text-purple-800 bg-purple-50/50">Zepto</th>
                <th className="p-3.5 text-center font-bold text-orange-800 bg-orange-50/50">Instamart</th>
                <th className="p-3.5">Replenish Lag</th>
                <th className="p-3.5">Primary Substitute Lost To</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-clinical-gray-100">
              {filteredData.map((row) => (
                <tr key={row.pincode + row.locality} className="hover:bg-clinical-gray-50/70 transition-colors">
                  <td className="p-3.5 font-bold text-charcoal">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>{row.pincode}</span>
                      <span className="font-normal text-clinical-gray-500 text-[11px]">— {row.locality}</span>
                    </div>
                  </td>
                  <td className="p-3.5 font-medium text-clinical-gray-700">{row.city}</td>
                  
                  {/* Blinkit */}
                  <td className="p-3.5 text-center bg-yellow-50/20">
                    <StatusBadge status={row.blinkit} />
                  </td>

                  {/* Zepto */}
                  <td className="p-3.5 text-center bg-purple-50/20">
                    <StatusBadge status={row.zepto} />
                  </td>

                  {/* Instamart */}
                  <td className="p-3.5 text-center bg-orange-50/20">
                    <StatusBadge status={row.instamart} />
                  </td>

                  <td className="p-3.5 text-clinical-gray-600 font-mono text-[11px]">
                    {row.leadTimeHours} hrs
                  </td>

                  <td className="p-3.5 font-medium text-rose-800">
                    {row.substituteThreat}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Strategic Operational Solution Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6 bg-white border border-clinical-gray-200">
          <h3 className="font-bold text-charcoal text-base mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Root Causes of Fixderma Quick-Commerce Stock-Outs
          </h3>
          <ul className="text-xs text-clinical-gray-600 space-y-2.5 mt-4 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="font-bold text-charcoal">1. Static Reorder Triggers:</span> Quick-commerce algorithms underestimate sun protection surges during temperature spikes (NCR heatwaves &amp; Bangalore summer), depleting 50-unit dark store reserves in &lt;36 hours.
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-charcoal">2. Mother Hub Transit Delays:</span> Replenishment from Fixderma regional warehouses to Blinkit/Zepto mother dark stores takes 18–30 hours, leaving micro-fulfillment centers dry.
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-charcoal">3. Single-SKU Dependency:</span> Stocking only the 75g pack means when it goes OOS, shoppers cannot downsize or upsize to 40g or 150g because alternative pack sizes aren&apos;t listed in the dark store.
            </li>
          </ul>
        </div>

        <div className="card p-6 bg-teal-900 text-white border border-teal-800">
          <h3 className="font-bold text-white text-base mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-400" />
            Product &amp; Supply Chain Playbook (Target: &gt;96% In-Stock)
          </h3>
          <ul className="text-xs text-teal-100 space-y-2.5 mt-4 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="font-bold text-amber-300">1. Automated Buffer Re-stocking:</span> Set up API-triggered webhook reorders when dark store inventory drops below 5 days of velocity in high-density Gurgaon &amp; Bangalore pin codes.
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-amber-300">2. Multi-Pack Listing Strategy:</span> Onboard both 40g (₹275 impulse entry) and 75g (₹495 hero) SKUs across all dark stores to provide automatic fallback when 1 SKU sells out.
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-amber-300">3. Localized Hub Buffer:</span> Maintain a dedicated 5-day distributor buffer stock in Okhla (NCR) and Peenya (Bangalore) dedicated exclusively to quick-commerce replenishment.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: "In Stock" | "Low Stock" | "Out of Stock" }) {
  if (status === "In Stock") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
        In Stock
      </span>
    );
  }
  if (status === "Low Stock") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-300">
        Low Stock
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
      Out of Stock
    </span>
  );
}
