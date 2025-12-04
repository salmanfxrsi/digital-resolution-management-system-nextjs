import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { CalendarRange, ChevronDown } from "lucide-react";

interface DataQueryPageProps {
  onDayChange?: (value: number) => void;
  onRangeChange?: (range: { from: string; to: string }) => void;
}

export default function DataQueryPage({
  onDayChange,
  onRangeChange,
}: DataQueryPageProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
      color: "#2563eb",
    },
  ]);

  const formatISO = (date: Date) => date.toISOString().split("T")[0];

  // 🔥 ONE correct preset handler (reused)
  const handlePreset = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - (days - 1));

    // Update UI button date
    setDateRange([
      {
        startDate: start,
        endDate: end,
        key: "selection",
        color: "#2563eb",
      },
    ]);

    // Send to parent
    onDayChange?.(days);

    setShowDatePicker(false);
  };

  return (
    <div>
      <div className="relative">
        {/* BUTTON showing selected range */}
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
          <div className="absolute right-0 z-10 mt-2 bg-white shadow-2xl p-4 rounded-md w-[820px]">
            <div className="flex">

              {/* LEFT PRESET PANEL */}
              <div className="mb-4 space-y-2 w-[120px] text-sm text-gray-700 border-r">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Recently used
                </div>

                <div className="flex flex-col gap-1">
                  {[7, 14, 30].map((days) => (
                    <button
                      key={days}
                      className="w-full text-left text-[16px] font-medium px-3 py-1 rounded hover:bg-red-50 hover:text-red-600 transition"
                      onClick={() => handlePreset(days)}
                    >
                      Last {days} days
                    </button>
                  ))}
                </div>
              </div>

              {/* CALENDAR */}
              <div className="w-[580px] px-4">
                <DateRange
                  editableDateInputs={false}
                  onChange={(item) =>
                    setDateRange([
                      {
                        ...dateRange[0],
                        startDate: item.selection.startDate ?? dateRange[0].startDate,
                        endDate: item.selection.endDate ?? dateRange[0].endDate,
                        key: "selection",
                      },
                    ])
                  }
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                  rangeColors={["#2563eb"]}
                  months={2}
                  direction="horizontal"
                />

                {/* Action Buttons */}
                <div className="mt-4 ms-2 flex justify-start gap-2">
                  <button
                    onClick={() => setShowDatePicker(false)}
                    className="px-4 py-1 border rounded bg-red-100 font-semibold uppercase hover:text-red-600"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => {
                      onRangeChange?.({
                        from: formatISO(dateRange[0].startDate),
                        to: formatISO(dateRange[0].endDate),
                      });
                      setShowDatePicker(false);
                    }}
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
