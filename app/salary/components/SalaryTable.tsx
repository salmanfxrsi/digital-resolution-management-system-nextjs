"use client";

import React, { useState } from "react";

interface Employee {
  id: number;
  name: string;
  salary: number;
  status: "given" | "not-given";
}

interface SalaryTableProps {
  employees: Employee[];
}

export default function SalaryTable({ employees }: SalaryTableProps) {
  const [employeeList, setEmployeeList] = useState<Employee[]>(employees);

  const toggleStatus = (id: number) => {
    const updated = employeeList.map((emp) =>
      emp.id === id
        ? { ...emp, status: emp.status === "given" ? "not-given" : "given" }
        : emp
    );

    setEmployeeList(updated);
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-5 border">
      <h2 className="text-xl font-semibold mb-4">Employee Salary Status</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left text-sm">
            <th className="p-3 border">ID</th>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Salary</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Action</th>
          </tr>
        </thead>

        <tbody>
          {employeeList.map((emp) => (
            <tr key={emp.id} className="text-sm">
              <td className="p-3 border">{emp.id}</td>
              <td className="p-3 border">{emp.name}</td>
              <td className="p-3 border">${emp.salary}</td>
              <td className="p-3 border">
                {emp.status === "given" ? (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                    Given
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                    Not Given
                  </span>
                )}
              </td>
              <td className="p-3 border">
                <button
                  onClick={() => toggleStatus(emp.id)}
                  className="px-3 py-1 bg-blue-600 text-white rounded-md text-xs"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
