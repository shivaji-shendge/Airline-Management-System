import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { registerUser } from "../Services/UserRegistrationService";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/Login.css";

// Use a consistent API base URL
const API_BASE_URL = "http://localhost:8081";

export const Login = () => {
  const [user, setUserState] = useState({ email: "" });
  const [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
    contact: "",
    gender: "",
    age: ""
  });

  const [loginMsg, setLoginMsg] = useState("");
  const [registerMsg, setRegisterMsg] = useState("");
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]); // 4-digit OTP
  const [activeTab, setActiveTab] = useState("login");
  const [verifiedUserData, setVerifiedUserData] = useState(null);

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const uniHandler = (e) => {
    setUserState((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegistrationInput = (e) => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value
    });
  };

  const handleVerifyEmail = async () => {
    if (!user.email) {
      setLoginMsg("Please enter your email address");
      return;
    }

    try {
      setLoginMsg("Sending verification request...");
      const response = await axios.post(`${API_BASE_URL}/verifyEmail`, { email: user.email });
      
      // Extract complete user data from response
      const { message, userData } = response.data;
      
      console.log("Email verification successful:", message);
      
      // Store complete user data for later use after OTP verification
      if (userData) {
        setVerifiedUserData(userData);
      }
      
      setLoginMsg("OTP has been sent to your email!");
      setShowOtpVerification(true);

      // Focus on first OTP input
      setTimeout(() => {
        const firstInput = document.getElementById("otp-input-0");
        if (firstInput) firstInput.focus();
      }, 100);
    } catch (error) {
      console.error("Email verification error:", error);
      const errorMessage = error.response?.data?.message || "Failed to verify email. Please ensure it is registered.";
      setLoginMsg(errorMessage);
    }
  };

  const handleOtpChange = (index, value) => {
    // Only allow digits
    if (value && !/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleResendOtp = (e) => {
    e.preventDefault();
    handleVerifyEmail();
  };

  const handleRegisterUser = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!registrationData.name || !registrationData.email || !registrationData.contact) {
      setRegisterMsg("Please fill all required fields");
      return;
    }
    
    registerUser(registrationData)
      .then((res) => {
        setRegisterMsg(res.data);
        setLoginMsg("");
        window.alert("Registration successful!");
        setActiveTab("login");
      })
      .catch((error) => {
        console.error("Registration error:", error);
        setRegisterMsg("Registration failed. Please try again.");
        setLoginMsg("");
      });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (showOtpVerification) {
      const fullOtp = otp.join("");
      if (fullOtp.length !== 4) {
        setLoginMsg("Please enter the complete 4-digit OTP");
        return;
      }

      try {
        setLoginMsg("Verifying OTP...");
        
        // Only verify the OTP, we already have the user data
        const response = await axios.post(`${API_BASE_URL}/verifyOtp`, {
          email: user.email,
          otp: fullOtp
        });

        console.log("OTP verified successfully:", response.data.message);
        
        // Use the user data we already stored during email verification
        if (verifiedUserData) {
          // Now that OTP is verified, we can set the user in auth context
          setUser(verifiedUserData);
          
          const successMsg = "Login successful! Welcome, " + verifiedUserData.name;
          setLoginMsg(successMsg);
          window.alert(successMsg);
          
          // Navigate to home page after successful login, regardless of role
          // Admin will see the Admin Services in navbar
          navigate("/");
        } else {
          setLoginMsg("Error: User data not found. Please try again.");
        }
      } catch (error) {
        console.error("OTP verification error:", error);
        const errorMessage = error.response?.data?.message || "Invalid OTP. Please try again.";
        setLoginMsg(errorMessage);
      }
    } else {
      setLoginMsg("Please verify your email first.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="login-card">
          <div className="tabs">
            <button
              className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button
              className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => setActiveTab('register')}
            >
              Register
            </button>
          </div>

          {activeTab === 'login' ? (
            <div className="tab-content">
              <h2>Login</h2>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="input-group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={uniHandler}
                    value={user.email}
                  />
                  <button
                    className="verify-btn"
                    type="button"
                    onClick={handleVerifyEmail}
                    disabled={showOtpVerification}
                    aria-label="Verify email"
                  >
                    Verify
                  </button>
                </div>
              </div>

              {showOtpVerification && (
                <div className="otp-section">
                  <label>Enter OTP</label>
                  <div className="otp-inputs">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-input-${index}`}
                        type="text"
                        className="otp-input"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        autoFocus={index === 0}
                        aria-label={`OTP digit ${index + 1}`}
                      />
                    ))}
                  </div>
                  <div className="resend-link">
                    <a href="#" onClick={handleResendOtp}>
                      Didn't receive the code? Resend
                    </a>
                  </div>
                </div>
              )}

              {loginMsg && (
                <div className="message-box" role="alert">
                  {loginMsg}
                </div>
              )}

              <button
                className="login-btn"
                onClick={handleLogin}
                type="submit"
              >
                Login
              </button>

              <div className="switch-tab-prompt">
                <p>
                  Don't have an account? <a href="#" onClick={() => setActiveTab('register')}>Register now</a>
                </p>
              </div>
            </div>
          ) : (
            <div className="tab-content">
              <h2>Registration</h2>

              <div className="form-group">
                <label htmlFor="username">Name</label>
                <input
                  type="text"
                  id="username"
                  name="name"
                  placeholder="Enter your name"
                  onChange={handleRegistrationInput}
                  value={registrationData.name}
                  className="full-width-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="emailRegister">Email</label>
                <input
                  type="email"
                  id="emailRegister"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleRegistrationInput}
                  value={registrationData.email}
                  className="full-width-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contactRegister">Mobile Number</label>
                <input
                  type="tel"
                  id="contactRegister"
                  name="contact"
                  placeholder="Enter your mobile number"
                  onChange={handleRegistrationInput}
                  value={registrationData.contact}
                  className="full-width-input"
                />
              </div>

              <div className="form-row">
                <div className="form-group half-width">
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={registrationData.gender}
                    onChange={handleRegistrationInput}
                    className="full-width-input"
                  >
                    <option value="" disabled>Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group half-width">
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    placeholder="Enter age"
                    min="1"
                    max="120"
                    onChange={handleRegistrationInput}
                    value={registrationData.age}
                    className="full-width-input"
                  />
                </div>
              </div>

              {registerMsg && (
                <div className="message-box" role="alert">
                  {registerMsg}
                </div>
              )}

              <button
                className="register-btn"
                onClick={handleRegisterUser}
                type="submit"
              >
                Register
              </button>

              <div className="switch-tab-prompt">
                <p>
                  Already have an account? <a href="#" onClick={() => setActiveTab('login')}>Login now</a>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};