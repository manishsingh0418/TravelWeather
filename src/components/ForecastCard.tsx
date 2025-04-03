import React from 'react';
import { Cloud, Sun } from 'lucide-react';
import type { WeatherData } from '../types';

interface ForecastCardProps {
  weather: WeatherData;
}

export function ForecastCard({ weather }: ForecastCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">7-Day Forecast</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {weather.daily.time.map((date, index) => (
          <div key={date} className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-500">
              {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </p>
            <div className="mt-2 flex items-center justify-between">
              {weather.daily.precipitation_probability_max[index] > 50 ? (
                <Cloud className="text-gray-600" size={24} />
              ) : (
                <Sun className="text-yellow-500" size={24} />
              )}
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">
                  {weather.daily.temperature_2m_max[index]}°C
                </p>
                <p className="text-xs text-gray-500">
                  {weather.daily.temperature_2m_min[index]}°C
                </p>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              <p>Precipitation: {weather.daily.precipitation_probability_max[index]}%</p>
              <p>Wind: {weather.daily.wind_speed_10m_max[index]} km/h</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}