"use client";
import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { Bell, Shield, User, Globe, Save } from "lucide-react";

export default function Settingpage() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-700">Settings</h1>
          <p className="mt-2 text-gray-600">
            Manage your account preferences, security, and system
            configurations.
          </p>
        </div>

        {/* Settings Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Notifications */}
          <SettingCard
            icon={<Bell className="h-6 w-6 text-blue-600" />}
            title="Notifications"
            description="Enable or disable system notifications."
          >
            <Switch
              checked={notifications}
              onChange={setNotifications}
              className={`${
                notifications ? "bg-blue-600" : "bg-gray-300"
              } relative inline-flex h-6 w-11 items-center rounded-full transition`}
            >
              <span
                className={`${
                  notifications ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </SettingCard>

          {/* Dark Mode */}
          <SettingCard
            icon={<Globe className="h-6 w-6 text-indigo-600" />}
            title="Appearance"
            description="Switch between light and dark mode."
          >
            <Switch
              checked={darkMode}
              onChange={setDarkMode}
              className={`${
                darkMode ? "bg-indigo-600" : "bg-gray-300"
              } relative inline-flex h-6 w-11 items-center rounded-full transition`}
            >
              <span
                className={`${
                  darkMode ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </SettingCard>

          {/* Security */}
          <SettingCard
            icon={<Shield className="h-6 w-6 text-red-600" />}
            title="Security"
            description="Enable two-factor authentication for extra protection."
          >
            <Switch
              checked={twoFactor}
              onChange={setTwoFactor}
              className={`${
                twoFactor ? "bg-red-600" : "bg-gray-300"
              } relative inline-flex h-6 w-11 items-center rounded-full transition`}
            >
              <span
                className={`${
                  twoFactor ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </SettingCard>

          {/* Profile Settings */}
          <SettingCard
            icon={<User className="h-6 w-6 text-green-600" />}
            title="Profile"
            description="Update your personal information."
          >
            <form className="space-y-4 w-full">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none"
              />
              <button
                type="submit"
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </button>
            </form>
          </SettingCard>
        </div>
      </div>
    </div>
  );
}

// 🔹 Reusable Setting Card Component
function SettingCard({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col gap-4">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
