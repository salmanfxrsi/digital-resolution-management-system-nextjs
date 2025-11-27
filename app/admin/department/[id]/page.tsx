"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Building2, Users, Clock, CalendarDays } from "lucide-react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const department = {
  name: "Human Resources",
  teamLead: "Alice Johnson",
  dailyHours: "9 hrs/day",
  weeklyHours: "45 hrs",
  monthlyHours: "180 hrs",
  totalEmployees: 12,
  established: "2018-03-01",
  location: "Bandarban Campus",
  description:
    "The HR department manages recruitment, employee relations, and organizational development. It plays a vital role in shaping company culture and ensuring compliance.",
};

const employees = [
  {
    id: 1,
    photo: "/logo1.png",
    name: "John Doe",
    number: "+880 1234-567890",
    email: "john@example.com",
    designation: "HR Manager",
    joiningDate: "2023-01-15",
    salary: "50,000 Tk",
  },
  {
    id: 2,
    photo: "/logo1.png",
    name: "Jane Smith",
    number: "+880 9876-543210",
    email: "jane@example.com",
    designation: "Recruitment Officer",
    joiningDate: "2022-06-10",
    salary: "42,000 Tk",
  },
  {
    id: 3,
    photo: "/logo1.png",
    name: "Mark Taylor",
    number: "+880 1122-334455",
    email: "mark@example.com",
    designation: "Training Coordinator",
    joiningDate: "2021-09-05",
    salary: "47,000 Tk",
  },
];

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

export default function DepartmentDetails() {
  const [view, setView] = useState("daily");

  const chartData =
    view === "daily" ? dailyData : view === "weekly" ? weeklyData : monthlyData;
  const dataKey =
    view === "daily" ? "day" : view === "weekly" ? "week" : "month";

  return (
    <div className="bg-white p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {department.name}
          </h1>
          <p className="text-gray-600 text-sm">Lead: {department.teamLead}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <CalendarDays className="h-4 w-4" />
          Established: {department.established}
        </div>
      </div>

      {/* Description */}
      <div className="bg-gray-50 border rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          About the Department
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          {department.description}
        </p>
      </div>

      {/* Metrics + Graph side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <MetricCard
            label="Daily Work Hours"
            value={department.dailyHours}
            color="blue"
          />
          <MetricCard
            label="Weekly Hours"
            value={department.weeklyHours}
            color="yellow"
          />
          <MetricCard
            label="Monthly Hours"
            value={department.monthlyHours}
            color="purple"
          />
          <MetricCard
            label="Total Employees"
            value={department.totalEmployees}
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
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-700">
                <th className="p-3 text-left">Photo</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Designation</th>
                <th className="p-3 text-left">Joining Date</th>
                <th className="p-3 text-left">Salary</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    <div className="w-12 h-12 relative">
                      <Image
                        src={emp.photo}
                        alt={`${emp.name} Photo`}
                        fill
                        className="object-cover rounded-full border"
                      />
                    </div>
                  </td>
                  <td className="p-3">{emp.name}</td>
                  <td className="p-3">{emp.number}</td>
                  <td className="p-3">{emp.email}</td>
                  <td className="p-3">{emp.designation}</td>
                  <td className="p-3">{emp.joiningDate}</td>
                  <td className="p-3">{emp.salary}</td>
                  <td className="p-3 text-center">
                    <Link
                      href={`/admin/employee/${emp.id}`}
                      className="px-4 py-1 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Reusable metric card component
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
