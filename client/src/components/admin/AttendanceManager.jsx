import { useEffect, useState } from "react";
import axios from "axios";

export default function AttendanceManager() {
  const token = localStorage.getItem("token");

  const [students, setStudents] = useState([]);
  const [todayAttendance, setTodayAttendance] = useState([]);
  const [yearFilter, setYearFilter] = useState("");
  const [yearAttendance, setYearAttendance] = useState([]);

  // ===============================
  // FETCH STUDENTS
  // ===============================
  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/students",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStudents(res.data);
    } catch (err) {
      alert("Error fetching students");
    }
  };

  // ===============================
  // FETCH TODAY ATTENDANCE
  // ===============================
  const fetchTodayAttendance = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/attendance/today",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTodayAttendance(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchTodayAttendance();
  }, []);

  // ===============================
  // MARK ATTENDANCE
  // ===============================
  const markAttendance = async (studentId, status) => {
    try {
      await axios.post(
        "http://localhost:5000/api/attendance",
        { studentId, status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchTodayAttendance();
    } catch (err) {
      alert("Error marking attendance");
    }
  };

  // ===============================
  // FETCH YEAR-WISE ATTENDANCE
  // ===============================
  const fetchYearAttendance = async () => {
    if (!yearFilter) {
      alert("Select a year first");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/api/attendance/year/${yearFilter}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setYearAttendance(res.data);
    } catch (err) {
      alert("Error fetching year attendance");
    }
  };

  // ===============================
  // DOWNLOAD CSV
  // ===============================
  const downloadCSV = () => {
    window.open(
      "http://localhost:5000/api/attendance/csv",
      "_blank"
    );
  };

  // ===============================
  // UI
  // ===============================
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">
        📅 Attendance Management
      </h2>

      {/* ================= MARK ATTENDANCE ================= */}
      <h3 className="text-lg font-semibold mb-3">
        Mark Today Attendance
      </h3>

      <div className="overflow-x-auto mb-8">
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Room</th>
              <th className="p-2 border">Year</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s._id}>
                <td className="p-2 border">{s.name}</td>
                <td className="p-2 border">{s.room}</td>
                <td className="p-2 border">{s.year}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() =>
                      markAttendance(s._id, "Present")
                    }
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Present
                  </button>

                  <button
                    onClick={() =>
                      markAttendance(s._id, "Absent")
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Absent
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= TODAY RECORD ================= */}
      <h3 className="text-lg font-semibold mb-3">
        Today's Attendance
      </h3>

      <div className="overflow-x-auto mb-8">
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {todayAttendance.map((a) => (
              <tr key={a._id}>
                <td className="p-2 border">
                  {a.student?.name}
                </td>
                <td className="p-2 border">{a.date}</td>
                <td
                  className={`p-2 border font-semibold ${
                    a.status === "Present"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {a.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= YEAR FILTER ================= */}
      <h3 className="text-lg font-semibold mb-3">
        Year-wise Attendance
      </h3>

      <div className="flex items-center gap-4 mb-4">
        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="">Select Year</option>
          <option>1st Year</option>
          <option>2nd Year</option>
          <option>3rd Year</option>
          <option>4th Year</option>
        </select>

        <button
          onClick={fetchYearAttendance}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          View Attendance
        </button>

        <button
          onClick={downloadCSV}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Download CSV
        </button>
      </div>

      {yearAttendance.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Year</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {yearAttendance.map((a) => (
                <tr key={a._id}>
                  <td className="p-2 border">
                    {a.student?.name}
                  </td>
                  <td className="p-2 border">
                    {a.student?.year}
                  </td>
                  <td className="p-2 border">{a.date}</td>
                  <td
                    className={`p-2 border font-semibold ${
                      a.status === "Present"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {a.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
