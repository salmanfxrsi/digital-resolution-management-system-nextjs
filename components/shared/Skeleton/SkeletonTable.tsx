"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton"; // shadcn skeleton

export default function SkeletonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-lg shadow-sm">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Number</th>
            <th className="p-3 border">Department</th>
            <th className="p-3 border">Designation</th>
            <th className="p-3 border text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, idx) => (
            <tr
              key={idx}
              className={`border text-sm ${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <td className="p-3 border">
                <Skeleton className="h-4 w-32" />
              </td>
              <td className="p-3 border">
                <Skeleton className="h-4 w-24" />
              </td>
              <td className="p-3 border">
                <Skeleton className="h-4 w-28" />
              </td>
              <td className="p-3 border">
                <Skeleton className="h-4 w-28" />
              </td>
              <td className="p-3 border text-center">
                <Skeleton className="h-8 w-20 mx-auto" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
