"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import AddClientModal from "./components/AddClientModal";
import Link from "next/link";
import { Users } from "lucide-react";
import SkeletonTable from "@/components/shared/Skeleton/SkeletonTable";

interface Client {
  _id: string;
  logo?: string; // optional if not provided
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
  // Fetch clients from backend
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const res = await fetch(`${baseUrl}/clients`);
        const data = await res.json();

        if (data.success) {
          // If API returns single client in `data`, wrap it in array
          const clientsArray = Array.isArray(data.data)
            ? data.data
            : [data.data];
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

    fetchClients();
  }, []);

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      (client.location || "").toLowerCase().includes(search.toLowerCase())
  );

  const totalCompanies = clients.length;
  const ongoingCompanies = clients.filter((c) => c.status === "ongoing").length;

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

      {/* SUMMARY SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-blue-600 text-white p-5 rounded-xl shadow">
          <p className="text-lg font-medium">Total Companies Worked</p>
          <p className="text-3xl font-bold mt-1">{totalCompanies}</p>
        </div>
        <div className="bg-green-600 text-white p-5 rounded-xl shadow">
          <p className="text-lg font-medium">Ongoing Companies</p>
          <p className="text-3xl font-bold mt-1">{ongoingCompanies}</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        {loading ? (
          <SkeletonTable />
        ) : (
          <table className="min-w-full bg-white border rounded-lg shadow">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                <th className="p-3 border">Company Name</th>
                <th className="p-3 border">Location</th>
                <th className="p-3 border">Number</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Contracts</th>
                <th className="p-3 border">Designs</th>
                <th className="p-3 border">Videos</th>
                <th className="p-3 border">Contract Amount</th>
                <th className="p-3 border">Paid</th>
                <th className="p-3 border">Due</th>
                <th className="p-3 border text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr
                  key={client._id}
                  className="border text-sm hover:bg-blue-50 transition"
                >
                  <td className="p-3 border font-medium text-gray-800">
                    {client.name}
                  </td>
                  <td className="p-3 border text-gray-600">
                    {client.location || "-"}
                  </td>
                  <td className="p-3 border text-gray-600">
                    {client.number || "-"}
                  </td>
                  <td className="p-3 border capitalize">
                    {client.status === "ongoing" ? (
                      <span className="text-green-600 font-medium">
                        Ongoing
                      </span>
                    ) : (
                      <span className="text-blue-600 font-medium">
                        Completed
                      </span>
                    )}
                  </td>
                  <td className="p-3 border">{client.contractCount ?? 0}</td>
                  <td className="p-3 border">{client.designCount ?? 0}</td>
                  <td className="p-3 border">{client.videoCount ?? 0}</td>
                  <td className="p-3 border">{client.contractAmount ?? 0}</td>
                  <td className="p-3 border">{client.payAmount ?? 0}</td>
                  <td className="p-3 border">{client.dueAmount ?? 0}</td>
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
              {filteredClients.length === 0 && (
                <tr>
                  <td
                    className="p-4 text-center text-gray-500 italic bg-gray-50"
                    colSpan={12}
                  >
                    No companies found. Try adjusting your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* MODAL COMPONENT */}
      <AddClientModal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
}
