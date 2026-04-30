import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";

function FlightBooking() {
  const { state: flight } = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [passengers, setPassengers] = useState([
    { name: "", age: "", gender: "Male" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const handleSubmit = async () => {
    // Validate
    for (let p of passengers) {
      if (!p.name || !p.age) {
        setError("Please fill all passenger details");
        return;
      }
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/bookings`,
        {
          flight,
          passengers,
          totalPrice: flight.price * passengers.length,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/booking-summary", { state: res.data.booking });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!flight) {
    return (
      <div className="min-h-screen bg-[#f2f2f2] flex items-center justify-center">
        <p className="text-gray-500">No flight selected. Go back and select a flight.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2f2f2] py-8 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Flight Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-sm font-bold text-gray-500 mb-4">FLIGHT DETAILS</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-gray-800">{flight.airline}</p>
              <p className="text-xs text-gray-400">{flight.flightNumber}</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-gray-800">{flight.departure}</p>
              <p className="text-xs text-gray-400">{flight.fromCode}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400">{flight.duration}</p>
              <div className="w-20 h-px bg-gray-300 my-1"></div>
              <p className="text-xs text-green-500">{flight.type}</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-gray-800">{flight.arrival}</p>
              <p className="text-xs text-gray-400">{flight.toCode}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-[#eb2026]">
                ₹{flight.price.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400">per person</p>
            </div>
          </div>
        </div>

        {/* Passenger Details */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-sm font-bold text-gray-500 mb-4">PASSENGER DETAILS</h2>

          {passengers.map((passenger, index) => (
            <div key={index} className="mb-6 pb-6 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Passenger {index + 1}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">FULL NAME</label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    value={passenger.name}
                    onChange={(e) => handlePassengerChange(index, "name", e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#008cff] transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">AGE</label>
                  <input
                    type="number"
                    placeholder="Enter age"
                    value={passenger.age}
                    onChange={(e) => handlePassengerChange(index, "age", e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#008cff] transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">GENDER</label>
                  <select
                    value={passenger.gender}
                    onChange={(e) => handlePassengerChange(index, "gender", e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#008cff] transition-all"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </div>
          ))}

          {/* Add Passenger */}
          <button
            onClick={() => setPassengers([...passengers, { name: "", age: "", gender: "Male" }])}
            className="mt-4 text-sm text-[#008cff] font-semibold hover:underline"
          >
            + Add Passenger
          </button>
        </div>

        {/* Price Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-sm font-bold text-gray-500 mb-4">PRICE SUMMARY</h2>
          <div className="flex justify-between mb-2">
            <p className="text-sm text-gray-600">
              ₹{flight.price.toLocaleString()} × {passengers.length} passenger(s)
            </p>
            <p className="text-sm font-semibold text-gray-800">
              ₹{(flight.price * passengers.length).toLocaleString()}
            </p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-sm text-gray-600">Taxes & Fees</p>
            <p className="text-sm font-semibold text-green-500">Included</p>
          </div>
          <div className="border-t border-gray-100 pt-3 mt-3 flex justify-between">
            <p className="text-base font-bold text-gray-800">Total Amount</p>
            <p className="text-xl font-bold text-[#eb2026]">
              ₹{(flight.price * passengers.length).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#eb2026] hover:bg-[#c41a1f] text-white font-bold py-4 rounded-full text-sm transition-all duration-200 disabled:opacity-60"
        >
          {loading ? "Confirming Booking..." : "CONFIRM BOOKING"}
        </button>

      </div>
    </div>
  );
}

export default FlightBooking;