import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Flights from "./pages/Flights.jsx";
import Hotels from "./pages/Hotels.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import FlightBooking from "./pages/FlightBooking.jsx";
import HotelBooking from "./pages/HotelBooking.jsx";
import BookingSummary from "./pages/BookingSummary.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";

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
        <Route path="/flight-booking" element={
          <ProtectedRoute><FlightBooking /></ProtectedRoute>
        } />
        <Route path="/hotel-booking" element={
          <ProtectedRoute><HotelBooking /></ProtectedRoute>
        } />
        <Route path="/booking-summary" element={
          <ProtectedRoute><BookingSummary /></ProtectedRoute>
        } />
        <Route path="/my-bookings" element={
          <ProtectedRoute><MyBookings /></ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

export default App;