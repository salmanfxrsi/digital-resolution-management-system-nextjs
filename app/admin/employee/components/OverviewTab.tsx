"use client";

import { useState } from "react";
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

// SAMPLE DATA
const daysData = [
  { day: "Mon", Count: 5 },
  { day: "Tue", Count: 6 },
  { day: "Wed", Count: 7 },
  { day: "Thu", Count: 4 },
  { day: "Fri", Count: 8 },
];

const weeksData = [
  { week: "W1", Count: 18 },
  { week: "W2", Count: 22 },
  { week: "W3", Count: 20 },
  { week: "W4", Count: 25 },
];

const monthsData = [
  { month: "Jan", Count: 20 },
  { month: "Feb", Count: 28 },
  { month: "Mar", Count: 18 },
  { month: "Apr", Count: 25 },
  { month: "May", Count: 30 },
];

const metrics = [
  {
    label: "Total Hours",
    value: "38.5 hrs",
    icon: Clock,
    color: "text-blue-600 bg-blue-100",
    description: "Average working hours per week",
  },
  {
    label: "Total Design",
    value: "160 hrs",
    icon: Clock,
    color: "text-purple-600 bg-purple-100",
    description: "Total working hours this month",
  },
];

const attendanceStats = [
  {
    label: "Present",
    value: 42,
    icon: UserCheck,
    color: "text-green-600 bg-green-100",
  },
  { label: "Absent", value: 5, icon: UserX, color: "text-red-600 bg-red-100" },
  {
    label: "Leave",
    value: 3,
    icon: CalendarX,
    color: "text-yellow-600 bg-yellow-100",
  },
];

export default function OverviewTab() {
  const [range, setRange] = useState<"days" | "weeks" | "months">("months");

  const chartData =
    range === "days" ? daysData : range === "weeks" ? weeksData : monthsData;

  const xKey = range === "days" ? "day" : range === "weeks" ? "week" : "month";

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
      {/* Attendance Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {attendanceStats.map((stat) => (
          <Card
            key={stat.label}
            className="flex flex-row items-center p-3 rounded-lg"
          >
            <div className={`rounded-full p-3 mb-2 ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <CardDescription className="text-sm font-medium text-gray-600">
                {stat.label}
              </CardDescription>
              <CardTitle className="text-xl font-bold text-gray-900">
                {stat.value}
              </CardTitle>
            </div>
          </Card>
        ))}
      </div>

      {/* Metrics */}
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
        {/* Total Hour Chart */}
        <div className="bg-white border rounded-lg shadow p-4 relative">
          <select
            value={range}
            onChange={(e) => setRange(e.target.value as any)}
            className="absolute right-4 top-4 border px-2 py-1 text-sm rounded"
          >
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
            <option value="months">Months</option>
          </select>

          <h2 className="text-lg font-semibold mb-2">Total Hour</h2>

          <LineChart width={400} height={250} data={chartData}>
            <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="Count"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </div>

        {/* Total Design Chart */}
        <div className="bg-white border rounded-lg shadow p-4 relative">
          <select
            value={range}
            onChange={(e) => setRange(e.target.value as any)}
            className="absolute right-4 top-4 border px-2 py-1 text-sm rounded"
          >
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
            <option value="months">Months</option>
          </select>

          <h2 className="text-lg font-semibold mb-2">Total Design</h2>

          <BarChart width={400} height={250} data={chartData}>
            <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Count" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </div>
      </div>
    </div>
  );
}
