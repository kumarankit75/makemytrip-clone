import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("stats");
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/stats`,
        { headers }
      );
      setStats(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/users`,
        { headers }
      );
      setUsers(res.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/bookings`,
        { headers }
      );
      setBookings(res.data.bookings);
    } catch (err) {
      console.log(err);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "users") fetchUsers();
    if (tab === "bookings") fetchBookings();
  };

  const handleDeleteUser = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/admin/users/${id}`,
        { headers }
      );
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f2f2f2] flex items-center justify-center">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2f2f2] py-8 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm">Welcome back, {user?.name} 👋</p>
          </div>
          <span className="bg-[#eb2026] text-white text-xs font-bold px-3 py-1 rounded-full">
            ADMIN
          </span>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {[
              { label: "Total Users", value: stats.totalUsers, color: "text-[#008cff]", bg: "bg-blue-50" },
              { label: "Total Bookings", value: stats.totalBookings, color: "text-purple-600", bg: "bg-purple-50" },
              { label: "Flight Bookings", value: stats.flightBookings, color: "text-[#eb2026]", bg: "bg-red-50" },
              { label: "Hotel Bookings", value: stats.hotelBookings, color: "text-green-600", bg: "bg-green-50" },
              { label: "Total Revenue", value: `₹${stats.totalRevenue.toLocaleString()}`, color: "text-yellow-600", bg: "bg-yellow-50" },
            ].map((stat) => (
              <div key={stat.label} className={`${stat.bg} rounded-xl p-4 shadow-sm`}>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white rounded-xl shadow-sm p-2">
          {["stats", "users", "bookings"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 capitalize
                ${activeTab === tab
                  ? "bg-[#008cff] text-white"
                  : "text-gray-500 hover:text-[#008cff]"
                }`}
            >
              {tab === "stats" ? "📊 Overview" : tab === "users" ? "👥 Users" : "🎫 Bookings"}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "stats" && stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-sm font-bold text-gray-500 mb-4">BOOKING BREAKDOWN</h2>
              <div className="flex flex-col gap-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Flights</span>
                    <span className="text-sm font-bold text-[#eb2026]">{stats.flightBookings}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-[#eb2026] h-2 rounded-full"
                      style={{ width: `${stats.totalBookings ? (stats.flightBookings / stats.totalBookings) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Hotels</span>
                    <span className="text-sm font-bold text-green-600">{stats.hotelBookings}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${stats.totalBookings ? (stats.hotelBookings / stats.totalBookings) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-sm font-bold text-gray-500 mb-4">QUICK ACTIONS</h2>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleTabChange("users")}
                  className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all"
                >
                  <span className="text-sm font-semibold text-[#008cff]">View All Users</span>
                  <span className="text-[#008cff]">→</span>
                </button>
                <button
                  onClick={() => handleTabChange("bookings")}
                  className="flex items-center justify-between p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-all"
                >
                  <span className="text-sm font-semibold text-[#eb2026]">View All Bookings</span>
                  <span className="text-[#eb2026]">→</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-sm font-bold text-gray-700">
                All Users ({users.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {["Name", "Email", "Phone", "Joined", "Action"].map((h) => (
                      <th key={h} className="text-left text-xs font-bold text-gray-500 px-4 py-3">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="bg-[#008cff] text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold">
                            {u.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-sm font-semibold text-gray-800">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{u.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{u.phone || "—"}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDeleteUser(u._id)}
                          className="text-xs text-red-500 font-semibold hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {users.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-400 text-sm">No users found</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-sm font-bold text-gray-700">
                All Bookings ({bookings.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {["Booking ID", "User", "Type", "Details", "Amount", "Status"].map((h) => (
                      <th key={h} className="text-left text-xs font-bold text-gray-500 px-4 py-3">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b._id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-bold text-gray-800">{b.bookingId}</td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-semibold text-gray-800">{b.user?.name}</p>
                        <p className="text-xs text-gray-400">{b.user?.email}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                          b.bookingType === "flight"
                            ? "bg-red-50 text-[#eb2026]"
                            : "bg-green-50 text-green-600"
                        }`}>
                          {b.bookingType === "flight" ? "✈️ Flight" : "🏨 Hotel"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {b.bookingType === "flight"
                          ? `${b.flight?.from} → ${b.flight?.to}`
                          : b.hotel?.name}
                      </td>
                      <td className="px-4 py-3 text-sm font-bold text-[#eb2026]">
                        ₹{b.totalPrice?.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <span className="bg-green-100 text-green-600 text-xs font-bold px-2 py-1 rounded-full capitalize">
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {bookings.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-400 text-sm">No bookings found</p>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default AdminDashboard;