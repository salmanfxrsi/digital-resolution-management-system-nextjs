"use client";

import React from "react";

type Month = "January 2025" | "February 2025";

interface MonthSelectorProps {
  selectedMonth: Month;
  setSelectedMonth: (month: Month) => void;
}

export default function MonthSelector({
  selectedMonth,
  setSelectedMonth,
}: MonthSelectorProps) {
  const months: Month[] = ["January 2025", "February 2025"];

  return (
    <div className="mb-4">
      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value as Month)}
        className="px-4 py-2 border rounded-lg shadow-sm"
      >
        {months.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
    </div>
  );
}
