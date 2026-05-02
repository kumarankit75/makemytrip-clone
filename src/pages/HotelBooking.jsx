import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function HotelBooking() {
  const { state: hotel } = useLocation();
  const navigate = useNavigate();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState([{ name: "", age: "", gender: "Male" }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const nights =
    checkIn && checkOut
      ? Math.max(
          1,
          Math.ceil(
            (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
          )
        )
      : 1;

  const totalPrice = hotel.price * rooms * nights;

  const handleGuestChange = (index, field, value) => {
    const updated = [...guests];
    updated[index][field] = value;
    setGuests(updated);
  };

  const handleSubmit = async () => {
    if (!checkIn || !checkOut) {
      setError("Please select check-in and check-out dates");
      return;
    }
    for (let g of guests) {
      if (!g.name || !g.age) {
        setError("Please fill all guest details");
        return;
      }
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/bookings/hotel`,
        { hotel, guests, checkIn, checkOut, rooms, totalPrice },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/booking-summary", { state: res.data.booking });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!hotel) {
    return (
      <div className="min-h-screen bg-[#f2f2f2] flex items-center justify-center">
        <p className="text-gray-500">No hotel selected. Go back and select a hotel.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2f2f2] py-8 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Hotel Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 flex gap-4">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-32 h-24 object-cover rounded-lg shrink-0"
          />
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-800">{hotel.name}</h2>
            <p className="text-sm text-gray-400 mb-2">{hotel.location}</p>
            <div className="flex items-center gap-2">
              <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                {hotel.rating} ⭐
              </span>
              <span className="text-xs text-gray-400">{hotel.roomType}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-[#eb2026]">
              ₹{hotel.price.toLocaleString()}
            </p>
            <p className="text-xs text-gray-400">per night</p>
          </div>
        </div>

        {/* Dates & Rooms */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-sm font-bold text-gray-500 mb-4">STAY DETAILS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">CHECK IN</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#008cff] transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">CHECK OUT</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#008cff] transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">ROOMS</label>
              <select
                value={rooms}
                onChange={(e) => setRooms(Number(e.target.value))}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#008cff] transition-all"
              >
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>{r} Room{r > 1 ? "s" : ""}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Guest Details */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-sm font-bold text-gray-500 mb-4">GUEST DETAILS</h2>
          {guests.map((guest, index) => (
            <div key={index} className="mb-6 pb-6 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
              <p className="text-sm font-semibold text-gray-700 mb-3">Guest {index + 1}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">FULL NAME</label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    value={guest.name}
                    onChange={(e) => handleGuestChange(index, "name", e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#008cff] transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">AGE</label>
                  <input
                    type="number"
                    placeholder="Enter age"
                    value={guest.age}
                    onChange={(e) => handleGuestChange(index, "age", e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#008cff] transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">GENDER</label>
                  <select
                    value={guest.gender}
                    onChange={(e) => handleGuestChange(index, "gender", e.target.value)}
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
          <button
            onClick={() => setGuests([...guests, { name: "", age: "", gender: "Male" }])}
            className="mt-4 text-sm text-[#008cff] font-semibold hover:underline"
          >
            + Add Guest
          </button>
        </div>

        {/* Price Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-sm font-bold text-gray-500 mb-4">PRICE SUMMARY</h2>
          <div className="flex justify-between mb-2">
            <p className="text-sm text-gray-600">
              ₹{hotel.price.toLocaleString()} × {rooms} room(s) × {nights} night(s)
            </p>
            <p className="text-sm font-semibold text-gray-800">
              ₹{totalPrice.toLocaleString()}
            </p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-sm text-gray-600">Taxes & Fees</p>
            <p className="text-sm font-semibold text-green-500">Included</p>
          </div>
          <div className="border-t border-gray-100 pt-3 mt-3 flex justify-between">
            <p className="text-base font-bold text-gray-800">Total Amount</p>
            <p className="text-xl font-bold text-[#eb2026]">
              ₹{totalPrice.toLocaleString()}
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

export default HotelBooking;