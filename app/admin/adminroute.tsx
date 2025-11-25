// src/routes/adminRoutes.ts
import {
  Home,
  Building2,
  Users,
  DollarSign,
  FileText,
  Settings,
} from "lucide-react";
import React from "react";

export const adminRoutes = [
  {
    icon: <Home className="h-5 w-5" />,
    label: "Overview",
    href: "/admin/overview",
  },
  {
    icon: <Building2 className="h-5 w-5" />,
    label: "Department",
    href: "/department",
  },
  {
    icon: <Users className="h-5 w-5" />,
    label: "Client",
    href: "/client",
  },
  {
    icon: <DollarSign className="h-5 w-5" />,
    label: "Salary",
    href: "/salary",
  },
  {
    icon: <Users className="h-5 w-5" />,
    label: "Employee",
    href: "/employee",
  },
  {
    icon: <FileText className="h-5 w-5" />,
    label: "Documentation",
    href: "/about",
  },
  {
    icon: <Settings className="h-5 w-5" />,
    label: "Settings",
    href: "/settings",
  },
];
