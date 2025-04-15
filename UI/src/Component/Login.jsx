import React from "react";
import { useState } from "react";
import { registerUser } from "../Services/UserRegistrationService";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/Login.css";

export const Login = () => {
  let [user,setUser]=useState({
    "name":"",
    "email":"",
    "contact":"",
    "gender":""
  });

  let [msg,setMsg]=useState("")

  let uniHandler=(e)=>{
    setUser(prevData=>{
      return {...prevData, [e.target.name]:e.target.value}
    })
  }

  let handleRegisterUser=(e)=>{
    e.preventDefault();
    let promise = registerUser(user);
    promise.then((res)=>{
      setMsg(res.data);
    }).catch((error)=>{
      setMsg(error.message)
    })
  }

  return (
    <div className="auth-container">
      <div className="auth-box container-fluid">
        <div className="row">
          {/* Login Section */}
          <div className="col-12 col-md-6 login-section d-flex flex-column align-items-center">
            <h2 className="mb-4">Login</h2>

            <div className="mb-3 w-100">
              <label htmlFor="email" className="form-label">Email</label>
              <div className="d-flex flex-column flex-md-row gap-2 login-verify">
                <input
                  type="email"
                  className="form-control input-height"
                  id="email"
                  placeholder="Enter your email"
                />
                <button className="btn btn-outline-primary button-height">
                  Verify
                </button>
              </div>
            </div>

            <div className="d-flex flex-column flex-md-row w-100 justify-content-between gap-2">
              <button className="btn btn-primary w-100">Login</button>
              <button className="btn btn-outline-secondary w-100">Forgot Password</button>
            </div>
          </div>

          {/* Registration Section */}
          <div className="col-12 col-md-6 register-section d-flex flex-column align-items-center">
            <h2 className="mb-4">Register</h2>
            <form action="">
            <div className="mb-3 w-100">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="name"
                placeholder="Enter your name"
                onChange={(e)=>uniHandler(e)}
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
                onChange={(e)=>uniHandler(e)}
              />
            </div>

            <div className="mb-3 w-100">
              <label htmlFor="contactRegister" className="form-label">Contact</label>
              <input
                type="tel"
                className="form-control"
                id="contactRegister"
                name="contact"
                placeholder="Enter your contact number"
                onChange={(e)=>uniHandler(e)}
              />
            </div>

            <div className="mb-3 w-100">
              <label htmlFor="gender" className="form-label">Gender</label>
              <select className="form-select" id="gender" defaultValue="" name="gender" onChange={(e)=>uniHandler(e)} >
                <option value="" disabled>Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button className="btn btn-secondary w-100" onClick={(e)=>handleRegisterUser(e)}>Register</button>
            {msg}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
