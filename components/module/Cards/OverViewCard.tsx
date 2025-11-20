"use client";

import { Users, Briefcase, Building2, Clock } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const metrics = [
  {
    label: "Total Clients",
    value: 128,
    icon: Users,
    color: "text-blue-600 bg-blue-100",
  },
  {
    label: "Employees",
    value: 42,
    icon: Briefcase,
    color: "text-green-600 bg-green-100",
  },
  {
    label: "Departments",
    value: 6,
    icon: Building2,
    color: "text-purple-600 bg-purple-100",
  },
  {
    label: "Weekly Hours",
    value: "38.5 hrs",
    icon: Clock,
    color: "text-yellow-600 bg-yellow-100",
  },
];

const OverViewCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <Card key={metric.label} className="flex  justify-between p-3">
          <div className="flex justify-between items-center">
            <CardDescription className="text-md text-black font-semibold">
              {metric.label}
            </CardDescription>
            <CardTitle className="text-xl font-semibold">
              {metric.value}
            </CardTitle>
          </div>
          <div className={`rounded-full p-2 ${metric.color}`}>
            <metric.icon className="h-5 w-5" />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default OverViewCard;
