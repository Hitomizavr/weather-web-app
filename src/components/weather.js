import React from "react";

const Weather = props => (
  <div>
    {props.city && (
      <div className="outWeather">
        <p>
          Location: {props.city}, {props.country}
        </p>
        <p>Temperature: {props.temp}</p>
        <p>Pressure: {props.pressure}</p>
        <p>Sunset: {props.sunset}</p>
      </div>
    )}
  </div>
);

export default Weather;
  