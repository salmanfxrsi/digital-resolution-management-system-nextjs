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
  {
    id: "marketer",
    name: "Marketing Team",
  },
  {
    id: "web_developer",
    name: "Web Developers",
  },
  {
    id: "graphic_designer",
    name: "Graphic Designers",
  },
  {
    id: "video_editor",
    name: "Video Editors",
  },
  {
    id: "admin_service",
    name: "Admin Service",
  },
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

  const { id } = useParams(); // department id from route

  // 🔹 Fetch employees by department id
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const res = await fetch(`${baseUrl}/departments/employees/${id}`);
        const data = await res.json();
        if (res.ok && data.success) {
          setEmployees(data.data);
        }
      } catch (err) {
        console.error("Error fetching employees:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchEmployees();
  }, [id]);
  console.log(employees);

  // Demo graph data
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
  const demartmentname = (id: string) => {
    return departments.find((dept) => dept.id === id);
  };

  return (
    <div className="bg-white p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {demartmentname(id as any)?.name}
          </h1>
          <p className="text-gray-600 text-sm">Department ID: {id}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <CalendarDays className="h-4 w-4" />
          {/* Example static established date */}
          Established: 2018-03-01
        </div>
      </div>

      {/* Metrics + Graph side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

        {/* Right: Graph */}
        <div className="bg-white border rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Working Hours ({view})
            </h2>
            <select
              value={view}
              onChange={(e) => setView(e.target.value)}
              className="border rounded-md text-sm px-2 py-1 focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey={dataKey} />
              <Tooltip />
              <Bar
                dataKey="hours"
                fill="#ca8a04"
                radius={6}
                background={{ fill: "#fef9c3" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Employee Table */}
      <div>
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Employee List:
        </h1>
        <div className="overflow-x-auto bg-white border rounded-lg shadow">
          {loading ? (
            <SkeletonTable />
          ) : (
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
                {employees?.map((emp) => (
                  <tr key={emp._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">
                      <div className="w-12 h-12 relative">
                        {/* <Image
                          src={emp.photo || "/default-avatar.png"}
                          alt={`${emp.name} Photo`}
                          fill
                          className="object-cover rounded-full border"
                        />
                       */}
                        <Users className="h-8 w-8 text-gray-300" />
                      </div>
                    </td>
                    <td className="p-3">{emp.name}</td>
                    <td className="p-3">{emp.number}</td>
                    <td className="p-3">{emp.email}</td>
                    <td className="p-3">{emp.designation}</td>

                    <td className="p-3 text-center">
                      <Link
                        href={`/admin/employee/${emp._id}`}
                        className="px-4 py-1 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
                {employees.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="p-4 text-center text-gray-500 italic"
                    >
                      No employees found for this department.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
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
