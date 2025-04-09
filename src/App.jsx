// src/App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // API configuration
  const API_KEY = '83ca178d2434828b152288a78ec212c5';
  const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
  
  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(API_URL, {
        params: {
          q: cityName,
          units: 'metric',
          appid: API_KEY
        }
      });
      
      setWeather(response.data);
      setLoading(false);
    } catch (err) {
      setError('City not found or API error');
      setWeather(null);
      setLoading(false);
    }
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchWeather(query);
    }
  };
  
  // Weather icon URL builder
  const getWeatherIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };
  
  return (
    // Background gradient
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-500  flex items-center justify-center py-12 px-4">
      <div className="container max-w-md">
        <h1 className="text-4xl font-bold text-center mb-8 text-white drop-shadow-lg">Weather App</h1>
        
        {/* Search Form - Glass effect */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex bg-white bg-opacity-20 backdrop-blur-lg rounded-lg overflow-hidden border border-white border-opacity-30 shadow-lg">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter city name..."
              className="flex-1 p-4 bg-transparent text-white placeholder-white placeholder-opacity-70 focus:outline-none"
            />
            <button 
              type="submit"
              className="bg-purple-600 bg-opacity-0 text-white px-6 py-4 hover:bg-opacity-10 transition-all duration-300 "
            >
              Search
            </button>
          </div>
        </form>
        
        {/* Loading State */}
        {loading && (
          <div className="text-center p-4 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg border border-white border-opacity-30 shadow-lg mb-4">
            <p className="text-white">Loading weather data...</p>
          </div>
        )}
        
        {/* Error Message */}
        {error && (
          <div className="bg-pink-500 bg-opacity-30 backdrop-blur-lg border-l-4 border-pink-600 text-white p-4 mb-4 rounded-lg shadow-lg">
            <p>{error}</p>
          </div>
        )}
        
        {/* Weather Display */}
        {weather && (
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg overflow-hidden border border-white border-opacity-30 shadow-lg">
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold">{weather.name}</h2>
                  <p className="text-sm opacity-90">{weather.sys.country}</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold">{Math.round(weather.main.temp)}°C</p>
                  <p className="text-sm opacity-90">Feels like: {Math.round(weather.main.feels_like)}°C</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="bg-indigo-500 bg-opacity-30 backdrop-blur-sm rounded-full p-2">
                  <img 
                    src={getWeatherIconUrl(weather.weather[0].icon)} 
                    alt={weather.weather[0].description}
                    className="w-16 h-16"
                  />
                </div>
                <div className="ml-4">
                  <p className="font-bold text-xl capitalize text-white">{weather.weather[0].description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-lg border border-white border-opacity-30">
                  <p className="text-pink-100 text-sm font-medium">Humidity</p>
                  <p className="font-bold text-white text-lg">{weather.main.humidity}%</p>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-lg border border-white border-opacity-30">
                  <p className="text-pink-100 text-sm font-medium">Wind</p>
                  <p className="font-bold text-white text-lg">{weather.wind.speed} m/s</p>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-lg border border-white border-opacity-30">
                  <p className="text-pink-100 text-sm font-medium">Pressure</p>
                  <p className="font-bold text-white text-lg">{weather.main.pressure} hPa</p>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-lg border border-white border-opacity-30">
                  <p className="text-pink-100 text-sm font-medium">Visibility</p>
                  <p className="font-bold text-white text-lg">{(weather.visibility / 1000).toFixed(1)} km</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;