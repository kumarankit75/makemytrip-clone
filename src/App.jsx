import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Flights from "./pages/Flights.jsx";
import Hotels from "./pages/Hotels.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import FlightBooking from "./pages/FlightBooking.jsx";
import HotelBooking from "./pages/HotelBooking.jsx";
import Payment from "./pages/Payment.jsx";
import BookingSummary from "./pages/BookingSummary.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import Profile from "./pages/Profile.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import AdminRoute from "./utils/AdminRoute.jsx";

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
        <Route path="/payment" element={
          <ProtectedRoute><Payment /></ProtectedRoute>
        } />
        <Route path="/booking-summary" element={
          <ProtectedRoute><BookingSummary /></ProtectedRoute>
        } />
        <Route path="/my-bookings" element={
          <ProtectedRoute><MyBookings /></ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute><Profile /></ProtectedRoute>
        } />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <AdminRoute><AdminDashboard /></AdminRoute>
        } />
      </Routes>
    </>
  );
}

export default App;