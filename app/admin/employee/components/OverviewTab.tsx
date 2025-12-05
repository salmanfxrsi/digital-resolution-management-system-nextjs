"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import OverviewSkeleton from "@/components/shared/Skeleton/OverviewSkeleton";
import DataQueryPage from "@/components/shared/Query/DataQueryPage";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Clock, UserCheck, UserX, CalendarX } from "lucide-react";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
} from "recharts";

import { useGetOverviewQuery } from "@/app/redux/features/tasks/EmployeeTaskoverviewApi";
import { useGetEmployeeByIdQuery } from "@/app/redux/features/Employees/employeesApi";



export default function OverviewPage() {
  // Get employeeId from URL
  const { id: employeeId } = useParams();

  // Fetch employee to get department (role)
  const { data: employeeData } = useGetEmployeeByIdQuery(employeeId);

  const role = employeeData?.data?.department; // web_developer, graphic_designer, etc.

  // Days or Date Range
  const [days, setDays] = useState<number | null>(7);
  const [range, setRange] = useState<{ from?: string; to?: string } | null>(
    null
  );

  // Build query params for overview API
  const queryParams = days
    ? { employeeId, days }
    : { employeeId, from: range?.from, to: range?.to };

  // Fetch Overview Data
  const { data, isLoading } = useGetOverviewQuery(queryParams, {
    skip: !employeeId,
  });

  const summary = data?.data?.summary || {};

  // Attendance Summary Cards
  const attendanceStats = [
    {
      label: "Present",
      value: summary.present ?? 0,
      icon: UserCheck,
      color: "text-green-600 bg-green-100",
    },
    {
      label: "Absent",
      value: summary.absent ?? 0,
      icon: UserX,
      color: "text-red-600 bg-red-100",
    },
    {
      label: "Leave",
      value: summary.leave ?? 0,
      icon: CalendarX,
      color: "text-yellow-600 bg-yellow-100",
    },
  ];

  // Metrics (Role Based)
  const metrics = [
    {
      label: "Total Hours",
      value: `${summary.averageHours ?? 0} hrs`,
      icon: Clock,
      color: "text-blue-600 bg-blue-100",
      description: "Total hours worked",
    },

    ...(role === "web_developer"
      ? [
        {
          label: "Total Websites",
          value: summary.totalWebsites ?? 0,
          icon: Clock,
          color: "text-indigo-600 bg-indigo-100",
          description: "Websites created",
        },
      ]
      : []),

    ...(role === "graphic_designer"
      ? [
        {
          label: "Total Designs",
          value: summary.totalDesigns ?? 0,
          icon: Clock,
          color: "text-purple-600 bg-purple-100",
          description: "Designs created",
        },
      ]
      : []),

    ...(role === "video_editor"
      ? [
        {
          label: "Total Videos",
          value: summary.totalVideos ?? 0,
          icon: Clock,
          color: "text-orange-600 bg-orange-100",
          description: "Videos edited",
        },
      ]
      : []),

    ...(role === "marketer"
      ? [
        {
          label: "Total Ads",
          value: summary.totalAds ?? 0,
          icon: Clock,
          color: "text-yellow-600 bg-yellow-100",
          description: "Ads managed",
        },
      ]
      : []),
  ];

  const activityData = summary.last7Days || [];

  // Show loading skeleton
  if (isLoading) return <OverviewSkeleton />;

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Employee Overview</h2>

        <DataQueryPage
          onDayChange={(val) => {
            setDays(val);
            setRange(null);
          }}
          onRangeChange={(r) => {
            setRange(r);
            setDays(null);
          }}
        />
      </div>

      {/* Attendance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {attendanceStats.map((stat) => (
          <Card key={stat.label} className="flex flex-row items-center p-3">
            <div className={`rounded-full p-3 ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div className="ml-3">
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle>{stat.value}</CardTitle>
            </div>
          </Card>
        ))}
      </div>

      {/* Role Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.label} className="flex p-5 rounded-lg">
            <div className="flex justify-between items-center w-full">
              <CardDescription className="text-md font-medium text-black">
                {metric.label}
              </CardDescription>
              <CardTitle className="text-lg font-bold text-gray-900">
                {metric.value}
              </CardTitle>
            </div>
            <p className="text-xs text-gray-500 text-center font-semibold">
              {metric.description}
            </p>
            <div className={`rounded-full w-full p-1 ${metric.color}`}>
              <metric.icon className="h-6 w-6" />
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Hours Chart */}
        <div className="bg-white border rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Total Hour</h2>

          <LineChart width={400} height={250} data={activityData}>
            <CartesianGrid stroke="#e5e7eb" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="hours"
              stroke="#2563eb"
              strokeWidth={3}
            />
          </LineChart>
        </div>

        {/* Role Based Dynamic Chart */}
        <div className="bg-white border rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-2">
            {role === "graphic_designer"
              ? "Total Design"
              : role === "video_editor"
                ? "Total Videos"
                : role === "web_developer"
                  ? "Total Websites"
                  : "Total Activity"}
          </h2>

          <BarChart width={400} height={250} data={activityData}>
            <CartesianGrid stroke="#e5e7eb" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey={
                role === "graphic_designer"
                  ? "designs"
                  : role === "video_editor"
                    ? "videos"
                    : role === "web_developer"
                      ? "websites"
                      : "hours"
              }
              fill="#10b981"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </div>
      </div>
    </div>
  );
}
