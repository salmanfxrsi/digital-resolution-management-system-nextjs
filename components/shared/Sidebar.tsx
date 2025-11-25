"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Logo } from "./Navbar/logo";
import { useRouter, usePathname } from "next/navigation";
import { adminRoutes } from "@/app/admin/adminroute";
import { signOut, useSession } from "next-auth/react";
import { employeeRoutes } from "@/app/employee/employeeRoute";

export default function Sidebar({
  isOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const userType = session?.user?.user?.userType;

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  const routes = userType === "admin" ? adminRoutes : employeeRoutes;

  return (
    <aside
      className={`sticky h-full flex flex-col bg-background transition-all duration-300 ${
        isOpen ? "w-48" : "w-16"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center p-3">
        {isOpen ? (
          <Link
            href={`${userType === "admin" ? "/admin" : "/employee"}/overview`}
            className="shrink-0"
          >
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
        {routes.map((route) => (
          <SidebarItem
            key={route.href}
            icon={route.icon}
            label={route.label}
            isOpen={isOpen}
            href={route.href}
            active={pathname === route.href}
          />
        ))}
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
