"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Home,
  PlusCircle,
  LogOut,
  Building2,
  Users,
  FileText,
  Settings,
} from "lucide-react";
import { Logo } from "./Navbar/logo";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <aside
      className={`sticky h-full flex flex-col bg-background transition-all duration-300 ${
        isOpen ? "w-48" : "w-16"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center p-3">
        {isOpen ? (
          <Link href="/overview" className="shrink-0">
            <Logo />
          </Link>
        ) : (
          <Image
            width={160}
            height={90}
            src="/favicon.ico"
            className="-mt-1.5 -mb-1.5 "
            alt="Company Logo"
          />
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-2 shadow-[2px_0_0px_rgba(0,0,0,0.04)]">
        <SidebarItem
          icon={<Home className="h-5 w-5" />}
          label="Overview"
          isOpen={isOpen}
          href="/overview"
          active={pathname === "/overview"}
        />
        <SidebarItem
          icon={<Building2 className="h-5 w-5" />}
          label="Department"
          isOpen={isOpen}
          href="/department"
          active={pathname === "/department"}
        />
        <SidebarItem
          icon={<Users className="h-5 w-5" />}
          label="Client"
          isOpen={isOpen}
          href="/client"
          active={pathname === "/client"}
        />
        <SidebarItem
          icon={<PlusCircle className="h-5 w-5" />}
          label="Models"
          isOpen={isOpen}
          href="/models"
          active={pathname === "/models"}
        />
        <SidebarItem
          icon={<FileText className="h-5 w-5" />}
          label="Documentation"
          isOpen={isOpen}
          href="/docs"
          active={pathname === "/docs"}
        />
        <SidebarItem
          icon={<Users className="h-5 w-5" />}
          label="Employee"
          isOpen={isOpen}
          href="/employee"
          active={pathname === "/employee"}
        />
        <SidebarItem
          icon={<Settings className="h-5 w-5" />}
          label="Settings"
          isOpen={isOpen}
          href="/settings"
          active={pathname === "/settings"}
        />
      </nav>

      {/* Logout */}
      <div className="p-4 shadow-[2px_0px_0px_rgba(0,0,0,0.04)]">
        <Button
          className="w-full justify-start gap-2 bg-red-100 text-red-600 hover:bg-red-100 hover:text-black"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          {isOpen && "Logout"}
        </Button>
      </div>
    </aside>
  );
}

// 🔹 Sidebar Item Component
function SidebarItem({
  icon,
  label,
  isOpen,
  href,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
  href: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition border-l-4 ${
        active
          ? "bg-red-100 text-red-600 border-red-600"
          : "hover:bg-muted text-muted-foreground border-transparent"
      }`}
    >
      {icon}
      {isOpen && <span>{label}</span>}
    </Link>
  );
}
