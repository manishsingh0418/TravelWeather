import React from 'react';
import { Cloud, Droplets, Wind, ThermometerSun } from 'lucide-react';
import type { WeatherData } from '../types';

interface WeatherCardProps {
  weather: WeatherData;
  city: string;
}

export function WeatherCard({ weather, city }: WeatherCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{city}</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <ThermometerSun className="text-orange-500" />
          <div>
            <p className="text-sm text-gray-500">Temperature</p>
            <p className="text-lg font-semibold">{weather.current.temperature_2m}°C</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Droplets className="text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Humidity</p>
            <p className="text-lg font-semibold">{weather.current.relative_humidity_2m}%</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Cloud className="text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Feels Like</p>
            <p className="text-lg font-semibold">{weather.current.apparent_temperature}°C</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Wind className="text-teal-500" />
          <div>
            <p className="text-sm text-gray-500">Wind Speed</p>
            <p className="text-lg font-semibold">{weather.current.wind_speed_10m} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
}