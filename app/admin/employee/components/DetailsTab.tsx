/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React from "react";
import {
  Mail,
  Phone,
  Calendar,
  MapPin,
  Briefcase,
  DollarSign,
  IdCard,
  User,
} from "lucide-react";
import Image from "next/image";

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
  address: string;
  nid: string;
}

export default function DetailsTab({
  employee,
}: {
  employee: Employee | null;
}) {
  if (!employee)
    return <p className="text-gray-500 italic">No employee data available.</p>;

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      {/* TOP SECTION */}
      <div className="flex mx-auto justify-between gap-8 items-center bg-white border rounded-lg p-8">
        <div className="flex justify-between gap-8 items-center">
          <div className="w-32 h-32 border rounded-full flex items-center justify-center overflow-hidden">
            {employee.photo ? (
              <Image
                src={employee.photo}
                width={100}
                height={100}
                alt={employee.name}
                quality={50}
                sizes="100px"
                className="object-cover w-full h-full object-center"
              />
            ) : (
              <User className="h-20 w-20 text-gray-300" />
            )}
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">{employee.name}</h1>
            <p className="text-blue-600 font-semibold">{employee.designation}</p>
            <p className="text-gray-500 capitalize">{employee.department}</p>
          </div>
        </div>

        {/* USER ACCOUNT SECTION */}
        <div className="bg-gray-50 border rounded-lg p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
            User Account Details
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                User ID
              </span>
              <p className="font-medium text-gray-900">{employee._id}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                Login Email
              </span>
              <p className="font-medium text-gray-900">{employee.email}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-semibold">
                Password
              </span>
              <p className="font-medium text-gray-900">
                {employee.companyID}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* DETAILS CARD */}
      <div className="bg-white border rounded-lg p-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">
          Personal Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <Detail icon={<Phone className="h-4 w-4 text-gray-600" />} label="Phone" value={employee.number} />
          <Detail icon={<Mail className="h-4 w-4 text-gray-600" />} label="Email" value={employee.email} />
          <Detail icon={<Calendar className="h-4 w-4 text-gray-600" />} label="Joining Date" value={new Date(employee.joiningDate).toLocaleDateString()} />
          <Detail icon={<DollarSign className="h-4 w-4 text-gray-600" />} label="Salary" value={`${employee.salary} BDT`} />
          <Detail icon={<MapPin className="h-4 w-4 text-gray-600" />} label="Address" value={employee.address} />
          <Detail icon={<Briefcase className="h-4 w-4 text-gray-600" />} label="Department" value={employee.department} />
          <Detail icon={<IdCard className="h-4 w-4 text-gray-600" />} label="NID" value={employee.nid} />
        </div>
      </div>
    </div>
  );
}

function Detail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 bg-gray-50 border rounded-lg p-4">
      {icon}
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-gray-800 font-medium">{value}</p>
      </div>
    </div>
  );
}
