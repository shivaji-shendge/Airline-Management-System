import axios from "axios";
const API_URL = "http://localhost:8081";
export const addAirport = async (airportData) => {
    try {
        const response = await axios.post(`${API_URL}/addCityAirport`, airportData);

      return response.data;
    } catch (error) {
      console.error("Error while adding airport:", error);
      throw error;
    }
  };