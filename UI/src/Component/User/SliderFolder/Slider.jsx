import React, { useState, useEffect } from 'react';
import '../../../CSS/slider.css';

// Import the images
import aircraftOnRunway from '../../../assets/aircraftOnRunway.jpg';
import airoplaneCabin from '../../../assets/airoplaneCabin.jpg';
import airoplaneInSky from '../../../assets/airoplaneInSky.webp';
import checkinAirport from '../../../assets/checkinairport.webp';
import inFlightDining from '../../../assets/inFlightDining.jpg';
import sunsetView from '../../../assets/sunsetView.jpeg';

const ImageSlider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    { src: aircraftOnRunway, caption: 'Aircraft Ready for Takeoff' },
    { src: airoplaneCabin, caption: 'Comfortable Cabin Experience' },
    { src: checkinAirport, caption: 'Quick and Easy Check-in' },
    { src: inFlightDining, caption: 'Premium In-flight Dining' },
    { src: sunsetView, caption: 'Spectacular Views' },
    { src: airoplaneInSky, caption: 'Your Journey Begins Here' }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="slider-background">
      <div className="slider-container">
        <div className="slider">
          {images.map((image, index) => (
            <div
              key={index}
              className={`slide ${index === currentImageIndex ? 'active' : ''}`}
              style={{ transform: `translateX(${100 * (index - currentImageIndex)}%)` }}
            >
              <img src={image.src} alt={image.caption} />
              <div className="caption">{image.caption}</div>
            </div>
          ))}
        </div>

        <button className="slider-btn prev-btn" onClick={prevImage}>
          &#10094;
        </button>
        <button className="slider-btn next-btn" onClick={nextImage}>
          &#10095;
        </button>

        <div className="slider-dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => goToImage(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
