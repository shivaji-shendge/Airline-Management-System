// src/Components/MyAccount/EditProfile.jsx
import React from "react";

const EditProfile = ({ profile, handleInputChange, handleSubmit }) => (
  <div className="edit-profile-container">
    <div className="profile-card">
      <div className="profile-card-header"><h4>Edit Profile</h4></div>
      <div className="profile-card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>NAME</label>
              <input type="text" name="name" className="form-control" value={profile.name} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>EMAIL ID</label>
              <input type="email" name="email" className="form-control" value={profile.email} readOnly disabled style={{ backgroundColor: "#f5f5f5", opacity: 0.8, cursor: "not-allowed" }} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>ISD</label>
              <input type="text" name="isd" className="form-control" value={profile.isd} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>MOBILE</label>
              <input type="text" name="mobile" className="form-control" value={profile.mobile} onChange={handleInputChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>GENDER</label>
              <select name="gender" className="form-control" value={profile.gender} onChange={handleInputChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>AGE</label>
              <input type="number" name="age" className="form-control" value={profile.age} onChange={handleInputChange} />
            </div>
          </div>
          <div className="form-action">
            <button type="submit" className="update-button">UPDATE PROFILE</button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default EditProfile;
