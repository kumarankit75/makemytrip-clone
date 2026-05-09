import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f2f2f2] flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-8xl font-extrabold text-[#008cff] mb-4">404</p>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Oops! Page not found
        </h1>
        <p className="text-gray-400 text-sm mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="border border-[#008cff] text-[#008cff] px-6 py-3 rounded-full text-sm font-bold hover:bg-[#008cff] hover:text-white transition-all"
          >
            GO BACK
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-[#eb2026] hover:bg-[#c41a1f] text-white px-6 py-3 rounded-full text-sm font-bold transition-all"
          >
            GO HOME
          </button>
        </div>
        <div className="mt-12 text-6xl">✈️</div>
        <p className="text-gray-300 text-sm mt-2">
          Let's get you back on track!
        </p>
      </div>
    </div>
  );
}

export default NotFound;