import { useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7cadbba8577a3ed2dcd3c400f93cdb86&units=metric`
      );
      setWeather(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
      setWeather(null);
    }
  };

  return (
    <div>
      <form onSubmit={fetchWeather}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter a city name"
        />
        <button type="submit">Get Weather</button>
      </form>
      {weather && (
        <div>
          <h2>Weather in {weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
          <p>Description: {weather.weather[0].description}</p>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default App;
