/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import OverviewTab from "../components/OverviewTab";
import DetailsTab from "../components/DetailsTab";
import HistoryTab from "../components/(HistoryTab)/HistoryTab";

import OverviewSkeleton from "@/components/shared/Skeleton/OverviewSkeleton";
import { useGetEmployeeByIdQuery } from "@/app/redux/features/Employees/employeesApi";
import LeaveManagementTab from "../components/(LeaveManagementTab)/LeaveManagementTab";

export default function EmployeeDetails() {
  const params = useParams();
  const { id } = params;
  const { data, isLoading } = useGetEmployeeByIdQuery(id);
  const employee = data?.data; // assuming API returns { success, data }

  const [activeTab, setActiveTab] = useState<
    "overview" | "details" | "history" | "leave management"
  >("overview");

  return (
    <div className="px-6 space-y-4">
      <h1 className="text-2xl font-bold">Employee ID: {employee?.companyID}</h1>

      {/* Tabs + Date Filter */}
      <div className="flex justify-between items-center border-b">
        <div className="flex gap-4">
          {["overview", "details", "history", "leave management"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 font-semibold capitalize ${
                activeTab === tab
                  ? "border-b-2 border-red-600 text-red-600"
                  : "text-gray-600 hover:text-red-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {isLoading ? (
        <OverviewSkeleton />
      ) : (
        <>
          {activeTab === "overview" &&
            React.createElement(OverviewTab as any, { employee })}
          {activeTab === "details" &&
            React.createElement(DetailsTab as any, { employee })}
          {activeTab === "history" &&
            React.createElement(HistoryTab as any, { employee })}
          {activeTab === "leave management" &&
            React.createElement(LeaveManagementTab as any, { employee })}
        </>
      )}
    </div>
  );
}
