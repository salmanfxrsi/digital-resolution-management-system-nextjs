"use client";

import React, { useState, useEffect } from "react";
import { CalendarDays, X, Search } from "lucide-react";
import TaskModal from "./TaskModal";

type Role = "marketer" | "web_developer" | "graphic_designer" | "video_editor";

interface Task {
  _id: string;
  date?: string;
  createdAt: Date;
  day: string;
  company?: string;
  workDetails?: string;
  projectDetails?: string;
  numberOfWebsites?: number;
  numberOfDesigns?: number;
  numberOfVideos?: number;
  adsPlatform?: string;
  numberOfPlatforms?: number;
  hours?: number;
  role: Role;
  attendance: string;
}

interface Employee {
  _id: string;
  companyID: string;
  photo: string;
  name: string;
  number: string;
  email: string;
  department: string;
  designation: string;
  joiningDate: string;
  salary: string | number;
  address: string;
  nid: string;
}

export default function HistoryTab({ employee }: { employee: Employee | null }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    if (!employee?._id) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/tasks/employee/${employee._id}`
      );
      const data = await res.json();
      if (data.success) setTasks(data.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [employee?._id]);


  const formatDate = (d?: string | Date) => {
    if (!d) return "-";
    const date = new Date(d);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };



  // Filter tasks
  const filteredTasks = tasks
    .filter((t) => employee && t.role === employee.department)
    .filter((t) => {
      const q = search.toLowerCase();
      return (
        t.company?.toLowerCase().includes(q) ||
        t.projectDetails?.toLowerCase().includes(q) ||
        t.workDetails?.toLowerCase().includes(q) ||
        t.date?.toLowerCase().includes(q)
      );
    });

  // Role-specific table header
  const renderHeaders = () => {
    const common = (
      <>
        <th className="p-3 border text-center">Date</th>
        <th className="p-3 border text-center">Day</th>
      </>
    );

    switch (employee?.department) {
      case "web_developer":
        return (
          <>
            {common}
            <th className="p-3 border text-center">Hours</th>
            <th className="p-3 border text-center">Action</th>
          </>
        );

      case "graphic_designer":
        return (
          <>
            {common}
            <th className="p-3 border text-center">Hours</th>
            <th className="p-3 border text-center">Action</th>
          </>
        );

      case "video_editor":
        return (
          <>
            {common}
            <th className="p-3 border text-center">Hours</th>
            <th className="p-3 border text-center">Action</th>
          </>
        );

      case "marketer":
        return (
          <>
            {common}
            <th className="p-3 border text-center">Hours</th>
            <th className="p-3 border text-center">Action</th>
          </>
        );
    }
  };

  // Role-wise row
  const renderRow = (t: Task) => {
    const common = (
      <>
        <td className="p-3 border text-center">{formatDate(t.createdAt)}</td>
        <td className="p-3 border text-center">{t.day}</td>
      </>
    );

    switch (employee?.department) {
      case "web_developer":
        return (
          <>
            {common}
            <td className="p-3 border text-center">{t.hours}</td>
          </>
        );

      case "graphic_designer":
        return (
          <>
            {common}
            <td className="p-3 border text-center">{t.hours}</td>
          </>
        );

      case "video_editor":
        return (
          <>
            {common}
            <td className="p-3 border text-center">{t.hours}</td>
          </>
        );

      case "marketer":
        return (
          <>
            {common}
            <td className="p-3 border text-center">{t.hours}</td>
          </>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <CalendarDays className="h-6 w-6 text-blue-600" />
        <div>
          <h2 className="text-xl font-semibold">{employee?.name}</h2>
          <p className="text-gray-600 capitalize">
            {employee?.department.replace("_", " ")}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by date, work, or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded shadow"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white border rounded-lg shadow">
        {loading ? (
          <p className="p-4 text-gray-500">Loading...</p>
        ) : (
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">{renderHeaders()}</tr>
            </thead>

            <tbody>
              {filteredTasks.map((t, i) => (
                <tr
                  key={t._id}
                  className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  {renderRow(t)}

                  <td className="p-3 border text-center">
                    <button
                      onClick={() => setSelectedTask(t)}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}

              {filteredTasks.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="p-4 text-center text-gray-500 italic border"
                  >
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          formatDate={formatDate}
        />
      )}

    </div>
  );
}
