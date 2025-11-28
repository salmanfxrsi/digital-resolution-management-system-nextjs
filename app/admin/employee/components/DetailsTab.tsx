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
  IdCard,
} from "lucide-react";

const employee = {
  photo: "/Digital-Resolution-Logo.png.webp",
  name: "John Doe",
  number: "+880 1234-567890",
  email: "john@example.com",
  department: "HR",
  designation: "HR Manager",
  joiningDate: "2023-01-15",
  salary: "50,000",
  address: "Bandarban, Bangladesh",
  nid: "1234-5678-9012",
};

export default function DetailsTab() {
  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Profile Card */}
      <div className="bg-white border rounded-lg  p-8 flex gap-8 items-center">
        {/* Image */}
        <div className="w-32 h-32 relative">
          <Image
            src={employee.photo}
            alt={employee.name}
            fill
            className="object-cover rounded-lg border shadow"
          />
        </div>

        {/* Basic Info */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">{employee.name}</h1>
          <p className="text-blue-600 font-semibold">{employee.designation}</p>
          <p className="text-gray-500">{employee.department}</p>
        </div>
      </div>

      {/* Details Card */}
      <div className="bg-white border rounded-lg  p-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">
          Personal Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <Detail
            label="Phone"
            value={employee.number}
            icon={<Phone className="h-4 w-4 text-gray-600" />}
          />
          <Detail
            label="Email"
            value={employee.email}
            icon={<Mail className="h-4 w-4 text-gray-600" />}
          />
          <Detail
            label="Joining Date"
            value={employee.joiningDate}
            icon={<Calendar className="h-4 w-4 text-gray-600" />}
          />
          <Detail
            label="Salary"
            value={`${employee.salary} BDT`}
            icon={<DollarSign className="h-4 w-4 text-gray-600" />}
          />
          <Detail
            label="Address"
            value={employee.address}
            icon={<MapPin className="h-4 w-4 text-gray-600" />}
          />
          <Detail
            label="Department"
            value={employee.department}
            icon={<Briefcase className="h-4 w-4 text-gray-600" />}
          />
          <Detail
            label="NID"
            value={employee.nid}
            icon={<IdCard className="h-4 w-4 text-gray-600" />}
          />
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

function SummaryCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white border rounded-xl shadow p-6">
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
    </div>
  );
}
