import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { loginAdmin } from "../Services/AdminLoginService";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/AdminLogin.css";

export const AdminLogin = () => {
  const [user, setUserState] = useState({
    email: "",
  });
  const [loginMsg, setLoginMsg] = useState("");
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const uniHandler = (e) => {
    setUserState((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
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

    loginAdmin(user.email)
      .then((res) => {
        setUser(res.data); // Save admin data to context
        const message = "Login successful! Welcome, " + res.data.name;
        setLoginMsg(message);
        window.alert(message); // 🔔 Show success alert
        navigate("/"); // Redirect to home
      })
      .catch((error) => {
        const errorMsg = "Login failed. Please try again.";
        setLoginMsg(errorMsg);
        window.alert(errorMsg); // 🔔 Show failure alert
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="login-card">
          <h2>Admin Login</h2>
          
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
        </div>
      </div>
    </div>
  );
};