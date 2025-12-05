/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { uploadToImgBB } from "@/utils/uploadImage";
import { useCreateEmployeeMutation } from "@/app/redux/features/Employees/employeesApi";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void; // refresh + toast from parent
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

  // RTK Query mutation
  const [createEmployee, { isLoading }] = useCreateEmployeeMutation();

  if (!open) return null;

  // 🔵 Resize image before upload
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
        }, "image/jpeg", 0.8);
      };
    });
  };

  // 🔵 File handler
  const handleFile = async (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed!");
      return;
    }

    const resized = await resizeImage(file, 300, 300);
    setForm({ ...form, photo: resized });
    setPhotoPreview(URL.createObjectURL(resized));
  };

  // Drag events
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const onDragLeave = () => setIsDragging(false);
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files?.[0] || null);
  };

  // 🔵 SUBMIT handler (RTK + ImgBB)
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
      toast.error("All fields are required!");
      return;
    }

    try {
      toast.loading("Uploading image...");
      const imageUrl = await uploadToImgBB(form.photo);
      toast.dismiss();

      const payload = {
        ...form,
        photo: imageUrl,
      };

      await createEmployee(payload).unwrap();

      toast.success("Employee added successfully!");
      // 🔥 RESET FORM AFTER SUCCESS
      setForm({
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
        photo: null,
      });

      setPhotoPreview(null);
      setIsDragging(false);

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add employee.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-2">
      <div className="bg-white w-full max-w-2xl p-3 rounded-lg shadow overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-3 text-gray-800 border-b pb-2">
          Add New Employee
        </h2>

        {/* Photo Upload */}
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`mt-2 h-[100px] w-[100px] mb-2 border-2 border-dashed rounded-lg text-center cursor-pointer flex items-center justify-center transition ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
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
              Drag & drop <br />
              or <span className="text-blue-600 font-medium">browse</span>
            </p>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0] || null)}
        />

        {/* Form Fields */}
        <div className="grid grid-cols-3 gap-6">
          {[
            { key: "companyID", placeholder: "Employee ID", type: "text" },
            { key: "name", placeholder: "Full Name", type: "text" },
            { key: "number", placeholder: "Phone Number", type: "number" },
            { key: "email", placeholder: "Email", type: "email" },
            { key: "designation", placeholder: "Designation", type: "text" },
            { key: "address", placeholder: "Address", type: "text" },
            { key: "nid", placeholder: "NID Number", type: "number" },
            { key: "joiningDate", placeholder: "Joining Date", type: "date" },
            { key: "salary", placeholder: "Salary", type: "number" },
          ].map((field) => (
            <input
              key={field.key}
              type={field.type}
              placeholder={field.placeholder}
              className="p-2 border-b border-gray-300 focus:border-blue-500 outline-none text-sm"
              value={(form as any)[field.key]}
              onChange={(e) =>
                setForm({ ...form, [field.key]: e.target.value })
              }
              disabled={isLoading}
            />
          ))}

          {/* Department Dropdown */}
          <select
            value={form.department}
            onChange={(e) =>
              setForm({ ...form, department: e.target.value })
            }
            className="p-2 border-b border-gray-300 focus:border-blue-500 outline-none text-sm col-span-3"
            disabled={isLoading}
          >
            <option value="">Select Department</option>
            <option value="marketer">Marketer</option>
            <option value="web_developer">Web Developer</option>
            <option value="graphic_designer">Graphic Designer</option>
            <option value="video_editor">Video Editor</option>
            <option value="admin">Admin Service</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-5 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
