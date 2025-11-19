"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Home,
  PlusCircle,
  LogOut,
  PanelRightClose,
  PanelRightOpen,
  Building2,
  Users,
  FileText,
  Settings,
} from "lucide-react";
import { Logo } from "./Navbar/logo";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`sticky h-full flex flex-col border-r bg-background transition-all duration-300 ${
        isOpen ? "w-60" : "w-20"
      }`}
    >
      {/* Toggle Button */}
      <div className="flex items-center justify-between p-4 border-b">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="text-muted-foreground"
        >
          {isOpen ? (
            <PanelRightClose className="h-5 w-5" />
          ) : (
            <div className="flex flex-col justify-center items-center gap-1">
              <Image
                width={160}
                height={90}
                src="/favicon.ico"
                alt="Company Logo"
              />
              <PanelRightOpen className="h-5 w-5" />
            </div>
          )}
        </Button>
        {isOpen && (
          <Link href="/" className="shrink-0">
            <Logo />
          </Link>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4 overflow-y-auto">
        <SidebarItem
          icon={<Home className="h-5 w-5" />}
          label="Playground"
          isOpen={isOpen}
          href="/playground"
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
          icon={<Settings className="h-5 w-5" />}
          label="Settings"
          isOpen={isOpen}
          href="/settings"
        />
      </nav>

      {/* Logout */}
      <div className="p-4 border-t">
        <Button
          variant="destructive"
          className="w-full justify-start gap-2"
          onClick={() => console.log("Logout clicked")}
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
