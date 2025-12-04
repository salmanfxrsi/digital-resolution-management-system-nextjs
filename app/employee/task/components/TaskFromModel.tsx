/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useState, useEffect } from "react";
import { Task } from "./task.type";
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from "@/app/redux/features/tasks/taskapi";
import { useDispatch } from "react-redux";
import { clearSelectedTask } from "@/app/redux/features/tasks/taskSlice";

interface TaskFormModalProps {
  show: boolean;
  role: "web_developer" | "graphic_designer" | "video_editor" | "marketer";
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedTask: any;
  onClose: () => void;
}

export default function TaskFormModal({
  show,
  role,
  id,
  selectedTask,
  onClose,
}: TaskFormModalProps) {
  if (!show) return null;

  const dispatch = useDispatch();

  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const isEdit = Boolean(selectedTask);

  const [loading, setLoading] = useState(false); // ⭐ NEW LOADING

  const [formData, setFormData] = useState<Task>({
    role,
    employeeId: id,
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

  useEffect(() => {
    if (selectedTask) {
      setFormData(selectedTask);
    }
  }, [selectedTask]);

  const generatePayload = () => {
    const base = {
      employeeId: id,
      role,
      attendance: "present",
      hours: formData.hours,
      companies: formData.companies,
      projectDetails: formData.projectDetails,
    };

    if (role === "web_developer")
      return { ...base, numberOfWebsites: formData.numberOfWebsites };

    if (role === "graphic_designer")
      return { ...base, numberOfDesigns: formData.numberOfDesigns };

    if (role === "video_editor")
      return { ...base, numberOfVideos: formData.numberOfVideos };

    if (role === "marketer")
      return {
        ...base,
        adsPlatform: formData.adsPlatform,
        numberOfPlatforms: formData.numberOfPlatforms,
      };

    return base;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = generatePayload();
    setLoading(true); // ⭐ START LOADING

    try {
      if (isEdit) {
        await updateTask({ id: selectedTask._id, payload }).unwrap();
      } else {
        await createTask(payload).unwrap();
      }

      dispatch(clearSelectedTask());
      onClose();
    } catch (err) {
      console.error("Task submit failed:", err);
    } finally {
      setLoading(false); // ⭐ STOP LOADING
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">
          {isEdit ? "Update Task" : "Add Task"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Hours */}
          <div>
            <label className="block mb-1">Hours Worked</label>
            <input
              type="number"
              placeholder="Enter working hours"
              value={formData.hours}
              onChange={(e) =>
                setFormData({ ...formData, hours: +e.target.value })
              }
              className="border px-3 py-2 rounded w-full"
            />
          </div>

          {/* Company */}
          <div>
            <label className="block mb-1">Company Name</label>
            <input
              type="text"
              placeholder="Company name"
              value={formData.companies}
              onChange={(e) =>
                setFormData({ ...formData, companies: e.target.value })
              }
              className="border px-3 py-2 rounded w-full"
            />
          </div>

          {/* Project */}
          <div>
            <label className="block mb-1">Project Details</label>
            <input
              type="text"
              placeholder="Project description"
              value={formData.projectDetails}
              onChange={(e) =>
                setFormData({ ...formData, projectDetails: e.target.value })
              }
              className="border px-3 py-2 rounded w-full"
            />
          </div>

          {/* Role Based */}
          {role === "web_developer" && (
            <div>
              <label className="block mb-1">Number of Websites</label>
              <input
                type="number"
                placeholder="How many websites?"
                value={formData.numberOfWebsites}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    numberOfWebsites: +e.target.value,
                  })
                }
                className="border px-3 py-2 rounded w-full"
              />
            </div>
          )}

          {role === "graphic_designer" && (
            <div>
              <label className="block mb-1">Number of Designs</label>
              <input
                type="number"
                placeholder="How many designs?"
                value={formData.numberOfDesigns}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    numberOfDesigns: +e.target.value,
                  })
                }
                className="border px-3 py-2 rounded w-full"
              />
            </div>
          )}

          {role === "video_editor" && (
            <div>
              <label className="block mb-1">Number of Videos</label>
              <input
                type="number"
                placeholder="How many videos?"
                value={formData.numberOfVideos}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    numberOfVideos: +e.target.value,
                  })
                }
                className="border px-3 py-2 rounded w-full"
              />
            </div>
          )}

          {role === "marketer" && (
            <>
              <div>
                <label className="block mb-1">Ads Platform</label>
                <input
                  type="text"
                  placeholder="Facebook, Google Ads"
                  value={formData.adsPlatform}
                  onChange={(e) =>
                    setFormData({ ...formData, adsPlatform: e.target.value })
                  }
                  className="border px-3 py-2 rounded w-full"
                />
              </div>

              <div>
                <label className="block mb-1">Number of Platforms</label>
                <input
                  type="number"
                  placeholder="How many platforms?"
                  value={formData.numberOfPlatforms}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      numberOfPlatforms: +e.target.value,
                    })
                  }
                  className="border px-3 py-2 rounded w-full"
                />
              </div>
            </>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                dispatch(clearSelectedTask());
                onClose();
              }}
              className="bg-gray-200 px-4 py-2 rounded"
              disabled={loading}
            >
              Cancel
            </button>

            <button
              className={`px-4 py-2 rounded text-white 
                ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600"}
              `}
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : isEdit
                ? "Update Task"
                : "Submit Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
