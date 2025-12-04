/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React from "react";
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
<<<<<<< HEAD
import { toast } from "react-toastify";
=======
import Image from "next/image";
>>>>>>> f2df2c784d746f2c5d3b4179ce46027130fa67ea

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

<<<<<<< HEAD
  // 🔹 Check if user account already exists for this employee
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
        toast.error("Error fetching user account:", err);
      }
    };
    fetchUserAccount();
  }, [employee?._id]);

  // 🔹 Handle user creation
  const handleCreateUser = async () => {
    const finalPassword = password || employee.companyID; // default to companyID
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
        setUserAccount(data.data); // store created user
        setPassword("");
        setOpenModal(false);
      } else {
        toast.error(`Failed: ${data.message || "Something went wrong"}`);
      }
    } catch (err) {
      console.error("Error creating user:", err);
      toast.error("Error creating user");
    } finally {
      setLoading(false);
    }
  };

=======
>>>>>>> f2df2c784d746f2c5d3b4179ce46027130fa67ea
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
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                User ID
              </span>
              <p className="font-medium text-gray-900">{employee._id}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                Login Email
              </span>
              <p className="font-medium text-gray-900">{employee.email}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-semibold">
                Password
              </span>
              <p className="font-medium text-gray-900">
                {employee.companyID}
              </p>
            </div>
          </div>
        </div>

      </div>

<<<<<<< HEAD
      {/* Employee User Account Section */}
      <div className="bg-white border rounded-lg p-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">
          Employee User Account
        </h2>

        {userAccount ? (
          <div className="bg-gray-50 border rounded-lg p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
              User Account Details
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                  Login Email
                </span>
                <p className="font-medium text-gray-900">{userAccount.email}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-semibold">
                  Password
                </span>
                <p className="font-medium text-gray-900">
                  {employee.companyID}{" "}
                  <span className="text-gray-500 text-xs">(default)</span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setOpenModal(true)}
            className="px-5 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
          >
            Create Account
          </button>
        )}
      </div>

      {/* Details Card */}
=======
      {/* DETAILS CARD */}
>>>>>>> f2df2c784d746f2c5d3b4179ce46027130fa67ea
      <div className="bg-white border rounded-lg p-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">
          Personal Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <Detail icon={<Phone className="h-4 w-4 text-gray-600" />} label="Phone" value={employee.number} />
          <Detail icon={<Mail className="h-4 w-4 text-gray-600" />} label="Email" value={employee.email} />
          <Detail icon={<Calendar className="h-4 w-4 text-gray-600" />} label="Joining Date" value={new Date(employee.joiningDate).toLocaleDateString()} />
          <Detail icon={<DollarSign className="h-4 w-4 text-gray-600" />} label="Salary" value={`${employee.salary} BDT`} />
          <Detail icon={<MapPin className="h-4 w-4 text-gray-600" />} label="Address" value={employee.address} />
          <Detail icon={<Briefcase className="h-4 w-4 text-gray-600" />} label="Department" value={employee.department} />
          <Detail icon={<IdCard className="h-4 w-4 text-gray-600" />} label="NID" value={employee.nid} />
        </div>
      </div>
<<<<<<< HEAD

      {/* Popup Modal */}
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
              type="password"
              placeholder={`Default: Company ID ${employee.companyID}`}
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
=======
>>>>>>> f2df2c784d746f2c5d3b4179ce46027130fa67ea
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
