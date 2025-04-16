// src/Components/MyAccount/ViewMyBooking.jsx
import React from "react";

const ViewMyBooking = () => (
  <div className="bookings-container">
    <div className="profile-card">
      <div className="profile-card-header"><h4>My Bookings</h4></div>
      <div className="profile-card-body">
        <div className="empty-state">
          <div className="empty-icon"><i className="bi bi-calendar-x"></i></div>
          <h5>No Bookings Found</h5>
          <p>You don't have any bookings yet.</p>
          <button className="action-button">Book Now</button>
        </div>
      </div>
    </div>
  </div>
);

export default ViewMyBooking;
