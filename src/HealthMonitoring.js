import React, { useEffect, useState } from "react";
import axios from "axios";
import "../components/HealthMonitoring.css";
import {
  FaHeartbeat,
  FaTachometerAlt,
  FaWalking,
  FaHandHoldingHeart,
  FaLungs,
  FaBed,
} from "react-icons/fa";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

const HealthMonitoring = () => {
  const [healthData, setHealthData] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:5000/api/health")
        .then((response) => {
          setHealthData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching health data:", error);
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!healthData) {
    return <h2 className="loading">Loading health data...</h2>;
  }

  const getColor = (value) => (value < 50 ? "red" : "green");

  const stepData = [{ value: (healthData.stepCount / 4000) * 100 }];
  const sleepData = [{ value: (healthData.sleep / 8) * 100 }];

  const isOxygenLow = healthData.oxygenLevel < 90;
  const isBloodPressureAbnormal = (() => {
    const [systolic, diastolic] = healthData.bloodPressure
      .split("/")
      .map(Number);
    return systolic < 90 || systolic > 120 || diastolic < 60 || diastolic > 80;
  })();

  return (
    <div className="health-monitoring">
      <h1>Health Monitoring Dashboard</h1>
      <div className="health-grid">
        {/* Heartbeat */}
        <div className="health-item">
          <FaHeartbeat className="icon" />
          <p>
            <strong>Heartbeat:</strong> {healthData.heartbeat} bpm
          </p>
        </div>

        {/* Blood Pressure */}
        <div
          className={`health-item ${isBloodPressureAbnormal ? "warning" : ""}`}
        >
          <FaTachometerAlt className="icon" />
          <p>
            <strong>Blood Pressure:</strong> {healthData.bloodPressure}
          </p>
          {isBloodPressureAbnormal && (
            <p className="alert-text">
              ⚠️ Abnormal Blood Pressure! Consult a doctor.
            </p>
          )}
        </div>

        {/* Step Count */}
        <div className="health-item gauge-container">
          <FaWalking className="icon" />
          <RadialBarChart
            className="radial-chart"
            width={90}
            height={90}
            cx="50%"
            cy="50%"
            innerRadius="85%"
            outerRadius="100%"
            barSize={10}
            data={stepData}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              minAngle={15}
              background
              clockWise
              dataKey="value"
              fill={getColor(stepData[0].value)}
            />
          </RadialBarChart>
          <p>
            <strong>Step Count:</strong> {healthData.stepCount}
          </p>
        </div>

        {/* Sleep */}
        <div className="health-item gauge-container">
          <FaBed className="icon" />
          <RadialBarChart
            className="radial-chart"
            width={90}
            height={90}
            cx="50%"
            cy="50%"
            innerRadius="85%"
            outerRadius="100%"
            barSize={10}
            data={sleepData}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              minAngle={15}
              background
              clockWise
              dataKey="value"
              fill={getColor(sleepData[0].value)}
            />
          </RadialBarChart>
          <p>
            <strong>Sleep:</strong> {healthData.sleep} hours
          </p>
        </div>

        {/* Oxygen Level */}
        <div className={`health-item ${isOxygenLow ? "warning" : ""}`}>
          <FaLungs className="icon" />
          <p>
            <strong>Oxygen Level:</strong> {healthData.oxygenLevel}%
          </p>
          {isOxygenLow && (
            <p className="alert-text">
              ⚠️ Low Oxygen Level! Seek medical help immediately.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthMonitoring;
