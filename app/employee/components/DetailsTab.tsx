"use client";

import React from "react";
import Image from "next/image";

const employee = {
  photo: "/logo1.png",
  name: "John Doe",
  number: "+880 1234-567890",
  email: "john@example.com",
  department: "HR",
  designation: "HR Manager",
  joiningDate: "2023-01-15",
  salary: "50,000",
  address: "Bandarban, Bangladesh",
};

export default function DetailsTab() {
  return (
    <div className="bg-white border rounded-lg shadow p-6 space-y-4">
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 relative">
          <Image
            src={employee.photo}
            alt={employee.name}
            fill
            className="object-cover rounded-full border"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold">{employee.name}</h2>
          <p className="text-gray-600">{employee.designation}</p>
          <p className="text-gray-600">{employee.department}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <p>
          <span className="font-medium">Phone:</span> {employee.number}
        </p>
        <p>
          <span className="font-medium">Email:</span> {employee.email}
        </p>
        <p>
          <span className="font-medium">Joining Date:</span>{" "}
          {employee.joiningDate}
        </p>
        <p>
          <span className="font-medium">Salary:</span> {employee.salary}
        </p>
        <p>
          <span className="font-medium">Address:</span> {employee.address}
        </p>
      </div>
    </div>
  );
}
