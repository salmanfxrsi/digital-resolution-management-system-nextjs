"use client";

import React, { useState } from "react";
import { CalendarDays, X, Search } from "lucide-react";

type Role = "marketer" | "web_developer" | "graphic_designer" | "video_editor";

interface Task {
  date: string;
  company: string;
  work: string;
  hours: number;
  role: Role;
}

interface Employee {
  name: string;
  role: Role;
}

const employee: Employee = {
  name: "John Doe",
  role: "web_developer",
};

const initialHistory: Task[] = [
  {
    date: "2025-11-19",
    company: "Digital Resolution",
    work: "Landing Page Development",
    hours: 5,
    role: "web_developer",
  },
  {
    date: "2025-11-20",
    company: "Digital Resolution",
    work: "Dashboard UI Fixes",
    hours: 4,
    role: "web_developer",
  },
  {
    date: "2025-11-21",
    company: "Nexico Tech",
    work: "Website speed optimization",
    hours: 6,
    role: "web_developer",
  },
];

export default function EmployeeHistory() {
  const [tasks] = useState<Task[]>(initialHistory);
  const [search, setSearch] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const filteredTasks = tasks
    .filter((t) => t.role === employee.role)
    .filter((t) => {
      const query = search.toLowerCase();
      return (
        t.company.toLowerCase().includes(query) ||
        t.work.toLowerCase().includes(query) ||
        t.date.toLowerCase().includes(query) // ✅ allow date filtering like "2025-11-19"
      );
    });

  // Helper to get day name from date string
  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <CalendarDays className="h-6 w-6 text-blue-600" />
        <div>
          <h2 className="text-xl font-semibold">{employee.name}</h2>
          <p className="text-gray-600 capitalize">
            {employee.role.replace("_", " ")}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by date (YYYY-MM-DD), work, or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded shadow"
        />
      </div>

      {/* History Table */}
      <div className="overflow-x-auto bg-white border rounded-lg shadow">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Day</th>
              <th className="p-3 text-left">Work Details</th>
              <th className="p-3 text-left">Hours</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((t, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="p-3">{t.date}</td>
                <td className="p-3">{getDayName(t.date)}</td>
                <td className="p-3">{t.work}</td>
                <td className="p-3">{t.hours}</td>
                <td className="p-3">
                  <button
                    onClick={() => setSelectedTask(t)}
                    className="bg-blue-100 text-blue-600 px-3 py-1 rounded font-semibold hover:underline text-sm"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}

            {filteredTasks.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No work records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* View Task Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-2xl relative animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => setSelectedTask(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-6 border-b pb-3">
              <CalendarDays className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">
                Work Record Details
              </h2>
            </div>

            {/* Content */}
            <div className="space-y-4 text-sm text-gray-700">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">📅 Date:</span>
                <span>{selectedTask.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">🗓 Day:</span>
                <span>{getDayName(selectedTask.date)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">🏢 Company:</span>
                <span>{selectedTask.company}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">💻 Work:</span>
                <span className="text-right">{selectedTask.work}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">⏱ Hours:</span>
                <span>{selectedTask.hours}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">👤 Role:</span>
                <span className="capitalize">
                  {selectedTask.role.replace("_", " ")}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setSelectedTask(null)}
                className="px-4 py-1 bg-blue-100 text-blue-600 rounded font-semibold shadow hover:bg-blue-200 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
