"use client";

import React from "react";

export default function ClientSkeleton() {
  return (
    <div className="p-8 space-y-8 animate-pulse">
      {/* Header */}
      <div className="h-6 w-1/3 bg-gray-200 rounded"></div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="h-24 bg-gray-200 rounded"></div>
        <div className="h-24 bg-gray-200 rounded"></div>
        <div className="h-24 bg-gray-200 rounded"></div>
      </div>

      {/* Project Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-32 bg-gray-200 rounded"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>

      {/* Ads Section */}
      <div className="grid grid-cols-4 gap-4">
        <div className="h-16 bg-gray-200 rounded"></div>
        <div className="h-16 bg-gray-200 rounded"></div>
        <div className="h-16 bg-gray-200 rounded"></div>
        <div className="h-16 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}
