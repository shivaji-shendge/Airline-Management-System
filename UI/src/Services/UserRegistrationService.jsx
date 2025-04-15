import axios from 'axios';

let api = "http://localhost:8081/register";

export function registerUser(userData) {
  return axios.post(api, userData);
}