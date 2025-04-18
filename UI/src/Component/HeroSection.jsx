import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/HeroSection.css';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate('/flight-booking');
  };

  return (
    <div className="hero-section d-flex align-items-center justify-content-end">
      <div className="container me-md-5">
        <div className="row justify-content-end">
          <div className="col-md-6 text-end custom-text-color">
            <h1 className="display-5 fw-bold mb-3">
              Your next journey<br />starts here
            </h1>
            <p className="lead">
              Explore the world with unbeatable flight deals and hassle-free booking.
              Your adventure begins with a single click.
            </p>
            <button 
              className="btn btn-warning fw-semibold px-4 py-2 mt-3"
              onClick={handleBooking}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
