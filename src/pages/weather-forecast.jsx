import { useState } from "react";
import axios from "axios";
import "./WeatherForecast.css"; // Make sure to style your component

const WeatherForecast = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async (e) => {
    e.preventDefault();
    try {
      // This should be a request to your backend/serverless function, not directly to OpenWeatherMap
      const response = await axios.get(`/api/weather?city=${city}`);
      setWeather(response.data);
      setError("");
    } catch (err) {
      setError(
        "Failed to fetch weather data. Please check the city name and try again."
      );
      setWeather(null);
    }
  };

  return (
    <div className="weather-app">
      <form onSubmit={fetchWeather}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <div className="error">{error}</div>}
      {weather && (
        <div className="weather-info">
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} km/h</p>
          <p>Description: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;
