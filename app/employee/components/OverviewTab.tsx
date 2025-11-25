"use client";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import React from "react";
import { BarChart, Bar, CartesianGrid, XAxis } from "recharts";

const activityData = [
  { month: "Jan", tasks: 20 },
  { month: "Feb", tasks: 28 },
  { month: "Mar", tasks: 18 },
  { month: "Apr", tasks: 25 },
  { month: "May", tasks: 30 },
];

const metrics = [
  {
    label: "Weekly Hours",
    value: "38.5 hrs",
    icon: Clock,
    color: "text-blue-600 bg-blue-100",
    description: "Average working hours per week",
  },
  {
    label: "Monthly Hours",
    value: "160 hrs",
    icon: Clock,
    color: "text-purple-600 bg-purple-100",
    description: "Total working hours this month",
  },
];

export default function OverviewTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.label} className="flex  p-5 rounded-lg">
            {/* Left side: label + value */}
            <div className=" flex justify-between  items-center">
              <CardDescription className="text-md font-medium text-black ">
                {metric.label}
              </CardDescription>
              <CardTitle className="text-lg font-bold text-gray-900">
                {metric.value}
              </CardTitle>
            </div>
            <p className="text-xs text-gray-500 text-center font-semibold">
              {metric.description}
            </p>

            {/* Right side: icon */}
            <div className={`rounded-full w-full p-1 ${metric.color}`}>
              <metric.icon className="h-6 w-6" />
            </div>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Monthly Activity</h2>
          <BarChart width={400} height={250} data={activityData}>
            <CartesianGrid vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="month" />
            <Bar dataKey="tasks" fill="#2563eb" radius={6} />
          </BarChart>
        </div>

        {/* Performance Card */}
        <div className="bg-white border rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Performance Score</h2>
            {/* Icon bubble */}
            <div className="rounded-full bg-green-100 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M12 20h.01M12 4h.01M20 12h.01M4 12h.01"
                />
              </svg>
            </div>
          </div>

          {/* Circular progress style */}
          <div className="flex items-center justify-center">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-gray-200"
                  fill="transparent"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-green-500"
                  fill="transparent"
                  strokeDasharray="251.2"
                  strokeDashoffset="20" /* adjust for percentage */
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-green-600">
                92%
              </span>
            </div>
          </div>

          <p className="text-gray-600 mt-4 text-center">
            Consistent performance this quarter
          </p>
        </div>
      </div>
    </div>
  );
}
