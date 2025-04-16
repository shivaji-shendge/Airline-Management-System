import axios from 'axios';

let api = "http://localhost:8081/adminlogin";

// Send email as query param
export function loginAdmin(email) {
  return axios.post(api, null, {
    params: { email }
  });
}