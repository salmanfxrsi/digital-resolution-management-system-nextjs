import { FileText, Home, Settings, Users } from "lucide-react";

export const employeeRoutes = [
  {
    icon: <Home className="h-5 w-5" />,
    label: "Overview",
    href: "/employee/overview",
  },
  {
    icon: <Users className="h-5 w-5" />,
    label: "Profile",
    href: "/employee/profile",
  },
  {
    icon: <FileText className="h-5 w-5" />,
    label: "Task",
    href: "/employee/task",
  },
  {
    icon: <Settings className="h-5 w-5" />,
    label: "Settings",
    href: "/setting",
  },
];
