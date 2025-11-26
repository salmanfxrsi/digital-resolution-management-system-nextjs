"use client";

import React, { useMemo, useState } from "react";
import {
  CalendarDays,
  PlusCircle,
  X,
  Search,
  Trash2,
  Edit2,
  Users,
  Monitor,
  PenTool,
  Video,
} from "lucide-react";

type Role = "marketer" | "web_developer" | "graphic_designer" | "video_editor";

interface Task {
  id: string;
  date: string;
  company: string;
  work: string;
  hours: number;
  role: Role;
}

const initialHistory: Task[] = [
  {
    id: "t1",
    date: "2025-11-18",
    company: "Digital Resolution",
    work: "Recruitment drive",
    hours: 6,
    role: "marketer",
  },
  {
    id: "t2",
    date: "2025-11-19",
    company: "Digital Resolution",
    work: "Employee training",
    hours: 5,
    role: "web_developer",
  },
  {
    id: "t3",
    date: "2025-11-20",
    company: "Digital Resolution",
    work: "Policy review",
    hours: 4,
    role: "graphic_designer",
  },
];

const ROLE_META: Record<
  Role,
  { label: string; color: string; icon: React.ReactNode }
> = {
  marketer: {
    label: "Marketer",
    color: "from-yellow-100 via-yellow-50 to-yellow-50",
    icon: <PenTool className="h-5 w-5" />,
  },
  web_developer: {
    label: "Web Dev",
    color: "from-sky-100 via-sky-50 to-sky-50",
    icon: <Monitor className="h-5 w-5" />,
  },
  graphic_designer: {
    label: "Designer",
    color: "from-violet-100 via-violet-50 to-violet-50",
    icon: <Users className="h-5 w-5" />,
  },
  video_editor: {
    label: "Video",
    color: "from-rose-100 via-rose-50 to-rose-50",
    icon: <Video className="h-5 w-5" />,
  },
};

export default function HistoryTab() {
  const [tasks, setTasks] = useState<Task[]>(initialHistory);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState<"" | Role>("");
  const [formData, setFormData] = useState({
    date: "",
    company: "",
    work: "",
    hours: "",
    role: "" as "" | Role,
  });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tasks.filter((t) => {
      const matchesQ =
        !q ||
        t.company.toLowerCase().includes(q) ||
        t.work.toLowerCase().includes(q) ||
        t.date.includes(q);
      const matchesRole = !filterRole || t.role === filterRole;
      return matchesQ && matchesRole;
    });
  }, [tasks, search, filterRole]);

  const grouped = useMemo(() => {
    const map: Record<Role, Task[]> = {
      marketer: [],
      web_developer: [],
      graphic_designer: [],
      video_editor: [],
    };
    filtered.forEach((t) => map[t.role].push(t));
    return map;
  }, [filtered]);

  const totals = useMemo(() => {
    const map: Record<Role, { count: number; hours: number }> = {
      marketer: { count: 0, hours: 0 },
      web_developer: { count: 0, hours: 0 },
      graphic_designer: { count: 0, hours: 0 },
      video_editor: { count: 0, hours: 0 },
    };
    tasks.forEach((t) => {
      map[t.role].count += 1;
      map[t.role].hours += Number(t.hours || 0);
    });
    return map;
  }, [tasks]);

  // helpers
  const openAdd = () => {
    setFormData({ date: "", company: "", work: "", hours: "", role: "" });
    setOpenModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // basic validation
    if (
      !formData.date ||
      !formData.company.trim() ||
      !formData.work.trim() ||
      !formData.hours ||
      !formData.role
    ) {
      alert("Please fill all fields");
      return;
    }

    const newTask: Task = {
      id: `t${Date.now()}`,
      date: formData.date,
      company: formData.company.trim(),
      work: formData.work.trim(),
      hours: Number(formData.hours),
      role: formData.role as Role,
    };

    setTasks((s) => [newTask, ...s]);
    setOpenModal(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this task?")) return;
    setTasks((s) => s.filter((t) => t.id !== id));
  };

  const formatDate = (d: string) => {
    try {
      const dt = new Date(d + "T00:00:00");
      return dt.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return d;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Tasks Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Assign and track tasks by department — improved layout and UX.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search company, work or date..."
              className="pl-10 pr-3 py-2 w-64 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value as "" | Role)}
            className="px-3 py-2 border rounded-lg bg-white"
          >
            <option value="">All Departments</option>
            <option value="marketer">Marketer</option>
            <option value="web_developer">Web Developer</option>
            <option value="graphic_designer">Graphic Designer</option>
            <option value="video_editor">Video Editor</option>
          </select>

          <button
            onClick={openAdd}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            title="Add task"
          >
            <PlusCircle className="w-4 h-4" />
            Add Task
          </button>
        </div>
      </div>

      {/* department cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {(Object.keys(ROLE_META) as Role[]).map((role) => (
          <div
            key={role}
            onClick={() => setFilterRole((r) => (r === role ? "" : role))}
            className={`cursor-pointer p-4 rounded-2xl border shadow-sm hover:shadow-md transition ${
              filterRole === role ? "scale-105 ring-2 ring-blue-200" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg bg-gradient-to-tr ${ROLE_META[role].color} border`}
                >
                  {ROLE_META[role].icon}
                </div>
                <div>
                  <div className="text-sm font-medium">
                    {ROLE_META[role].label}
                  </div>
                  <div className="text-xs text-gray-500">Department</div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg font-semibold">
                  {totals[role].count}
                </div>
                <div className="text-xs text-gray-500">
                  {totals[role].hours} hrs
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* two-column layout for tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {(Object.keys(grouped) as Role[]).map((role) => {
          const list = grouped[role];
          return (
            <section key={role} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-white border">
                    {ROLE_META[role].icon}
                  </span>
                  <span>{ROLE_META[role].label}</span>
                </h3>
                <div className="text-sm text-gray-500">
                  {list.length} task{list.length !== 1 ? "s" : ""} •{" "}
                  {list.reduce((a, b) => a + b.hours, 0)} hrs
                </div>
              </div>

              <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-3 py-3 text-left text-xs text-gray-600">
                        Date
                      </th>
                      <th className="px-3 py-3 text-left text-xs text-gray-600">
                        Company
                      </th>
                      <th className="px-3 py-3 text-left text-xs text-gray-600">
                        Work
                      </th>
                      <th className="px-3 py-3 text-left text-xs text-gray-600">
                        Hrs
                      </th>
                      <th className="px-3 py-3 text-right text-xs text-gray-600">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="p-4 text-center text-gray-500"
                        >
                          No tasks for {ROLE_META[role].label}.
                        </td>
                      </tr>
                    )}

                    {list.map((t) => (
                      <tr
                        key={t.id}
                        className="border-t hover:bg-gray-50 transition"
                      >
                        <td className="px-3 py-3 align-top w-28 text-sm text-gray-700">
                          {formatDate(t.date)}
                        </td>
                        <td className="px-3 py-3 align-top text-sm text-gray-800">
                          {t.company}
                        </td>
                        <td className="px-3 py-3 align-top text-sm text-gray-700">
                          {t.work}
                        </td>
                        <td className="px-3 py-3 align-top text-sm font-medium">
                          {t.hours}
                        </td>
                        <td className="px-3 py-3 text-right">
                          <div className="inline-flex items-center gap-2">
                            <button
                              onClick={() => {
                                // prefill modal for quick edit (simple behavior)
                                setFormData({
                                  date: t.date,
                                  company: t.company,
                                  work: t.work,
                                  hours: String(t.hours),
                                  role: t.role,
                                });
                                setOpenModal(true);
                                // To actually update an existing task you'd need edit flow;
                                // this prefill is intended for quick re-add or manual edit.
                              }}
                              title="Edit (prefill)"
                              className="p-2 rounded-md hover:bg-gray-100"
                            >
                              <Edit2 className="w-4 h-4 text-gray-600" />
                            </button>

                            <button
                              onClick={() => handleDelete(t.id)}
                              title="Delete"
                              className="p-2 rounded-md hover:bg-gray-100"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  {list.length > 0 && (
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td className="px-3 py-2 text-xs text-gray-600">
                          Total
                        </td>
                        <td></td>
                        <td></td>
                        <td className="px-3 py-2 text-xs font-semibold">
                          {list.reduce((a, b) => a + b.hours, 0)} hrs
                        </td>
                        <td></td>
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            </section>
          );
        })}
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative">
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-semibold mb-2">Assign Task</h2>
            <p className="text-sm text-gray-500 mb-4">
              Add a new task and assign it to a department.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData((s) => ({ ...s, date: e.target.value }))
                    }
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Hours
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formData.hours}
                    onChange={(e) =>
                      setFormData((s) => ({ ...s, hours: e.target.value }))
                    }
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    placeholder="e.g. 4"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData((s) => ({ ...s, company: e.target.value }))
                  }
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  placeholder="Company name"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Work details
                </label>
                <textarea
                  value={formData.work}
                  onChange={(e) =>
                    setFormData((s) => ({ ...s, work: e.target.value }))
                  }
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
                  placeholder="Describe the task briefly..."
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Department
                </label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData((s) => ({
                      ...s,
                      role: e.target.value as "" | Role,
                    }))
                  }
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  required
                >
                  <option value="">Select department</option>
                  <option value="marketer">Marketer</option>
                  <option value="web_developer">Web Developer</option>
                  <option value="graphic_designer">Graphic Designer</option>
                  <option value="video_editor">Video Editor</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="px-4 py-2 rounded-lg border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
