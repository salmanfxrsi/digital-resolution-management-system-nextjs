/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { adminRoutes } from "@/app/admin/adminroute";
import { employeeRoutes } from "@/app/employee/employeeRoute";
import { signOut, useSession } from "next-auth/react";

export default function BottomBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const userType =
    (session as any)?.user?.user?.userType ??
    (session as any)?.user?.userType ??
    (session as any)?.user?.role ??
    (session as any)?.userType;

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  const routes = userType === "admin" ? adminRoutes : employeeRoutes;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-between bg-background border-t p-2 shadow-md md:hidden">
      {/* Navigation Items */}
      <div className="flex flex-1 justify-around">
        {routes.map((route) => (
          <BottomBarItem
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href}
            active={pathname === route.href}
          />
        ))}
      </div>
    </nav>
  );
}

// 🔹 Bottom Bar Item Component
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
      title={label}
      href={href}
      className={`flex flex-col items-center justify-center text-sm transition ${
        active ? "text-red-600" : "text-muted-foreground hover:text-red-600"
      }`}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </Link>
  );
}
