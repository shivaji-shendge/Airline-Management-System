import axios from "axios";
const API_URL = "http://localhost:8081";
export const addFlight = async (flightData) => {
    try {
      const response = await axios.post(`${API_URL}/addFlightDetails`, flightData);
      return response.data;
    } catch (error) {
      console.error("Error while adding flight:", error);
      throw error;
    }
  };