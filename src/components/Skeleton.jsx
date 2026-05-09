function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="w-32">
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-20"></div>
        </div>
        <div className="text-center">
          <div className="h-6 bg-gray-200 rounded w-16 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-10"></div>
        </div>
        <div className="text-center">
          <div className="h-3 bg-gray-200 rounded w-20 mb-2"></div>
          <div className="h-px bg-gray-200 w-24 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="text-center">
          <div className="h-6 bg-gray-200 rounded w-16 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-10"></div>
        </div>
        <div className="text-right">
          <div className="h-8 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded-full w-28"></div>
        </div>
      </div>
    </div>
  );
}

function SkeletonHotelCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden flex animate-pulse">
      <div className="w-56 h-44 bg-gray-200 shrink-0"></div>
      <div className="flex-1 p-4 flex justify-between">
        <div className="flex-1">
          <div className="h-5 bg-gray-200 rounded w-48 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-32 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-16 mb-3"></div>
          <div className="flex gap-2">
            <div className="h-6 bg-gray-200 rounded-full w-20"></div>
            <div className="h-6 bg-gray-200 rounded-full w-16"></div>
            <div className="h-6 bg-gray-200 rounded-full w-24"></div>
          </div>
        </div>
        <div className="text-right">
          <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-24 mb-1"></div>
          <div className="h-3 bg-gray-200 rounded w-16 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded-full w-28"></div>
        </div>
      </div>
    </div>
  );
}

function SkeletonBookingCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
      <div className="flex justify-between mb-4">
        <div className="flex gap-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          <div>
            <div className="h-3 bg-gray-200 rounded w-16 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
        <div className="h-6 bg-gray-200 rounded-full w-20"></div>
      </div>
      <div className="flex justify-between mb-4 pb-4 border-b border-gray-100">
        <div className="h-4 bg-gray-200 rounded w-32"></div>
        <div className="h-4 bg-gray-200 rounded w-24"></div>
        <div className="h-4 bg-gray-200 rounded w-20"></div>
        <div className="h-4 bg-gray-200 rounded w-24"></div>
        <div className="h-6 bg-gray-200 rounded w-20"></div>
      </div>
      <div className="flex gap-2">
        <div className="h-6 bg-gray-200 rounded-full w-28"></div>
        <div className="h-6 bg-gray-200 rounded-full w-24"></div>
      </div>
    </div>
  );
}

export { SkeletonCard, SkeletonHotelCard, SkeletonBookingCard };