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
  LogIn,
} from "lucide-react";
import { Logo } from "./Navbar/logo";
import { useRouter } from "next/navigation";

export default function Sidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const router = useRouter();
  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <aside
      className={`sticky h-full flex flex-col bg-background transition-all duration-300 ${
        isOpen ? "w-48" : "w-20 "
      }`}
    >
      {/* Toggle Button */}
      <div className="flex items-center justify-center p-3 ">
        {isOpen ? (
          // <PanelRightClose className="h-5 w-5" />
          <></>
        ) : (
          <Image
            width={160}
            height={90}
            src="/favicon.ico"
            className="-mt-3.5 -mb-1.5 -ms-5"
            alt="Company Logo"
          />
        )}

        {isOpen && (
          <Link href="/overview" className="shrink-0">
            <Logo />
          </Link>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1  space-y-2 p-2  shadow-[2px_0_0px_rgba(0,0,0,0.04)]">
        <SidebarItem
          icon={<Home className="h-5 w-5" />}
          label="Overview"
          isOpen={isOpen}
          href="/overview"
        />
        <SidebarItem
          icon={<Building2 className="h-5 w-5" />}
          label="Department"
          isOpen={isOpen}
          href="/department"
        />
        <SidebarItem
          icon={<Users className="h-5 w-5" />}
          label="Client"
          isOpen={isOpen}
          href="/client"
        />
        <SidebarItem
          icon={<PlusCircle className="h-5 w-5" />}
          label="Models"
          isOpen={isOpen}
          href="/models"
        />
        <SidebarItem
          icon={<FileText className="h-5 w-5" />}
          label="Documentation"
          isOpen={isOpen}
          href="/docs"
        />
        <SidebarItem
          icon={<Users className="h-5 w-5" />}
          label="Employee"
          isOpen={isOpen}
          href="/employee"
        />
        <SidebarItem
          icon={<Settings className="h-5 w-5" />}
          label="Settings"
          isOpen={isOpen}
          href="/settings"
        />
      </nav>

      {/* Logout */}
      <div className="p-4  shadow-[2px_0px_0px_rgba(0,0,0,0.04)]">
        <Button
          className="w-full justify-start gap-2 bg-red-600"
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
}: {
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted transition"
    >
      {icon}
      {isOpen && <span>{label}</span>}
    </Link>
  );
}
