import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { CalendarRange, ChevronDown } from "lucide-react";

export default function DataQueryPage() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
      color: "#2563eb",
    },
  ]);
  const specialDates = ["2025-10-10", "2025-10-27", "2025-11-21"];

  return (
    <div>
      <div className="relative">
        <button
          onClick={() => setShowDatePicker(!showDatePicker)}
          className="px-4 py-2 border flex justify-between items-center shadow font-semibold rounded text-sm text-gray-700 hover:text-red-600"
        >
          <CalendarRange className="inline h-4 w-4 mr-2" />
          {format(dateRange[0].startDate, "MMM dd, yyyy")} –{" "}
          {format(dateRange[0].endDate, "MMM dd, yyyy")}
          <ChevronDown className="inline h-4 w-4 ml-2" />
        </button>

        {showDatePicker && (
          <div className="absolute right-0 z-10 mt-2 bg-white shadow-2xl p-4 rounded-md w-[820px] ">
            <div className="flex">
              {/* Preset Ranges */}
              <div className="mb-4 space-y-2 w-[120px] text-sm text-gray-700 border-r">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Recently used
                </div>
                <div className="flex flex-col gap-1">
                  {[
                    "Today",
                    "Yesterday",
                    "Last 7 days",
                    "Last 14 days",
                    "Last 30 days",
                    "This week",
                    "Last week",
                    "This month",
                    "Last month",
                  ].map((label) => (
                    <button
                      key={label}
                      className="w-full text-left text-[16px] font-medium px-3 py-1 rounded hover:bg-red-50 hover:text-red-600 transition"
                      onClick={() => {
                        const now = new Date();
                        let start = new Date();
                        let end = new Date();

                        switch (label) {
                          case "Today":
                            break;
                          case "Yesterday":
                            start.setDate(start.getDate() - 1);
                            end.setDate(end.getDate() - 1);
                            break;
                          case "Last 7 days":
                            start.setDate(start.getDate() - 6);
                            break;
                          case "Last 14 days":
                            start.setDate(start.getDate() - 13);
                            break;
                          case "Last 30 days":
                            start.setDate(start.getDate() - 29);
                            break;
                          case "This week":
                            start.setDate(start.getDate() - start.getDay());
                            break;
                          case "Last week":
                            start.setDate(start.getDate() - start.getDay() - 7);
                            end.setDate(start.getDate() + 6);
                            break;
                          case "This month":
                            start = new Date(
                              now.getFullYear(),
                              now.getMonth(),
                              1
                            );
                            break;
                          case "Last month":
                            start = new Date(
                              now.getFullYear(),
                              now.getMonth() - 1,
                              1
                            );
                            end = new Date(
                              now.getFullYear(),
                              now.getMonth(),
                              0
                            );
                            break;
                        }

                        setDateRange([
                          {
                            startDate: start,
                            endDate: end,
                            key: "selection",
                            color: "#2563eb",
                          },
                        ]);
                        setShowDatePicker(false);
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calendar Section */}
              <div className="w-[580px] px-4">
                <DateRange
                  editableDateInputs={false}
                  onChange={(item) =>
                    setDateRange([
                      {
                        ...dateRange[0],
                        startDate:
                          item.selection.startDate ?? dateRange[0].startDate,
                        endDate: item.selection.endDate ?? dateRange[0].endDate,
                        key: "selection",
                        color: "#2563eb",
                      },
                    ])
                  }
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                  rangeColors={["#2563eb"]}
                  months={2}
                  direction="horizontal"
                  dayContentRenderer={(date) => {
                    const iso = date.toISOString().split("T")[0];
                    const isSpecial = specialDates.includes(iso);
                    return (
                      <div className="relative">
                        <span>{date.getDate()}</span>
                        {isSpecial && (
                          <div className="absolute inset-0 border border-blue-500 rounded-full"></div>
                        )}
                      </div>
                    );
                  }}
                />

                {/* Compare Dropdown */}
                <div className="-mt-2 ms-2 text-sm ">
                  <label className="block mb-1 font-semibold">Compare</label>
                  <div className="flex gap-3">
                    <select className=" border rounded px-2 py-1">
                      <option>Select an item</option>
                      <option>Previous period</option>
                      <option>Same period last year</option>
                    </select>
                    <div className="px-4 py-2 border flex justify-between items-center shadow font-semibold rounded text-sm text-gray-700 ">
                      {format(dateRange[0].startDate, "MMM dd, yyyy")}
                    </div>
                    <div className="px-4 py-2 border flex justify-between items-center shadow font-semibold rounded text-sm text-gray-700 ">
                      {format(dateRange[0].endDate, "MMM dd, yyyy")}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 ms-2 flex justify-start gap-2">
                  <button
                    onClick={() => setShowDatePicker(false)}
                    className="px-4 py-1 border rounded bg-red-100 font-semibold uppercase hover:text-red-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowDatePicker(false)}
                    className="px-4 py-1 bg-blue-100 text-blue-600 font-semibold uppercase rounded hover:bg-blue-200"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
