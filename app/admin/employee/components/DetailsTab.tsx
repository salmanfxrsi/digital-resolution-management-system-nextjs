/* eslint-disable @typescript-eslint/no-explicit-any */
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

import { useGetEmployeeByIdQuery } from "@/app/redux/features/Employees/employeesApi";
import { useParams } from "next/navigation";

export default function Page() {
  const { id: employeeId } = useParams();

  const { data, isLoading } = useGetEmployeeByIdQuery(employeeId, {
    skip: !employeeId,
  });

  const employee = data?.data || data?.employeeId;

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-28 w-28 bg-gray-200 rounded-full mx-auto"></div>
          <div className="h-6 w-1/2 bg-gray-200 rounded mx-auto"></div>
          <div className="h-4 w-1/3 bg-gray-200 rounded mx-auto"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="p-6 text-center text-gray-500">
        No employee data found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8 bg-white border rounded-xl shadow-lg space-y-10">
      {/* TOP SECTION */}
      <div className="flex flex-col lg:flex-row justify-between gap-8 items-center bg-white border rounded-lg p-6 sm:p-8">
        {/* LEFT SIDE: PHOTO + DETAILS */}
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
          <div className="w-28 h-28 sm:w-32 sm:h-32 border rounded-full flex items-center justify-center overflow-hidden">
            {employee.photo ? (
              <Image
                src={employee.photo}
                width={100}
                height={100}
                alt={employee.name}
                quality={50}
                sizes="100px"
                className="object-cover w-full h-full"
              />
            ) : (
              <User className="h-16 w-16 sm:h-20 sm:w-20 text-gray-300" />
            )}
          </div>

          <div className="space-y-1 sm:space-y-2 text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              {employee.name}
            </h1>
            <p className="text-blue-600 font-semibold">
              {employee.designation}
            </p>
            <p className="text-gray-500 capitalize">{employee.department}</p>
          </div>
        </div>

        {/* RIGHT SIDE: USER ACCOUNT */}
        <div className="bg-gray-50 w-full lg:w-auto border rounded-lg p-5 sm:p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
            User Account Details
          </h3>

          <div className="space-y-3 text-sm">
            <AccountRow label="User ID" color="blue" value={employee._id} />
            <AccountRow
              label="Login Email"
              color="green"
              value={employee.email}
            />
            <AccountRow
              label="Password"
              color="yellow"
              value={employee.companyID}
            />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t"></div>

      {/* DETAILS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
        <DetailCard
          icon={<Phone className="h-5 w-5 text-blue-600" />}
          label="Phone"
          value={employee.number}
        />
        <DetailCard
          icon={<Mail className="h-5 w-5 text-blue-600" />}
          label="Email"
          value={employee.email}
        />
        <DetailCard
          icon={<Calendar className="h-5 w-5 text-blue-600" />}
          label="Joining Date"
          value={employee.joiningDate?.split("T")[0]}
        />
        <DetailCard
          icon={<DollarSign className="h-5 w-5 text-blue-600" />}
          label="Salary"
          value={`৳ ${employee.salary}`}
        />
        <DetailCard
          icon={<MapPin className="h-5 w-5 text-blue-600" />}
          label="Address"
          value={employee.address}
        />
        <DetailCard
          icon={<Briefcase className="h-5 w-5 text-blue-600" />}
          label="Department"
          value={employee.department}
        />
      </div>

      {/* FOOTER */}
      <div className="p-4 sm:p-5 bg-blue-50 rounded-xl border border-blue-200 flex items-start gap-4 shadow-sm">
        <User className="h-6 w-6 text-blue-600" />
        <p className="text-gray-700 text-sm">
          This employee profile contains personal and job-related information.
          Keep data updated for HR accuracy.
        </p>
      </div>
    </div>
  );
}

/* Account row component */
function AccountRow({ label, value, color }: any) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`px-2 py-1 bg-${color}-100 text-${color}-700 rounded text-xs font-semibold`}
      >
        {label}
      </span>
      <p className="font-medium text-gray-900 break-all">{value}</p>
    </div>
  );
}

/* Detail card component */
function DetailCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border hover:shadow-md transition">
      {icon}
      <div>
        <p className="text-gray-500 text-xs uppercase tracking-wide">{label}</p>
        <p className="font-semibold text-gray-800 wrap-break-word">{value}</p>
      </div>
    </div>
  );
}
