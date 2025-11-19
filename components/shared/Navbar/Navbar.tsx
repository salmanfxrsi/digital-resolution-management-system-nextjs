"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { Search, Bell, ChevronDown, LogOut, Settings } from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="inset-x-0 top-0 h-16 bg-background z-30 shadow-sm border-b">
      <div className="flex h-full items-center justify-between px-6 md:px-8">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex items-center gap-2 transition-all duration-300">
          <div
            className={`flex items-center border rounded-full px-3 py-1 transition-all duration-300 ${
              searchOpen ? "w-64 bg-muted" : "w-10 bg-transparent"
            }`}
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
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Notification Bell */}
          <button
            type="button"
            className="relative rounded-full p-1 text-muted-foreground hover:text-foreground transition"
          >
            <span className="sr-only">View notifications</span>
            <Bell className="h-5 w-5" />
          </button>

          {/* Profile Dropdown */}
          <Menu as="div" className="relative">
            <MenuButton className="flex items-center gap-2 rounded-full focus:outline-none">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User"
                className="h-8 w-8 rounded-full object-cover"
              />
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </MenuButton>
            <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
              <MenuItem>
                <div className="px-4 py-2 text-sm text-gray-700">
                  Talimul Islam
                </div>
              </MenuItem>
              <MenuItem>
                <Link
                  href="/settings"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </MenuItem>
              <MenuItem>
                <button
                  onClick={() => console.log("Logout")}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
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
