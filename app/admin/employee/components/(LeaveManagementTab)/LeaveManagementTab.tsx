"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "react-toastify";
import {
  useGetLeaveByEmployeeQuery,
  useDeleteLeaveMutation,
} from "@/app/redux/features/leave/leaveApi";
import LeaveFormModal from "./LeaveFormModal";
import LeaveUpdateModal from "./LeaveUpdateModal";
import { format } from "date-fns";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function LeaveManagementTab({ employee }: any) {
  const { data, isLoading } = useGetLeaveByEmployeeQuery(employee._id);
  const leaves = data?.data || [];

  const [deleteLeave] = useDeleteLeaveMutation();
  const [openModal, setOpenModal] = useState(false);
  const [editLeave, setEditLeave] = useState(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = async () => {
    try {
      setIsDeleting(true);
      const res = await deleteLeave(deleteId!).unwrap();
      if (res.success) toast.success("Leave deleted");
    } catch {
      toast.error("Failed to delete");
    }
    setIsDeleting(false);
    setDeleteId(null);
  };

  const formatDate = (date: string) => format(new Date(date), "dd/MM/yyyy");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{employee.name} — Leave History</h2>
        <Button onClick={() => setOpenModal(true)}>Add Leave</Button>
      </div>

      <div className="border rounded-lg shadow-sm p-4 bg-white">
        {isLoading ? (
          <p>Loading…</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {leaves.length > 0 ? (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                leaves.map((leave: any) => (
                  <TableRow key={leave._id}>
                    <TableCell>{formatDate(leave.fromDate)}</TableCell>
                    <TableCell>{formatDate(leave.toDate)}</TableCell>
                    <TableCell>{leave.reason}</TableCell>

                    <TableCell className="text-right space-x-2">
                      <Button size="sm" onClick={() => setEditLeave(leave)}>
                        Edit
                      </Button>

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setDeleteId(leave._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-500">
                    No leaves found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <LeaveFormModal open={openModal} setOpen={setOpenModal} employeeId={employee._id} />

      {editLeave && (
        <LeaveUpdateModal
          open={!!editLeave}
          setOpen={() => setEditLeave(null)}
          leave={editLeave}
        />
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[350px] text-center">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this leave?</p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
