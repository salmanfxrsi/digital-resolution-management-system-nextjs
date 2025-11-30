// src/routes/adminRoutes.ts
import {
  Home,
  Building2,
  Users,
  DollarSign,
  FileText,
  Settings,
  Briefcase,
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
    href: "/admin/department",
  },
  {
    icon: <Users className="h-5 w-5" />,
    label: "Client",
    href: "/admin/client",
  },
  {
    icon: <Briefcase className="h-5 w-5" />,
    label: "Employee",
    href: "/admin/employee",
  },
  {
    icon: <DollarSign className="h-5 w-5" />,
    label: "Salary",
    href: "/admin/salary",
  },
  {
    icon: <FileText className="h-5 w-5" />,
    label: "Documentation",
    href: "/admin/about",
  },
  {
    icon: <Settings className="h-5 w-5" />,
    label: "Settings",
    href: "/setting",
  },
];
