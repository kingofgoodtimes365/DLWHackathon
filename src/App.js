import React from "react";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  return (
    <div
      className="App"
      style={{
        backgroundImage: "url('/HealthCare.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Dashboard />
    </div>
  );
}

export default App;
