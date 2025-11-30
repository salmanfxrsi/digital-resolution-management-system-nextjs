"use client";

import React, { useState, useEffect } from "react";
import { CalendarDays, X, Search } from "lucide-react";

type Role = "marketer" | "web_developer" | "graphic_designer" | "video_editor";

interface Task {
  _id: string;
  date?: string;
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

export default function HistoryTab({
  employee,
}: {
  employee: Employee | null;
}) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch tasks from API
  const fetchTasks = async () => {
    if (!employee?._id) return;
    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/tasks/employee/${employee._id}`
      );
      const data = await res.json();
      if (data.success) {
        setTasks(data.data);
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [employee?._id]);

  // Filter tasks by role and search
  const filteredTasks = tasks
    .filter((t) => employee && t.role === employee?.department)
    .filter((t) => {
      const query = search.toLowerCase();
      return (
        t.company?.toLowerCase().includes(query) ||
        t.projectDetails?.toLowerCase().includes(query) ||
        t.workDetails?.toLowerCase().includes(query) ||
        t.date?.toLowerCase().includes(query)
      );
    });

  const getDayName = (dateStr?: string) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  // Render role-specific headers
  const renderHeaders = () => {
    switch (employee?.department) {
      case "web_developer":
        return (
          <>
            <th className="p-3">Date</th>
            <th className="p-3">Day</th>
            <th className="p-3">Company</th>
            <th className="p-3">Project</th>
            <th className="p-3">Websites</th>
            <th className="p-3">Hours</th>
            <th className="p-3">Action</th>
          </>
        );
      case "graphic_designer":
        return (
          <>
            <th className="p-3">Date</th>
            <th className="p-3">Day</th>
            <th className="p-3">Company</th>
            <th className="p-3">Work</th>
            <th className="p-3">Designs</th>
            <th className="p-3">Hours</th>
            <th className="p-3">Action</th>
          </>
        );
      case "video_editor":
        return (
          <>
            <th className="p-3">Date</th>
            <th className="p-3">Day</th>
            <th className="p-3">Company</th>
            <th className="p-3">Work</th>
            <th className="p-3">Videos</th>
            <th className="p-3">Hours</th>
            <th className="p-3">Action</th>
          </>
        );
      case "marketer":
        return (
          <>
            <th className="p-3">Date</th>
            <th className="p-3">Day</th>
            <th className="p-3">Company</th>
            <th className="p-3">Platform</th>
            <th className="p-3"># Platforms</th>
            <th className="p-3">Hours</th>
            <th className="p-3">Action</th>
          </>
        );
      default:
        return null;
    }
  };

  // Render role-specific row
  const renderRow = (t: Task) => {
    switch (employee?.department) {
      case "web_developer":
        return (
          <>
            <td className="p-3">
              {t.date ? new Date(t.date).toLocaleDateString("en-GB") : "-"}
            </td>
            <td className="p-3">{getDayName(t.date)}</td>
            <td className="p-3">{t.company}</td>
            <td className="p-3">{t.projectDetails}</td>
            <td className="p-3">{t.numberOfWebsites}</td>
            <td className="p-3">{t.hours}</td>
          </>
        );
      case "graphic_designer":
        return (
          <>
            <td className="p-3">
              {t.date ? new Date(t.date).toLocaleDateString("en-GB") : "-"}
            </td>
            <td className="p-3">{getDayName(t.date)}</td>
            <td className="p-3">{t.company}</td>
            <td className="p-3">{t.workDetails}</td>
            <td className="p-3">{t.numberOfDesigns}</td>
            <td className="p-3">{t.hours}</td>
          </>
        );
      case "video_editor":
        return (
          <>
            <td className="p-3">
              {t.date ? new Date(t.date).toLocaleDateString("en-GB") : "-"}
            </td>
            <td className="p-3">{getDayName(t.date)}</td>
            <td className="p-3">{t.company}</td>
            <td className="p-3">{t.workDetails}</td>
            <td className="p-3">{t.numberOfVideos}</td>
            <td className="p-3">{t.hours}</td>
          </>
        );
      case "marketer":
        return (
          <>
            <td className="p-3">
              {t.date ? new Date(t.date).toLocaleDateString("en-GB") : "-"}
            </td>
            <td className="p-3">{getDayName(t.date)}</td>
            <td className="p-3">{t.company}</td>
            <td className="p-3">{t.adsPlatform}</td>
            <td className="p-3">{t.numberOfPlatforms}</td>
            <td className="p-3">{t.hours}</td>
          </>
        );
      default:
        return null;
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

      {/* History Table */}
      <div className="overflow-x-auto bg-white border rounded-lg shadow">
        {loading ? (
          <p className="p-4 text-gray-500">Loading tasks...</p>
        ) : (
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">{renderHeaders()}</tr>
            </thead>
            <tbody>
              {filteredTasks.map((t) => (
                <tr key={t._id} className="border-t hover:bg-gray-50">
                  {renderRow(t)}
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
                  <td
                    colSpan={7}
                    className="p-4 text-center text-gray-500 italic"
                  >
                    No work records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
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
                <span className="text-right">
                  {selectedTask.workDetails ||
                    selectedTask.projectDetails ||
                    "-"}
                </span>
              </div>
              {selectedTask.numberOfWebsites && (
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">
                    🌐 Websites:
                  </span>
                  <span>{selectedTask.numberOfWebsites}</span>
                </div>
              )}
              {selectedTask.numberOfDesigns && (
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">
                    🎨 Designs:
                  </span>
                  <span>{selectedTask.numberOfDesigns}</span>
                </div>
              )}
              {selectedTask.numberOfVideos && (
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">
                    🎬 Videos:
                  </span>
                  <span>{selectedTask.numberOfVideos}</span>
                </div>
              )}
              {selectedTask.adsPlatform && (
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">
                    📢 Ads Platform:
                  </span>
                  <span>{selectedTask.adsPlatform}</span>
                </div>
              )}
              {selectedTask.numberOfPlatforms && (
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">
                    📊 Platforms:
                  </span>
                  <span>{selectedTask.numberOfPlatforms}</span>
                </div>
              )}
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
