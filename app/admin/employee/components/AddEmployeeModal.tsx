/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AddEmployeeModal({ open, onClose }: Props) {
  const [form, setForm] = useState({
    companyID: "",
    name: "",
    number: "",
    email: "",
    department: "",
    designation: "",
    address: "",
    nid: "",
    joiningDate: "",
    salary: "",
    photo: null as File | null,
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  if (!open) return null;

  // FILE HANDLER
  const handleFile = (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Only image files allowed!");
      return;
    }
    setForm({ ...form, photo: file });
    setPhotoPreview(URL.createObjectURL(file));
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

  const handleSubmit = async () => {
    if (
      !form.companyID ||
      !form.name ||
      !form.number ||
      !form.email ||
      !form.department ||
      !form.designation ||
      !form.address ||
      !form.nid ||
      !form.joiningDate ||
      !form.salary ||
      !form.photo?.name
    ) {
      alert("All fields are required!");
      return;
    }

    // Build plain JSON object
    const payload = {
      companyID: form.companyID,
      name: form.name,
      number: form.number,
      email: form.email,
      department: form.department,
      designation: form.designation,
      address: form.address,
      nid: form.nid,
      joiningDate: form.joiningDate,
      salary: form.salary,
      photo: form.photo?.name,
    };
    console.log(JSON.stringify(payload));

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      console.log(baseUrl);

      const res = await fetch(`${baseUrl}/employees/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
      }

      alert("Employee added successfully!");
      onClose();
    } catch (err) {
      console.error("Error submitting employee:", err);
      alert("Failed to add employee");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-2 ">
      <div className="bg-white w-full max-w-2xl p-3 rounded-lg shadow overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-3 text-gray-800 border-b pb-2">
          Add New Employee
        </h2>

        {/* PHOTO UPLOAD */}
        <div className="col-span-2 mb-6">
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => document.getElementById("photoInput")?.click()}
            className={`mt-2 p-2 h-30 w-[170px] border-2 border-dashed rounded text-center cursor-pointer transition ${
              isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
          >
            {photoPreview ? (
              <div className="flex justify-center">
                <Image
                  src={photoPreview}
                  width={100}
                  height={100}
                  alt="Employee Photo"
                  className="rounded border shadow"
                />
              </div>
            ) : (
              <p className="text-gray-500 mt-8 text-sm">
                Drag & drop photo here, or{" "}
                <span className="text-blue-600 font-medium">browse</span>
              </p>
            )}
          </div>
          <input
            id="photoInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0] || null)}
          />
        </div>

        {/* FORM FIELDS */}
        <div className="grid grid-cols-3 gap-6">
          {[
            { key: "companyID", placeholder: "Employee ID", type: "text" },
            { key: "name", placeholder: "Full Name", type: "text" },
            { key: "number", placeholder: "Phone Number", type: "text" },
            { key: "email", placeholder: "Email", type: "email" },
            { key: "designation", placeholder: "Designation", type: "text" },
            { key: "address", placeholder: "Address", type: "text" },
            { key: "nid", placeholder: "NID Number", type: "text" },
            { key: "joiningDate", placeholder: "Joining Date", type: "date" },
            { key: "salary", placeholder: "Salary", type: "number" },
          ].map((field) => (
            <input
              key={field.key}
              type={field.type}
              placeholder={field.placeholder}
              className="p-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition text-sm"
              required
              value={(form as any)[field.key]}
              onChange={(e) =>
                setForm({ ...form, [field.key]: e.target.value })
              }
            />
          ))}

          {/* DEPARTMENT DROPDOWN */}
          <select
            required
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
            className="p-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition text-sm col-span-3"
          >
            <option value="">Select Department</option>
            <option value="marketer">Marketor</option>
            <option value="web_developer">Web Developers</option>
            <option value="graphic_designer">Graphic Designers</option>
            <option value="video_editor">Video Editors</option>
            <option value="admin">Admin Service</option>
          </select>
        </div>

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
            className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
