import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
    //   const res = await axios.post("http://localhost:5000/api/auth/login", form);
const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, form);
    login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold">
            <span className="text-[#eb2026]">make</span>
            <span className="text-black">my</span>
            <span className="text-[#008cff]">trip</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">Login to your account</p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1 block">EMAIL</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#008cff] transition-all"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1 block">PASSWORD</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#008cff] transition-all"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#eb2026] hover:bg-[#c41a1f] text-white font-bold py-3 rounded-full text-sm transition-all duration-200 mt-2 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#008cff] font-semibold">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;