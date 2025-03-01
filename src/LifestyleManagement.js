import React, { useState } from "react";
import "./LifestyleManagement.css";

const LifestyleManagement = () => {
  const [option, setOption] = useState("");
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState("");

  const handleOptionChange = (e) => {
    setOption(e.target.value);
    setFormData({});
    setResult("");
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult("Processing... (Demo mode, backend not connected)");
  };

  return (
    <div className="lifestyle-container">
      <h1>Lifestyle Management</h1>
      <p>Select an option to proceed:</p>
      <div className="options">
        <button
          className={option === "diet" ? "selected" : ""}
          onClick={() => setOption("diet")}
        >
          Diet Recommendations
        </button>
        <button
          className={option === "sleep" ? "selected" : ""}
          onClick={() => setOption("sleep")}
        >
          Sleep Quality Prediction
        </button>
      </div>

      {option && (
        <form onSubmit={handleSubmit} className="input-form">
          {option === "diet" && (
            <>
              <label>
                BMI:{" "}
                <input
                  type="number"
                  name="bmi"
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Disease Type:{" "}
                <input
                  type="text"
                  name="disease_type"
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Severity:{" "}
                <input
                  type="text"
                  name="severity"
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Daily Caloric Intake:{" "}
                <input
                  type="number"
                  name="daily_caloric_intake"
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Cholesterol (mg/dL):{" "}
                <input
                  type="number"
                  name="cholesterol"
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Glucose (mg/dL):{" "}
                <input
                  type="number"
                  name="glucose"
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Dietary Restrictions:{" "}
                <input
                  type="text"
                  name="dietary_restrictions"
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Allergies:{" "}
                <input
                  type="text"
                  name="allergies"
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Preferred Cuisine:{" "}
                <input
                  type="text"
                  name="preferred_cuisine"
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Weekly Exercise Hours:{" "}
                <input
                  type="number"
                  name="weekly_exercise_hours"
                  onChange={handleInputChange}
                  required
                />
              </label>
            </>
          )}

          {option === "sleep" && (
            <>
              <label>
                Daily Sleep Hours:{" "}
                <input
                  type="number"
                  name="sleep_hours"
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Exercise Hours Per Week:{" "}
                <input
                  type="number"
                  name="exercise"
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Stress Level (1-10):{" "}
                <input
                  type="number"
                  name="stress"
                  min="1"
                  max="10"
                  onChange={handleInputChange}
                  required
                />
              </label>
            </>
          )}

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      )}

      {result && <div className="result-box">{result}</div>}
    </div>
  );
};

export default LifestyleManagement;
