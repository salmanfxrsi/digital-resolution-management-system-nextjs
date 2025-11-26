"use client";

import React, { useState } from "react";
import {
  CalendarDays,
  DollarSign,
  CheckCircle,
  XCircle,
  Video,
  PenTool,
  Megaphone,
} from "lucide-react";

const initialClient = {
  name: "Digital Resolution",
  contractDate: "2025-11-01",
  contractTime: "10:00 AM",
  totalAmount: "100,000 Tk",
  paidAmount: "70,000 Tk",
  dueAmount: "30,000 Tk",
  projects: {
    video: "Corporate Promo Video",
    videoCount: 3,
    design: "Website UI/UX Design",
    designCount: 5,
    ads: {
      youtube: true,
      tiktok: false,
      instagram: true,
      facebook: false,
    },
  },
};

export default function ClientPage() {
  const [client, setClient] = useState(initialClient);

  const toggleAd = (platform: keyof typeof client.projects.ads) => {
    setClient((prev) => ({
      ...prev,
      projects: {
        ...prev.projects,
        ads: {
          ...prev.projects.ads,
          [platform]: !prev.projects.ads[platform],
        },
      },
    }));
  };

  return (
    <div className="bg-white p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{client.name}</h1>
          <p className="text-gray-600 text-sm flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            Contract: {client.contractDate} at {client.contractTime}
          </p>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <MetricCard
          label="Total Amount"
          value={client.totalAmount}
          color="blue"
          icon={<DollarSign className="h-6 w-6 text-blue-600" />}
        />
        <MetricCard
          label="Paid Amount"
          value={client.paidAmount}
          color="green"
          icon={<CheckCircle className="h-6 w-6 text-green-600" />}
        />
        <MetricCard
          label="Due Amount"
          value={client.dueAmount}
          color="red"
          icon={<XCircle className="h-6 w-6 text-red-600" />}
        />
      </div>

      {/* Project Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Video */}
        <div className="bg-indigo-50 border rounded-lg p-4 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-sm text-gray-600">Video Project</p>
              <p className="text-lg font-bold text-indigo-600">
                {client.projects.video}
              </p>
            </div>
            <Video className="h-6 w-6 text-indigo-600 animate-pulse" />
          </div>
          <label className="block text-sm text-gray-700 mt-2">
            Number of Videos Running:
          </label>
          <input
            type="number"
            value={client.projects.videoCount}
            onChange={(e) =>
              setClient({
                ...client,
                projects: {
                  ...client.projects,
                  videoCount: Number(e.target.value),
                },
              })
            }
            className="mt-1 w-full border-b border-indigo-300 bg-transparent focus:outline-none focus:border-indigo-600 text-indigo-700 font-semibold"
          />
        </div>

        {/* Design */}
        <div className="bg-yellow-50 border rounded-lg p-4 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-sm text-gray-600">Design Project</p>
              <p className="text-lg font-bold text-yellow-600">
                {client.projects.design}
              </p>
            </div>
            <PenTool className="h-6 w-6 text-yellow-600 animate-bounce" />
          </div>
          <label className="block text-sm text-gray-700 mt-2">
            Number of Designs Delivered:
          </label>
          <input
            type="number"
            value={client.projects.designCount}
            onChange={(e) =>
              setClient({
                ...client,
                projects: {
                  ...client.projects,
                  designCount: Number(e.target.value),
                },
              })
            }
            className="mt-1 w-full border-b border-yellow-300 bg-transparent focus:outline-none focus:border-yellow-600 text-yellow-700 font-semibold"
          />
        </div>
      </div>

      {/* Ads Section */}
      <div className="bg-gray-50 border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <Megaphone className="h-5 w-5 text-gray-600" /> Ad Campaigns
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Object.entries(client.projects.ads).map(([platform, active]) => (
            <AdCard
              key={platform}
              platform={platform.charAt(0).toUpperCase() + platform.slice(1)}
              active={active}
              onToggle={() =>
                toggleAd(platform as keyof typeof client.projects.ads)
              }
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
  color: string;
  icon: React.ReactNode;
}) {
  const colorMap: Record<string, string> = {
    blue: "text-blue-600 bg-blue-50",
    green: "text-green-600 bg-green-50",
    red: "text-red-600 bg-red-50",
  };

  return (
    <div
      className={`border rounded-lg p-4 flex items-center justify-between ${colorMap[color]}`}
    >
      <div>
        <p className="text-sm text-gray-700">{label}</p>
        <p className={`text-lg font-bold ${colorMap[color].split(" ")[0]}`}>
          {value}
        </p>
      </div>
      {icon}
    </div>
  );
}

/* Ad Card Component */
function AdCard({
  platform,
  active,
  onToggle,
}: {
  platform: string;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
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
