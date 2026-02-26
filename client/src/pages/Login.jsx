import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // REGISTER USER
  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: form.name,
          email: form.email,
          password: form.password,
        }
      );

      alert(res.data.message);
      setIsRegister(false); // switch to login
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  // LOGIN USER
  const handleLogin = async () => {
    if (!form.email || !form.password) {
      alert("Email and password required");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      // STORE TOKEN + USER
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful");

      // ✅ ROLE BASED REDIRECT
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/student");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-pink-500">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-1">
          Hostel Management
        </h2>

        <p className="text-center text-gray-500 mb-6">
          {isRegister ? "Create your account" : "Login to your account"}
        </p>

        {/* NAME (REGISTER ONLY) */}
        {isRegister && (
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full mb-3 px-4 py-2 border rounded-lg"
          />
        )}

        {/* EMAIL */}
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full mb-3 px-4 py-2 border rounded-lg"
        />

        {/* PASSWORD */}
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded-lg"
        />

        {/* ACTION BUTTON */}
        <button
          onClick={isRegister ? handleRegister : handleLogin}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition"
        >
          {isRegister ? "Register" : "Login"}
        </button>

        {/* TOGGLE LINK */}
        <p className="text-center text-sm mt-4">
          {isRegister ? "Already have an account?" : "New here?"}
          <span
            className="text-indigo-600 font-semibold cursor-pointer ml-1"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Login" : "Register"}
          </span>
        </p>
      </div>
    </div>
  );
}
