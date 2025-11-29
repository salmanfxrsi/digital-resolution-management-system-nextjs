"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function OverviewSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
      {/* Attendance Summary Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-row items-center p-3 rounded-lg border bg-white"
          >
            <Skeleton className="h-10 w-10 rounded-full mr-3" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
        ))}
      </div>

      {/* Metrics Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col p-5 rounded-lg border bg-white space-y-3"
          >
            <div className="flex justify-between items-center w-full">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-5 w-20" />
            </div>
            <Skeleton className="h-3 w-40 mx-auto" />
            <Skeleton className="h-6 w-6 rounded-full mx-auto" />
          </div>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-white border rounded-lg shadow p-4 space-y-3"
          >
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-48 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
