"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AddClientModal({ open, onClose }: Props) {
  const [form, setForm] = useState({
    name: "",
    location: "",
    number: "",
    status: "ongoing",
    logo: null as File | null,
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  if (!open) return null;

  // HANDLE FILE
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

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0] || null;
    handleFile(file);
  };

  //  SUBMIT
  const handleSubmit = () => {
    if (!form.name || !form.location || !form.number || !form.logo) {
      alert("All fields are required!");
      return;
    }

    console.log("FORM SUBMITTED:", form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add New Client</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Client Name"
            className="w-full p-3 border rounded-lg"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="text"
            placeholder="Location"
            className="w-full p-3 border rounded-lg"
            required
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="w-full p-3 border rounded-lg"
            required
            value={form.number}
            onChange={(e) => setForm({ ...form, number: e.target.value })}
          />

          <select
            className="w-full p-3 border rounded-lg"
            required
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>

          {/* DRAG & DROP LOGO */}
          <div>
            <label className="font-medium">Upload Logo *</label>

            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => document.getElementById("logoInput")?.click()}
              className={`
                mt-2 p-5 border-2 border-dashed rounded-xl text-center cursor-pointer
                transition
                ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}
              `}
            >
              {logoPreview ? (
                <div className="flex justify-center">
                  <Image
                    src={logoPreview}
                    width={90}
                    height={90}
                    alt="Logo Preview"
                    className="rounded-md border"
                  />
                </div>
              ) : (
                <p className="text-gray-500">
                  Drag & drop logo here, or{" "}
                  <span className="text-blue-600 font-medium">browse</span>
                </p>
              )}
            </div>

            {/* Hidden input */}
            <input
              id="logoInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0] || null)}
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
