import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/bookings/my`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBookings(res.data.bookings);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f2f2f2] flex items-center justify-center">
        <p className="text-gray-500">Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2f2f2] py-8 px-6">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h1>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm">
            <p className="text-4xl mb-3">✈️</p>
            <p className="text-gray-500 font-medium">No bookings yet!</p>
            <button
              onClick={() => navigate("/flights")}
              className="mt-4 bg-[#eb2026] text-white px-8 py-2 rounded-full text-sm font-bold hover:bg-[#c41a1f] transition-all"
            >
              BOOK A FLIGHT
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white rounded-xl shadow-sm p-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-xs text-gray-400">Booking ID</p>
                    <p className="text-sm font-bold text-gray-800">{booking.bookingId}</p>
                  </div>
                  <span className="bg-green-100 text-green-600 text-xs font-bold px-3 py-1 rounded-full capitalize">
                    {booking.status}
                  </span>
                </div>

                {/* Flight */}
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                  <div>
                    <p className="text-base font-bold text-gray-800">{booking.flight.airline}</p>
                    <p className="text-xs text-gray-400">{booking.flight.flightNumber}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold">{booking.flight.departure}</p>
                    <p className="text-xs text-gray-400">{booking.flight.from}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400">{booking.flight.duration}</p>
                    <div className="w-16 h-px bg-gray-300 my-1 mx-auto"></div>
                    <p className="text-xs text-green-500">{booking.flight.type}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold">{booking.flight.arrival}</p>
                    <p className="text-xs text-gray-400">{booking.flight.to}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-[#eb2026]">
                      ₹{booking.totalPrice.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Passengers */}
                <div>
                  <p className="text-xs font-bold text-gray-500 mb-2">PASSENGERS</p>
                  <div className="flex gap-3 flex-wrap">
                    {booking.passengers.map((p, i) => (
                      <span key={i} className="text-xs bg-blue-50 text-[#008cff] px-3 py-1 rounded-full">
                        {p.name} · {p.age} yrs
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default MyBookings;