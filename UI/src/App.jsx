import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './Component/Home';
import { Login } from './Component/Login';
import { About } from './Component/About';
import AdminDashboard from './Component/Admin/AdminDashboard';
import ViewUser from './Component/Admin/ViewUser';
import AddFlightSchedule from './Component/Admin/AddFlightSchedule';
import ViewFlights from './Component/Admin/ViewFlights';
import ViewBookings from './Component/Admin/VIewBooking';
import { Contact } from './Component/contact';
import MyAccount from './Component/User/MyAccount/MyAccount';
import AddFlight from './Component/Admin/AddFlight';
import FlightBooking from './Component/FlightBooking';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/flight-booking" element={<FlightBooking />} />


        {/* Admin Dashboard with nested routes */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<h2>Welcome to Admin Dashboard</h2>} />
          <Route path="users" element={<ViewUser />} />
          <Route path="bookings" element={<ViewBookings />} />
          <Route path="addflight" element={<AddFlight />} />
          <Route path="addflightschedule" element={<AddFlightSchedule />} />
          <Route path="view-schedule" element={<ViewFlights />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;