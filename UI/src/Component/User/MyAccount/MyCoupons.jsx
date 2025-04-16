// src/Components/MyAccount/MyCoupons.jsx
import React from "react";

const MyCoupons = () => (
  <div className="coupons-container">
    <div className="profile-card">
      <div className="profile-card-header"><h4>My Coupons</h4></div>
      <div className="profile-card-body">
        <div className="empty-state">
          <div className="empty-icon"><i className="bi bi-ticket-perforated"></i></div>
          <h5>No Coupons Available</h5>
          <p>You don't have any coupons yet.</p>
        </div>
      </div>
    </div>
  </div>
);

export default MyCoupons;
