/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
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
  const search = useSelector((state: any) => state.employees.search);

  const [openModal, setOpenModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { data, isLoading } = useGetEmployeesQuery(undefined);
  const [deleteEmployee, { isLoading: isDeleting }] =
    useDeleteEmployeeMutation();

  const employees: Employee[] = data?.data
    ? [...data.data].sort((a, b) => b._id.localeCompare(a._id))
    : [];

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirst, indexOfLast);

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
    <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
      {/* HEADER */}
      <div className="bg-white p-4 sm:p-5 rounded-lg shadow flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 border">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold">Employees</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Manage all employees of your organization
          </p>
        </div>
        <Briefcase className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 opacity-80" />
      </div>

      {/* EMPLOYEE SUMMARY SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Total Employees */}
        <div className="bg-linear-to-r from-blue-600 to-blue-500 text-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className="text-lg font-medium">Total Employees</p>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs">
              All Time
            </span>
          </div>
          <p className="text-3xl sm:text-4xl font-extrabold mt-3">
            {employees.length}
          </p>
          <div className="flex items-center gap-2 mt-2 text-sm text-blue-100">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            Updated automatically
          </div>
        </div>

        {/* Active Employees */}
        <div className="bg-linear-to-r from-green-600 to-green-500 text-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className="text-lg font-medium">Active Employees</p>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs">
              Active
            </span>
          </div>
          <p className="text-3xl sm:text-4xl font-extrabold mt-3">
            {employees.filter((e) => e.department !== "resigned").length}
          </p>
          <div className="flex items-center gap-2 mt-2 text-sm text-green-100">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            Currently in progress
          </div>
        </div>
      </div>

      {/* Search + Add */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-20 items-center">
        <div className="w-full">
          <input
            type="text"
            placeholder="Search by name or department..."
            className="w-full sm:w-[300px] p-2 border rounded shadow focus:outline-none focus:ring focus:ring-blue-300"
            value={search}
            onChange={(e) => {
              dispatch(setSearch(e.target.value));
              setCurrentPage(1);
            }}
          />
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="px-5 w-full sm:w-[200px] py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 mt-2 sm:mt-0"
        >
          Add Employee
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <SkeletonTable />
        ) : (
          <table className="min-w-full bg-white border rounded-lg shadow text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-100 text-left font-semibold text-gray-700">
                <th className="p-2 sm:p-3 border">Name</th>
                <th className="p-2 sm:p-3 border">Number</th>
                <th className="p-2 sm:p-3 border">Department</th>
                <th className="p-2 sm:p-3 border">Designation</th>
                <th className="p-2 sm:p-3 border text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((emp) => (
                <tr
                  key={emp._id}
                  className="border hover:bg-blue-50 transition"
                >
                  <td className="p-2 sm:p-3 border font-medium">{emp.name}</td>
                  <td className="p-2 sm:p-3 border">{emp.number}</td>
                  <td className="p-2 sm:p-3 border capitalize">
                    {emp.department}
                  </td>
                  <td className="p-2 sm:p-3 border">{emp.designation}</td>
                  <td className="p-2 sm:p-3 border text-center flex flex-col sm:flex-row justify-center gap-2">
                    <Link
                      href={`/admin/employee/${emp._id}`}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-center"
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
                  <td
                    className="p-4 text-center text-gray-500 italic"
                    colSpan={5}
                  >
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-2 sm:gap-0">
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

        <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
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
              className={`px-3 py-1 rounded border ${
                currentPage === i + 1
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

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this employee?
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
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

      {/* Add Employee Modal */}
      <AddEmployeeModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={() => {
          dispatch(setSearch(""));
          setCurrentPage(1);
          toast.success("Employee added successfully!");
        }}
      />
    </div>
  );
}
