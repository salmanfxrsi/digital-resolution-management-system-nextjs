"use client";

import React, { useMemo, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isBefore,
  isAfter,
  isSameDay,
  parseISO,
} from "date-fns";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AttendanceCalendar({ detailed, joiningDate }: any) {
  const today = new Date();
  const joinDate = joiningDate ? new Date(joiningDate) : new Date(0);
  const presentSet = new Set((detailed.presentDays || []).map((s: string) => s.split("T")[0]));
  const leaveSet = new Set((detailed.leaveDays || []).map((s: string) => s.split("T")[0]));
  const absentSet = new Set((detailed.absentDays || []).map((s: string) => s.split("T")[0]));

  const [currentMonth, setCurrentMonth] = useState<Date>(startOfMonth(today));

  const prevMonth = () => setCurrentMonth((m) => subMonths(m, 1));
  const nextMonth = () => setCurrentMonth((m) => addMonths(m, 1));
  const goToToday = () => setCurrentMonth(startOfMonth(new Date()));

  const monthGrid = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 0 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 });
    const allDays = eachDayOfInterval({ start, end });

    const weeks: Date[][] = [];
    for (let i = 0; i < allDays.length; i += 7) {
      weeks.push(allDays.slice(i, i + 7));
    }
    return weeks;
  }, [currentMonth]);

  const getDayStatus = (day: Date) => {
    const dateStr = format(day, "yyyy-MM-dd");

    if (isBefore(day, startOfMonth(currentMonth)) && isBefore(day, joinDate)) {
      // days before join + not in month -> still white (handled below)
    }

    if (isBefore(day, joinDate)) return "beforeJoin";
    if (isAfter(day, today)) return "future";
    if (presentSet.has(dateStr)) return "present";
    if (leaveSet.has(dateStr)) return "leave";
    if (absentSet.has(dateStr)) return "absent";
    return "worked";
  };

  const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="bg-white border rounded-lg shadow p-4 mb-14">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">
            {format(currentMonth, "MMMM yyyy")}
          </h2>
          <div className="text-sm text-gray-500">{`Joining: ${joinDate.toISOString().split("T")[0]}`}</div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="p-2 rounded-lg border bg-white shadow-sm hover:bg-gray-100 transition flex items-center justify-center"
            aria-label="Previous month"
          >
            <FiChevronLeft className="text-gray-700 text-xl" />
          </button>

          <button
            onClick={goToToday}
            className="px-3 py-1 rounded border hover:bg-gray-50"
            aria-label="Today"
          >
            Today
          </button>

          <button
            onClick={nextMonth}
            className="p-2 rounded-lg border bg-white shadow-sm hover:bg-gray-100 transition flex items-center justify-center"
            aria-label="Next month"
          >
            <FiChevronRight className="text-gray-700 text-xl" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center font-medium text-gray-700 mb-2">
        {weekdayNames.map((w) => (
          <div key={w} className="text-xs">
            {w}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {monthGrid.map((week, wi) =>
          week.map((day, di) => {
            const inMonth = day.getMonth() === currentMonth.getMonth();
            const status = getDayStatus(day);

            const baseClasses =
              "h-12 flex items-center justify-center rounded text-sm border";
            let styleClasses = "bg-white text-gray-700";

            if (!inMonth) {
              styleClasses = "bg-transparent text-gray-400";
            } else if (status === "beforeJoin") {
              styleClasses = "bg-white text-gray-400";
            } else if (status === "future") {
              styleClasses = "bg-white text-gray-400";
            } else if (status === "present") {
              styleClasses = "bg-green-500 text-white";
            } else if (status === "leave") {
              styleClasses = "bg-yellow-400 text-black";
            } else if (status === "absent") {
              styleClasses = "bg-red-500 text-white";
            } else if (status === "worked") {
              styleClasses = "bg-gray-100 text-gray-800";
            }

            const isToday = isSameDay(day, today);

            return (
              <div
                key={`${wi}-${di}`}
                className={`${baseClasses} ${styleClasses} ${isToday ? "ring-2 ring-blue-400" : ""}`}
                title={format(day, "yyyy-MM-dd")}
              >
                <div className="flex flex-col items-center">
                  <div>{format(day, "d")}</div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="flex gap-4 mt-4 text-sm items-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded" /> Present
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-400 rounded" /> Leave
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded" /> Absent
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-100 rounded border" /> Worked
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white rounded border" /> Before Join / Future
        </div>
      </div>
    </div>
  );
}
