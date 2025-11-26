"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AddEmployeeModal from "./components/AddEmployeeModal";

interface Employee {
  id: number;
  photo: string;
  name: string;
  number: string;
  email: string;
  department: string;
  joiningDate: string;
  salary: string;
}

export default function EmployeePage() {
  const employees: Employee[] = [
    {
      id: 1,
      photo: "/logo1.png",
      name: "John Doe",
      number: "+880 1234-567890",
      email: "john@example.com",
      department: "HR",
      joiningDate: "2023-01-15",
      salary: "50000",
    },
    {
      id: 2,
      photo: "/logo2.png",
      name: "Jane Smith",
      number: "+880 1987-654321",
      email: "jane@example.com",
      department: "IT",
      joiningDate: "2023-03-20",
      salary: "60000",
    },
  ];

  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold">Employee Page</h1>

      {/* ADD EMPLOYEE CARD */}
      <div className="w-full bg-white border shadow p-5 rounded-xl flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Add New Employee</h2>
          <p className="text-gray-600">
            Click the button to add a new employee
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Add Employee
        </button>
      </div>

      {/* SEARCH BAR */}
      <div>
        <input
          type="text"
          placeholder="Search by name or department..."
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Photo</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Number</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Department</th>
              <th className="p-3 border">Joining Date</th>
              <th className="p-3 border">Salary</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.id} className="border">
                <td className="p-3 border">
                  <div className="w-12 h-12 relative">
                    <Image
                      src={emp.photo}
                      alt={`${emp.name} Photo`}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                </td>

                <td className="p-3 border">{emp.name}</td>
                <td className="p-3 border">{emp.number}</td>
                <td className="p-3 border">{emp.email}</td>
                <td className="p-3 border">{emp.department}</td>
                <td className="p-3 border">{emp.joiningDate}</td>
                <td className="p-3 border">{emp.salary}</td>

                <td className="p-3 border text-center">
                  <Link
                    href={`/admin/employee/${emp.id}`}
                    className="px-4 py-1 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}

            {filteredEmployees.length === 0 && (
              <tr>
                <td className="p-4 text-center text-gray-500" colSpan={8}>
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL COMPONENT */}
      <AddEmployeeModal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
}
