import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { bookingData, type } = state || {};
  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error("Failed to load payment gateway. Check your internet connection.");
        setLoading(false);
        return;
      }

      // Create order
      const token = localStorage.getItem("token");
      const orderRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/payment/create-order`,
        { amount: bookingData.totalPrice },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const order = orderRes.data.order;

      // Open Razorpay checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "MakeMyTrip",
        description: type === "flight"
          ? `${bookingData.flight.airline} · ${bookingData.flight.from} → ${bookingData.flight.to}`
          : bookingData.hotel.name,
        order_id: order.id,
        handler: async (response) => {
          try {
            // Verify payment
            const verifyRes = await axios.post(
              `${import.meta.env.VITE_API_URL}/api/payment/verify`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingData,
                type,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Payment successful! Booking confirmed 🎉");
            navigate("/booking-summary", { state: verifyRes.data.booking });
          } catch (err) {
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: bookingData.passengers?.[0]?.name || bookingData.guests?.[0]?.name || "",
          email: localStorage.getItem("userEmail") || "",
        },
        theme: {
          color: "#008cff",
        },
        modal: {
          ondismiss: () => {
            toast.error("Payment cancelled");
            setLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
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
            Complete your booking with Razorpay
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

        {/* Payment Methods */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-sm font-bold text-gray-500 mb-4">PAYMENT OPTIONS</h2>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {["💳 Cards", "🏦 Net Banking", "📱 UPI"].map((method) => (
              <div
                key={method}
                className="border border-gray-200 rounded-lg p-3 text-center text-sm font-medium text-gray-600"
              >
                {method}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 text-center mb-4">
            All payment methods available via Razorpay secure checkout
          </p>

          {/* Secure Badge */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-green-500 text-lg">🔒</span>
            <p className="text-xs text-gray-400">
              Secured by Razorpay · 256-bit SSL encryption
            </p>
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-[#008cff] hover:bg-[#0056b3] text-white font-bold py-4 rounded-full text-sm transition-all duration-200 disabled:opacity-60"
          >
            {loading ? "Opening Payment Gateway..." : `PAY ₹${bookingData.totalPrice.toLocaleString()} →`}
          </button>
        </div>

        {/* Razorpay Logo */}
        <div className="text-center">
          <p className="text-xs text-gray-400">Powered by</p>
          <p className="text-sm font-bold text-[#008cff]">Razorpay</p>
        </div>

      </div>
    </div>
  );
}

export default Payment;