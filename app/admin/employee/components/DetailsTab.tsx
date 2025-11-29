"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  Calendar,
  MapPin,
  Briefcase,
  DollarSign,
  IdCard,
  User,
} from "lucide-react";

interface Employee {
  _id: string;
  companyID: string;
  photo: string;
  name: string;
  number: string;
  email: string;
  department: string;
  designation: string;
  joiningDate: string;
  salary: string | number;
  address: string;
  nid: string;
}

export default function DetailsTab({
  employee,
}: {
  employee: Employee | null;
}) {
  const [openModal, setOpenModal] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!employee)
    return <p className="text-gray-500 italic">No employee data available.</p>;

  // Handle user creation
  const handleCreateUser = async () => {
    if (!password) {
      alert("Please enter a password");
      return;
    }
    setLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const res = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: employee.name,
          email: employee.email,
          password,
          userType: employee.department,
          createdBy: "admin",
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Employee user account created successfully!");
        setPassword("");
        setOpenModal(false);
      } else {
        alert(`Failed: ${data.message || "Something went wrong"}`);
      }
    } catch (err) {
      console.error("Error creating user:", err);
      alert("Error creating user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Profile Card */}
      <div className="bg-white border rounded-lg p-8 flex gap-8 items-center">
        <div className="w-32 h-32 border rounded flex items-center justify-center">
          <User className="h-20 w-20 text-gray-300" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">{employee.name}</h1>
          <p className="text-blue-600 font-semibold">{employee.designation}</p>
          <p className="text-gray-500 capitalize">{employee.department}</p>
        </div>
      </div>

      {/* Details Card */}
      <div className="bg-white border rounded-lg p-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">
          Personal Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <Detail
            label="Phone"
            value={employee.number}
            icon={<Phone className="h-4 w-4 text-gray-600" />}
          />
          <Detail
            label="Email"
            value={employee.email}
            icon={<Mail className="h-4 w-4 text-gray-600" />}
          />
          <Detail
            label="Joining Date"
            value={new Date(employee.joiningDate).toLocaleDateString()}
            icon={<Calendar className="h-4 w-4 text-gray-600" />}
          />
          <Detail
            label="Salary"
            value={`${employee.salary} BDT`}
            icon={<DollarSign className="h-4 w-4 text-gray-600" />}
          />
          <Detail
            label="Address"
            value={employee.address}
            icon={<MapPin className="h-4 w-4 text-gray-600" />}
          />
          <Detail
            label="Department"
            value={employee.department}
            icon={<Briefcase className="h-4 w-4 text-gray-600" />}
          />
          <Detail
            label="NID"
            value={employee.nid}
            icon={<IdCard className="h-4 w-4 text-gray-600" />}
          />
        </div>
      </div>

      {/* Create User Account Button */}
      <div className="bg-white border rounded-lg p-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">
          Employee User Account
        </h2>
        <button
          onClick={() => setOpenModal(true)}
          className="px-5 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
        >
          Create Account
        </button>
      </div>

      {/* Popup Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-2">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Set Employee Password
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Creating account for <strong>{employee.name}</strong> (
              {employee.email})
              <br />
              User type: <strong>{employee.department}</strong>
            </p>
            <input
              type="password"
              placeholder="Enter employee password"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300 mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateUser}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Detail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 bg-gray-50 border rounded-lg p-4">
      {icon}
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-gray-800 font-medium">{value}</p>
      </div>
    </div>
  );
}
