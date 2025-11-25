"use client";

import React from "react";
import Image from "next/image";
import {
  Mail,
  Phone,
  Calendar,
  MapPin,
  Briefcase,
  DollarSign,
  IdCard, // 🔹 use lucide-react IdCard icon for NID
} from "lucide-react";

const employee = {
  photo: "/public/Digital-Resolution-Logo.png.webp",
  name: "John Doe",
  number: "+880 1234-567890",
  email: "john@example.com",
  department: "HR",
  designation: "HR Manager",
  joiningDate: "2023-01-15",
  salary: "50,000",
  address: "Bandarban, Bangladesh",
  nid: "1234-5678-9012", // 🔹 Added NID field
};

export default function DetailsTab() {
  return (
    <div className="bg-white border rounded-lg shadow p-8 space-y-6">
      {/* Profile Header */}
      <div className="flex flex-col items-start text-center space-y-3">
        <div className="w-28 h-28 relative">
          <Image
            src={employee.photo}
            alt={employee.name}
            fill
            className="object-cover rounded border-4 border-blue-100 shadow"
          />
        </div>
        <div className="text-start">
          <h2 className="text-2xl font-bold text-gray-800">{employee.name}</h2>
          <p className="text-blue-600 font-medium">{employee.designation}</p>
          <p className="text-gray-500">{employee.department}</p>
        </div>
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-gray-500" />
          <span className="font-medium">Phone:</span> {employee.number}
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-gray-500" />
          <span className="font-medium">Email:</span> {employee.email}
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span className="font-medium">Joining Date:</span>{" "}
          {employee.joiningDate}
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-gray-500" />
          <span className="font-medium">Salary:</span> {employee.salary}
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span className="font-medium">Address:</span> {employee.address}
        </div>
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-gray-500" />
          <span className="font-medium">Department:</span> {employee.department}
        </div>
        {/* 🔹 New NID Field */}
        <div className="flex items-center gap-2">
          <IdCard className="h-4 w-4 text-gray-500" />
          <span className="font-medium">NID:</span> {employee.nid}
        </div>
      </div>
    </div>
  );
}
