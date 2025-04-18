import React, { useState } from 'react';
import "../CSS/FlightBooking.css";

const FlightBooking = () => {
  const [fromLocation, setFromLocation] = useState('Mumbai (BOM)');
  const [toLocation, setToLocation] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [isDirectFlights, setIsDirectFlights] = useState(false);
  const [isNearbyAirports, setIsNearbyAirports] = useState(false);

  const handleSwapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log({
      fromLocation,
      toLocation,
      departDate,
      isDirectFlights,
      isNearbyAirports
    });
  };

  return (
    <div className="flight-booking-container">
      <div className="booking-header">
        
        <p className="slogan">SkyLink: Your Gateway to the Skies.</p>
      </div>

      
      
      <div className="multi-city-option">
        <i className="fas fa-exchange-alt"></i> Create a multi-city route
      </div>

      <form className="search-form" onSubmit={handleSearch}>
        <div className="search-fields-container">
          <div className="search-field">
            <label>From</label>
            <input 
              type="text" 
              placeholder="Country, city or airport" 
              value={fromLocation}
              onChange={(e) => setFromLocation(e.target.value)}
            />
          </div>
          
          <button type="button" className="swap-button" onClick={handleSwapLocations}>
            <i className="fas fa-exchange-alt"></i>
          </button>
          
          <div className="search-field">
            <label>To</label>
            <input 
              type="text" 
              placeholder="Country, city or airport" 
              value={toLocation}
              onChange={(e) => setToLocation(e.target.value)}
            />
          </div>
          
          <div className="search-field">
            <label>Depart</label>
            <input 
              type="text" 
              placeholder="Add date" 
              value={departDate}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => {
                if (!e.target.value) e.target.type = "text";
              }}
              onChange={(e) => setDepartDate(e.target.value)}
            />
          </div>
          
          <button type="submit" className="search-button">Search</button>
        </div>
        
        <div className="search-options">
          <div className="checkbox-option">
            <input 
              type="checkbox" 
              id="nearby-airports" 
              checked={isNearbyAirports}
              onChange={() => setIsNearbyAirports(!isNearbyAirports)}
            />
            <label htmlFor="nearby-airports">Add nearby airports</label>
          </div>
          
          <div className="checkbox-option">
            <input 
              type="checkbox" 
              id="direct-flights" 
              checked={isDirectFlights}
              onChange={() => setIsDirectFlights(!isDirectFlights)}
            />
            <label htmlFor="direct-flights">Direct flights</label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FlightBooking;