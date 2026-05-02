import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { bookingData, type } = state || {};

  const [card, setCard] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "number") {
      value = value.replace(/\D/g, "").slice(0, 16);
      value = value.replace(/(.{4})/g, "$1 ").trim();
    }
    if (e.target.name === "expiry") {
      value = value.replace(/\D/g, "").slice(0, 4);
      if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
    }
    if (e.target.name === "cvv") {
      value = value.replace(/\D/g, "").slice(0, 3);
    }
    setCard({ ...card, [e.target.name]: value });
  };

  const handleSubmit = async () => {
    if (!card.name || !card.number || !card.expiry || !card.cvv) {
      setError("Please fill all card details");
      return;
    }
    if (card.number.replace(/\s/g, "").length < 16) {
      setError("Please enter a valid 16 digit card number");
      return;
    }
    if (card.cvv.length < 3) {
      setError("Please enter a valid CVV");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const endpoint = type === "flight"
        ? "/api/bookings/flight"
        : "/api/bookings/hotel";

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}${endpoint}`,
        { ...bookingData, paymentStatus: "paid" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/booking-summary", { state: res.data.booking });
    } catch (err) {
      setError(err.response?.data?.message || "Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!state) {
    return (
      <div className="min-h-screen bg-[#f2f2f2] flex items-center justify-center">
        <p className="text-gray-500">No booking data found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2f2f2] py-8 px-6">
      <div className="max-w-xl mx-auto">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Secure Payment</h1>
          <p className="text-gray-400 text-sm mt-1">
            Complete your booking by entering card details
          </p>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
          <h2 className="text-sm font-bold text-gray-500 mb-3">ORDER SUMMARY</h2>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-semibold text-gray-800">
                {type === "flight"
                  ? `${bookingData.flight.airline} · ${bookingData.flight.from} → ${bookingData.flight.to}`
                  : bookingData.hotel.name}
              </p>
              <p className="text-xs text-gray-400">
                {type === "flight"
                  ? `${bookingData.passengers.length} Passenger(s)`
                  : `${bookingData.rooms} Room(s) · ${bookingData.guests.length} Guest(s)`}
              </p>
            </div>
            <p className="text-xl font-bold text-[#eb2026]">
              ₹{bookingData.totalPrice.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Card Form */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-sm font-bold text-gray-500 mb-4">CARD DETAILS</h2>

          {/* Card Preview */}
          <div className="bg-gradient-to-r from-[#008cff] to-[#0056b3] rounded-xl p-5 mb-6 text-white">
            <p className="text-xs opacity-70 mb-4">DEBIT / CREDIT CARD</p>
            <p className="text-xl font-mono tracking-widest mb-4">
              {card.number || "•••• •••• •••• ••••"}
            </p>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs opacity-70">CARD HOLDER</p>
                <p className="text-sm font-semibold uppercase">
                  {card.name || "YOUR NAME"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs opacity-70">EXPIRES</p>
                <p className="text-sm font-semibold">
                  {card.expiry || "MM/YY"}
                </p>
              </div>
            </div>
          </div>

          {/* Inputs */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">CARD HOLDER NAME</label>
              <input
                type="text"
                name="name"
                value={card.name}
                onChange={handleChange}
                placeholder="Name on card"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#008cff] transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">CARD NUMBER</label>
              <input
                type="text"
                name="number"
                value={card.number}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#008cff] transition-all font-mono tracking-widest"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">EXPIRY DATE</label>
                <input
                  type="text"
                  name="expiry"
                  value={card.expiry}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#008cff] transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">CVV</label>
                <input
                  type="password"
                  name="cvv"
                  value={card.cvv}
                  onChange={handleChange}
                  placeholder="•••"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#008cff] transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Secure Badge */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-green-500 text-lg">🔒</span>
          <p className="text-xs text-gray-400">
            Your payment is secured with 256-bit SSL encryption
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Pay Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#eb2026] hover:bg-[#c41a1f] text-white font-bold py-4 rounded-full text-sm transition-all duration-200 disabled:opacity-60"
        >
          {loading ? "Processing Payment..." : `PAY ₹${bookingData.totalPrice.toLocaleString()}`}
        </button>

      </div>
    </div>
  );
}

export default Payment;