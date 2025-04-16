import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { registerUser } from "../Services/UserRegistrationService";
import { loginUser } from "../Services/UserLoginService";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/Login.css";

export const UserLogin = () => {
  // Match AdminLogin pattern exactly for login
  const [user, setUserState] = useState({
    email: "",
  });

  // Separate state for registration
  const [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
    contact: "",
    gender: "",
    age: ""
  });

  const [loginMsg, setLoginMsg] = useState("");
  const [registerMsg, setRegisterMsg] = useState("");

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Login input handler - matches AdminLogin exactly
  const uniHandler = (e) => {
    setUserState((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // Registration input handler
  const handleRegistrationInput = (e) => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegisterUser = (e) => {
    e.preventDefault();
    registerUser(registrationData)
      .then((res) => {
        setRegisterMsg(res.data);
        setLoginMsg("");
        window.alert("Registration successful!");
      })
      .catch((error) => {
        console.error("Registration error:", error);
        setRegisterMsg("Registration failed. Please try again.");
        setLoginMsg("");
        window.alert("Registration failed. Please try again.");
      });
  };

  // Login handler - matches AdminLogin exactly
  const handleLogin = (e) => {
    e.preventDefault();

    loginUser(user.email)
      .then((res) => {
        setUser(res.data); // Store user data in context
        const successMsg = "Login successful! Welcome, " + res.data.name;
        setLoginMsg(successMsg);
        window.alert(successMsg); // Alert on successful login
        navigate("/"); // Redirect to home page
      })
      .catch((error) => {
        const failMsg = "Login failed. Please try again.";
        setLoginMsg(failMsg);
        window.alert(failMsg); // Alert on failed login
      });
  };

  // Custom inline styles for consistency
  const inputStyle = {
    height: "45px",
    padding: "0.375rem 0.75rem",
    width: "100%"
  };

  // Custom styles for the form
  const formStyle = {
    width: "90%",
    maxWidth: "450px"
  };

  return (
    <div className="auth-container">
      <div className="auth-box container-fluid">
        <div className="row">
          {/* Login Section - Matches AdminLogin exactly */}
          <div className="col-12 col-md-6 login-section d-flex flex-column align-items-center">
            <h2 className="mb-4">Login</h2>

            <div className="mb-3 w-100">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control input-height"
                id="email"
                name="email"
                placeholder="Enter your email"
                onChange={uniHandler}
                value={user.email}
              />
            </div>

            <button className="btn btn-primary w-100" onClick={handleLogin}>
              Login
            </button>

            <div className="mt-3 text-success fw-semibold">
              {loginMsg && <span>{loginMsg}</span>}
            </div>
          </div>

          {/* Registration Section */}
          <div className="col-12 col-md-6 register-section d-flex flex-column align-items-center">
            <h2 className="mb-4">Register</h2>
            <form style={formStyle}>
              <div className="mb-3 w-100">
                <label htmlFor="username" className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="name"
                  placeholder="Enter your name"
                  onChange={handleRegistrationInput}
                  value={registrationData.name}
                  style={inputStyle}
                />
              </div>

              <div className="mb-3 w-100">
                <label htmlFor="emailRegister" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="emailRegister"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleRegistrationInput}
                  value={registrationData.email}
                  style={inputStyle}
                />
              </div>

              <div className="mb-3 w-100">
                <label htmlFor="contactRegister" className="form-label">Mobile Number</label>
                <input
                  type="tel"
                  className="form-control"
                  id="contactRegister"
                  name="contact"
                  placeholder="Enter your mobile number"
                  onChange={handleRegistrationInput}
                  value={registrationData.contact}
                  style={inputStyle}
                />
              </div>

              {/* Gender and Age with more space */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="gender" className="form-label">Gender</label>
                  <select
                    className="form-select"
                    id="gender"
                    name="gender"
                    value={registrationData.gender}
                    onChange={handleRegistrationInput}
                    style={inputStyle}
                  >
                    <option value="" disabled>Select your gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="col-md-6">
                  <label htmlFor="age" className="form-label">Age</label>
                  <input
                    type="number"
                    className="form-control"
                    id="age"
                    name="age"
                    placeholder="Enter your age"
                    min="1"
                    max="120"
                    onChange={handleRegistrationInput}
                    value={registrationData.age}
                    style={inputStyle}
                  />
                </div>
              </div>

              <button 
                className="btn btn-secondary w-100" 
                onClick={handleRegisterUser}
                style={{ height: "45px" }}
              >
                Register
              </button>

              <div className="mt-3 text-success fw-semibold">
                {registerMsg && <span>{registerMsg}</span>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};