/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import {
  Search,
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

// 🔥 Import RTK Query API
import { useGetEmployeeByIdQuery } from "@/app/redux/features/Employees/employeesApi";

const notifications = [
  { id: 1, date: "01-11-24 Today", message: "This is your first notification message!", unread: true },
  { id: 2, date: "01-11-24 Today", message: "This is your first notification message!", unread: true },
  { id: 3, date: "01-11-24 Today", message: "This is your first notification message!", unread: true },
  { id: 4, date: "01-11-24 Today", message: "This is your first notification message!", unread: true },
];

const Navbar = ({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
}) => {
  const [searchOpen, setSearchOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  // Get employeeId from session
  const employeeId = (session as any)?.user?.user?.employeeId;
  const userType = (session as any)?.user?.user?.userType;

  // 🔥 Fetch employee data from Redux API
  const { data: empData, isLoading } = useGetEmployeeByIdQuery(employeeId, {
    skip: !employeeId,
  });

  const employee = empData?.data;

  console.log(employee)

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <nav className="inset-x-0 top-0 h-16 bg-background z-30 shadow-[0px_0_4px_rgba(0,0,0,0.1)]">
      <div className="flex h-full items-center justify-between px-6 md:px-8">

        {/* Sidebar Toggle */}
        <button
          type="button"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-muted-foreground rounded-full p-1 hover:text-foreground transition"
        >
          {isSidebarOpen ? <PanelRightClose className="h-5 w-5" /> : <PanelRightOpen className="h-5 w-5" />}
        </button>

        {/* LEFT: Search + Admin Stats */}
        <div className="hidden md:flex items-center gap-6">

          {/* Admin Box */}
          {userType === "admin" && (
            <div className="bg-green-50 border border-green-200 rounded px-4 py-1 shadow flex gap-2">
              <p className="text-xs text-gray-500">Active Users</p>
              <p className="text-sm font-semibold text-green-700">245</p>
            </div>
          )}

          {/* Search Bar */}
          <div
            className={`flex items-center border rounded-full px-3 py-1 transition-all duration-300 
              ${searchOpen ? "w-64 bg-muted" : "w-10 bg-transparent"}`}
          >
            <Search
              className="h-4 w-4 text-muted-foreground cursor-pointer"
              onClick={() => setSearchOpen(!searchOpen)}
            />

            {searchOpen && (
              <input
                type="text"
                placeholder="Search..."
                className="ml-2 bg-transparent outline-none text-sm w-full placeholder:text-muted-foreground"
              />
            )}
          </div>

          {/* Admin Box */}
          {userType === "admin" && (
            <div className="bg-blue-50 border border-blue-200 rounded px-4 py-1 shadow flex gap-2">
              <p className="text-xs text-gray-500">Revenue</p>
              <p className="text-sm font-semibold text-blue-700">$12,340</p>
            </div>
          )}
        </div>

        {/* RIGHT: Notifications + Profile */}
        <div className="flex items-center gap-4 md:gap-6">

          {/* Notifications */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="rounded-full p-1 text-muted-foreground hover:text-foreground transition"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                {notifications.length}
              </span>
            </button>

            {/* Notification Dropdown */}
            <Transition
              show={showNotifications}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg ring-1 ring-black/5 z-50">
                <div className="flex justify-between px-4 py-3 border-b">
                  <h3 className="text-sm font-semibold">Notification</h3>
                  <Link href="/notifications" className="text-xs text-blue-600 hover:underline">
                    View all
                  </Link>
                </div>

                <ul className="max-h-64 overflow-y-auto divide-y">
                  {notifications.map((note) => (
                    <li key={note.id} className="px-4 py-3 text-sm flex justify-between">
                      <div>
                        <p className="font-medium">{note.date}</p>
                        <p className="text-gray-600">{note.message}</p>
                      </div>

                      {note.unread && <span className="mt-1 w-2 h-2 bg-red-500 rounded-full" />}
                    </li>
                  ))}
                </ul>
              </div>
            </Transition>
          </div>

          {/* Profile Dropdown */}
          <Menu as="div" className="relative">
            <MenuButton className="flex items-center gap-2 rounded-full">


              {isLoading ? (
                <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
              ) : (
                <img
                  src={employee?.photo || "/avater.webp"}
                  alt="User"
                  className="h-8 w-8 rounded-full object-cover"
                />
              )}

              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </MenuButton>

            <MenuItems className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black/5 py-2 z-50">

              <MenuItem>
                <p className="px-4 py-2 text-sm font-semibold text-gray-700">
                  {employee?.name || "ADMIN"}
                </p>
              </MenuItem>

              <MenuItem>
                <Link
                  href="/settings"
                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                >
                  <Settings className="h-4 w-4" /> Settings
                </Link>
              </MenuItem>

              <MenuItem>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm w-full hover:bg-gray-100"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </MenuItem>

            </MenuItems>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
