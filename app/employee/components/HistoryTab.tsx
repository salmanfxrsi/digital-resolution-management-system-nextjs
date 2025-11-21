"use client";

import React, { useState } from "react";
import { CalendarDays, PlusCircle, X, Search } from "lucide-react";

const initialHistory = [
  {
    date: "2025-11-18",
    company: "Digital Resolution",
    work: "Recruitment drive",
    hours: 6,
  },
  {
    date: "2025-11-19",
    company: "Digital Resolution",
    work: "Employee training",
    hours: 5,
  },
  {
    date: "2025-11-20",
    company: "Digital Resolution",
    work: "Policy review",
    hours: 4,
  },
];

export default function HistoryTab() {
  const [openModal, setOpenModal] = useState(false);
  const [tasks, setTasks] = useState(initialHistory);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    date: "",
    company: "",
    work: "",
    hours: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTasks([...tasks, formData]);
    setFormData({ date: "", company: "", work: "", hours: "" });
    setOpenModal(false);
  };

  const filteredTasks = tasks.filter(
    (t) =>
      t.company.toLowerCase().includes(search.toLowerCase()) ||
      t.work.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Calendar placeholder */}
      <div className="flex items-center gap-2 text-blue-600">
        <CalendarDays className="h-5 w-5" />
        <span className="font-medium">Custom Calendar (coming soon)</span>
      </div>

      {/* Layout: Table + Assign Task Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: History Table */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by company or work..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white border rounded-lg shadow">
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
                {filteredTasks.map((h, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50">
                    <td className="p-3">{h.date}</td>
                    <td className="p-3">{h.company}</td>
                    <td className="p-3">{h.work}</td>
                    <td className="p-3">{h.hours}</td>
                  </tr>
                ))}
                {filteredTasks.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-4 text-center text-gray-500">
                      No tasks found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Assign Task Card */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border rounded-lg shadow p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-blue-700 mb-2">
              Assign New Task
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Quickly add a new task for this employee.
            </p>
          </div>
          <button
            onClick={() => setOpenModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            <PlusCircle className="h-5 w-5" />
            Add Task
          </button>
        </div>
      </div>

      {/* Modal Popup */}
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-xl font-bold mb-4">Assign New Task</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  placeholder="Company name"
                  className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Work Details
                </label>
                <textarea
                  value={formData.work}
                  onChange={(e) =>
                    setFormData({ ...formData, work: e.target.value })
                  }
                  placeholder="Describe the task..."
                  className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Hours</label>
                <input
                  type="number"
                  value={formData.hours}
                  onChange={(e) =>
                    setFormData({ ...formData, hours: e.target.value })
                  }
                  placeholder="e.g. 5"
                  className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition"
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
