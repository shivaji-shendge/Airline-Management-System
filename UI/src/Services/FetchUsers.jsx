import axios from "axios";
const API_URL = "http://localhost:8081";

export const getAllUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/getAllUsers`); // assuming GET /users returns List<UserInfo>
      return response.data;
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw error;
    }
  };