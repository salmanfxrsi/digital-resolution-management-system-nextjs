/* eslint-disable prefer-const */
"use client";

import React from "react";

interface AttendanceCalendarProps {
  detailed: {
    presentDays: string[];
    leaveDays: string[];
    absentDays: string[];
  };
  range: { start: string; end: string };
}

export default function AttendanceCalendar({
  detailed,
  range,
}: AttendanceCalendarProps) {
  const startDate = new Date(range.start);
  const endDate = new Date(range.end);

  const getStatus = (date: string) => {
    if (detailed.presentDays.includes(date)) return "present";
    if (detailed.leaveDays.includes(date)) return "leave";
    if (detailed.absentDays.includes(date)) return "absent";
    return "none";
  };

  const statusColor: Record<string, string> = {
    present: "bg-green-100 text-green-600 border-green-300",
    leave: "bg-yellow-100 text-yellow-600 border-yellow-300",
    absent: "bg-red-100 text-red-600 border-red-300",
    none: "bg-white text-gray-500 border-gray-200",
  };

  const generateCalendarGrid = () => {
    const days: { date: string; status: string }[] = [];
    let current = new Date(startDate);

    while (current <= endDate) {
      const iso = current.toISOString().split("T")[0];
      days.push({ date: iso, status: getStatus(iso) });
      current.setDate(current.getDate() + 1);
    }

    const firstDay = new Date(days[0].date).getDay(); // 0 = Sunday
    const paddedStart = Array(firstDay).fill(null);
    return [...paddedStart, ...days];
  };

  const calendarGrid = generateCalendarGrid();

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="bg-white border rounded-lg shadow p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col  sm:flex-row justify-between items-start sm:items-center">
        <div className="flex justify-between items-center ">
          <h2 className="text-xl font-bold text-gray-800">
            Attendance Calendar
          </h2>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 shadow-sm">
            <span className="text-xs font-semibold text-gray-500">From</span>
            <span className="flex items-center gap-1 text-sm font-medium text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {formatDate(startDate)}
            </span>
          </div>

          <span className="text-gray-400 font-medium">→</span>

          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 shadow-sm">
            <span className="text-xs font-semibold text-gray-500">To</span>
            <span className="flex items-center gap-1 text-sm font-medium text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {formatDate(endDate)}
            </span>
          </div>
        </div>
      </div>

      {/* Weekdays Header */}
      <div className="grid grid-cols-7 gap-2 text-center text-sm font-semibold text-gray-600">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {calendarGrid.map((entry, index) =>
          entry ? (
            <div
              key={entry.date}
              className={`border  rounded  text-center text-sm ${
                statusColor[entry.status]
              } transition hover:scale-[1.02]`}
            >
              <p className="font-semibold">{new Date(entry.date).getDate()}</p>
            </div>
          ) : (
            <div key={`empty-${index}`} className="p-2" />
          )
        )}
      </div>

      {/* Legend */}
      <div className="flex gap-6 justify-center mt-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-green-100 rounded-full border border-green-300"></span>{" "}
          Present
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-yellow-100 rounded-full border border-yellow-300"></span>{" "}
          Leave
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-red-100 rounded-full border border-red-300"></span>{" "}
          Absent
        </div>
      </div>
    </div>
  );
}
