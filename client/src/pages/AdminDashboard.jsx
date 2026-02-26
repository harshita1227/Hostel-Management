import { useState } from "react";
import StudentManager from "../components/admin/StudentManager";
import RoomManager from "../components/admin/RoomManager";
import AttendanceManager from "../components/admin/AttendanceManager";
import Reports from "../components/admin/Reports";

export default function AdminDashboard() {
  const [tab, setTab] = useState("students");

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <div className="bg-white shadow p-4 flex justify-between">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* TABS */}
      <div className="flex gap-4 p-4 bg-white shadow">
        {["students", "rooms", "attendance", "reports"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded ${
              tab === t ? "bg-indigo-600 text-white" : "bg-gray-200"
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="p-6">
        {tab === "students" && <StudentManager />}
        {tab === "rooms" && <RoomManager />}
        {tab === "attendance" && <AttendanceManager />}
        {tab === "reports" && <Reports />}
      </div>
    </div>
  );
}
