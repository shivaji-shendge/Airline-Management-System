import React from 'react';
import '../CSS/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section text-white d-flex align-items-center">
      <div className="container">
        <div className="row">

          {/* Column 1 */}
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold">SkyLink</h4>
            <p>
              Your trusted partner for stress-free flight bookings. From domestic routes to global journeys, we help you explore the world.
            </p>
          </div>

          {/* Column 2 */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-semibold">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="footer-link">Home</a></li>
              <li><a href="/flight-booking" className="footer-link">Book a Flight</a></li>
              <li><a href="/about" className="footer-link">About Us</a></li>
              <li><a href="/contact" className="footer-link">Contact</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-semibold">Contact Us</h5>
            <p>Email: shivajishendge2001@gmail.com</p>
            <p>Phone: +91 9373577481</p>
            <p>Address: Dhanukar Colony, Pune, India</p>
          </div>

        </div>
        <div className="text-center pt-3 border-top border-secondary mt-3">
          <small>&copy; {new Date().getFullYear()} SkyLink Airlines. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
