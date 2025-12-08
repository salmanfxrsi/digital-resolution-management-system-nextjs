"use client";

import React from "react";

export default function AdminOverView() {
  return (
    <div className="space-y-6">
      {/* Metrics Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex justify-between p-3 rounded-md shadow animate-pulse bg-gray-100 h-20"
          >
            <div className="flex flex-col justify-between w-full">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-6 bg-gray-300 rounded w-1/2 mt-2"></div>
            </div>
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          </div>
        ))}
      </div>

      {/* Graph Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-80 bg-gray-100 rounded-lg animate-pulse"></div>

        {/* Departments + Employees Skeleton */}
        <div className="flex flex-col gap-6">
          {/* Departments */}
          <div className="p-4 sm:p-6 shadow rounded-lg bg-gray-100 animate-pulse h-64"></div>

          {/* Employees */}
          <div className="p-4 sm:p-6 shadow rounded-lg bg-gray-100 animate-pulse h-64"></div>
        </div>
      </div>
    </div>
  );
}
