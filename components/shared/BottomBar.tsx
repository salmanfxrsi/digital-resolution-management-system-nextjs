/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  Plus,
  X,
  User,
  Building2,
  Briefcase,
  FileText,
  Home,
} from "lucide-react";
import { adminRoutes } from "@/app/admin/adminroute";
import { employeeRoutes } from "@/app/employee/employeeRoute";

export default function BottomBar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [showActions, setShowActions] = useState(false);

  const userType =
    (session as any)?.user?.user?.userType ??
    (session as any)?.user?.userType ??
    (session as any)?.user?.role ??
    (session as any)?.userType;

  const routes = userType === "admin" ? adminRoutes : employeeRoutes;

  return (
    <>
      {/* Semi-circle Action Icons */}
      <div className="fixed bottom-1 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm">
        {userType === "admin" ? (
          <div className="relative h-48 w-full flex justify-center items-center">
            {/* Client - left arc */}
            <Link
              href="/admin/client"
              className={`absolute bottom-0 left-1/2 transform ${
                showActions
                  ? "-translate-x-[105px] -translate-y-[60px] opacity-100 scale-100 pointer-events-auto"
                  : "translate-x-0 translate-y-0 opacity-0 scale-90 pointer-events-none"
              } transition-all duration-700 ease-in-out w-16 flex flex-col items-center justify-center bg-blue-100 text-blue-600 p-2 rounded-tl-full rounded-b-full shadow`}
            >
              <User className="h-5 w-5" />
            </Link>

            {/* Department - top arc */}
            <Link
              href="/admin/department"
              className={`absolute bottom-0 left-1/2 transform ${
                showActions
                  ? "-translate-x-1/2 -translate-y-[100px] opacity-100 scale-100 pointer-events-auto"
                  : "-translate-x-1/2 translate-y-0 opacity-0 scale-90 pointer-events-none"
              } transition-all duration-700 ease-in-out w-20 flex flex-col items-center justify-center bg-green-100 text-green-600 p-2 rounded-t-full shadow`}
            >
              <Building2 className="h-5 w-5" />
            </Link>

            {/* Employee - right arc */}
            <Link
              href="/admin/employee"
              className={`absolute bottom-0 left-1/2 transform ${
                showActions
                  ? "translate-x-10 -translate-y-[60px] opacity-100 scale-100 pointer-events-auto"
                  : "translate-x-0 translate-y-0 opacity-0 scale-90 pointer-events-none"
              } transition-all duration-700 ease-in-out w-16 flex flex-col items-center justify-center bg-orange-100 text-orange-600 p-2 rounded-b-full rounded-tr-full shadow`}
            >
              <Briefcase className="h-5 w-5" />
            </Link>
          </div>
        ) : (
          <div className="relative h-48 w-full flex justify-center items-center">
            {/* Client - left arc */}
            <Link
              href="/employee/profile"
              className={`absolute bottom-0 left-1/2 transform ${
                showActions
                  ? "-translate-x-[105px] -translate-y-[60px] opacity-100 scale-100 pointer-events-auto"
                  : "translate-x-0 translate-y-0 opacity-0 scale-90 pointer-events-none"
              } transition-all duration-700 ease-in-out w-16 flex flex-col items-center justify-center bg-blue-100 text-blue-600 p-2 rounded-tl-full rounded-b-full shadow`}
            >
              <User className="h-5 w-5" />
            </Link>

            {/* Department - top arc */}
            <Link
              href="/employee/task"
              className={`absolute bottom-0 left-1/2 transform ${
                showActions
                  ? "-translate-x-1/2 -translate-y-[100px] opacity-100 scale-100 pointer-events-auto"
                  : "-translate-x-1/2 translate-y-0 opacity-0 scale-90 pointer-events-none"
              } transition-all duration-700 ease-in-out w-20 flex flex-col items-center justify-center bg-green-100 text-green-600 p-2 rounded-t-full shadow`}
            >
              <FileText className="h-5 w-5" />
            </Link>

            {/* Employee - right arc */}
            <Link
              href="/employee/overview"
              className={`absolute bottom-0 left-1/2 transform ${
                showActions
                  ? "translate-x-10 -translate-y-[60px] opacity-100 scale-100 pointer-events-auto"
                  : "translate-x-0 translate-y-0 opacity-0 scale-90 pointer-events-none"
              } transition-all duration-700 ease-in-out w-16 flex flex-col items-center justify-center bg-orange-100 text-orange-600 p-2 rounded-b-full rounded-tr-full shadow`}
            >
              <Home className="h-5 w-5" />
            </Link>
          </div>
        )}
      </div>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-md md:hidden">
        <div className="flex justify-between items-center px-2 py-1">
          {/* Left Items */}
          <div className="flex gap-6 flex-1 justify-evenly">
            {routes.slice(0, 1).map((route) => (
              <BottomBarItem
                key={route.href}
                icon={route.icon}
                label={route.label}
                href={route.href}
                active={pathname === route.href}
              />
            ))}
          </div>

          {/* Center Toggle Button */}
          <button
            onClick={() => setShowActions((prev) => !prev)}
            className="bg-red-500 text-white rounded-full p-3 shadow-lg -translate-y-4 hover:bg-red-600 transition"
          >
            {showActions ? (
              <X className="h-6 w-6" />
            ) : (
              <Plus className="h-6 w-6" />
            )}
          </button>

          {/* Right Items */}
          {userType === "admin" ? (
            <div className="flex gap-6 flex-1 justify-evenly">
              {routes.slice(4).map((route) => (
                <BottomBarItem
                  key={route.href}
                  icon={route.icon}
                  label={route.label}
                  href={route.href}
                  active={pathname === route.href}
                />
              ))}
            </div>
          ) : (
            <div className="flex gap-6 flex-1 justify-evenly">
              {employeeRoutes.slice(3).map((route) => (
                <BottomBarItem
                  key={route.href}
                  icon={route.icon}
                  label={route.label}
                  href={route.href}
                  active={pathname === route.href}
                />
              ))}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

function BottomBarItem({
  icon,
  label,
  href,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center text-xs transition ${
        active ? "text-red-600" : "text-gray-500 hover:text-red-600"
      }`}
    >
      {icon}
      <span className="mt-1">{label}</span>
    </Link>
  );
}
