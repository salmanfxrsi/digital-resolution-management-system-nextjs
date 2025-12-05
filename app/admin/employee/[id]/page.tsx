/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import OverviewTab from "../components/OverviewTab";
import DetailsTab from "../components/DetailsTab";
import HistoryTab from "../components/(HistoryTab)/HistoryTab";
import DataQueryPage from "@/components/shared/Query/DataQueryPage";
import OverviewSkeleton from "@/components/shared/Skeleton/OverviewSkeleton";

interface Employee {
  _id: string;
  companyID: string;
  photo: string;
  name: string;
  number: string;
  email: string;
  department: string;
  designation: string;
  joiningDate: string;
  salary: string | number;
}

export default function EmployeeDetails() {
  const params = useParams();
  const { id } = params;

  const [activeTab, setActiveTab] = useState<
    "overview" | "details" | "history"
  >("overview");
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const res = await fetch(`${baseUrl}/employees/${id}`);
        const data = await res.json();

        if (data.success) {
          setEmployee(data.data);
        } else {
          console.error("Failed to fetch employee:", data.message);
        }
      } catch (err) {
        console.error("Error fetching employee:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEmployee();
  }, [id]);

  return (
    <div className="px-6 space-y-4">
      <h1 className="text-2xl font-bold">Employee ID: {employee?.companyID}</h1>

      {/* Tabs + Date Filter */}
      <div className="flex justify-between items-center border-b">
        <div className="flex gap-4">
          {["overview", "details", "history"].map((tab) => (
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
      {loading ? (
        <OverviewSkeleton />
      ) : (
        <>
          {activeTab === "overview" &&
            React.createElement(OverviewTab as any, { employee })}
          {activeTab === "details" &&
            React.createElement(DetailsTab as any, { employee })}
          {activeTab === "history" &&
            React.createElement(HistoryTab as any, { employee })}
        </>
      )}
    </div>
  );
}
