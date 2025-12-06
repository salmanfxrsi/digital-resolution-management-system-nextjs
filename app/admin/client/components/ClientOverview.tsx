"use client";

import React from "react";
import {
  DollarSign,
  CheckCircle,
  XCircle,
  Video,
  PenTool,
  Megaphone,
} from "lucide-react";

interface ClientOverviewProps {
  client: {
    name: string;
    location: string;
    number: string;
    gmail: string;
    photo?: string;
    contractAmount: number;
    payAmount: number;
    dueAmount: number;
    projectDetails: string;
    videoCount: number;
    designCount: number;
    ads: Record<string, boolean>;
  };
}

export default function ClientOverview({ client }: ClientOverviewProps) {
  return (
    <div className="space-y-8">
      {/* Financial Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <MetricCard
          label="Total Amount"
          value={`${client.contractAmount} Tk`}
          color="blue"
          icon={<DollarSign className="h-6 w-6 text-blue-600" />}
        />
        <MetricCard
          label="Paid Amount"
          value={`${client.payAmount} Tk`}
          color="green"
          icon={<CheckCircle className="h-6 w-6 text-green-600" />}
        />
        <MetricCard
          label="Due Amount"
          value={`${client.dueAmount} Tk`}
          color="red"
          icon={<XCircle className="h-6 w-6 text-red-600" />}
        />
      </div>

      {/* Project Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Video */}
        <div className="border rounded-lg p-4 bg-white hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-sm text-gray-600">Video Project</p>
              <p className="text-lg font-bold text-gray-800">
                {client.projectDetails || "No video project details"}
              </p>
            </div>
            <Video className="h-6 w-6 text-indigo-600" />
          </div>
          <label className="block text-sm text-gray-700 mt-2">
            Number of Videos Running:
          </label>
          <p className="text-gray-900 font-semibold">{client.videoCount}</p>
        </div>

        {/* Design */}
        <div className="border rounded-lg p-4 bg-white hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-sm text-gray-600">Design Project</p>
              <p className="text-lg font-bold text-gray-800">
                {client.projectDetails || "No design project details"}
              </p>
            </div>
            <PenTool className="h-6 w-6 text-yellow-600" />
          </div>
          <label className="block text-sm text-gray-700 mt-2">
            Number of Designs Delivered:
          </label>
          <p className="text-gray-900 font-semibold">{client.designCount}</p>
        </div>
      </div>

      {/* Ads Section */}
      <div className="bg-white border rounded-lg p-6 shadow hover:shadow-md transition">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <Megaphone className="h-5 w-5 text-gray-600" /> Ad Campaigns
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Object.entries(client.ads).map(([platform, active]) => (
            <AdCard
              key={platform}
              platform={platform.charAt(0).toUpperCase() + platform.slice(1)}
              initialActive={active}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* Reusable Metric Card */
function MetricCard({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value: string | number;
  color: "blue" | "green" | "red";
  icon: React.ReactNode;
}) {
  const colorMap: Record<string, string> = {
    blue: "text-blue-600 bg-blue-50",
    green: "text-green-600 bg-green-50",
    red: "text-red-600 bg-red-50",
  };

  return (
    <div
      className={`border rounded-lg p-4 flex items-center justify-between hover:shadow-md transition ${colorMap[color]}`}
    >
      {icon}
      <div>
        <p className="text-sm text-gray-700">{label}</p>
        <p className={`text-lg font-bold ${colorMap[color].split(" ")[0]}`}>
          {value}
        </p>
      </div>
    </div>
  );
}

/* Ad Card Component with local toggle */
function AdCard({
  platform,
  initialActive,
}: {
  platform: string;
  initialActive: boolean;
}) {
  const [active, setActive] = React.useState(initialActive);

  const handleToggle = () => {
    const newStatus = !active;
    setActive(newStatus);
    console.log(
      `${platform} status changed to:`,
      newStatus ? "Active" : "Inactive"
    );
    // 🔜 In future: call API here with newStatus
  };

  return (
    <button
      onClick={handleToggle}
      className={`border rounded-lg p-4 flex flex-col items-center justify-center transition transform hover:scale-105 ${
        active ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300"
      }`}
    >
      <p className="text-sm font-medium">{platform}</p>
      {active ? (
        <span className="mt-2 text-green-600 text-xs font-semibold animate-pulse">
          Active
        </span>
      ) : (
        <span className="mt-2 text-red-600 text-xs font-semibold">
          Inactive
        </span>
      )}
    </button>
  );
}
