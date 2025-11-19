"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, PlusCircle, LogOut } from "lucide-react";
import { NavMenu } from "./Navbar/nav-menu";

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-40  flex-col border-r">
      {/* Top navigation */}
      <nav className="flex-1 space-y-2 p-4">
        <NavMenu className="hidden md:block" />
      </nav>

      {/* Bottom action */}
      <div className="p-4 border-t border-gray-500">
        <Button
          variant="destructive"
          className="w-full justify-start gap-2 cursor-pointer"
          onClick={() => {
            console.log("Logout clicked");
          }}
        >
          <LogOut className="h-4 w-4 bg-amber-300" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
