import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import flights from "../data/flightsData.js";

function Flights() {
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("price");
  const [maxPrice, setMaxPrice] = useState(6000);

  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const date = searchParams.get("date") || "";
  const passengers = searchParams.get("passengers") || "1";

  const filtered = flights
    .filter((f) => {
      const matchFrom = from
        ? f.from.toLowerCase().includes(from.toLowerCase())
        : true;
      const matchTo = to
        ? f.to.toLowerCase().includes(to.toLowerCase())
        : true;
      const matchPrice = f.price <= maxPrice;
      return matchFrom && matchTo && matchPrice;
    })
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
            {from && to ? `${from} → ${to}` : "All Flights"}
          </h1>
          <p className="text-blue-100 text-sm mt-1">
            {filtered.length} flights found
            {date ? ` · ${date}` : ""}
            {` · ${passengers} Adult(s) · Economy`}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6 flex gap-6">

        {/* Sidebar Filters */}
        <div className="w-64 shrink-0">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h2 className="text-sm font-bold text-gray-700 mb-4">FILTERS</h2>

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
              <p className="text-4xl mb-3">✈️</p>
              <p className="text-gray-500 text-lg font-medium">
                No flights found for {from} → {to}
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Try searching for Delhi → Mumbai
              </p>
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
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 flex items-center justify-between hover:shadow-md transition-shadow duration-200">
      <div className="w-32">
        <p className="text-sm font-bold text-gray-800">{flight.airline}</p>
        <p className="text-xs text-gray-400">{flight.flightNumber}</p>
      </div>
      <div className="text-center">
        <p className="text-xl font-bold text-gray-800">{flight.departure}</p>
        <p className="text-xs text-gray-400">{flight.fromCode}</p>
      </div>
      <div className="text-center flex flex-col items-center">
        <p className="text-xs text-gray-400 mb-1">{flight.duration}</p>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full border-2 border-[#008cff]"></div>
          <div className="w-20 h-px bg-gray-300"></div>
          <div className="text-[#008cff] text-xs">✈</div>
        </div>
        <p className="text-xs text-green-500 mt-1">{flight.type}</p>
      </div>
      <div className="text-center">
        <p className="text-xl font-bold text-gray-800">{flight.arrival}</p>
        <p className="text-xs text-gray-400">{flight.toCode}</p>
      </div>
      <div className="text-center">
        <p className="text-xs text-gray-400">Seats left</p>
        <p className={`text-sm font-bold ${flight.seats <= 5 ? "text-red-500" : "text-gray-700"}`}>
          {flight.seats}
        </p>
      </div>
      <div className="text-right">
        <p className="text-xs text-gray-400">starting from</p>
        <p className="text-2xl font-bold text-[#eb2026]">₹{flight.price.toLocaleString()}</p>
        <button
          onClick={() => navigate("/flight-booking", { state: flight })}
          className="mt-2 bg-[#eb2026] hover:bg-[#c41a1f] text-white text-sm font-bold px-6 py-2 rounded-full transition-all duration-200"
        >
          BOOK NOW
        </button>
      </div>
    </div>
  );
}

export default Flights;