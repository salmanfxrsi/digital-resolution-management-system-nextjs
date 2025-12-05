/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { uploadToImgBB } from "@/utils/uploadImage";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddEmployeeModal({ open, onClose, onSuccess }: Props) {
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
  
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // 🔥 NEW: Saving state

  if (!open) return null;


  const resizeImage = (file: File, maxWidth: number, maxHeight: number): Promise<File> => {
    return new Promise((resolve) => {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = maxWidth;
        canvas.height = maxHeight;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, maxWidth, maxHeight);

        canvas.toBlob((blob) => {
          if (blob) {
            resolve(new File([blob], file.name, { type: "image/jpeg" }));
          }
        }, "image/jpeg", 0.8); // 80% quality
      };
    });
  };


  // FILE HANDLER
  const handleFile = async (file: File | null) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files allowed!");
      return;
    }

    // Resize to 300x300
    const resized = await resizeImage(file, 300, 300);

    setForm({ ...form, photo: resized });
    setPhotoPreview(URL.createObjectURL(resized));
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

  // SUBMIT FUNCTION
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
      !form.photo
    ) {
      alert("All fields are required!");
      return;
    }

    setIsSaving(true); // 🔥 Start loading

    try {
      // 1️⃣ Upload to ImgBB
      const imageUrl = await uploadToImgBB(form.photo);

      // 2️⃣ Build payload
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
        photo: imageUrl,
      };

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

      const res = await fetch(`${baseUrl}/employees/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(await res.text());

      alert("Employee added successfully!");

      setIsSaving(false);

      onSuccess?.();
      onClose();
    } catch (err) {
      console.error("Error submitting:", err);
      alert("Failed to add employee");

      setIsSaving(false); // Stop loading
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-2 ">
      <div className="bg-white w-full max-w-2xl p-3 rounded-lg shadow overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-3 text-gray-800 border-b pb-2">
          Add New Employee
        </h2>

        {/* PHOTO UPLOAD */}
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`mt-2 h-[100px] w-[100px] mb-2 border-2 border-dashed rounded-lg text-center cursor-pointer overflow-hidden flex items-center justify-center transition ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
        >
          {photoPreview ? (
            <Image
              src={photoPreview}
              width={100}
              height={100}
              alt="Preview"
              className="object-cover w-full h-full"
            />
          ) : (
            <p className="text-gray-500 text-sm">
              Drag & drop<br />
              or <span className="text-blue-600 font-medium">browse</span>
            </p>
          )}
        </div>

        <input
          ref={fileInputRef}
          id="photoInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0] || null)}
        />


        {/* FORM FIELDS */}
        <div className="grid grid-cols-3 gap-6">
          {[
            { key: "companyID", placeholder: "Employee ID", type: "text" },
            { key: "name", placeholder: "Full Name", type: "text" },
            { key: "number", placeholder: "Phone Number", type: "" },
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
              disabled={isSaving}
              value={(form as any)[field.key]}
              onChange={(e) =>
                setForm({ ...form, [field.key]: e.target.value })
              }
            />
          ))}

          {/* DEPARTMENT DROPDOWN */}
          <select
            required
            disabled={isSaving}
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
            className="p-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition text-sm col-span-3"
          >
            <option value="">Select Department</option>
            <option value="marketer">Marketer</option>
            <option value="web_developer">Web Developers</option>
            <option value="graphic_designer">Graphic Designers</option>
            <option value="video_editor">Video Editors</option>
            <option value="admin">Admin Service</option>
          </select>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={isSaving ? undefined : onClose}
            disabled={isSaving}
            className={`px-5 py-2 border rounded-lg ${isSaving
              ? "text-gray-400 border-gray-300 cursor-not-allowed"
              : "text-gray-600 hover:bg-gray-100"
              } transition`}
          >
            Cancel
          </button>

          <button
            onClick={isSaving ? undefined : handleSubmit}
            disabled={isSaving}
            className={`px-5 py-2 rounded-lg shadow transition ${isSaving
              ? "bg-blue-300 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
