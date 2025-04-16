import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/front_logo.webp";
import "../CSS/navbar.css";
import { AuthContext } from "../Context/AuthContext";

export const Header = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = user && user.email === "admin@gmail.com";
  
  return (
    <nav className="header navbar navbar-expand-md navbar-dark px-3 py-2">
      <div className="container-fluid">
        {/* Logo */}
        <NavLink to="/" className="navbar-brand d-flex align-items-center">
          <img
            src={logo}
            alt="Logo"
            className="rounded-circle me-2"
            style={{ height: "50px", width: "50px", objectFit: "cover" }}
          />
          <span style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
            AeroReserve@
          </span>
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
          <ul className="navbar-nav ms-auto text-center gap-md-3 mt-2 mt-md-0">
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
            
            {/* Services for admin only */}
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
            
            {/* My Account or Login Dropdown - No icon next to Login text */}
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
              <li className="nav-item dropdown position-relative pe-4">
                <a 
                  className="nav-link text-white nav-hover" 
                  href="#" 
                  id="loginDropdown" 
                  role="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  Login
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="loginDropdown" 
                    style={{
                      minWidth: "180px", 
                      boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
                      borderRadius: "0.5rem",
                      border: "none",
                      marginTop: "0.5rem"
                    }}>
                  <li>
                    <NavLink to="/user-login" className="dropdown-item py-2 px-3">
                      <i className="fas fa-user me-2"></i> User Login
                    </NavLink>
                  </li>
                  <li><hr className="dropdown-divider mx-2 my-1" /></li>
                  <li>
                    <NavLink to="/admin-login" className="dropdown-item py-2 px-3">
                      <i className="fas fa-user-shield me-2"></i> Admin Login
                    </NavLink>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};