"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import ClientSkeleton from "@/components/shared/Skeleton/ClientSkeleton";
import ClientWorkList from "../components/ClientWorkList";
import ClientOverview from "../components/ClientOverview";
import { useGetClientByIdQuery } from "@/app/redux/features/clients/clientsApi";
import Image from "next/image";

// Import lucide-react icons
import { MapPin, Mail, Phone } from "lucide-react";

export default function ClientPage() {
  const params = useParams();
  const { id } = params;

  const [activeTab, setActiveTab] = useState<"overview" | "history">(
    "overview"
  );

  // RTK Query hook
  const { data, error, isLoading } = useGetClientByIdQuery(id);

  const client = data?.data; // assuming API returns { success, data }

  if (isLoading) return <ClientSkeleton />;
  if (error) return <p className="text-red-500">Failed to load client</p>;
  if (!client) return <p className="text-gray-500">No client found</p>;

  return (
    <div className="bg-white px-8 space-y-8">
      {/* Client Profile Card */}
      <div className="flex items-center gap-6 bg-white border rounded-lg p-6 transition hover:shadow">
        <div className="w-24 h-24 rounded-full overflow-hidden border">
          {client.photo ? (
            <Image
              src={client.photo}
              alt={client.name}
              width={96}
              height={96}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
              No Image
            </div>
          )}
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-gray-800">{client.name}</h2>
          <p className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-blue-600" /> {client.location}
          </p>
          <p className="flex items-center gap-2 text-sm text-gray-600">
            <Mail className="h-4 w-4 text-green-600" /> {client.gmail}
          </p>
          <p className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="h-4 w-4 text-indigo-600" /> {client.number}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b mb-6">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 font-medium ${
            activeTab === "overview"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-blue-500"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-2 font-medium ${
            activeTab === "history"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-blue-500"
          }`}
        >
          History
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && <ClientOverview client={client} />}
      {activeTab === "history" && <ClientWorkList />}
    </div>
  );
}
