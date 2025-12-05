"use client";

import React, { useState } from "react";
import Link from "next/link";
import AddEmployeeModal from "./components/AddEmployeeModal";
import { Briefcase } from "lucide-react";
import SkeletonTable from "@/components/shared/Skeleton/SkeletonTable";

import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "@/app/redux/features/Employees/employeesSlice";

import {
  useGetEmployeesQuery,
  useDeleteEmployeeMutation,
} from "@/app/redux/features/Employees/employeesApi";

import toast from "react-hot-toast";

interface Employee {
  _id: string;
  companyID: string;
  photo: string;
  name: string;
  number: string;
  email: string;
  department: string;
  designation: string;
  joiningDate: string;
  salary: string | number;
}

export default function EmployeePage() {
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const search = useSelector((state: any) => state.employees.search);

  const [openModal, setOpenModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // RTK Query hooks
  const { data, isLoading } = useGetEmployeesQuery(undefined);
  const [deleteEmployee, { isLoading: isDeleting }] = useDeleteEmployeeMutation();

  // Sort DESC (newest first)
  const employees: Employee[] = data?.data
    ? [...data.data].sort((a, b) => b._id.localeCompare(a._id))
    : [];

  // Filter
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination Calculation
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirst, indexOfLast);

  // Handle Delete
  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteEmployee(deleteId).unwrap();
      toast.success("Employee deleted successfully!");
      setDeleteId(null);
      setCurrentPage(1);
    } catch {
      toast.error("Failed to delete employee.");
    }
  };

  return (
    <div className="p-6 space-y-8">

      {/* HEADER */}
      <div className="bg-white p-5 rounded-lg shadow flex justify-between items-center border">
        <div>
          <h1 className="text-3xl font-bold">Employees</h1>
          <p className="text-gray-600 mt-1">Manage all employees of your organization</p>
        </div>
        <Briefcase className="w-16 h-16 text-blue-500 opacity-80" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg">
          <p className="text-lg font-medium">Total Employees</p>
          <p className="text-4xl font-extrabold mt-3">{employees.length}</p>
        </div>

        <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg">
          <p className="text-lg font-medium">Active Employees</p>
          <p className="text-4xl font-extrabold mt-3">
            {employees.filter((e) => e.department !== "resigned").length}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="flex justify-between gap-20 items-center">
        <div className="w-full">
          <input
            type="text"
            placeholder="Search by name or department..."
            className="w-[300px] p-2 border rounded shadow"
            value={search}
            onChange={(e) => {
              dispatch(setSearch(e.target.value));
              setCurrentPage(1);
            }}
          />
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="px-5 w-[200px] py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
        >
          Add Employee
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <SkeletonTable />
        ) : (
          <table className="min-w-full bg-white border rounded-lg shadow">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Number</th>
                <th className="p-3 border">Department</th>
                <th className="p-3 border">Designation</th>
                <th className="p-3 border text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {currentEmployees.map((emp) => (
                <tr key={emp._id} className="border text-sm hover:bg-blue-50">
                  <td className="p-3 border font-medium">{emp.name}</td>
                  <td className="p-3 border">{emp.number}</td>
                  <td className="p-3 border capitalize">{emp.department}</td>
                  <td className="p-3 border">{emp.designation}</td>

                  <td className="p-3 border text-center flex justify-center gap-2">
                    <Link
                      href={`/admin/employee/${emp._id}`}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Details
                    </Link>

                    <button
                      onClick={() => setDeleteId(emp._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {currentEmployees.length === 0 && (
                <tr>
                  <td className="p-4 text-center text-gray-500 italic" colSpan={5}>
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2 text-sm">
          <span>Rows per page:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border p-1 rounded"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-40"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded border ${currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
                }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[350px] text-center">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this employee?</p>

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

      {/* Modal */}
      <AddEmployeeModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={() => {
          dispatch(setSearch("")); // <-- CLEAR SEARCH BAR
          setCurrentPage(1);       // reset pagination
          toast.success("Employee added successfully!");
        }}
      />


    </div>
  );
}
