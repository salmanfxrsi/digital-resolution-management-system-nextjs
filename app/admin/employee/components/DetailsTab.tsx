/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useState } from "react";
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
import { toast } from "react-toastify";
import Image from "next/image";

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
  if (!employee)
    return <p className="text-gray-500 italic">No employee data available.</p>;

  // -----------------------------
  // STATES
  // -----------------------------
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userAccount, setUserAccount] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // -----------------------------
  // FETCH USER ACCOUNT
  // -----------------------------
  useEffect(() => {
    const fetchUserAccount = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const res = await fetch(
          `${baseUrl}/users/by-employee/${employee?._id}`
        );
        const data = await res.json();
        if (res.ok && data.success) {
          setUserAccount(data.data);
        }
      } catch (err) {
        toast.error("Error fetching user account");
      }
    };
    fetchUserAccount();
  }, [employee?._id]);

  // -----------------------------
  // CREATE USER ACCOUNT
  // -----------------------------
  const handleCreateUser = async () => {
    const finalPassword = password || employee.companyID;

    setLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const res = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: employee.name,
          email: employee.email,
          password: finalPassword,
          employeeId: employee._id,
          userType: employee.department,
          createdBy: "admin",
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Employee user account created successfully!");
        setUserAccount(data.data);
        setPassword("");
        setOpenModal(false);
      } else {
        toast.error(data.message || "Failed to create user");
      }
    } catch (err) {
      toast.error("Error creating user");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // ================ RETURN UI ==========================
  // =====================================================

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      {/* TOP SECTION */}
      <div className="flex mx-auto justify-between gap-8 items-center bg-white border rounded-lg p-8">
        <div className="flex justify-between gap-8 items-center">
          <div className="w-32 h-32 border rounded-full flex items-center justify-center overflow-hidden">
            {employee.photo ? (
              <Image
                src={employee.photo}
                width={100}
                height={100}
                alt={employee.name}
                quality={50}
                sizes="100px"
                className="object-cover w-full h-full object-center"
              />
            ) : (
              <User className="h-20 w-20 text-gray-300" />
            )}
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">{employee.name}</h1>
            <p className="text-blue-600 font-semibold">{employee.designation}</p>
            <p className="text-gray-500 capitalize">{employee.department}</p>
          </div>
        </div>

        {/* USER ACCOUNT SECTION */}
        <div className="bg-gray-50 border rounded-lg p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
            User Account Details
          </h3>

          <div className="space-y-3 text-sm">
            <DetailRow label="User ID" value={employee._id} badgeColor="blue" />

            <DetailRow
              label="Login Email"
              value={userAccount ? userAccount.email : employee.email}
              badgeColor="green"
            />

            <DetailRow
              label="Password"
              value={employee.companyID}
              badgeColor="yellow"
            />
          </div>

          {!userAccount && (
            <button
              onClick={() => setOpenModal(true)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Create User Account
            </button>
          )}
        </div>
      </div>

      {/* DETAILS CARD */}
      <div className="bg-white border rounded-lg p-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">
          Personal Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <Detail icon={<Phone />} label="Phone" value={employee.number} />
          <Detail icon={<Mail />} label="Email" value={employee.email} />
          <Detail
            icon={<Calendar />}
            label="Joining Date"
            value={new Date(employee.joiningDate).toLocaleDateString()}
          />
          <Detail
            icon={<DollarSign />}
            label="Salary"
            value={`${employee.salary} BDT`}
          />
          <Detail icon={<MapPin />} label="Address" value={employee.address} />
          <Detail
            icon={<Briefcase />}
            label="Department"
            value={employee.department}
          />
          <Detail icon={<IdCard />} label="NID" value={employee.nid} />
        </div>
      </div>

      {/* PASSWORD SET MODAL */}
      {openModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-2">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Set Employee Password
            </h2>

            <p className="text-sm text-gray-600 mb-4">
              Creating account for <strong>{employee.name}</strong> (
              {employee.email})<br />
              User type: <strong>{employee.department}</strong>
              <br />
              Company ID: <strong>{employee.companyID}</strong>
            </p>

            <input
              type="text"
              placeholder="Enter custom password (optional)"
              className="w-full border p-2 rounded mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleCreateUser}
              disabled={loading}
              className="w-full py-2 bg-blue-600 text-white rounded"
            >
              {loading ? "Creating..." : "Create User"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Small helper component for user account rows
function DetailRow({
  label,
  value,
  badgeColor,
}: {
  label: string;
  value: string;
  badgeColor: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`px-2 py-1 bg-${badgeColor}-100 text-${badgeColor}-700 rounded text-xs font-semibold`}
      >
        {label}
      </span>
      <p className="font-medium text-gray-900">{value}</p>
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
