/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Users, Clock, CalendarDays } from "lucide-react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Link from "next/link";
import { useParams } from "next/navigation";
import SkeletonTable from "@/components/shared/Skeleton/SkeletonTable";
import {
  useGetDepartmentEmployeesQuery,
  useGetDepartmentOverviewQuery,
} from "@/app/redux/features/department/DepartmentOverviewApi";

const departments = [
  { id: "marketer", name: "Marketing Team" },
  { id: "web_developer", name: "Web Developers" },
  { id: "graphic_designer", name: "Graphic Designers" },
  { id: "video_editor", name: "Video Editors" },
  { id: "admin_service", name: "Admin Service" },
];

export default function DepartmentDetails() {
  const [view, setView] = useState("daily");

  const { id } = useParams();

  const { data: overview } = useGetDepartmentOverviewQuery({
    departmentId: id as string,
  });
  const { data: employeesData, isLoading: loading } =
    useGetDepartmentEmployeesQuery({
      departmentId: id as string,
    });
  console.log(overview);

  const employees = employeesData?.data || [];

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentEmployees = employees.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(employees.length / itemsPerPage);

  // Extract stats
  const dailyStats = overview?.data?.dailyStats || [];
  const weeklyStats = overview?.data?.weeklyStats || [];
  const monthlyStats = overview?.data?.monthlyStats || [];

  // Get today's date
  const today = new Date().toISOString().split("T")[0];
  const todayEntry = dailyStats.find((d: any) => d.day === today);
  const todayHours = todayEntry ? todayEntry.hours : 0;

  function getWeekNumber(date: Date) {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const numberOfDays = Math.floor(
      (date.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000)
    );
    return Math.ceil((numberOfDays + oneJan.getDay() + 1) / 7);
  }

  const currentWeekNumber = getWeekNumber(new Date(today));

  const currentWeekEntry = weeklyStats.find(
    (w: any) => w.week === `Week ${currentWeekNumber}`
  );
  const currentWeekHours = currentWeekEntry ? currentWeekEntry.hours : 0;

  const monthlyTotal = monthlyStats.reduce(
    (sum: number, m: any) => sum + (m.totalHours || 0),
    0
  );

  // Chart Data Selector
  const chartData =
    view === "daily"
      ? dailyStats
      : view === "weekly"
      ? weeklyStats
      : monthlyStats;

  // X-axis values
  const dataKey =
    view === "daily" ? "day" : view === "weekly" ? "week" : "month";

  // Y-axis values selector (critical fix)
  const hoursKey = view === "monthly" ? "totalHours" : "hours";

  const departmentName = (id: string) => {
    return departments.find((dept) => dept.id === id);
  };
  function getJoinedSince(joiningDate: string | Date): string {
    const joinDate = new Date(joiningDate);
    const now = new Date();

    const diffTime = Math.abs(now.getTime() - joinDate.getTime());
    const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
    const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffYears >= 1) {
      return `${diffYears} year${diffYears > 1 ? "s" : ""}`;
    } else if (diffMonths >= 1) {
      return `${diffMonths} month${diffMonths > 1 ? "s" : ""}`;
    } else {
      return `${diffDays} day${diffDays > 1 ? "s" : ""}`;
    }
  }
  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 space-y-8 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            {departmentName(id as any)?.name}
          </h1>
          <p className="text-gray-600 text-sm break-all">Department ID: {id}</p>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <CalendarDays className="h-4 w-4" /> Established: 2018-03-01
        </div>
      </div>

      {/* Metrics + Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <MetricCard
            label="Daily Work Hours"
            value={todayHours}
            color="blue"
          />
          <MetricCard
            label="Weekly Hours"
            value={currentWeekHours}
            color="yellow"
          />
          <MetricCard
            label="Monthly Hours"
            value={monthlyTotal}
            color="purple"
          />
          <MetricCard
            label="Total Employees"
            value={overview?.data?.totalEmployees || "N/A"}
            color="green"
            icon={<Users className="h-6 w-6 text-green-600" />}
          />
        </div>

        {/* Graph */}
        <div className="bg-white border rounded-lg shadow p-4 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
            <h2 className="text-lg font-semibold text-gray-700">
              Working Hours ({view})
            </h2>
            <select
              value={view}
              onChange={(e) => setView(e.target.value)}
              className="border rounded-md text-sm px-2 py-1 w-full sm:w-auto"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div className="w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey={dataKey} />
                <Tooltip />

                {/* FIXED BAR */}
                <Bar
                  dataKey={hoursKey}
                  fill="#3b82f6"
                  radius={[6, 6, 0, 0]}
                  background={{ fill: "#dbeafe" }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Employee Table */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">
          Employee List:
        </h1>

        <div className="overflow-x-auto bg-white border rounded-lg shadow">
          {loading ? (
            <SkeletonTable />
          ) : (
            <>
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow text-sm sm:text-base">
                <thead>
                  <tr className="bg-gray-100 text-left font-semibold text-gray-700">
                    <th className="p-3 sm:p-4 border">Name</th>
                    <th className="p-3 sm:p-4 border">Number</th>
                    <th className="p-3 sm:p-4 border">Joined Since</th>
                    <th className="p-3 sm:p-4 border">Designation</th>
                    <th className="p-3 sm:p-4 border text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEmployees.map((emp: any) => {
                    // Calculate years/months since joining

                    return (
                      <tr
                        key={emp._id}
                        className="border-t hover:bg-blue-50 transition-colors duration-200"
                      >
                        <td className="p-3 sm:p-4 border font-medium text-gray-900">
                          {emp.name}
                        </td>
                        <td className="p-3 sm:p-4 border text-gray-700">
                          {emp.number}
                        </td>
                        <td className="p-3 sm:p-4 border text-gray-700">
                          {getJoinedSince(emp.joiningDate)}
                        </td>
                        <td className="p-3 sm:p-4 border text-gray-700">
                          {emp.designation}
                        </td>
                        <td className="p-3 sm:p-4 border text-center">
                          <div className="flex flex-col sm:flex-row justify-center gap-2">
                            {/* Details Button */}
                            <Link
                              href={`/admin/employee/${emp._id}`}
                              className="px-3 py-1.5 text-sm font-medium rounded-md bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-200"
                            >
                              Details
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  {/* Empty State */}
                  {currentEmployees.length === 0 && (
                    <tr>
                      <td
                        className="p-6 text-center text-gray-500 italic"
                        colSpan={5}
                      >
                        No employees found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          )}
        </div>
        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4">
          <div className="flex items-center gap-2 text-sm">
            <span>Rows per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border p-1 rounded"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded border text-sm ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value: string | number;
  color: string;
  icon?: React.ReactNode;
}) {
  const colorMap: Record<string, string> = {
    blue: "text-blue-600 bg-blue-50",
    yellow: "text-yellow-600 bg-yellow-50",
    purple: "text-purple-600 bg-purple-50",
    green: "text-green-600 bg-green-50",
  };

  return (
    <div
      className={`border rounded-lg p-4 flex items-center justify-between ${colorMap[color]}`}
    >
      <div>
        <p className="text-sm text-gray-700">{label}</p>
        <p className={`text-lg font-bold ${colorMap[color].split(" ")[0]}`}>
          {value}
        </p>
      </div>
      {icon ?? <Clock className={`h-6 w-6 ${colorMap[color].split(" ")[0]}`} />}
    </div>
  );
}
