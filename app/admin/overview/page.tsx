/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import OverViewCard from "@/components/module/Cards/OverViewCard";
import OverViewGraph from "@/components/module/Graphs/OverViewGraph";
import { Card, CardTitle } from "@/components/ui/card";
import { Briefcase, Building2 } from "lucide-react";
import AdminOverView from "@/components/shared/Skeleton/AdminOverView";

export default function OverviewPage() {
  const [deptView, setDeptView] = useState("daily");
  const [empView, setEmpView] = useState("daily");

  const [overview, setOverview] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${baseURL}/admin/overview`);
        const data = await res.json();
        setOverview(data.data);
      } catch (error) {
        console.error("Overview Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [baseURL]);

  if (loading || !overview) {
    return <AdminOverView />;
  }

  console.log(overview);
  // Extract fields
  const metrics = overview.metrics;
  const workingHours = overview.workingHours;

  const departments = overview.topDepartments[deptView];
  const employees = overview.topEmployees[empView];

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <OverViewCard data={metrics} />

      {/* Bar Chart & Details */}
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Graph */}
          <OverViewGraph data={workingHours} />

          {/* Departments + Employees */}
          <div className="flex flex-col gap-6">
            {/* Departments Card */}
            <Card className="p-4 sm:p-6 shadow rounded-lg">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2 sm:gap-0">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-purple-100 p-2">
                    <Building2 className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg font-semibold">
                    Departments
                  </CardTitle>
                </div>
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
                {departments.map((dept: any, i: number) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-2 text-sm"
                  >
                    <div>
                      <p className="font-medium">{dept._id.department}</p>
                      <p className="text-gray-500">
                        Total Hours: {dept.totalHours}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Employees Card */}
            <Card className="p-4 sm:p-6 shadow rounded-lg">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2 sm:gap-0">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-green-100 p-2">
                    <Briefcase className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg font-semibold">
                    Employees
                  </CardTitle>
                </div>
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
                {employees.map((emp: any, i: number) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-2 text-sm"
                  >
                    <div>
                      <p className="font-medium">{emp._id.employee}</p>
                      <p className="text-gray-500">
                        Total Hours: {emp.totalHours}
                      </p>
                    </div>
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
