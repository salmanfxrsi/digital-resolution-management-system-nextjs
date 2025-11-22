"use client";

import React from "react";

interface SalaryCardProps {
  title: string;
  amount: number;
}

export default function SalaryCard({ title, amount }: SalaryCardProps) {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 border">
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-semibold mt-2">${amount}</p>
    </div>
  );
}
