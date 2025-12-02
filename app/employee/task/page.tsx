/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Plus, X, Search, CalendarDays, Edit2 } from "lucide-react";
import { useSession } from "next-auth/react";

// Define Task type for display purposes
type Task = {
  role: string;
  attendance: string;
  companyName?: string;
  projectDetails?: string;
  numberOfWebsites?: number;
  hours?: number;
  date?: string;
  workDetails?: string;
  companies?: string[];
  numberOfDesigns?: number;
  numberOfVideos?: number;
  adsPlatform?: string;
  numberOfPlatforms?: number;
};

export default function TaskPage() {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("All");
  const { data: session } = useSession();

  const id = (session as any)?.user?.user?._id;
  console.log(id);

  const [tasks, setTasks] = useState<Task[]>([]);

  const [role, setRole] = useState((session as any)?.user?.user?.userType);

  const [formData, setFormData] = useState({
    attendance: "present",

    // Developer fields
    companyName: "",
    projectDetails: "",
    numberOfWebsites: "",
    hours: "",

    // Graphic Designer
    date: "",
    workDetails: "",
    companies: "",
    numberOfDesigns: "",

    // Video Editor
    numberOfVideos: "",

    // Marketor
    adsPlatform: "",
    numberOfPlatforms: "",
  });

  const [editTaskIndex, setEditTaskIndex] = useState<number | null>(null);
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const monthsList = useMemo(() => {
    const m = new Set<string>();
    tasks.forEach((t) => {
      const taskDate = t.date || new Date().toISOString();
      const month = new Date(taskDate).toLocaleString("default", {
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
      (a, b) =>
        new Date(b.date || new Date().toISOString()).getTime() -
        new Date(a.date || new Date().toISOString()).getTime()
    );
  }, [tasks]);

  // Month filter
  const monthFilteredTasks = useMemo(() => {
    if (selectedMonth === "All") return sortedTasks;
    return sortedTasks.filter((t) => {
      const monthYear = new Date(
        t.date || new Date().toISOString()
      ).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      return monthYear === selectedMonth;
    });
  }, [sortedTasks, selectedMonth]);

  // Search filter
  const filteredTasks = monthFilteredTasks.filter(
    (t) =>
      (t.companyName?.toLowerCase().includes(search.toLowerCase()) ||
        t.projectDetails?.toLowerCase().includes(search.toLowerCase()) ||
        t.workDetails?.toLowerCase().includes(search.toLowerCase())) ??
      true
  );

  // Total hours
  const totalHours = filteredTasks.reduce((sum, t) => sum + (t.hours || 0), 0);

  // Allow same-day edit
  const isEditable = (taskDate: string | undefined) => {
    if (!taskDate) return true;
    const d = new Date(taskDate);
    const now = new Date();
    return (
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate()
    );
  };

  // Handle edit click
  const handleEdit = (index: number) => {
    if (!isEditable(tasks[index].date)) {
      alert("You can only edit tasks on the same day!");
      return;
    }
    setEditTaskIndex(index);
    const task = tasks[index];
    setRole(task.role);
    setFormData({
      attendance: task.attendance || "present",
      companyName: task.companyName || "",
      projectDetails: task.projectDetails || "",
      numberOfWebsites: task.numberOfWebsites?.toString() || "",
      hours: task.hours?.toString() || "",
      date: task.date || "",
      workDetails: task.workDetails || "",
      companies: task.companies?.join(",") || "",
      numberOfDesigns: task.numberOfDesigns?.toString() || "",
      numberOfVideos: task.numberOfVideos?.toString() || "",
      adsPlatform: task.adsPlatform || "",
      numberOfPlatforms: task.numberOfPlatforms?.toString() || "",
    });
    setOpenModal(true);
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      employeeId: id,
      role,
      attendance: formData.attendance,

      // Developer
      companyName: formData.companyName,
      projectDetails: formData.projectDetails,
      numberOfWebsites: Number(formData.numberOfWebsites) || undefined,
      hours: Number(formData.hours) || undefined,

      // Designer
      date: formData.date,
      workDetails: formData.workDetails,
      companies: formData.companies
        ? formData.companies.split(",").map((c) => c.trim())
        : undefined,
      numberOfDesigns: Number(formData.numberOfDesigns) || undefined,

      // Video Editor
      numberOfVideos: Number(formData.numberOfVideos) || undefined,

      // Marketor
      adsPlatform: formData.adsPlatform,
      numberOfPlatforms: Number(formData.numberOfPlatforms) || undefined,
    };

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

      const res = await fetch(`${baseUrl}/tasks/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Task saved:", data);

      // Update tasks locally
      if (editTaskIndex !== null) {
        setTasks((prev) => {
          const updated = [...prev];
          updated[editTaskIndex] = payload;
          return updated;
        });
        setEditTaskIndex(null);
      } else {
        setTasks((prev) => [payload, ...prev]);
      }

      setOpenModal(false);
      setFormData({
        attendance: "present",
        companyName: "",
        projectDetails: "",
        numberOfWebsites: "",
        hours: "",
        date: "",
        workDetails: "",
        companies: "",
        numberOfDesigns: "",
        numberOfVideos: "",
        adsPlatform: "",
        numberOfPlatforms: "",
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Failed to submit task");
    }
  };
  // 🔹 Extract fetchEmployees so we can reuse it
  const fetchTasks = async (id: string) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const res = await fetch(`${baseUrl}/tasks/employee/${id}`);
      const data = await res.json();

      if (data.success) {
        setTaskList(data.data);
      } else {
        console.error("Failed to fetch employees:", data.message);
      }
    } catch (err) {
      console.error("Error fetching employees:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(id);
  }, [id]);
  console.log(taskList);

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

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
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

        <button
          onClick={() => {
            setOpenModal(true);
            setEditTaskIndex(null);
            setRole((session as any)?.user?.user?.userType);
            setFormData({
              attendance: "present",
              companyName: "",
              projectDetails: "",
              numberOfWebsites: "",
              hours: "",
              date: "",
              workDetails: "",
              companies: "",
              numberOfDesigns: "",
              numberOfVideos: "",
              adsPlatform: "",
              numberOfPlatforms: "",
            });
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          <Plus className="h-5 w-5" /> Add Task
        </button>
      </div>

      <div className="bg-white border rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-700">
              <th className="p-3">Role</th>
              <th className="p-3">Attendance</th>

              {/* Dynamic headers */}
              <th className="p-3">Details</th>
              <th className="p-3">Hours</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {taskList.length > 0 ? (
              taskList.map((task, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  {/* Common fields */}
                  <td className="p-3 capitalize">{task.role}</td>
                  <td className="p-3">{task.attendance}</td>

                  {/* Role‑specific rendering */}
                  <td className="p-3">
                    {task.role === "developer" && (
                      <>
                        <div>Company: {task.companyName}</div>
                        <div>Project: {task.projectDetails}</div>
                        <div>Websites: {task.numberOfWebsites}</div>
                      </>
                    )}

                    {task.role === "graphic_designer" && (
                      <>
                        <div>Date: {task.date}</div>
                        <div>Work: {task.workDetails}</div>
                        <div>Companies: {task.companies?.join(", ")}</div>
                        <div>Designs: {task.numberOfDesigns}</div>
                      </>
                    )}

                    {task.role === "video_editor" && (
                      <>
                        <div>Date: {task.date}</div>
                        <div>Work: {task.workDetails}</div>
                        <div>Company: {task.company}</div>
                        <div>Videos: {task.numberOfVideos}</div>
                      </>
                    )}

                    {task.role === "marketor" && (
                      <>
                        <div>Date: {task.date}</div>
                        <div>Work: {task.workDetails}</div>
                        <div>Company: {task.company}</div>
                        <div>Ads Platform: {task.adsPlatform}</div>
                        <div>Platforms: {task.numberOfPlatforms}</div>
                      </>
                    )}
                  </td>

                  {/* Hours */}
                  <td className="p-3">{task.hours || "-"}</td>

                  {/* Action */}
                  <td className="p-3">
                    {isEditable(task.date) ? (
                      <button
                        onClick={() => handleEdit(i)}
                        className="flex items-center gap-1 text-blue-600 hover:underline"
                      >
                        <Edit2 className="h-4 w-4" /> Edit
                      </button>
                    ) : (
                      <span className="text-gray-400">Locked</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-5 text-center text-gray-500">
                  No tasks found for this month.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-6 relative shadow-xl">
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>

            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {editTaskIndex !== null ? "Edit Task" : "Add New Task"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Role Selector */}
              <div className="flex justify-between">
                <div>
                  <label className="block text-sm font-medium mb-1">Role</label>
                  <input
                    disabled
                    defaultValue={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full border-b py-2 focus:border-blue-500 outline-none"
                  ></input>
                </div>
                {/* Attendance */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Attendance
                  </label>
                  <input
                    disabled
                    defaultValue="Present"
                    onChange={(e) =>
                      setFormData({ ...formData, attendance: e.target.value })
                    }
                    className="w-full border-b py-2 outline-none"
                  ></input>
                </div>
              </div>

              {/* =========== Developer Fields =========== */}
              {role === "web_developer" && (
                <>
                  <div>
                    <label className="block mb-1">Company Name</label>
                    <input
                      type="text"
                      className="w-full border-b py-2"
                      value={formData.companyName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          companyName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1">Project Details</label>
                    <textarea
                      className="w-full border-b py-2"
                      value={formData.projectDetails}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          projectDetails: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1">Number of Websites</label>
                    <input
                      type="number"
                      className="w-full border-b py-2"
                      value={formData.numberOfWebsites}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          numberOfWebsites: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1">Hours</label>
                    <input
                      type="number"
                      className="w-full border-b py-2"
                      value={formData.hours}
                      onChange={(e) =>
                        setFormData({ ...formData, hours: e.target.value })
                      }
                      required
                    />
                  </div>
                </>
              )}

              {/* ========== Designer Fields ========== */}
              {role === "graphic_designer" && (
                <>
                  <div>
                    <label className="block mb-1">Date</label>
                    <input
                      type="date"
                      className="w-full border-b py-2"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1">Work Details</label>
                    <textarea
                      className="w-full border-b py-2"
                      value={formData.workDetails}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          workDetails: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1">
                      Companies (comma separated)
                    </label>
                    <input
                      type="text"
                      className="w-full border-b py-2"
                      value={formData.companies}
                      onChange={(e) =>
                        setFormData({ ...formData, companies: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1">Number of Designs</label>
                    <input
                      type="number"
                      className="w-full border-b py-2"
                      value={formData.numberOfDesigns}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          numberOfDesigns: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </>
              )}

              {/* ========== Video Editor Fields ========== */}
              {role === "video_editor" && (
                <>
                  <div>
                    <label className="block mb-1">Number of Videos</label>
                    <input
                      type="number"
                      className="w-full border-b py-2"
                      value={formData.numberOfVideos}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          numberOfVideos: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1">Hours</label>
                    <input
                      type="number"
                      className="w-full border-b py-2"
                      value={formData.hours}
                      onChange={(e) =>
                        setFormData({ ...formData, hours: e.target.value })
                      }
                      required
                    />
                  </div>
                </>
              )}

              {/* ========== Marketor Fields ========== */}
              {role === "marketor" && (
                <>
                  <div>
                    <label className="block mb-1">Ads Platform</label>
                    <input
                      type="text"
                      className="w-full border-b py-2"
                      value={formData.adsPlatform}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          adsPlatform: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1">Number of Platforms</label>
                    <input
                      type="number"
                      className="w-full border-b py-2"
                      value={formData.numberOfPlatforms}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          numberOfPlatforms: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg shadow"
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
