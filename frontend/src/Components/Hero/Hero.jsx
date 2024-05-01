import React from "react";
import "./Hero.css";

import arrow_icon from "../Assets/arrow.png";
import hero_image from "../Assets/img/Picsart_24-02-24_12-35-54-581-removebg-preview.png";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>Get Rid of Offline Stress and Shop with Student Outfit</h2>
        <div>
          <h1>E-Commerce Website</h1>
          <h1>For all Barak Valley School & College Uniforms</h1>
        </div>
        <div className="hero-latest-btn">
          <div>SHOP NOW</div>
          <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="" />
      </div>
    </div>
  );
};

export default Hero;
