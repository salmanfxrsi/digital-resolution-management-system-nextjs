"use client";

import OverViewCard from "@/components/module/Cards/OverViewCard";
import OverViewGraph from "@/components/module/Graphs/OverViewGraph";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Building2, Users } from "lucide-react";
import { useState } from "react";

const departments = [
  { name: "HR", hours: "9 hrs/day", lead: "Alice Johnson" },
  { name: "IT", hours: "8 hrs/day", lead: "Bob Smith" },
  { name: "Finance", hours: "7 hrs/day", lead: "Carol Lee" },
];

const employees = [
  { name: "John Doe", designation: "HR Manager", hours: "8 hrs/day" },
  { name: "Jane Smith", designation: "Software Engineer", hours: "7 hrs/day" },
  { name: "Mark Taylor", designation: "Accountant", hours: "6 hrs/day" },
];

export default function OverviewPage() {
  const [deptView, setDeptView] = useState("daily");
  const [empView, setEmpView] = useState("daily");

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <OverViewCard />

      {/* Bar Chart Section */}
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Graph */}
          <OverViewGraph />

          {/* Departments & Employees */}
          <div className="flex flex-col gap-6">
            {/* Departments Card */}
            <Card className="p-4 shadow rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-purple-100 p-2">
                    <Building2 className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg font-semibold">
                    Departments
                  </CardTitle>
                </div>
                {/* Select option */}
                <select
                  value={deptView}
                  onChange={(e) => setDeptView(e.target.value)}
                  className="border rounded-md text-sm px-2 py-1 focus:outline-none focus:ring focus:ring-purple-300"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div className="space-y-2">
                {departments.map((dept, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center border-b pb-2 text-sm"
                  >
                    <div>
                      <p className="font-medium">{dept.name}</p>
                      <p className="text-gray-500">Lead: {dept.lead}</p>
                    </div>
                    <span className="text-black font-semibold">
                      {dept.hours}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Employees Card */}
            <Card className="p-4 shadow rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-green-100 p-2">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg font-semibold">
                    Employees
                  </CardTitle>
                </div>
                {/* Select option */}
                <select
                  value={empView}
                  onChange={(e) => setEmpView(e.target.value)}
                  className="border rounded-md text-sm px-2 py-1 focus:outline-none focus:ring focus:ring-green-300"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div className="space-y-2">
                {employees.map((emp, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center border-b pb-2 text-sm"
                  >
                    <div>
                      <p className="font-medium">{emp.name}</p>
                      <p className="text-gray-500">{emp.designation}</p>
                    </div>
                    <span className="text-black font-semibold">
                      {emp.hours}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
