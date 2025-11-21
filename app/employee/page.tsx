"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Client {
  id: number;
  logo: string;
  name: string;
  location: string;
  number: string;
  status: "completed" | "ongoing";
}

export default function ClientPage() {
  const clients: Client[] = [
    {
      id: 1,
      logo: "/logo1.png",
      name: "ABC Corporation",
      location: "Dhaka, Bangladesh",
      number: "+880 1234-567890",
      status: "completed",
    },
    {
      id: 2,
      logo: "/logo2.png",
      name: "XYZ Pvt Ltd",
      location: "Chittagong, Bangladesh",
      number: "+880 1987-654321",
      status: "ongoing",
    },
    {
      id: 3,
      logo: "/logo3.png",
      name: "DEF Solutions",
      location: "Sylhet, Bangladesh",
      number: "+880 1777-888999",
      status: "completed",
    },
  ];

  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.location.toLowerCase().includes(search.toLowerCase())
  );

  const totalCompanies = clients.length;
  const ongoingCompanies = clients.filter((c) => c.status === "ongoing").length;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold">Client Page</h1>

      {/* ADD CLIENT CARD */}
      <div className="w-full bg-white border shadow p-5 rounded-xl flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Add New Client</h2>
          <p className="text-gray-600">Click the button to add a new client</p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Add Client
        </button>
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

      {/* SEARCH BAR */}
      <div>
        <input
          type="text"
          placeholder="Search by name or location..."
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Logo</th>
              <th className="p-3 border">Company Name</th>
              <th className="p-3 border">Location</th>
              <th className="p-3 border">Number</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredClients.map((client) => (
              <tr key={client.id} className="border">
                <td className="p-3 border">
                  <div className="w-12 h-12 relative">
                    <Image
                      src={client.logo}
                      alt={`${client.name} Logo`}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                </td>

                <td className="p-3 border">{client.name}</td>
                <td className="p-3 border">{client.location}</td>
                <td className="p-3 border">{client.number}</td>

                <td className="p-3 border capitalize">
                  {client.status === "ongoing" ? (
                    <span className="text-green-600 font-medium">Ongoing</span>
                  ) : (
                    <span className="text-blue-600 font-medium">Completed</span>
                  )}
                </td>

                <td className="p-3 border text-center">
                  <button className="px-4 py-1 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition">
                    Details
                  </button>
                </td>
              </tr>
            ))}

            {filteredClients.length === 0 && (
              <tr>
                <td className="p-4 text-center text-gray-500" colSpan={6}>
                  No companies found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL COMPONENT */}
      {/* <AddClientModal open={openModal} onClose={() => setOpenModal(false)} /> */}
    </div>
  );
}
