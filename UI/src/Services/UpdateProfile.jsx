import axios from 'axios';

let api = "http://localhost:8081/update-profile";

export function UpdateUser(userData) {
  console.log("Sending profile update request:", userData);
  // Using PUT method to match backend endpoint
  return axios.put(api, userData)
    .then(response => {
      console.log("Profile update success:", response);
      return response;
    })
    .catch(error => {
      console.error("Profile update error:", error);
      throw error;
    });
}