/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { Plus, Pencil } from "lucide-react";
import { useSession } from "next-auth/react";
import { Task } from "./components/task.type";
import TaskFormModal from "./components/TaskFromModel";

export default function TaskPage() {
  const { data: session } = useSession();
  const userType = (session as any)?.user?.user?.userType;
  const id = (session as any)?.user?.user?.employeeId;

  const [tasks, setTasks] = useState<Task[]>([]);
  const role = userType;

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const totalHours = tasks.reduce((sum, t) => sum + t.hours, 0);
  console.log(tasks);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/tasks/employee/${id}`
        );
        const data = await res.json();
        if (data.success) {
          setTasks(data.data); // assuming API returns { success, data: [...] }
        } else {
          console.error("Failed to fetch tasks:", data.message);
        }
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    if (id) {
      fetchTasks();
    }
  }, [id]);
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Employee Task History</h2>
          <p className="text-sm text-gray-500">
            Track work submissions by month & add new tasks
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Add Task
        </button>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-700">
          Total Hours (All): {totalHours} hrs
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={role}
            readOnly
            className="border px-3 py-2 rounded w-full bg-gray-100 text-gray-700 cursor-not-allowed"
          />
          <input
            type="text"
            placeholder="Search tasks..."
            className="border px-3 py-1 rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <table className="w-full text-sm mt-4 border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-2">Company</th>
            <th className="px-3 py-2">Details</th>
            <th className="px-3 py-2">Hours</th>
            <th className="px-3 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks
            .filter((t) => (role === "all" ? true : t.role === role))
            .filter((t) =>
              t.projectDetails?.toLowerCase().includes(search.toLowerCase())
            )
            .map((task, i) => {
              const now = new Date();
              const isAfterMidnight = now.getHours() >= 0 && now.getHours() < 6;

              return (
                <tr key={i} className="border-t text-center">
                  <td className="px-3 py-2">{task.companies}</td>
                  <td className="px-3 py-2">{task.projectDetails || "-"}</td>
                  <td className="px-3 py-2">{task.hours}</td>
                  <td className="px-3 py-2 text-blue-600">
                    {isAfterMidnight ? (
                      <span className="text-gray-400 italic cursor-not-allowed">
                        Not Editable
                      </span>
                    ) : (
                      <Pencil
                        onClick={() => setShowForm(true)}
                        className="h-4 w-4  cursor-pointer"
                      />
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <TaskFormModal
        show={showForm}
        id={id}
        role={role}
        setTasks={setTasks}
        onClose={() => setShowForm(false)}
      />
    </div>
  );
}
