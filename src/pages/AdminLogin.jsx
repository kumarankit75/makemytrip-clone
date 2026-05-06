import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";

function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/login`,
        form
      );
      login(res.data.user, res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">

        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold">
            <span className="text-[#eb2026]">make</span>
            <span className="text-black">my</span>
            <span className="text-[#008cff]">trip</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">Admin Login</p>
          <span className="bg-[#eb2026] text-white text-xs font-bold px-3 py-1 rounded-full mt-2 inline-block">
            ADMIN PANEL
          </span>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1 block">EMAIL</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="admin@makemytrip.com"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#008cff] transition-all"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1 block">PASSWORD</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Enter admin password"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#008cff] transition-all"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#eb2026] hover:bg-[#c41a1f] text-white font-bold py-3 rounded-full text-sm transition-all duration-200 mt-2 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "ADMIN LOGIN"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default AdminLogin;