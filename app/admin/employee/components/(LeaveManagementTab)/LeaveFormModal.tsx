"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useCreateLeaveMutation } from "@/app/redux/features/leave/leaveApi";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function LeaveFormModal({ open, setOpen, employeeId }: any) {
  const [createLeave] = useCreateLeaveMutation();

  const [dateRange, setDateRange] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection", color: "#2563eb" },
  ]);

  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => {
    setDateRange([
      { startDate: new Date(), endDate: new Date(), key: "selection", color: "#2563eb" },
    ]);
    setReason("");
    setSubmitting(false);
  };

  const disablePastDates = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleSubmit = async () => {
    const start = dateRange[0].startDate;
    const end = dateRange[0].endDate;

    if (!reason.trim()) {
      toast.error("Please enter a valid leave reason.");
      return;
    }

    try {
      setSubmitting(true);

      const payload = { employeeId, fromDate: start, toDate: end, reason };
      const res = await createLeave(payload).unwrap();

      if (res.success) {
        toast.success("Leave added successfully!");
        setOpen(false);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add leave");
    }

    setSubmitting(false);
  };

  const calendarStyle = `
    .rdrDateDisplayWrapper { display: none !important; }
    .rdrMonth { width: 255px !important; }
    .rdrCalendarWrapper { width: 530px !important; }
  `;

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (value) resetForm();
      }}
    >
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add Leave</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="border p-3 rounded-md overflow-hidden">
            <style>{calendarStyle}</style>

            <div className="flex justify-center">
              <div className="scale-[1] origin-top">
                <DateRange
                  editableDateInputs={false}
                  onChange={(item) =>
                    setDateRange([
                      {
                        ...dateRange[0],
                        startDate: item.selection.startDate ?? dateRange[0].startDate,
                        endDate: item.selection.endDate ?? dateRange[0].endDate,
                        key: "selection",
                        color: "#2563eb",
                      },
                    ])
                  }
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                  months={2}
                  direction="horizontal"
                  minDate={new Date()}
                  disabledDay={disablePastDates}
                  rangeColors={["#2563eb"]}
                />
              </div>
            </div>
          </div>

          <Textarea
            placeholder="Reason for leave"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />

          <Button className="w-full" onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Leave"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
