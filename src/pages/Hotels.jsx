import { useState } from "react";
import hotels from "../data/hotelsData.js";

function Hotels() {
  const [sortBy, setSortBy] = useState("price");
  const [maxPrice, setMaxPrice] = useState(15000);
  const [minRating, setMinRating] = useState(0);

  const filtered = hotels
    .filter((h) => h.price <= maxPrice && h.rating >= minRating)
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "reviews") return b.reviews - a.reviews;
      return 0;
    });

  return (
    <div className="min-h-screen bg-[#f2f2f2]">

      {/* Header */}
      <div className="bg-[#008cff] py-6 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-white">Hotels in Mumbai</h1>
          <p className="text-blue-100 text-sm mt-1">
            {hotels.length} hotels found · 1 Room · 2 Adults
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
              <p className="text-xs font-semibold text-gray-500 mb-2">MAX PRICE PER NIGHT</p>
              <input
                type="range"
                min="2000"
                max="15000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#008cff]"
              />
              <p className="text-sm font-bold text-[#008cff] mt-1">
                ₹{maxPrice.toLocaleString()}
              </p>
            </div>

            {/* Rating Filter */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-gray-500 mb-2">MIN RATING</p>
              {[0, 3, 4, 4.5].map((r) => (
                <label key={r} className="flex items-center gap-2 mb-2 cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    value={r}
                    checked={minRating === r}
                    onChange={() => setMinRating(r)}
                    className="accent-[#008cff]"
                  />
                  <span className="text-sm text-gray-600">
                    {r === 0 ? "All" : `${r}⭐ & above`}
                  </span>
                </label>
              ))}
            </div>

            {/* Sort By */}
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2">SORT BY</p>
              {["price", "rating", "reviews"].map((option) => (
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

        {/* Hotel Results */}
        <div className="flex-1 flex flex-col gap-4">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center shadow-sm">
              <p className="text-gray-500 text-lg font-medium">
                No hotels found for selected filters
              </p>
            </div>
          ) : (
            filtered.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))
          )}
        </div>

      </div>
    </div>
  );
}

function HotelCard({ hotel }) {
  const discount = Math.round(
    ((hotel.originalPrice - hotel.price) / hotel.originalPrice) * 100
  );

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden flex hover:shadow-md transition-shadow duration-200">

      {/* Image */}
      <img
        src={hotel.image}
        alt={hotel.name}
        className="w-56 h-44 object-cover shrink-0"
      />

      {/* Details */}
      <div className="flex-1 p-4 flex justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{hotel.name}</h3>
          <p className="text-sm text-gray-400 mb-2">{hotel.location}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
              {hotel.rating} ⭐
            </span>
            <span className="text-xs text-gray-400">{hotel.reviews.toLocaleString()} reviews</span>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2">
            {hotel.amenities.map((a) => (
              <span
                key={a}
                className="text-xs bg-blue-50 text-[#008cff] px-2 py-1 rounded-full"
              >
                {a}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Book */}
        <div className="text-right flex flex-col justify-between">
          <div>
            <p className="text-xs text-gray-400 line-through">
              ₹{hotel.originalPrice.toLocaleString()}
            </p>
            <p className="text-2xl font-bold text-[#eb2026]">
              ₹{hotel.price.toLocaleString()}
            </p>
            <p className="text-xs text-green-500 font-semibold">{discount}% off</p>
            <p className="text-xs text-gray-400">per night</p>
          </div>
          <button className="bg-[#eb2026] hover:bg-[#c41a1f] text-white text-sm font-bold px-6 py-2 rounded-full transition-all duration-200">
            BOOK NOW
          </button>
        </div>
      </div>

    </div>
  );
}

export default Hotels;