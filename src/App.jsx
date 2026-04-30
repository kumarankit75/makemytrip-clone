// import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar.jsx";
// import Home from "./pages/Home.jsx";
// import Flights from "./pages/Flights.jsx";
// import Hotels from "./pages/Hotels.jsx";

// function App() {
//   return (
//     <>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/flights" element={<Flights />} />
//         <Route path="/hotels" element={<Hotels />} />
//       </Routes>
//     </>
//   );
// }

// export default App;\










import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Flights from "./pages/Flights.jsx";
import Hotels from "./pages/Hotels.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;