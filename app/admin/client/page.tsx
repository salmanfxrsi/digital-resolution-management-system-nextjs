/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import AddClientModal from "./components/AddClientModal";
import { Users } from "lucide-react";
import SkeletonTable from "@/components/shared/Skeleton/SkeletonTable";
import { useDispatch, useSelector } from "react-redux";
import {
  useDeleteClientMutation,
  useGetClientsQuery,
} from "@/app/redux/features/clients/clientsApi";
import toast from "react-hot-toast";
import { setSearch } from "@/app/redux/features/clients/clientsSlice";

interface Client {
  [x: string]: React.ReactNode;
  _id: string;
  logo?: string;
  name: string;
  location?: string;
  number?: string;
  status: "completed" | "ongoing";
  contractCount?: number;
  designCount?: number;
  videoCount?: number;
  contractAmount?: number;
  payAmount?: number;
  dueAmount?: number;
}

export default function ClientPage() {
  const dispatch = useDispatch();
  const search = useSelector((state: any) => state.clients.search);
  const [openModal, setOpenModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { data, isLoading } = useGetClientsQuery(undefined);
  const [deleteClient, { isLoading: isDeleting }] = useDeleteClientMutation();

  const clients: Client[] = data?.data
    ? [...data.data].sort((a, b) => b._id.localeCompare(a._id))
    : [];

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      (client.location || "").toLowerCase().includes(search.toLowerCase())
  );

  const totalCompanies = clients.length;
  const ongoingCompanies = clients.filter((c) => c.status === "ongoing").length;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentClients = filteredClients.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteClient(deleteId).unwrap();
      toast.success("Client deleted successfully!");
      setDeleteId(null);
      setCurrentPage(1);
    } catch {
      toast.error("Failed to delete client.");
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
      {/* HEADER */}
      <div className="bg-white p-4 sm:p-5 rounded-lg shadow flex flex-col sm:flex-row justify-between items-center border gap-4 sm:gap-0">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold">Clients</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Manage all client companies of your organization
          </p>
        </div>
        <Users className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500 opacity-80" />
      </div>

      {/* SUMMARY SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Total Companies */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className="text-lg font-medium">Total Companies Worked</p>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs">
              All Time
            </span>
          </div>
          <p className="text-3xl sm:text-4xl font-extrabold mt-3">{totalCompanies}</p>
          <div className="flex items-center gap-2 mt-2 text-sm text-blue-100">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            Updated automatically
          </div>
        </div>

        {/* Ongoing Companies */}
        <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className="text-lg font-medium">Ongoing Companies</p>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs">
              Active
            </span>
          </div>
          <p className="text-3xl sm:text-4xl font-extrabold mt-3">{ongoingCompanies}</p>
          <div className="flex items-center gap-2 mt-2 text-sm text-green-100">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            Currently in progress
          </div>
        </div>
      </div>

      {/* SEARCH + ADD CLIENT */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-20 items-center">
        <div className="w-full">
          <input
            type="text"
            placeholder="Search by name or location..."
            className="w-full p-2 border rounded shadow focus:outline-none focus:ring focus:ring-blue-300"
            value={search}
            onChange={(e) => {
              dispatch(setSearch(e.target.value));
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="w-full flex justify-start sm:justify-end">
          <button
            onClick={() => setOpenModal(true)}
            className="px-5 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
          >
            Add Client
          </button>
        </div>
      </div>

      {/* TABLE + PAGINATION */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <SkeletonTable />
        ) : (
          <>
            <table className="min-w-full bg-white border rounded-lg shadow text-sm sm:text-base">
              <thead>
                <tr className="bg-gray-100 text-left font-semibold text-gray-700">
                  <th className="p-2 sm:p-3 border">Company Name</th>
                  <th className="p-2 sm:p-3 border">Gmail</th>
                  <th className="p-2 sm:p-3 border">Number</th>
                  <th className="p-2 sm:p-3 border text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {currentClients.map((client) => (
                  <tr
                    key={client._id}
                    className="border hover:bg-blue-50 transition"
                  >
                    <td className="p-2 sm:p-3 border font-medium text-gray-800">
                      {client.name}
                    </td>
                    <td className="p-2 sm:p-3 border font-medium text-gray-800">
                      {client?.gmail}
                    </td>
                    <td className="p-2 sm:p-3 border text-gray-600">
                      {client.number || "-"}
                    </td>
                    <td className="p-2 sm:p-3 border text-center flex flex-col sm:flex-row justify-center gap-2">
                      <Link
                        href={`/admin/client/${client._id}`}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-center"
                      >
                        Details
                      </Link>

                      <button
                        onClick={() => setDeleteId(client._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {currentClients.length === 0 && (
                  <tr>
                    <td
                      className="p-4 text-center text-gray-500 italic bg-gray-50"
                      colSpan={12}
                    >
                      No companies found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* PAGINATION CONTROLS */}
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
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="px-3 py-1 border rounded hover:bg-gray-100"
                  disabled={currentPage === 1}
                >
                  Prev
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
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
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="px-3 py-1 border rounded hover:bg-gray-100"
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* DELETE MODAL */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this client?
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

      {/* ADD CLIENT MODAL */}
      <AddClientModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={() => {
          dispatch(setSearch(""));
          setCurrentPage(1);
          toast.success("Client added successfully!");
        }}
      />
    </div>
  );
}
