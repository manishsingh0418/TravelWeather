import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { ForecastCard } from './components/ForecastCard';
import { Compass } from 'lucide-react';
import type { WeatherData, City } from './types';

function App() {
  const [city, setCity] = useState<City | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (searchQuery: string) => {
    try {
      setLoading(true);
      setError(null);

      // First, get coordinates for the city
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchQuery)}&count=1&language=en&format=json`
      );
      const geoData = await geoResponse.json();

      if (!geoData.results?.length) {
        throw new Error('City not found');
      }

      const { latitude, longitude, name } = geoData.results[0];
      setCity({ name, latitude, longitude });

      // Then, get weather data
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max&timezone=auto`
      );
      const weatherData = await weatherResponse.json();
      setWeather(weatherData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-8">
          {/* Header */}
          <div className="flex items-center space-x-2">
            <Compass className="text-blue-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">Travel Weather</h1>
          </div>

          {/* Search */}
          <SearchBar onSearch={handleSearch} />

          {/* Status Messages */}
          {loading && (
            <div className="text-gray-600">Loading weather data...</div>
          )}
          {error && (
            <div className="text-red-500">{error}</div>
          )}

          {/* Weather Display */}
          {weather && city && (
            <div className="w-full space-y-8">
              <WeatherCard weather={weather} city={city.name} />
              <ForecastCard weather={weather} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;