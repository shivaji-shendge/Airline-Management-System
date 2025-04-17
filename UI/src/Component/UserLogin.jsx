import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { registerUser } from "../Services/UserRegistrationService";
import { loginUser } from "../Services/UserLoginService";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/Login.css";

export const UserLogin = () => {
  // State for login
  const [user, setUserState] = useState({
    email: "",
  });

  // State for registration
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
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [activeTab, setActiveTab] = useState("login");
  
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Login input handler
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

  const handleVerifyEmail = () => {
    if (!user.email) {
      setLoginMsg("Please enter your email address");
      return;
    }
    
    // Here you would call your API to send OTP to the email
    // For now we'll just simulate it
    setLoginMsg("OTP has been sent to your email!");
    setShowOtpVerification(true);
  };

  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus to next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Handle backspace to move to previous input
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleResendOtp = (e) => {
    e.preventDefault();
    setLoginMsg("A new OTP has been sent to your email!");
    // Reset OTP fields
    setOtp(["", "", "", "", "", ""]);
    // Focus on first input
    setTimeout(() => {
      const firstInput = document.getElementById("otp-input-0");
      if (firstInput) firstInput.focus();
    }, 100);
  };

  const handleRegisterUser = (e) => {
    e.preventDefault();
    registerUser(registrationData)
      .then((res) => {
        setRegisterMsg(res.data);
        setLoginMsg("");
        window.alert("Registration successful!");
        // Switch to login tab after successful registration
        setActiveTab("login");
      })
      .catch((error) => {
        console.error("Registration error:", error);
        setRegisterMsg("Registration failed. Please try again.");
        setLoginMsg("");
        window.alert("Registration failed. Please try again.");
      });
  };

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    
    if (showOtpVerification) {
      const fullOtp = otp.join("");
      if (fullOtp.length !== 6) {
        setLoginMsg("Please enter the complete 6-digit OTP");
        return;
      }
      
      // Here you would validate the OTP through your API
      // For now we'll simulate it by proceeding with login
    }

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
              <h2>User Login</h2>
              
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
              <h2>User Registration</h2>
              
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
}