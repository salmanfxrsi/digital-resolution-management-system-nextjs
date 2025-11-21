/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import OverviewTab from "../components/OverviewTab";
import DetailsTab from "../components/DetailsTab";
import HistoryTab from "../components/HistoryTab";

export default function EmployeeDetails() {
  const params = useParams();
  const { id } = params;

  const [activeTab, setActiveTab] = useState<
    "overview" | "details" | "history"
  >("overview");

  return (
    <div className="px-6  space-y-4">
      <h1 className="text-2xl font-bold">Employee ID: {id}</h1>

      {/* Tabs */}
      <div className="flex gap-4 border-b">
        {["overview", "details", "history"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 font-semibold capitalize ${
              activeTab === tab
                ? "border-b-2 border-red-600  text-red-600"
                : "text-gray-600 hover:text-red-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && <OverviewTab />}
      {activeTab === "details" && <DetailsTab />}
      {activeTab === "history" && <HistoryTab />}
    </div>
  );
}
