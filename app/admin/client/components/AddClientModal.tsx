/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Users } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AddClientModal({ open, onClose, onSuccess }: Props) {
  const [form, setForm] = useState({
    name: "",
    location: "",
    number: "",
    gmail: "",
    projectDetails: "",
    status: "",
    logo: null as File | null,
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  // FILE HANDLER
  const handleFile = (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Only image files allowed!");
      return;
    }
    setForm({ ...form, logo: file });
    setLogoPreview(URL.createObjectURL(file));
  };

  // DRAG EVENTS
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const onDragLeave = () => setIsDragging(false);
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0] || null;
    handleFile(file);
  };

  // SUBMIT
  const handleSubmit = async () => {
    if (
      !form.name ||
      !form.location ||
      !form.number ||
      !form.gmail ||
      !form.projectDetails ||
      !form.status ||
      !form.logo?.name
    ) {
      alert("All fields are required!");
      return;
    }

    try {
      setLoading(true);

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const payload = {
        name: form.name,
        location: form.location,
        number: form.number,
        gmail: form.gmail,
        projectDetails: form.projectDetails,
        status: form.status,
        logo: form.logo?.name || "",
        contractCount: 0,
        designCount: 0,
        videoCount: 0,
        ads: {
          youtube: false,
          facebook: false,
          instagram: false,
          tiktok: false,
        },
        contractAmount: 0,
        payAmount: 0,
        dueAmount: 0,
      };
      console.log(JSON.stringify(payload));

      const res = await fetch(`${baseUrl}/clients/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Client created successfully!");
        setForm({
          name: "",
          location: "",
          number: "",
          gmail: "",
          projectDetails: "",
          status: "",
          logo: null,
        });
        setLogoPreview(null);
        onSuccess?.();
        onClose();
      } else {
        alert(`Failed: ${data.message || "Something went wrong"}`);
      }
    } catch (err) {
      console.error("Error creating client:", err);
      alert("Error creating client");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-2">
      <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold flex justify-start items-center gap-6 mb-3 text-gray-800 border-b pb-2">
          <Users className="inline-block ml-2 text-blue-500" />
          Add New Client
        </h2>

        {/* LOGO UPLOAD */}
        <div className="col-span-2 mb-6">
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => document.getElementById("logoInput")?.click()}
            className={`mt-2 p-2 h-32 w-[180px] border-2 border-dashed rounded text-center cursor-pointer transition ${
              isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
          >
            {logoPreview ? (
              <div className="flex justify-center">
                <Image
                  src={logoPreview}
                  width={180}
                  height={180}
                  alt="Client Logo"
                  className="rounded border shadow"
                />
              </div>
            ) : (
              <p className="text-gray-500 mt-8 text-sm">
                Drag & drop logo here, or{" "}
                <span className="text-blue-600 font-medium">browse</span>
              </p>
            )}
          </div>
          <input
            id="logoInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0] || null)}
          />
        </div>

        {/* FORM FIELDS */}
        <div className="grid grid-cols-3 gap-6">
          {[
            { key: "name", placeholder: "Client Name", type: "text" },
            { key: "gmail", placeholder: "Gmail", type: "email" },
            { key: "number", placeholder: "Phone Number", type: "text" },
            { key: "location", placeholder: "Location", type: "text" },
          ].map((field) => (
            <input
              key={field.key}
              type={field.type}
              placeholder={field.placeholder}
              className="p-2 w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none transition text-sm"
              required
              value={(form as any)[field.key]}
              onChange={(e) =>
                setForm({ ...form, [field.key]: e.target.value })
              }
            />
          ))}

          {/* PROJECT DETAILS */}
          <textarea
            placeholder="Project Details"
            className="p-2 w-full border rounded bg-gray-100 border-gray-300 focus:border-blue-500 focus:outline-none transition text-sm col-span-2 h-24 resize-none"
            required
            value={form.projectDetails}
            onChange={(e) =>
              setForm({ ...form, projectDetails: e.target.value })
            }
          />
        </div>

        {/* STATUS DROPDOWN */}
        <select
          required
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="p-2 border-b w-50 mt-4 border-gray-300 focus:border-blue-500 focus:outline-none transition text-sm col-span-2"
        >
          <option value="">Select Status</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
