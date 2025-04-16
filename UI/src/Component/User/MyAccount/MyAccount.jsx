// src/Components/MyAccount/MyAccount.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import EditProfile from "./EditProfile";
import ViewMyBooking from "./ViewBooking"; // ✅ Correct import
import MyCoupons from "./MyCoupons";
import { UpdateUser } from "../../../Services/UpdateProfile";
import "../../../CSS/MyAccount.css";

const MyAccount = () => {
  const { user, setUser } = useContext(AuthContext);
  const [activeComponent, setActiveComponent] = useState("editProfile");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    isd: "+91",
    mobile: "",
    gender: "Male",
    age: ""
  });

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        email: user.email || "",
        isd: "+91",
        mobile: user.contact || "",
        gender: user.gender || "Male",
        age: user.age || ""
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateData = {
      name: profile.name,
      email: profile.email,
      contact: profile.mobile,
      gender: profile.gender,
      age: profile.age
    };
    UpdateUser(updateData)
      .then((response) => {
        setUser({ ...user, ...updateData });
        alert(response.data || "Profile updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        alert("Failed to update profile.");
      });
  };

  return (
    <div className="account-container">
      <div className="account-wrapper">
        <div className="mobile-menu-toggle">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span>☰</span> Menu
          </button>
        </div>
        <div className={`sidebar ${mobileMenuOpen ? "mobile-open" : ""}`}>
          <div className="sidebar-header">
            <h4>My Account</h4>
            <button className="mobile-close-btn" onClick={() => setMobileMenuOpen(false)}>✕</button>
          </div>
          <div className="sidebar-menu">
            <button className={`menu-item ${activeComponent === "editProfile" ? "active" : ""}`} onClick={() => { setActiveComponent("editProfile"); setMobileMenuOpen(false); }}>Edit Profile</button>
            <button className={`menu-item ${activeComponent === "viewBooking" ? "active" : ""}`} onClick={() => { setActiveComponent("viewBooking"); setMobileMenuOpen(false); }}>View My Booking</button>
            <button className={`menu-item ${activeComponent === "myCoupons" ? "active" : ""}`} onClick={() => { setActiveComponent("myCoupons"); setMobileMenuOpen(false); }}>My Coupons</button>
            <button className="menu-item" onClick={() => console.log("Logging out...")}>Logout</button>
          </div>
        </div>
        <div className="content-area">
          {activeComponent === "editProfile" && (
            <EditProfile
              profile={profile}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          )}
          {activeComponent === "viewBooking" && <ViewMyBooking />} {/* ✅ Fixed name */}
          {activeComponent === "myCoupons" && <MyCoupons />}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
