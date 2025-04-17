import React from "react";
import { Header } from "./Header";
import ImageSlider from "./User/SliderFolder/slider";
import logo from "../assets/backgroundImage.webp";

export const Home = () => {
  return (
    <>
      <Header />
      <div className="w-100">
        <ImageSlider/>
        <img
          src={logo}
          alt="Hero"
          className="img-fluid w-100"
          style={{ maxHeight: "600px", objectFit: "cover" }}
        />
      </div>
    </>
  );
};
