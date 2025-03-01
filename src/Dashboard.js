import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HealthMonitoring from "./HealthMonitoring";
import MentalWellBeing from "./MentalWellBeing";
import LifestyleManagement from "./LifestyleManagement";
import { FaHeartbeat, FaSmile, FaRunning } from "react-icons/fa";

const Dashboard = () => {
  return (
    <Router>
      <div>
        <nav className="dashboard-nav">
          <ul>
            <li>
              <Link to="/">
                <FaHeartbeat className="nav-icon" /> Health Monitoring
              </Link>
            </li>
            <li>
              <Link to="/mental-wellbeing">
                <FaSmile className="nav-icon" /> Mental Well-Being
              </Link>
            </li>
            <li>
              <Link to="/lifestyle-management">
                <FaRunning className="nav-icon" /> Lifestyle Management
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<HealthMonitoring />} />
          <Route path="/mental-wellbeing" element={<MentalWellBeing />} />
          <Route
            path="/lifestyle-management"
            element={<LifestyleManagement />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default Dashboard;
