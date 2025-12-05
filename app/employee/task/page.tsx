/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Plus, Pencil } from "lucide-react";
import { useSession } from "next-auth/react";
import TaskFormModal from "./components/TaskFromModel";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { useGetTasksByEmployeeQuery } from "@/app/redux/features/tasks/taskapi";
import {
  closeForm,
  openForm,
  setSearch,
  setSelectedTask,
} from "@/app/redux/features/tasks/taskSlice";

export default function TaskPage() {
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const userType = (session as any)?.user?.user?.userType;
  const id = (session as any)?.user?.user?.employeeId;
  const role = userType;

  const search = useSelector((state: any) => state.task.search);
  const showForm = useSelector((state: any) => state.task.showForm);
  const selectedTask = useSelector((state: any) => state.task.selectedTask);


  const { data, isLoading, isError } = useGetTasksByEmployeeQuery(id, {
    skip: !id,
  });

  const tasks = data?.data || [];
  const totalHours = tasks.reduce((sum: number, t: any) => sum + t.hours, 0);


  const todayName = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  const todayDate = new Date().toISOString().split("T")[0];



  const alreadySubmittedToday = tasks.some((t: any) => t.bdDate === todayDate);


  const isFriday = todayName === "Friday";


  const canAddTask = !isFriday && !alreadySubmittedToday;


  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError) return <p className="p-6 text-red-500">Failed to load tasks.</p>;

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Employee Task History</h2>
          <p className="text-sm text-gray-500">
            Track work submissions & manage tasks
          </p>
        </div>

        {/* ADD TASK BUTTON */}
        <button
          // disabled={!canAddTask}
          onClick={() => canAddTask && dispatch(openForm())}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition
            ${canAddTask
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          <Plus className="h-4 w-4" /> Add Task
        </button>
      </div>

      {/* SEARCH & TOTAL HOURS */}
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
            className="border px-3 py-2 rounded"
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
          />
        </div>
      </div>

      {/* TABLE */}
      <table className="w-full text-sm mt-4 border-collapse border border-gray-300 shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-2 border">Date</th>
            <th className="px-3 py-2 border">Day</th>
            <th className="px-3 py-2 border">Company</th>
            <th className="px-3 py-2 border">Details</th>
            <th className="px-3 py-2 border">Hours</th>



            <th className="px-3 py-2 border w-16">Action</th>
          </tr>
        </thead>

        <tbody>
          {tasks
            .filter((t: any) =>
              role === "all" ? true : t.role === role
            )
            .filter((t: any) =>
              t.projectDetails?.toLowerCase().includes(search.toLowerCase())
            )
            .map((task: any, i: number) => (
              <tr
                key={i}
                className={`border text-center transition 
                  ${task.editable ? "bg-blue-50" : "bg-white"}
                `}
              >
                <td className="px-3 py-2 border">{task.bdDate}</td>
                <td className="px-3 py-2 border">{task.day}</td>
                <td className="px-3 py-2 border">{task.companies}</td>
                <td className="px-3 py-2 border">
                  {task.projectDetails || "-"}
                </td>
                <td className="px-3 py-2 border">{task.hours}</td>





                <td className="px-3 py-2 border text-blue-600">
                  {task.editable ? (
                    <Pencil
                      onClick={() => {
                        dispatch(setSelectedTask(task));
                        dispatch(openForm());
                      }}
                      className="h-4 w-4 cursor-pointer mx-auto hover:text-blue-800"
                    />
                  ) : (
                    <span className="text-gray-400 italic">Locked</span>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* MODAL */}
      <TaskFormModal
        show={showForm}
        id={id}
        role={role}
        selectedTask={selectedTask}
        onClose={() => dispatch(closeForm())}
      />
    </div>
  );
}
