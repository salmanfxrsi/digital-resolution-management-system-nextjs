"use client";

import React from "react";
import SalaryCard from "./SalaryCard";

interface SalaryCardsProps {
  totalSalary: number;
  givenSalary: number;
  leftSalary: number;
}

export default function SalaryCards({
  totalSalary,
  givenSalary,
  leftSalary,
}: SalaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <SalaryCard title="Total Salary" amount={totalSalary} />
      <SalaryCard title="Given Salary" amount={givenSalary} />
      <SalaryCard title="Left Salary" amount={leftSalary} />
    </div>
  );
}
