import { useLocation, useNavigate } from "react-router-dom";

function BookingSummary() {
  const { state: booking } = useLocation();
  const navigate = useNavigate();

  if (!booking) {
    return (
      <div className="min-h-screen bg-[#f2f2f2] flex items-center justify-center">
        <p className="text-gray-500">No booking found.</p>
      </div>
    );
  }

  const isFlight = booking.bookingType === "flight";

  return (
    <div className="min-h-screen bg-[#f2f2f2] py-8 px-6">
      <div className="max-w-2xl mx-auto">

        {/* Success Banner */}
        <div className="bg-green-500 rounded-xl p-6 mb-6 text-center">
          <p className="text-4xl mb-2">{isFlight ? "✈️" : "🏨"}</p>
          <h1 className="text-2xl font-bold text-white">Booking Confirmed!</h1>
          <p className="text-green-100 text-sm mt-1">
            Booking ID: <span className="font-bold">{booking.bookingId}</span>
          </p>
        </div>

        {/* Flight Details */}
        {isFlight && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-sm font-bold text-gray-500 mb-4">FLIGHT DETAILS</h2>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-bold text-gray-800">{booking.flight.airline}</p>
                <p className="text-xs text-gray-400">{booking.flight.flightNumber}</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold">{booking.flight.departure}</p>
                <p className="text-xs text-gray-400">{booking.flight.from}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400">{booking.flight.duration}</p>
                <div className="w-16 h-px bg-gray-300 my-1 mx-auto"></div>
                <p className="text-xs text-green-500">{booking.flight.type}</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold">{booking.flight.arrival}</p>
                <p className="text-xs text-gray-400">{booking.flight.to}</p>
              </div>
            </div>
          </div>
        )}

        {/* Hotel Details */}
        {!isFlight && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-sm font-bold text-gray-500 mb-4">HOTEL DETAILS</h2>
            <div className="flex gap-4">
              <img
                src={booking.hotel.image}
                alt={booking.hotel.name}
                className="w-24 h-20 object-cover rounded-lg shrink-0"
              />
              <div className="flex-1">
                <p className="text-lg font-bold text-gray-800">{booking.hotel.name}</p>
                <p className="text-sm text-gray-400">{booking.hotel.location}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Check In: <span className="font-semibold">{booking.checkIn}</span> →
                  Check Out: <span className="font-semibold">{booking.checkOut}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Rooms: <span className="font-semibold">{booking.rooms}</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Passengers / Guests */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-sm font-bold text-gray-500 mb-4">
            {isFlight ? "PASSENGERS" : "GUESTS"}
          </h2>
          {(isFlight ? booking.passengers : booking.guests).map((p, index) => (
            <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
              <p className="text-sm font-semibold text-gray-800">{p.name}</p>
              <p className="text-sm text-gray-400">{p.gender} · {p.age} yrs</p>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between">
            <p className="text-base font-bold text-gray-800">Total Paid</p>
            <p className="text-xl font-bold text-[#eb2026]">
              ₹{booking.totalPrice.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/my-bookings")}
            className="flex-1 border border-[#008cff] text-[#008cff] font-bold py-3 rounded-full text-sm hover:bg-[#008cff] hover:text-white transition-all"
          >
            MY BOOKINGS
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex-1 bg-[#eb2026] hover:bg-[#c41a1f] text-white font-bold py-3 rounded-full text-sm transition-all"
          >
            GO HOME
          </button>
        </div>

      </div>
    </div>
  );
}

export default BookingSummary;