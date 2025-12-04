/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CalendarDays, Building2, Clock4, User } from "lucide-react";

interface TaskModalProps {
  task: any;
  onClose: () => void;
  formatDate: (d: any) => string;
}




export default function TaskModal({
  task,
  onClose,
  formatDate,
}: TaskModalProps) {
  if (!task) return null;



  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-2xl shadow-xl relative animate-fadeIn border border-gray-200">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 border-b pb-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <CalendarDays className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">
            Work Record Details
          </h2>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          {/* DATE */}
          <div className="flex flex-col p-3 border rounded-lg bg-gray-50">
            <span className="text-gray-500 text-xs">Date</span>
            <span className="font-semibold text-gray-800">
              {formatDate(task.createdAt)}
            </span>
          </div>

          {/* DAY */}
          <div className="flex flex-col p-3 border rounded-lg bg-gray-50">
            <span className="text-gray-500 text-xs">Day</span>
            <span className="font-semibold text-gray-800">{task.day}</span>
          </div>

          {/* ROLE */}
          <div className="flex flex-col p-3 border rounded-lg bg-gray-50">
            <span className="text-gray-500 text-xs">Role</span>
            <span className="font-semibold text-gray-800 flex items-center gap-1 capitalize">
              <User className="h-4 w-4 text-gray-600" />
              {task.role.replace("_", " ")}
            </span>
          </div>

          {/* HOURS */}
          {task.hours && (
            <div className="flex flex-col p-3 border rounded-lg bg-gray-50">
              <span className="text-gray-500 text-xs">Hours</span>
              <span className="font-semibold text-gray-800 flex items-center gap-1">
                <Clock4 className="h-4 w-4 text-gray-600" />
                {task.hours}
              </span>
            </div>
          )}
        </div>

        {/* WORK DETAILS */}
        <div className="col-span-1 sm:col-span-2 flex flex-col mt-5 p-3 border rounded-lg bg-gray-50">
          <span className="text-gray-500 text-xs">Work Details</span>
          <span className="font-semibold text-gray-800">
            {task.workDetails || task.projectDetails || "-"}
          </span>
        </div>

        {/* COMPANY (FULL WIDTH) */}
        <div className="col-span-1 sm:col-span-2 flex flex-col p-3 mt-5 border rounded-lg bg-gray-50">
          <span className="text-gray-500 text-xs">Company</span>

          <div className="mt-2 flex flex-wrap gap-2">
            {task.companies &&
              task.companies.split(",").map((c: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold"
                >
                  {c.trim()}
                </span>
              ))}
          </div>
        </div>


        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
