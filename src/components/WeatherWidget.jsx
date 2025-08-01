import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from '../services/weatherService';
const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadWeather = async () => {
      try {
        const data = await fetchWeatherData();
        setWeather(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadWeather();
  }, []);
  const handleRefresh = async () => {
    setLoading(true);
    try {
      const data = await fetchWeatherData();
      setWeather(data);
    } catch (error) {
      console.error('Error refreshing weather:', error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <div className="weather-info">Loading weather...</div>;
  }
  return (
    <div className="weather-info">
      <div className="weather-details">
        <img 
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
          alt={weather.weather[0].main} 
          className="weather-icon" 
        />
        <div>
          <h3 id="weather-location">{weather.name}, {weather.sys.country}</h3>
          <div id="weather-description">{weather.weather[0].description}</div>
          <div>Temperature: <span id="weather-temp">{Math.round(weather.main.temp)}</span>°C</div>
          <div>Humidity: <span id="weather-humidity">{weather.main.humidity}</span>%</div>
        </div>
      </div>
      <button className="refresh-btn" onClick={handleRefresh} title="Refresh weather data">
        ↻
      </button>
    </div>
  );
};
export default WeatherWidget;
