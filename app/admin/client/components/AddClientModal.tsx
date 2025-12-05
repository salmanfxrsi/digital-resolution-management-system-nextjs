/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Users } from "lucide-react";
import { toast } from "react-toastify";
import {
  validatePhone,
  ValidationEmail,
} from "@/components/module/FormValidation/InputValidation";

import { uploadToImgBB } from "@/utils/uploadImage";
import { useCreateClientMutation } from "@/app/redux/features/clients/clientsApi";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void; // refresh + toast from parent
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

  //  New state for image uploading
  const [isUploading, setIsUploading] = useState(false);

  // RTK Query mutation
  const [createClient, { isLoading }] = useCreateClientMutation();

  if (!open) return null;

  // FILE HANDLER
  const handleFile = (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files allowed!");
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
      toast.error("All fields are required!");
      return;
    }

    try {
      // Prevent multiple clicks
      setIsUploading(true);

      toast.loading("Uploading image...");
      const imageUrl = await uploadToImgBB(form.logo);
      toast.dismiss();

      const payload = {
        name: form.name,
        location: form.location,
        number: form.number,
        gmail: form.gmail,
        projectDetails: form.projectDetails,
        status: form.status,
        logo: imageUrl,
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

      await createClient(payload).unwrap();
      toast.success("Client created successfully!");

      // Reset form
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
      setIsDragging(false);

      onSuccess?.();
      onClose();
    } catch (err) {
      console.error("Error creating client:", err);
      toast.error("Error creating client");
    } finally {
      //  Re-enable Save button after upload completes
      setIsUploading(false);
    }
  };

  const visible =
    form.name &&
    form.location &&
    validatePhone(form.number) &&
    ValidationEmail(form.gmail) &&
    form.projectDetails &&
    form.status &&
    form.logo?.name;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-2">
      <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold flex justify-start items-center gap-6 mb-3 text-gray-800 border-b pb-2">
          <Users className="inline-block ml-2 text-blue-500" />
          Add New Client
        </h2>

        {/* LOGO UPLOAD */}
        <div>
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => document.getElementById("logoInput")?.click()}
            className={`mt-2 h-[100px] w-[100px] mb-2 border-2 border-dashed rounded text-center cursor-pointer flex items-center justify-center transition ${
              isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
          >
            {logoPreview ? (
              <div className="flex justify-center">
                <Image
                  src={logoPreview}
                  width={100}
                  height={100}
                  alt="Client Logo"
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                Drag & drop <br />
                or <span className="text-blue-600 font-medium">browse</span>
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
            { key: "gmail", placeholder: "Email", type: "email" },
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
            className="p-2 w-full rounded border-gray-300 focus:border-blue-500 focus:outline-none transition text-sm col-span-2 border-b resize-none"
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
          className="p-2 border-b w-50 mt-8 border-gray-300 focus:border-blue-500 focus:outline-none transition text-sm col-span-2"
        >
          <option value="">Select Status</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>

        {!ValidationEmail(form.gmail) && form.gmail && (
          <p className="text-red-500 text-xs">Email is not valid</p>
        )}
        {!validatePhone(form.number) && form.number && (
          <p className="text-red-500 text-xs">
            Phone must be 11 digits starting with 01
          </p>
        )}

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
            disabled={!visible || isLoading || isUploading} //  disable when uploading or saving
            className={`px-5 py-2 rounded-lg shadow transition ${
              !visible || isLoading || isUploading
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isUploading ? "Uploading..." : isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
