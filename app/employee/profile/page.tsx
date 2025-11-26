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
  User,
} from "lucide-react";

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

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white border rounded-lg shadow space-y-10">
      {/* Header Section */}
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="relative w-32 h-32">
          <Image
            src={employee.photo}
            alt={employee.name}
            fill
            className="rounded-full object-cover border-4 border-blue-200 shadow"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-800">{employee.name}</h2>
          <p className="text-blue-600 font-semibold">{employee.designation}</p>
          <p className="text-gray-500 text-sm">
            {employee.department} Department
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t"></div>

      {/* Details Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border">
          <Phone className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-gray-500 text-xs">PHONE</p>
            <p className="font-semibold">{employee.number}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border">
          <Mail className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-gray-500 text-xs">EMAIL</p>
            <p className="font-semibold">{employee.email}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border">
          <Calendar className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-gray-500 text-xs">JOINING DATE</p>
            <p className="font-semibold">{employee.joiningDate}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border">
          <DollarSign className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-gray-500 text-xs">SALARY</p>
            <p className="font-semibold">৳ {employee.salary}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border">
          <MapPin className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-gray-500 text-xs">ADDRESS</p>
            <p className="font-semibold">{employee.address}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border">
          <Briefcase className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-gray-500 text-xs">DEPARTMENT</p>
            <p className="font-semibold">{employee.department}</p>
          </div>
        </div>
      </div>

      {/* Footer Card */}
      <div className="p-5 bg-blue-50 rounded-xl border border-blue-200 flex items-center gap-4 shadow-sm">
        <User className="h-6 w-6 text-blue-600" />
        <p className="text-gray-700 text-sm">
          This employee profile contains personal and job-related information.
          Make sure data stays updated for HR accuracy.
        </p>
      </div>
    </div>
  );
}
