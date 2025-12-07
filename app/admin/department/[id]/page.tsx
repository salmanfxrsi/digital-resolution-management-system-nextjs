/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, Clock, CalendarDays } from "lucide-react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useParams } from "next/navigation";
import SkeletonTable from "@/components/shared/Skeleton/SkeletonTable";

const departments = [
  { id: "marketer", name: "Marketing Team" },
  { id: "web_developer", name: "Web Developers" },
  { id: "graphic_designer", name: "Graphic Designers" },
  { id: "video_editor", name: "Video Editors" },
  { id: "admin_service", name: "Admin Service" },
];

interface Employee {
  _id: string;
  photo?: string;
  name: string;
  number: string;
  email: string;
  designation: string;
  joiningDate: string;
  salary: string | number;
}

export default function DepartmentDetails() {
  const [view, setView] = useState("daily");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const res = await fetch(`${baseUrl}/departments/employees/${id}`);
        const data = await res.json();
        if (res.ok && data.success) setEmployees(data.data);
      } catch (err) {
        console.error("Error fetching employees:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchEmployees();
  }, [id]);

  useEffect(() => {
    setCurrentPage(1);
  }, [employees]);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentEmployees = employees.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(employees.length / itemsPerPage);

  const dailyData = [
    { day: "Mon", hours: 8 },
    { day: "Tue", hours: 7 },
    { day: "Wed", hours: 9 },
    { day: "Thu", hours: 6 },
    { day: "Fri", hours: 8 },
  ];
  const weeklyData = [
    { week: "Week 1", hours: 45 },
    { week: "Week 2", hours: 42 },
    { week: "Week 3", hours: 47 },
    { week: "Week 4", hours: 44 },
  ];
  const monthlyData = [
    { month: "Jan", hours: 180 },
    { month: "Feb", hours: 175 },
    { month: "Mar", hours: 182 },
  ];

  const chartData =
    view === "daily" ? dailyData : view === "weekly" ? weeklyData : monthlyData;
  const dataKey =
    view === "daily" ? "day" : view === "weekly" ? "week" : "month";

  const departmentName = (id: string) => {
    return departments.find((dept) => dept.id === id);
  };

  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 space-y-8 overflow-hidden">
      {/* Header */}
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
        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <MetricCard label="Daily Work Hours" value="9 hrs/day" color="blue" />
          <MetricCard label="Weekly Hours" value="45 hrs" color="yellow" />
          <MetricCard label="Monthly Hours" value="180 hrs" color="purple" />
          <MetricCard
            label="Total Employees"
            value={employees.length}
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
                <Bar
                  dataKey="hours"
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
                  {currentEmployees.map((emp) => (
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
                {/* Rows Per Page */}
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

                {/* Page Numbers */}
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
    indigo: "text-indigo-600 bg-indigo-50",
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
