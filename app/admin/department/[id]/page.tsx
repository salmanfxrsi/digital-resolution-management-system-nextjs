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
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-700">
                    <th className="p-3 text-left">Photo</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Phone</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Designation</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEmployees.map((emp: any) => (
                    <tr key={emp._id} className="border-t hover:bg-gray-50">
                      <td className="p-3">
                        <Users className="h-8 w-8 text-gray-300" />
                      </td>
                      <td className="p-3">{emp.name}</td>
                      <td className="p-3">{emp.number}</td>
                      <td className="p-3 break-all">{emp.email}</td>
                      <td className="p-3">{emp.designation}</td>
                      <td className="p-3 text-center">
                        <Link
                          href={`/admin/employee/${emp._id}`}
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs sm:text-sm"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

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
            </>
          )}
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
