import React, { useState } from "react";
import "./index.css";

// Helper function to check if a value is numeric
const isNumeric = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

function App() {
  // state
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [bmi, setBmi] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  let calBmi = (event) => {
    event.preventDefault();

    if (!isNumeric(weight) || !isNumeric(height)) {
      // alert message
      alert("Please enter valid height and weight");
      return;
    }

    // Convert weight to kilograms
    const weightInKg = weight;

    // Convert height to meters
    const heightInMeters = height / 100; // Convert height from cm to meters

    let calculatedBmi = weightInKg / (heightInMeters * heightInMeters);

    setBmi(calculatedBmi.toFixed(1));

    // set message
    if (calculatedBmi < 18.5) {
      setMessage("You are underweight");
    } else if (calculatedBmi >= 18.5 && calculatedBmi < 24.9) {
      setMessage("You are healthy maintain the same");
    } else {
      setMessage("You are overweight");
    }

    setSubmitted(true);
  };

  let reload = () => {
    setWeight("");
    setHeight("");
    setBmi("");
    setMessage("");
    setSubmitted(false);
  };

  // show image based on bmi calculation
  let imgSrc;
  if (bmi < 1) {
    imgSrc = null;
  } else {
    if (bmi < 18.5) {
      imgSrc = require("../src/assets/underweight.png");
    } else if (bmi >= 18.5 && bmi < 24.9) {
      imgSrc = require("../src/assets/healthy.png");
    } else {
      imgSrc = require("../src/assets/overweight.png");
    }
  }

  return (
    <div className="app">
      <div className="container">
        <h2 className="center">BMI CALCULATOR</h2>
        <form onSubmit={calBmi}>
          <div>
            <label>Weight (kg)</label>
            <input
              value={weight}
              onChange={(event) => setWeight(event.target.value)}
            />
          </div>
          <div>
            <label>Height (cm)</label>
            <input
              value={height}
              onChange={(event) => setHeight(event.target.value)}
            />
          </div>
          <div>
            <button className="btn" type="submit">
              Submit
            </button>
            <button className="btn btn-outline" onClick={reload} type="button">
              Reload
            </button>
          </div>
        </form>
        {submitted && (
          <div className="center">
            <h3>Your BMI is: {bmi}</h3>
            <p>{message}</p>
          </div>
        )}
        {submitted && bmi && imgSrc && (
          <div className="img-container">
            <img src={imgSrc} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
