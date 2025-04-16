import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { loginAdmin } from "../Services/AdminLoginService"; // Import the login function
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/Login.css";

export const AdminLogin = () => {
  const [user, setUserState] = useState({
    email: "",
  });

  const [loginMsg, setLoginMsg] = useState("");

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const uniHandler = (e) => {
    setUserState((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

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
      <div className="auth-box container-fluid">
        <div className="row">
          <div className="col-12 col-md-6 login-section d-flex flex-column align-items-center">
            <h2 className="mb-4">Admin Login</h2>

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
        </div>
      </div>
    </div>
  );
};
