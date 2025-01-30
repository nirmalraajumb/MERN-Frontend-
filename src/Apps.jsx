import React, { useState } from 'react';
import { fetchWeatherData } from './weatherApi';

function Apps() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const saveWeatherData = async () => {
    if (!data || !data.main) return;
    
    const formattedData = {
      inputLocation: location,
      location: {
        city: data.name,
        country: data.sys.country,
      },
      temperature: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      conditions: data.weather[0].main,
      timestamp: new Date(),
    };

    try {
      await fetch('http://localhost:5000/api/weather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });
      alert('Weather data successfully stored in MongoDB');
    } catch (error) {
      console.error('Error saving weather data:', error);
      alert('Failed to store weather data.');
    }
  };

  const searchLocation = async (event) => {
    if (event.key === 'Enter') {
      await fetchAndStoreWeatherData();
    }
  };

  const fetchAndStoreWeatherData = async () => {
    if (!location) {
      alert('Please enter a location.');
      return;
    }

    const weatherData = await fetchWeatherData(location);
    if (weatherData) {
      setData(weatherData);
    }
    setLocation('');
  };

  return (
    <>
      <br />
      <div className="app">
        <div className="search">
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder="Enter Location"
            type="text"
          />
        </div>

        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>

            {/* Button below the temperature */}
            {data.main && (
              <button className='button' onClick={saveWeatherData}>
                <div>
                  <span>Store Weather</span>
                </div>
              </button>
            )}
          </div>

          {data.name !== undefined && (
            <div className="bottom">
              <div className="feels">
                <p>Feels Like</p>
                {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°F</p> : null}
              </div>
              <div className="humidity">
                <p>Humidity</p>
                {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              </div>
              <div className="wind">
                <p>Wind Speed</p>
                {data.wind ? <p className="bold">{data.wind.speed.toFixed()} MPH</p> : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Apps;