import { useState } from "react";

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

    </div>
  );
}

function FlightSearch() {
  const [tripType, setTripType] = useState("oneway");

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
            className="w-full text-base font-semibold text-gray-800 outline-none placeholder-gray-400"
          />
        </div>
        <div className="border border-gray-200 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">To</p>
          <input
            type="text"
            placeholder="Mumbai"
            className="w-full text-base font-semibold text-gray-800 outline-none placeholder-gray-400"
          />
        </div>
        <div className="border border-gray-200 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">Departure</p>
          <input
            type="date"
            className="w-full text-base font-semibold text-gray-800 outline-none"
          />
        </div>
        <div className="border border-gray-200 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">Travellers & Class</p>
          <p className="text-base font-semibold text-gray-800">1 Adult · Economy</p>
        </div>
      </div>

      {/* Search Button */}
      <div className="flex justify-center">
        <button className="bg-[#eb2026] hover:bg-[#c41a1f] text-white font-bold px-16 py-3 rounded-full text-sm transition-all duration-200 shadow-md">
          SEARCH FLIGHTS
        </button>
      </div>
    </div>
  );
}

function HotelSearch() {
  return (
    <div>
      {/* Search Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="border border-gray-200 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">City or Hotel Name</p>
          <input
            type="text"
            placeholder="Mumbai"
            className="w-full text-base font-semibold text-gray-800 outline-none placeholder-gray-400"
          />
        </div>
        <div className="border border-gray-200 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">Check In</p>
          <input
            type="date"
            className="w-full text-base font-semibold text-gray-800 outline-none"
          />
        </div>
        <div className="border border-gray-200 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">Check Out</p>
          <input
            type="date"
            className="w-full text-base font-semibold text-gray-800 outline-none"
          />
        </div>
      </div>

      {/* Search Button */}
      <div className="flex justify-center">
        <button className="bg-[#eb2026] hover:bg-[#c41a1f] text-white font-bold px-16 py-3 rounded-full text-sm transition-all duration-200 shadow-md">
          SEARCH HOTELS
        </button>
      </div>
    </div>
  );
}

export default Home;