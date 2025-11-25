"use client";

import React, { useState, useMemo } from "react";
import { Plus, X, Search, CalendarDays } from "lucide-react";

export default function TaskPage() {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("All");

  const [tasks, setTasks] = useState([
    {
      date: "2025-11-18",
      company: "Digital Resolution",
      work: "Recruitment Drive",
      hours: 6,
    },
    {
      date: "2025-11-19",
      company: "Digital Resolution",
      work: "Employee Training Session",
      hours: 5,
    },
    {
      date: "2025-11-20",
      company: "Digital Resolution",
      work: "Policy Review & Planning",
      hours: 4,
    },
  ]);

  // Form state
  const [formData, setFormData] = useState({
    date: "",
    company: "",
    work: "",
    hours: "",
  });

  // Extract unique months from tasks
  const monthsList = useMemo(() => {
    const m = new Set<string>();
    tasks.forEach((t) => {
      const month = new Date(t.date).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      m.add(month);
    });
    return ["All", ...Array.from(m)];
  }, [tasks]);

  // Sort latest first
  const sortedTasks = useMemo(() => {
    return [...tasks].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [tasks]);

  // Filter by month
  const monthFilteredTasks = useMemo(() => {
    if (selectedMonth === "All") return sortedTasks;

    return sortedTasks.filter((t) => {
      const monthYear = new Date(t.date).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      return monthYear === selectedMonth;
    });
  }, [sortedTasks, selectedMonth]);

  // Search filter
  const filteredTasks = monthFilteredTasks.filter(
    (t) =>
      t.company.toLowerCase().includes(search.toLowerCase()) ||
      t.work.toLowerCase().includes(search.toLowerCase())
  );

  // Total hours for the filtered month
  const totalHours = filteredTasks.reduce((sum, t) => sum + t.hours, 0);

  // Submit New Task
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setTasks((prev) => [
      ...prev,
      {
        ...formData,
        hours: Number(formData.hours),
      },
    ]);

    setFormData({ date: "", company: "", work: "", hours: "" });
    setOpenModal(false);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Employee Task History
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Track work submissions by month & add new tasks
        </p>
      </div>

      {/* Total Hours */}
      <div className="p-5 bg-blue-50 border border-blue-100 rounded-xl shadow-sm">
        <div className="flex items-center gap-3 text-blue-600">
          <CalendarDays className="h-6 w-6" />
          <p className="text-lg font-semibold">
            Total Hours ({selectedMonth}): {totalHours} hrs
          </p>
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Month Selector */}
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border px-3 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300"
        >
          {monthsList.map((m, i) => (
            <option key={i} value={m}>
              {m}
            </option>
          ))}
        </select>

        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Add Task Button */}
        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          <Plus className="h-5 w-5" /> Add Task
        </button>
      </div>

      {/* Task Table */}
      <div className="bg-white border rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-700">
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Company</th>
              <th className="p-3 text-left">Work Details</th>
              <th className="p-3 text-left">Hours</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  <td className="p-3">{task.date}</td>
                  <td className="p-3">{task.company}</td>
                  <td className="p-3">{task.work}</td>
                  <td className="p-3">{task.hours}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-5 text-center text-gray-500">
                  No tasks found for this month.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-6 relative shadow-xl">
            {/* Close */}
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>

            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Add New Task
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Date */}
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full border-b py-2 focus:border-blue-500 outline-none text-sm"
                  required
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  placeholder="Enter company name"
                  className="w-full border-b py-2 focus:border-blue-500 outline-none text-sm"
                  required
                />
              </div>

              {/* Work */}
              <div>
                <label className="block text-sm font-medium mb-1">Work</label>
                <textarea
                  value={formData.work}
                  onChange={(e) =>
                    setFormData({ ...formData, work: e.target.value })
                  }
                  placeholder="Describe the work..."
                  className="w-full border-b py-2 focus:border-blue-500 outline-none text-sm resize-none"
                  required
                ></textarea>
              </div>

              {/* Hours */}
              <div>
                <label className="block text-sm font-medium mb-1">Hours</label>
                <input
                  type="number"
                  min="1"
                  value={formData.hours}
                  onChange={(e) =>
                    setFormData({ ...formData, hours: e.target.value })
                  }
                  placeholder="e.g. 5"
                  className="w-full border-b py-2 focus:border-blue-500 outline-none text-sm"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition font-medium"
              >
                Submit Task
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
