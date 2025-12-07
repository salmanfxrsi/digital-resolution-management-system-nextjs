"use client";

import React from "react";
import Link from "next/link";
import {
  Megaphone,
  Code,
  PenTool,
  Video,
  Users,
  FolderKanban,
  Building2,
  ShieldCheck,
  Briefcase, // new icon for Admin Service
} from "lucide-react";
import { useGetEmployeesQuery } from "@/app/redux/features/Employees/employeesApi";
import { useGetClientsQuery } from "@/app/redux/features/clients/clientsApi";

export default function DepartmentPage() {
  const { data: employeesData, isLoading } = useGetEmployeesQuery(undefined);
  const { data: clientsData } = useGetClientsQuery(undefined);
  const departments = [
    {
      id: "marketer",
      name: "Marketing Team",
      icon: <Megaphone className="w-12 h-12 text-blue-600" />,
      description: "Promotion, ads & lead generation.",
    },
    {
      id: "web_developer",
      name: "Web Developers",
      icon: <Code className="w-12 h-12 text-green-600" />,
      description: "Website & web app development.",
    },
    {
      id: "graphic_designer",
      name: "Graphic Designers",
      icon: <PenTool className="w-12 h-12 text-purple-600" />,
      description: "Brand visuals & creative design.",
    },
    {
      id: "video_editor",
      name: "Video Editors",
      icon: <Video className="w-12 h-12 text-red-600" />,
      description: "Video editing & motion graphics.",
    },
    {
      id: "admin_service",
      name: "Admin Service",
      icon: <ShieldCheck className="w-12 h-12 text-indigo-600" />,
      description: "Administration, HR & organizational support.",
    },
  ];
  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">
        {" "}
        Loading departments...
      </div>
    );
  }
  return (
    <div className="p-6 space-y-10 min-h-screen">
      <div className="bg-white p-5 rounded-lg shadow flex justify-between items-center border">
        <div>
          <h1 className="text-3xl font-bold">Departments</h1>
          <p className="text-gray-600 mt-1">
            Manage all teams of your organization
          </p>
        </div>

        <Building2 className="w-16 h-16 text-purple-500 opacity-80" />
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center gap-4">
            <Building2 className="w-10 h-10 text-purple-600" />
            <div>
              <p className="text-gray-500 text-sm">Total Departments</p>
              <p className="text-2xl font-bold">{departments.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center gap-4">
            <FolderKanban className="w-10 h-10 text-green-700" />
            <div>
              <p className="text-gray-500 text-sm">Active Projects</p>
              <p className="text-2xl font-bold">9</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center gap-4">
            <Users className="w-10 h-10 text-blue-500" />
            <div>
              <p className="text-gray-500 text-sm">Total Clients</p>
              <p className="text-2xl font-bold">
                {clientsData?.data.length || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center gap-4">
            <Briefcase className="w-10 h-10 text-green-600" />
            <div>
              <p className="text-gray-500 text-sm">Total Employees</p>
              <p className="text-2xl font-bold">
                {employeesData?.data.length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* DEPARTMENT CARDS */}
      <div>
        <h2 className="text-xl font-semibold mb-4">All Departments</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {departments.map((dept) => (
            <Link
              key={dept.id}
              href={`/admin/department/${dept.id}`}
              className="block"
            >
              <div className="bg-white p-7 rounded-lg shadow hover:shadow-lg border hover:scale-105 transition transform cursor-pointer text-center">
                <div className="flex justify-center mb-4">{dept.icon}</div>

                <p className="text-lg font-semibold">{dept.name}</p>
                <p className="text-gray-500 text-sm mt-1">{dept.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
