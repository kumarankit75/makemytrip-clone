import { useState } from "react";
import flights from "../data/flightsData.js";

function Flights() {
  const [sortBy, setSortBy] = useState("price");
  const [maxPrice, setMaxPrice] = useState(6000);

  const filtered = flights
    .filter((f) => f.price <= maxPrice)
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "duration") return a.duration.localeCompare(b.duration);
      if (sortBy === "departure") return a.departure.localeCompare(b.departure);
      return 0;
    });

  return (
    <div className="min-h-screen bg-[#f2f2f2]">

      {/* Header */}
      <div className="bg-[#008cff] py-6 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-white">
            Delhi → Mumbai
          </h1>
          <p className="text-blue-100 text-sm mt-1">
            {flights.length} flights found · 1 Adult · Economy
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6 flex gap-6">

        {/* Sidebar Filters */}
        <div className="w-64 shrink-0">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h2 className="text-sm font-bold text-gray-700 mb-4">FILTERS</h2>

            {/* Price Filter */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-gray-500 mb-2">MAX PRICE</p>
              <input
                type="range"
                min="2000"
                max="6000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#008cff]"
              />
              <p className="text-sm font-bold text-[#008cff] mt-1">
                ₹{maxPrice.toLocaleString()}
              </p>
            </div>

            {/* Sort By */}
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2">SORT BY</p>
              {["price", "duration", "departure"].map((option) => (
                <label key={option} className="flex items-center gap-2 mb-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sort"
                    value={option}
                    checked={sortBy === option}
                    onChange={() => setSortBy(option)}
                    className="accent-[#008cff]"
                  />
                  <span className="text-sm text-gray-600 capitalize">{option}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Flight Results */}
        <div className="flex-1 flex flex-col gap-4">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center shadow-sm">
              <p className="text-gray-500 text-lg font-medium">No flights found for selected filters</p>
            </div>
          ) : (
            filtered.map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))
          )}
        </div>

      </div>
    </div>
  );
}

function FlightCard({ flight }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 flex items-center justify-between hover:shadow-md transition-shadow duration-200">

      {/* Airline */}
      <div className="w-32">
        <p className="text-sm font-bold text-gray-800">{flight.airline}</p>
        <p className="text-xs text-gray-400">{flight.flightNumber}</p>
      </div>

      {/* Departure */}
      <div className="text-center">
        <p className="text-xl font-bold text-gray-800">{flight.departure}</p>
        <p className="text-xs text-gray-400">{flight.fromCode}</p>
      </div>

      {/* Duration */}
      <div className="text-center flex flex-col items-center">
        <p className="text-xs text-gray-400 mb-1">{flight.duration}</p>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full border-2 border-[#008cff]"></div>
          <div className="w-20 h-px bg-gray-300"></div>
          <div className="text-[#008cff] text-xs">✈</div>
        </div>
        <p className="text-xs text-green-500 mt-1">{flight.type}</p>
      </div>

      {/* Arrival */}
      <div className="text-center">
        <p className="text-xl font-bold text-gray-800">{flight.arrival}</p>
        <p className="text-xs text-gray-400">{flight.toCode}</p>
      </div>

      {/* Seats */}
      <div className="text-center">
        <p className="text-xs text-gray-400">Seats left</p>
        <p className={`text-sm font-bold ${flight.seats <= 5 ? "text-red-500" : "text-gray-700"}`}>
          {flight.seats}
        </p>
      </div>

      {/* Price & Book */}
      <div className="text-right">
        <p className="text-xs text-gray-400">starting from</p>
        <p className="text-2xl font-bold text-[#eb2026]">₹{flight.price.toLocaleString()}</p>
        <button className="mt-2 bg-[#eb2026] hover:bg-[#c41a1f] text-white text-sm font-bold px-6 py-2 rounded-full transition-all duration-200">
          BOOK NOW
        </button>
      </div>

    </div>
  );
}

export default Flights;