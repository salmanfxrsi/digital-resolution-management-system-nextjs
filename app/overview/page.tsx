"use client";

import OverViewCard from "@/components/module/Cards/OverViewCard";
import OverViewGraph from "@/components/module/Graphs/OverViewGraph"; // adjust path as needed

export default function OverviewPage() {
  return (
    <div className="space-y-8">
      {/* Metric Cards */}
      <OverViewCard />

      {/* Bar Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OverViewGraph />
      </div>
    </div>
  );
}
