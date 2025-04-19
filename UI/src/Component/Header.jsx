import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import CompanyLogo from "../assets/CompanyLogo.png"
import "../CSS/navbar.css";
import { AuthContext } from "../Context/AuthContext";

export const Header = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = user && user.role === "admin";
  
  return (
    <nav className="header navbar navbar-expand-md navbar-dark">
      <div className="container-fluid">
        {/* Logo */}
        <NavLink to="/" className="navbar-brand d-flex align-items-center">
          <img
            src={CompanyLogo}
            alt="Logo"
            className="me-3"
            style={{ 
              height: "auto", 
              width: "auto", 
              maxHeight: "80px",
              maxWidth: "none"
            }}
          />
          
        </NavLink>
        
        {/* Toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto text-center gap-md-4 mt-1 mt-md-0 align-items-center">
            <li className="nav-item">
              <NavLink to="/" className="nav-link text-white nav-hover">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link text-white nav-hover">
                About
              </NavLink>
            </li>
            
            {/* Admin Services for admin only */}
            {isAdmin && (
              <li className="nav-item">
                <NavLink
                  to="/admin"
                  className="nav-link text-white nav-hover"
                >
                  Admin Services
                </NavLink>
              </li>
            )}
            
            <li className="nav-item">
              <NavLink to="/contact" className="nav-link text-white nav-hover">
                Contact
              </NavLink>
            </li>
            
            {/* My Account or Login */}
            {user ? (
              <li className="nav-item">
                <NavLink
                  to="/my-account"
                  className="nav-link text-white nav-hover"
                >
                  My Account
                </NavLink>
              </li>
            ) : (
              <li className="nav-item">
                <NavLink to="/login" className="nav-link text-white nav-hover">
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};