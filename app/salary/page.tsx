"use client";

import { useState } from "react";
import SalaryCards from "./components/SalaryCards";
import SalaryTable from "./components/SalaryTable";
import MonthSelector from "./components/MonthSelector";

type Employee = {
  id: number;
  name: string;
  salary: number;
  status: "given" | "not-given";
};

type Month = "January 2025" | "February 2025";

type SalaryData = Record<Month, Employee[]>;

export default function SalaryPage() {
  const monthlySalaryData: SalaryData = {
    "January 2025": [
      { id: 1, name: "Salman", salary: 30000, status: "given" },
      { id: 2, name: "Nahid", salary: 25000, status: "not-given" },
    ],
    "February 2025": [
      { id: 1, name: "Salman", salary: 30000, status: "not-given" },
      { id: 2, name: "Nahid", salary: 25000, status: "not-given" },
    ],
  };

  const [selectedMonth, setSelectedMonth] = useState<Month>("January 2025");

  const employees = monthlySalaryData[selectedMonth];

  const totalSalary = employees.reduce((acc, e) => acc + e.salary, 0);
  const givenSalary = employees
    .filter((e) => e.status === "given")
    .reduce((acc, e) => acc + e.salary, 0);
  const leftSalary = totalSalary - givenSalary;

  return (
    <div className="p-6 space-y-4">
      <MonthSelector
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />

      <SalaryCards
        totalSalary={totalSalary}
        givenSalary={givenSalary}
        leftSalary={leftSalary}
      />

      <SalaryTable employees={employees} />
    </div>
  );
}
