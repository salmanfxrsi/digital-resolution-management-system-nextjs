"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AddEmployeeModal({ open, onClose }: Props) {
  const [form, setForm] = useState({
    id: "",
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

  // SUBMIT
  const handleSubmit = () => {
    if (
      !form.id ||
      !form.name ||
      !form.number ||
      !form.email ||
      !form.department ||
      !form.designation ||
      !form.address ||
      !form.nid ||
      !form.joiningDate ||
      !form.salary ||
      !form.photo
    ) {
      alert("All fields are required!");
      return;
    }

    console.log("EMPLOYEE DATA:", form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl p-6 rounded-xl shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4">Add New Employee</h2>

        {/* FORM */}
        <div className="grid grid-cols-2 gap-4">
          {/* ID */}
          <input
            type="text"
            placeholder="Employee ID"
            className="p-3 border rounded-lg"
            required
            value={form.id}
            onChange={(e) => setForm({ ...form, id: e.target.value })}
          />

          {/* NAME */}
          <input
            type="text"
            placeholder="Full Name"
            className="p-3 border rounded-lg"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          {/* PHONE */}
          <input
            type="text"
            placeholder="Phone Number"
            className="p-3 border rounded-lg"
            required
            value={form.number}
            onChange={(e) => setForm({ ...form, number: e.target.value })}
          />

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            className="p-3 border rounded-lg"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          {/* DEPARTMENT */}
          <input
            type="text"
            placeholder="Department"
            className="p-3 border rounded-lg"
            required
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
          />

          {/* DESIGNATION */}
          <input
            type="text"
            placeholder="Designation"
            className="p-3 border rounded-lg"
            required
            value={form.designation}
            onChange={(e) => setForm({ ...form, designation: e.target.value })}
          />

          {/* ADDRESS */}
          <input
            type="text"
            placeholder="Address"
            className="p-3 border rounded-lg"
            required
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />

          {/* NID */}
          <input
            type="text"
            placeholder="NID Number"
            className="p-3 border rounded-lg"
            required
            value={form.nid}
            onChange={(e) => setForm({ ...form, nid: e.target.value })}
          />

          {/* JOINING DATE */}
          <input
            type="date"
            className="p-3 border rounded-lg"
            required
            value={form.joiningDate}
            onChange={(e) => setForm({ ...form, joiningDate: e.target.value })}
          />

          {/* SALARY */}
          <input
            type="number"
            placeholder="Salary"
            className="p-3 border rounded-lg"
            required
            value={form.salary}
            onChange={(e) => setForm({ ...form, salary: e.target.value })}
          />

          {/* PHOTO UPLOAD */}
          <div className="col-span-2">
            <label className="font-medium">Upload Photo *</label>

            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => document.getElementById("photoInput")?.click()}
              className={`mt-2 p-5 border-2 border-dashed rounded-xl text-center cursor-pointer transition
                ${
                  isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
                }`}
            >
              {photoPreview ? (
                <div className="flex justify-center">
                  <Image
                    src={photoPreview}
                    width={90}
                    height={90}
                    alt="Employee Photo"
                    className="rounded-md border"
                  />
                </div>
              ) : (
                <p className="text-gray-500">
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
