// import { Link, useLocation } from "react-router-dom";

// function Navbar() {
//   const location = useLocation();

//   const navLinks = [
//     { label: "Flights", path: "/flights" },
//     { label: "Hotels", path: "/hotels" },
//   ];

//   return (
//     <nav className="w-full bg-white shadow-md sticky top-0 z-50">
//       <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

//         {/* Logo */}
//         <Link to="/" className="text-2xl font-extrabold tracking-tight flex">
//           <span className="text-[#eb2026]">make</span>
//           <span className="text-black">my</span>
//           <span className="text-[#008cff]">trip</span>
//         </Link>

//         {/* Nav Links */}
//         <ul className="flex gap-8 list-none m-0 p-0">
//           {navLinks.map((link) => (
//             <li key={link.path}>
//               <Link
//                 to={link.path}
//                 className={`text-sm font-medium pb-1 border-b-2 transition-all duration-200 no-underline
//                   ${location.pathname === link.path
//                     ? "text-[#008cff] border-[#008cff]"
//                     : "text-gray-600 border-transparent hover:text-[#008cff] hover:border-[#008cff]"
//                   }`}
//               >
//                 {link.label}
//               </Link>
//             </li>
//           ))}
//         </ul>

//         {/* Auth Buttons */}
//         <div className="flex gap-3">
//           <button className="border border-[#008cff] text-[#008cff] px-5 py-2 rounded text-sm font-semibold hover:bg-[#008cff] hover:text-white transition-all duration-200">
//             Login
//           </button>
//           <button className="bg-[#eb2026] text-white px-5 py-2 rounded text-sm font-semibold hover:bg-[#c41a1f] transition-all duration-200">
//             Sign Up
//           </button>
//         </div>

//       </div>
//     </nav>
//   );
// }

// export default Navbar;








import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold tracking-tight flex">
          <span className="text-[#eb2026]">make</span>
          <span className="text-black">my</span>
          <span className="text-[#008cff]">trip</span>
        </Link>

        {/* Nav Links */}
        <div className="flex gap-8">
          <Link to="/flights" className="text-sm font-medium text-gray-600 hover:text-[#008cff] no-underline">
            Flights
          </Link>
          <Link to="/hotels" className="text-sm font-medium text-gray-600 hover:text-[#008cff] no-underline">
            Hotels
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-3">
          <button className="border border-[#008cff] text-[#008cff] px-5 py-2 rounded text-sm font-semibold hover:bg-[#008cff] hover:text-white transition-all duration-200">
            Login
          </button>
          <button className="bg-[#eb2026] text-white px-5 py-2 rounded text-sm font-semibold hover:bg-[#c41a1f] transition-all duration-200">
            Sign Up
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;