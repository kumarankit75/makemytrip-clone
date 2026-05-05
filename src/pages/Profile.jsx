import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";

function Profile() {
  const { user, login } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    gender: "",
    dob: "",
    email: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [stats, setStats] = useState({
    totalBookings: 0,
    flightBookings: 0,
    hotelBookings: 0,
  });

  useEffect(() => {
    fetchProfile();
    fetchStats();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/profile`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const u = res.data.user;
      setForm({
        name: u.name || "",
        phone: u.phone || "",
        gender: u.gender || "",
        dob: u.dob || "",
        email: u.email || "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/bookings/my`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const bookings = res.data.bookings;
      setStats({
        totalBookings: bookings.length,
        flightBookings: bookings.filter((b) => b.bookingType === "flight").length,
        hotelBookings: bookings.filter((b) => b.bookingType === "hotel").length,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/profile`,
        { name: form.name, phone: form.phone, gender: form.gender, dob: form.dob },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      login(
        { id: res.data.user._id, name: res.data.user.name, email: res.data.user.email },
        localStorage.getItem("token")
      );
      setMessage("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("New passwords do not match");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/change-password`,
        {
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Password changed successfully!");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2] py-8 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 flex items-center gap-6">
          <div className="bg-[#008cff] text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold shrink-0">
            {form.name ? form.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">{form.name}</h1>
            <p className="text-gray-400 text-sm">{form.email}</p>
            {form.phone && <p className="text-gray-400 text-sm">📱 {form.phone}</p>}
          </div>

          {/* Stats */}
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#008cff]">{stats.totalBookings}</p>
              <p className="text-xs text-gray-400">Total Bookings</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#eb2026]">{stats.flightBookings}</p>
              <p className="text-xs text-gray-400">Flights</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-500">{stats.hotelBookings}</p>
              <p className="text-xs text-gray-400">Hotels</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white rounded-xl shadow-sm p-2">
          {["profile", "password"].map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setMessage(""); setError(""); }}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 capitalize
                ${activeTab === tab
                  ? "bg-[#008cff] text-white"
                  : "text-gray-500 hover:text-[#008cff]"
                }`}
            >
              {tab === "profile" ? "Edit Profile" : "Change Password"}
            </button>
          ))}
        </div>

        {/* Messages */}
        {message && (
          <div className="bg-green-50 border border-green-200 text-green-600 text-sm px-4 py-3 rounded-lg mb-4">
            ✅ {message}
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Edit Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-sm font-bold text-gray-500 mb-4">PERSONAL DETAILS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">FULL NAME</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#008cff] transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">EMAIL</label>
                <input
                  type="email"
                  value={form.email}
                  disabled
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none bg-gray-50 text-gray-400 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">PHONE</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="Enter phone number"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#008cff] transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">DATE OF BIRTH</label>
                <input
                  type="date"
                  value={form.dob}
                  onChange={(e) => setForm({ ...form, dob: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#008cff] transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">GENDER</label>
                <select
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#008cff] transition-all"
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="mt-6 bg-[#eb2026] hover:bg-[#c41a1f] text-white font-bold px-10 py-3 rounded-full text-sm transition-all duration-200 disabled:opacity-60"
            >
              {loading ? "Saving..." : "SAVE CHANGES"}
            </button>
          </div>
        )}

        {/* Change Password Tab */}
        {activeTab === "password" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-sm font-bold text-gray-500 mb-4">CHANGE PASSWORD</h2>
            <div className="flex flex-col gap-4 max-w-md">
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">CURRENT PASSWORD</label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  placeholder="Enter current password"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#008cff] transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">NEW PASSWORD</label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  placeholder="Enter new password"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#008cff] transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">CONFIRM NEW PASSWORD</label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  placeholder="Confirm new password"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#008cff] transition-all"
                />
              </div>
              <button
                onClick={handlePasswordChange}
                disabled={loading}
                className="bg-[#eb2026] hover:bg-[#c41a1f] text-white font-bold px-10 py-3 rounded-full text-sm transition-all duration-200 disabled:opacity-60"
              >
                {loading ? "Changing..." : "CHANGE PASSWORD"}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Profile;