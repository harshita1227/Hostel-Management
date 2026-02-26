import { useEffect, useState } from "react";
import axios from "axios";

export default function StudentManager() {
  const token = localStorage.getItem("token");

  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    email: "",
    room: "",
    year: "",
    course: "",
    branch: "",
  });

  const [filters, setFilters] = useState({
    year: "",
    course: "",
    branch: "",
  });

  // ==========================
  // Branch Options Dynamic
  // ==========================
  const branchOptions = {
    BTech: ["CSE", "IT", "ME", "CE", "EE"],
    BCA: ["General", "Data Science"],
    MCA: ["General", "AI", "Cloud"],
  };

  // ==========================
  // FETCH STUDENTS
  // ==========================
  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/students",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStudents(res.data);
      setFilteredStudents(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Admin access error");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ==========================
  // ADD STUDENT
  // ==========================
  const addStudent = async () => {
    if (
      !form.name ||
      !form.rollNo ||
      !form.email ||
      !form.room ||
      !form.year ||
      !form.course ||
      !form.branch
    ) {
      alert("All fields are required");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/admin/students",
        {
          ...form,
          year: Number(form.year),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setForm({
        name: "",
        rollNo: "",
        email: "",
        room: "",
        year: "",
        course: "",
        branch: "",
      });

      fetchStudents();
    } catch (err) {
      alert(err.response?.data?.message || "Error adding student");
    }
  };

  // ==========================
  // DELETE STUDENT
  // ==========================
  const deleteStudent = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/admin/students/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchStudents();
    } catch (err) {
      alert("Error deleting student");
    }
  };

  // ==========================
  // APPLY FILTER
  // ==========================
  const applyFilter = () => {
    let data = students;

    if (filters.year) {
      data = data.filter(
        (s) => Number(s.year) === Number(filters.year)
      );
    }

    if (filters.course) {
      data = data.filter(
        (s) => s.course === filters.course
      );
    }

    if (filters.branch) {
      data = data.filter(
        (s) => s.branch === filters.branch
      );
    }

    setFilteredStudents(data);
  };

  // ==========================
  // UI
  // ==========================
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">
        🎓 Student Management
      </h2>

      {/* ================= FORM ================= */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <input
          placeholder="Full Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="border p-2 rounded-lg"
        />

        <input
          placeholder="Roll No"
          value={form.rollNo}
          onChange={(e) =>
            setForm({ ...form, rollNo: e.target.value })
          }
          className="border p-2 rounded-lg"
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="border p-2 rounded-lg"
        />

        <input
          placeholder="Room No"
          value={form.room}
          onChange={(e) =>
            setForm({ ...form, room: e.target.value })
          }
          className="border p-2 rounded-lg"
        />

        {/* Year */}
        <select
          value={form.year}
          onChange={(e) =>
            setForm({ ...form, year: e.target.value })
          }
          className="border p-2 rounded-lg"
        >
          <option value="">Select Year</option>
          <option value="1">1st</option>
          <option value="2">2nd</option>
          <option value="3">3rd</option>
          <option value="4">4th</option>
        </select>

        {/* Course */}
        <select
          value={form.course}
          onChange={(e) =>
            setForm({
              ...form,
              course: e.target.value,
              branch: "",
            })
          }
          className="border p-2 rounded-lg"
        >
          <option value="">Select Course</option>
          <option value="BTech">BTech</option>
          <option value="BCA">BCA</option>
          <option value="MCA">MCA</option>
        </select>

        {/* Branch (Dynamic) */}
        <select
          value={form.branch}
          onChange={(e) =>
            setForm({ ...form, branch: e.target.value })
          }
          className="border p-2 rounded-lg"
        >
          <option value="">Select Branch</option>
          {form.course &&
            branchOptions[form.course].map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
        </select>
      </div>

      <button
        onClick={addStudent}
        className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
      >
        ➕ Add Student
      </button>

      {/* ================= FILTER ================= */}
      <div className="mt-8 grid grid-cols-4 gap-4 items-end">
        <select
          value={filters.year}
          onChange={(e) =>
            setFilters({ ...filters, year: e.target.value })
          }
          className="border p-2 rounded-lg"
        >
          <option value="">All Years</option>
          <option value="1">1st</option>
          <option value="2">2nd</option>
          <option value="3">3rd</option>
          <option value="4">4th</option>
        </select>

        <select
          value={filters.course}
          onChange={(e) =>
            setFilters({
              ...filters,
              course: e.target.value,
              branch: "",
            })
          }
          className="border p-2 rounded-lg"
        >
          <option value="">All Courses</option>
          <option value="BTech">BTech</option>
          <option value="BCA">BCA</option>
          <option value="MCA">MCA</option>
        </select>

        <select
          value={filters.branch}
          onChange={(e) =>
            setFilters({ ...filters, branch: e.target.value })
          }
          className="border p-2 rounded-lg"
        >
          <option value="">All Branches</option>
          {filters.course &&
            branchOptions[filters.course].map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
        </select>

        <button
          onClick={applyFilter}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Apply Filter
        </button>
      </div>

      {/* ================= TABLE ================= */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Roll</th>
              <th className="p-2 border">Room</th>
              <th className="p-2 border">Year</th>
              <th className="p-2 border">Course</th>
              <th className="p-2 border">Branch</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((s) => (
              <tr key={s._id}>
                <td className="p-2 border">{s.name}</td>
                <td className="p-2 border">{s.rollNo}</td>
                <td className="p-2 border">{s.room}</td>
                <td className="p-2 border">{s.year}</td>
                <td className="p-2 border">{s.course}</td>
                <td className="p-2 border">{s.branch}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => deleteStudent(s._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
