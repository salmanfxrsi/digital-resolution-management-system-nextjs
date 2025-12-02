/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useState } from "react";
import { Task } from "./task.type";

interface TaskFormModalProps {
  show: boolean;
  role: "web_developer" | "graphic_designer" | "video_editor" | "marketer";
  id: string;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  onClose: () => void;
}

export default function TaskFormModal({
  show,
  role,
  id,
  setTasks,
  onClose,
}: TaskFormModalProps) {
  if (!show) return null;
  const today = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState<Task>({
    role: role,
    employeeId: id,
    bdDate: today,
    attendance: "present",
    hours: 0,
    companies: "",
    projectDetails: "",
    numberOfWebsites: 0,
    numberOfDesigns: 0,
    numberOfVideos: 0,
    adsPlatform: "",
    numberOfPlatforms: 0,
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      ...formData,
    };

    console.log(JSON.stringify(formData));

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/tasks/create`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();
    if (data.success) {
      setTasks((prev) => [...prev, data.task]);
      onClose();
    }
  };
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Add Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Task Date
              </label>
              <input
                type="date"
                value={formData.bdDate}
                onChange={(e) =>
                  setFormData({ ...formData, bdDate: e.target.value })
                }
                className="border px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>

            {/* Attendance */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Attendance
              </label>
              <input
                type="text"
                value="present"
                readOnly
                className="border px-3 py-2 rounded w-full bg-gray-100 text-gray-700 cursor-not-allowed"
              />
            </div>

            {/* Hours */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hours Worked
              </label>
              <input
                type="number"
                placeholder="Enter hours"
                value={formData.hours}
                onChange={(e) =>
                  setFormData({ ...formData, hours: +e.target.value })
                }
                className="border px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>

            {/* Companies */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <input
                type="text"
                placeholder="Company name"
                value={formData.companies}
                onChange={(e) =>
                  setFormData({ ...formData, companies: e.target.value })
                }
                className="border px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
          </div>

          {/* Role-specific fields */}
          {role === "web_developer" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Details
                </label>
                <input
                  type="text"
                  placeholder="Describe project"
                  value={formData.projectDetails}
                  onChange={(e) =>
                    setFormData({ ...formData, projectDetails: e.target.value })
                  }
                  className="border px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Websites
                </label>
                <input
                  type="number"
                  placeholder="Websites built"
                  value={formData.numberOfWebsites}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      numberOfWebsites: +e.target.value,
                    })
                  }
                  className="border px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            </>
          )}

          {role === "graphic_designer" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Details
                </label>
                <input
                  type="text"
                  placeholder="Design project"
                  value={formData.projectDetails}
                  onChange={(e) =>
                    setFormData({ ...formData, projectDetails: e.target.value })
                  }
                  className="border px-3 py-2 rounded w-full focus:ring-2 focus:ring-yellow-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Designs
                </label>
                <input
                  type="number"
                  placeholder="Designs delivered"
                  value={formData.numberOfDesigns}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      numberOfDesigns: +e.target.value,
                    })
                  }
                  className="border px-3 py-2 rounded w-full focus:ring-2 focus:ring-yellow-500 transition"
                />
              </div>
            </>
          )}

          {role === "video_editor" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Videos
              </label>
              <input
                type="number"
                placeholder="Videos edited"
                value={formData.numberOfVideos}
                onChange={(e) =>
                  setFormData({ ...formData, numberOfVideos: +e.target.value })
                }
                className="border px-3 py-2 rounded w-full focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
          )}

          {role === "marketer" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ads Platform
                </label>
                <input
                  type="text"
                  placeholder="Platform name"
                  value={formData.adsPlatform}
                  onChange={(e) =>
                    setFormData({ ...formData, adsPlatform: e.target.value })
                  }
                  className="border px-3 py-2 rounded w-full focus:ring-2 focus:ring-green-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Platforms
                </label>
                <input
                  type="number"
                  placeholder="Platforms used"
                  value={formData.numberOfPlatforms}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      numberOfPlatforms: +e.target.value,
                    })
                  }
                  className="border px-3 py-2 rounded w-full focus:ring-2 focus:ring-green-500 transition"
                />
              </div>
            </>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition transform hover:scale-105"
            >
              Submit Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
