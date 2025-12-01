import React from "react";
const historyData = [
  {
    date: "2025-11-28",
    department: "Monitor",
    video: 2,
    ads: "X",
    web: "X",
    graphic: 2,
  },
  {
    date: "2025-11-29",
    department: "TikTok Factory",
    video: 2,
    ads: "X",
    web: "X",
    graphic: "X",
  },
  {
    date: "2025-11-30",
    department: "Complete Home",
    video: 0,
    ads: "X",
    web: "X",
    graphic: "X",
  },
];
export default function ClientWorkList() {
  return (
    <div>
      {" "}
      <div className="bg-white border rounded-xl shadow p-6 overflow-x-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          📋 Task History Overview
        </h2>
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Department</th>
              <th className="px-4 py-2">Video</th>
              <th className="px-4 py-2">Ads</th>
              <th className="px-4 py-2">Web Dev</th>
              <th className="px-4 py-2">Graphic Design</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {historyData.map((entry, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2">{entry.date}</td>
                <td className="px-4 py-2 font-medium">{entry.department}</td>
                <td className="px-4 py-2 text-center">{entry.video}</td>
                <td className="px-4 py-2 text-center">{entry.ads}</td>
                <td className="px-4 py-2 text-center">{entry.web}</td>
                <td className="px-4 py-2 text-center">{entry.graphic}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
