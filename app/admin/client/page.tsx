"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import AddClientModal from "./components/AddClientModal";
import { Users } from "lucide-react";
import SkeletonTable from "@/components/shared/Skeleton/SkeletonTable";

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
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // 🔹 Fetch Clients
  const fetchClients = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const res = await fetch(`${baseUrl}/clients`);
      const data = await res.json();

      if (data.success) {
        const clientsArray = Array.isArray(data.data) ? data.data : [data.data];
        setClients(clientsArray);
      } else {
        console.error("Failed to fetch clients:", data.message);
      }
    } catch (err) {
      console.error("Error fetching clients:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  //  Filter Search
  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      (client.location || "").toLowerCase().includes(search.toLowerCase())
  );

  //  Stats
  const totalCompanies = clients.length;
  const ongoingCompanies = clients.filter((c) => c.status === "ongoing").length;

  //  Pagination Logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentClients = filteredClients.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Reset pagination when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <div className="p-6 space-y-8">
      {/* HEADER */}
      <div className="bg-white p-5 rounded-lg shadow flex justify-between items-center border">
        <div>
          <h1 className="text-3xl font-bold">Clients</h1>
          <p className="text-gray-600 mt-1">
            Manage all client companies of your organization
          </p>
        </div>
        <Users className="w-16 h-16 text-blue-500 opacity-80" />
      </div>

      {/* SUMMARY SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Total Companies */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <p className="text-lg font-medium">Total Companies Worked</p>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs">
              All Time
            </span>
          </div>
          <p className="text-4xl font-extrabold mt-3">{totalCompanies}</p>
          <div className="flex items-center gap-2 mt-2 text-sm text-blue-100">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            Updated automatically
          </div>
        </div>

        {/* Ongoing Companies */}
        <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <p className="text-lg font-medium">Ongoing Companies</p>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs">
              Active
            </span>
          </div>
          <p className="text-4xl font-extrabold mt-3">{ongoingCompanies}</p>
          <div className="flex items-center gap-2 mt-2 text-sm text-green-100">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            Currently in progress
          </div>
        </div>
      </div>

      {/* SEARCH + ADD CLIENT */}
      <div className="flex justify-between gap-20 items-center">
        <div className="w-full">
          <input
            type="text"
            placeholder="Search by name or location..."
            className="w-full p-2 border rounded shadow focus:outline-none focus:ring focus:ring-blue-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="w-full flex justify-end">
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
        {loading ? (
          <SkeletonTable />
        ) : (
          <>
            <table className="min-w-full bg-white border rounded-lg shadow">
              <thead>
                <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                  <th className="p-3 border">Company Name</th>
                  <th className="p-3 border">Gmail</th>
                  <th className="p-3 border">Number</th>
                  <th className="p-3 border text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {currentClients.map((client) => (
                  <tr
                    key={client._id}
                    className="border text-sm hover:bg-blue-50 transition"
                  >
                    <td className="p-3 border font-medium text-gray-800">
                      {client.name}
                    </td>
                    <td className="p-3 border font-medium text-gray-800">
                      {client?.gmail}
                    </td>
                    <td className="p-3 border text-gray-600">
                      {client.number || "-"}
                    </td>
                    <td className="p-3 border text-center">
                      <Link
                        href={`/admin/client/${client._id}`}
                        className="px-4 py-1 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
                      >
                        Details
                      </Link>
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
            <div className="flex items-center justify-between mt-4">
              {/* Rows per page */}
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

              {/* Page Numbers */}
              <div className="flex items-center gap-2">
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

      {/* MODAL */}
      <AddClientModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={fetchClients}
      />
    </div>
  );
}
