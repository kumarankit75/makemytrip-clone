import { useState } from "react";
import { useNavigate } from "react-router-dom";

const tabs = ["Flights", "Hotels"];

function Home() {
  const [activeTab, setActiveTab] = useState("Flights");

  return (
    <div className="min-h-screen bg-[#f2f2f2]">

      {/* Hero Banner */}
      <div className="bg-[#008cff] py-12 px-6">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Explore the World
          </h1>
          <p className="text-blue-100 text-lg">
            Book flights, hotels & more at the best prices
          </p>
        </div>

        {/* Search Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6">

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-semibold border-b-2 transition-all duration-200 -mb-px
                  ${activeTab === tab
                    ? "border-[#008cff] text-[#008cff]"
                    : "border-transparent text-gray-500 hover:text-[#008cff]"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "Flights" && <FlightSearch />}
          {activeTab === "Hotels" && <HotelSearch />}

        </div>
      </div>

      {/* Popular Routes */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Popular Flight Routes</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {popularRoutes.map((route) => (
            <PopularRouteCard key={route.id} route={route} />
          ))}
        </div>
      </div>

    </div>
  );
}

function FlightSearch() {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState("oneway");
  const [form, setForm] = useState({
    from: "",
    to: "",
    date: "",
    passengers: "1",
    class: "Economy",
  });

  const handleSearch = () => {
    if (!form.from || !form.to || !form.date) {
      alert("Please fill all fields");
      return;
    }
    navigate(
      `/flights?from=${form.from}&to=${form.to}&date=${form.date}&passengers=${form.passengers}&class=${form.class}`
    );
  };

  return (
    <div>
      {/* Trip Type */}
      <div className="flex gap-6 mb-6">
        {["oneway", "roundtrip"].map((type) => (
          <label key={type} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="tripType"
              value={type}
              checked={tripType === type}
              onChange={() => setTripType(type)}
              className="accent-[#008cff]"
            />
            <span className="text-sm font-medium text-gray-700">
              {type === "oneway" ? "One Way" : "Round Trip"}
            </span>
          </label>
        ))}
      </div>

      {/* Search Fields */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="border border-gray-200 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">From</p>
          <input
            type="text"
            placeholder="Delhi"
            value={form.from}
            onChange={(e) => setForm({ ...form, from: e.target.value })}
            className="w-full text-base font-semibold text-gray-800 outline-none placeholder-gray-400"
          />
        </div>
        <div className="border border-gray-200 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">To</p>
          <input
            type="text"
            placeholder="Mumbai"
            value={form.to}
            onChange={(e) => setForm({ ...form, to: e.target.value })}
            className="w-full text-base font-semibold text-gray-800 outline-none placeholder-gray-400"
          />
        </div>
        <div className="border border-gray-200 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">Departure</p>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full text-base font-semibold text-gray-800 outline-none"
          />
        </div>
        <div className="border border-gray-200 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">Travellers & Class</p>
          <select
            value={form.passengers}
            onChange={(e) => setForm({ ...form, passengers: e.target.value })}
            className="w-full text-base font-semibold text-gray-800 outline-none"
          >
            {["1", "2", "3", "4", "5"].map((n) => (
              <option key={n} value={n}>{n} Adult · Economy</option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSearch}
          className="bg-[#eb2026] hover:bg-[#c41a1f] text-white font-bold px-16 py-3 rounded-full text-sm transition-all duration-200 shadow-md"
        >
          SEARCH FLIGHTS
        </button>
      </div>
    </div>
  );
}

function HotelSearch() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    city: "",
    checkIn: "",
    checkOut: "",
    rooms: "1",
  });

  const handleSearch = () => {
    if (!form.city || !form.checkIn || !form.checkOut) {
      alert("Please fill all fields");
      return;
    }
    navigate(
      `/hotels?city=${form.city}&checkIn=${form.checkIn}&checkOut=${form.checkOut}&rooms=${form.rooms}`
    );
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="border border-gray-200 rounded-lg p-3 md:col-span-2">
          <p className="text-xs text-gray-400 mb-1">City or Hotel Name</p>
          <input
            type="text"
            placeholder="Mumbai"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className="w-full text-base font-semibold text-gray-800 outline-none placeholder-gray-400"
          />
        </div>
        <div className="border border-gray-200 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">Check In</p>
          <input
            type="date"
            value={form.checkIn}
            onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
            className="w-full text-base font-semibold text-gray-800 outline-none"
          />
        </div>
        <div className="border border-gray-200 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">Check Out</p>
          <input
            type="date"
            value={form.checkOut}
            onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
            className="w-full text-base font-semibold text-gray-800 outline-none"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSearch}
          className="bg-[#eb2026] hover:bg-[#c41a1f] text-white font-bold px-16 py-3 rounded-full text-sm transition-all duration-200 shadow-md"
        >
          SEARCH HOTELS
        </button>
      </div>
    </div>
  );
}

const popularRoutes = [
  { id: 1, from: "Delhi", to: "Mumbai", price: 2999, duration: "2h 15m" },
  { id: 2, from: "Mumbai", to: "Bangalore", price: 2499, duration: "1h 45m" },
  { id: 3, from: "Delhi", to: "Goa", price: 3499, duration: "2h 30m" },
  { id: 4, from: "Chennai", to: "Hyderabad", price: 1999, duration: "1h 20m" },
];

function PopularRouteCard({ route }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/flights?from=${route.from}&to=${route.to}`)}
      className="bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-all duration-200 hover:-translate-y-1"
    >
      <p className="text-sm font-bold text-gray-800">
        {route.from} → {route.to}
      </p>
      <p className="text-xs text-gray-400 mt-1">{route.duration}</p>
      <p className="text-base font-bold text-[#eb2026] mt-2">
        from ₹{route.price.toLocaleString()}
      </p>
    </div>
  );
}

export default Home;