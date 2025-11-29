/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
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
import { useSession } from "next-auth/react";

interface Employee {
  _id: string;
  photo?: string;
  name: string;
  number: string;
  email: string;
  department: string;
  designation: string;
  joiningDate: string;
  salary: string;
  address: string;
}

export default function Page() {
  const { data: session } = useSession();
  const id = (session as any)?.user?.user?.employeeId;

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!id) return;
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL ||
          "https://digital-resolution-server.vercel.app/api/v1";

        const res = await fetch(`${baseUrl}/employees/${id}`);
        const data = await res.json();

        if (data.success) {
          setEmployee(data.data);
        }
      } catch (err) {
        console.error("Error fetching employee:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-32 w-32 bg-gray-200 rounded-full mx-auto"></div>
          <div className="h-6 w-1/2 bg-gray-200 rounded mx-auto"></div>
          <div className="h-4 w-1/3 bg-gray-200 rounded mx-auto"></div>
          <div className="grid grid-cols-2 gap-4 mt-6">
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
      <div className="p-8 text-center text-gray-500">
        No employee data found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white border rounded-xl shadow-lg space-y-10">
      {/* Header Section */}
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="relative w-32 h-32">
          {/* <Image
            src={employee.photo || "/default-avatar.png"}
            alt={employee.name}
            fill
            className="rounded-full object-cover border-4 border-blue-200 shadow-md"
          /> */}
          <User className="h-32 w-32 text-gray-300" />
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
          value={employee.joiningDate}
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

      {/* Footer Card */}
      <div className="p-5 bg-blue-50 rounded-xl border border-blue-200 flex items-center gap-4 shadow-sm">
        <User className="h-6 w-6 text-blue-600" />
        <p className="text-gray-700 text-sm">
          This employee profile contains personal and job-related information.
          Keep data updated for HR accuracy.
        </p>
      </div>
    </div>
  );
}

/* Reusable Detail Card */
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
        <p className="font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
