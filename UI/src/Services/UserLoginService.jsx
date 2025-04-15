import axios from 'axios';

let api = "http://localhost:8081/login";

export function loginUser(userData) {
  return axios.post(api, userData);
}