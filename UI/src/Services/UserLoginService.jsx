import axios from 'axios';

let api = "http://localhost:8081/login";

// Send email as query param
export function loginUser(email) {
  return axios.post(api, null, {
    params: { email }
  });
}