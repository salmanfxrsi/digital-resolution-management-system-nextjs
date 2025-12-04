"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import AddEmployeeModal from "./components/AddEmployeeModal";
import { Briefcase } from "lucide-react";
import SkeletonTable from "@/components/shared/Skeleton/SkeletonTable";

interface Employee {
  _id: string;
  companyID: string;
  photo: string;
  name: string;
  number: string;
  email: string;
  department: string;
  designation: string;
  joiningDate: string;
  salary: string | number;
}

export default function EmployeePage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔹 Extract fetchEmployees so we can reuse it
  const fetchEmployees = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const res = await fetch(`${baseUrl}/employees`);
      const data = await res.json();

      if (data.success) {
        setEmployees(data.data);
      } else {
        console.error("Failed to fetch employees:", data.message);
      }
    } catch (err) {
      console.error("Error fetching employees:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-8">
      <div className="bg-white p-5 rounded-lg shadow flex justify-between items-center border">
        <div>
          <h1 className="text-3xl font-bold">Employees</h1>
          <p className="text-gray-600 mt-1">
            Manage all employees of your organization
          </p>
        </div>
        <Briefcase className="w-16 h-16 text-blue-500 opacity-80" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Total Employees */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <p className="text-lg font-medium">Total Employees</p>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs">
              All Time
            </span>
          </div>
          <p className="text-4xl font-extrabold mt-3">{employees.length}</p>
          <div className="flex items-center gap-2 mt-2 text-sm text-blue-100">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            Updated automatically
          </div>
        </div>

        {/* Active Employees */}
        <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <p className="text-lg font-medium">Active Employees</p>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs">
              Currently Working
            </span>
          </div>
          <p className="text-4xl font-extrabold mt-3">
            {employees.filter((emp) => emp.department !== "resigned").length}
          </p>
          <div className="flex items-center gap-2 mt-2 text-sm text-green-100">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            Still in organization
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-20 items-center">
        {/* SEARCH BAR */}
        <div className="w-full">
          <input
            type="text"
            placeholder="Search by name or department..."
            className="w-full p-2 border rounded shadow focus:outline-none focus:ring focus:ring-blue-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* ADD EMPLOYEE BUTTON */}
        <div className="w-full flex justify-end">
          <button
            onClick={() => setOpenModal(true)}
            className="px-5 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
          >
            Add Employee
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        {loading ? (
          <SkeletonTable />
        ) : (
          <table className="min-w-full bg-white border rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Number</th>
                <th className="p-3 border">Department</th>
                <th className="p-3 border">Designation</th>
                <th className="p-3 border text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp, idx) => (
                <tr
                  key={emp._id}
                  className={`border text-sm hover:bg-blue-50 transition ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="p-3 border font-medium text-gray-800">
                    {emp.name}
                  </td>
                  <td className="p-3 border text-gray-600">{emp.number}</td>
                  <td className="p-3 border text-gray-600 capitalize">
                    {emp.department}
                  </td>
                  <td className="p-3 border text-gray-600">
                    {emp.designation}
                  </td>
                  <td className="p-3 border text-center">
                    <Link
                      href={`/admin/employee/${emp._id}`}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}

              {filteredEmployees.length === 0 && (
                <tr>
                  <td
                    className="p-4 text-center text-gray-500 italic bg-gray-50"
                    colSpan={5}
                  >
                    No employees found. Try adjusting your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* MODAL COMPONENT */}
      <AddEmployeeModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={fetchEmployees}
      />
    </div>
  );
}
