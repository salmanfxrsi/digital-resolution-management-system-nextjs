"use client";

import React, { useState, useEffect } from "react";
import {
  CalendarDays,
  DollarSign,
  CheckCircle,
  XCircle,
  Video,
  PenTool,
  Megaphone,
} from "lucide-react";
import { useParams } from "next/navigation";
import ClientSkeleton from "@/components/shared/Skeleton/ClientSkeleton";
import ClientWorkList from "../components/ClientWorkList";
import ClientOverview from "../components/ClientOverview";

interface ClientApiResponse {
  _id: string;
  name: string;
  location: string;
  number: string;
  gmail: string;
  projectDetails: string;
  status: "ongoing" | "completed";
  logo: string;
  contractCount: number;
  designCount: number;
  videoCount: number;
  contractAmount: number;
  payAmount: number;
  dueAmount: number;
  ads: {
    youtube: boolean;
    facebook: boolean;
    instagram: boolean;
    tiktok: boolean;
  };
  createdAt: string;
}

export default function ClientPage() {
  const [client, setClient] = useState<ClientApiResponse | null>(null);
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "history">(
    "overview"
  );

  const { id } = params;
  useEffect(() => {
    const fetchClient = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

        const res = await fetch(`${baseUrl}/clients/${id}`);

        const data = await res.json();
        if (data.success) {
          setClient(data.data);
        } else {
          console.error("Failed to fetch client:", data.message);
        }
      } catch (err) {
        console.error("Error fetching client:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, []);

  if (!client) {
    return (
      <div className="p-8">
        <p className="text-gray-500 animate-pulse">Loading client data...</p>
      </div>
    );
  }

  // Toggle ads active/inactive
  const toggleAd = (platform: keyof typeof client.ads) => {
    setClient((prev) =>
      prev
        ? {
            ...prev,
            ads: { ...prev.ads, [platform]: !prev.ads[platform] },
          }
        : prev
    );
  };

  return (
    <div>
      {loading ? (
        <ClientSkeleton />
      ) : (
        <div className="bg-white p-8 space-y-8">
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
          {activeTab === "overview" && (
            <ClientOverview client={client} setClient={setClient} />
          )}

          {activeTab === "history" && <ClientWorkList />}
        </div>
      )}
    </div>
  );
}
