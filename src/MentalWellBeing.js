import React from "react";
import Chatbot from "./Chatbot";
import "./MentalWellBeing.css";

const MentalWellBeing = () => {
  return (
    <div className="mental-container">
      <h1>Mental Well-Being Chatbot</h1>
      <p>Talk to our AI for mental wellness guidance.</p>
      <Chatbot />
    </div>
  );
};

export default MentalWellBeing;
