"use client";

import React, { useState } from "react";
import { CalendarDays, PlusCircle, X, Search } from "lucide-react";

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
  const [openModal, setOpenModal] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(initialHistory);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    date: "",
    company: "",
    work: "",
    hours: "",
    role: employee.role,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTask: Task = {
      date: formData.date,
      company: formData.company,
      work: formData.work,
      hours: Number(formData.hours),
      role: employee.role,
    };

    setTasks([...tasks, newTask]);

    setFormData({
      date: "",
      company: "",
      work: "",
      hours: "",
      role: employee.role,
    });

    setOpenModal(false);
  };

  const filteredTasks = tasks
    .filter((t) => t.role === employee.role)
    .filter(
      (t) =>
        t.company.toLowerCase().includes(search.toLowerCase()) ||
        t.work.toLowerCase().includes(search.toLowerCase())
    );

  const totalHours = filteredTasks.reduce((sum, t) => sum + t.hours, 0);
  const totalProjects = new Set(filteredTasks.map((t) => t.company)).size;

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

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-xl border shadow-sm">
          <p className="text-sm text-gray-600">Total Hours</p>
          <h3 className="text-2xl font-bold">{totalHours}</h3>
        </div>

        <div className="p-5 bg-white rounded-xl border shadow-sm">
          <p className="text-sm text-gray-600">Total Projects</p>
          <h3 className="text-2xl font-bold">{totalProjects}</h3>
        </div>

        <div className="p-5 bg-white rounded-xl border shadow-sm">
          <p className="text-sm text-gray-600">Total Tasks</p>
          <h3 className="text-2xl font-bold">{filteredTasks.length}</h3>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search work or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm"
        />
      </div>

      {/* History Table */}
      <div className="overflow-x-auto bg-white border rounded-lg shadow">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Company</th>
              <th className="p-3 text-left">Work Details</th>
              <th className="p-3 text-left">Hours</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((t, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="p-3">{t.date}</td>
                <td className="p-3">{t.company}</td>
                <td className="p-3">{t.work}</td>
                <td className="p-3">{t.hours}</td>
              </tr>
            ))}

            {filteredTasks.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No work records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Task Button */}
      <button
        onClick={() => setOpenModal(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg"
      >
        <PlusCircle className="h-6 w-6" />
      </button>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative">
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-xl font-bold mb-6">Add Work Record</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full border-b py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="w-full border-b py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Work Details
                </label>
                <textarea
                  value={formData.work}
                  onChange={(e) =>
                    setFormData({ ...formData, work: e.target.value })
                  }
                  className="w-full border-b py-2 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Hours
                </label>
                <input
                  type="number"
                  value={formData.hours}
                  onChange={(e) =>
                    setFormData({ ...formData, hours: e.target.value })
                  }
                  className="w-full border-b py-2"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg shadow"
              >
                Add Task
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
