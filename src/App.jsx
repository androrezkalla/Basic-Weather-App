import React, { useState } from 'react';

const Weather = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const search = async (e) => {
    if (e.key === 'Enter') {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&appid=bbeac64cfcccb55a846070e17439f18f`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.cod === 200) {
        setWeather(data);
        setError(null);
      } else {
        setWeather(null);
        setError(data.message);
      }
      setQuery('');
    }
  };

  const getDate = (d) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  };

  return (
    <div className="App">
      <div className="search-box">
        <input
          type="text"
          className="search-bar"
          placeholder="Enter location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={search}
        />
        <button className="search-button" type="button" onClick={search}>
          <i className="fas fa-search"></i>
        </button>
      </div>
      {weather && (
        <div className="location-box">
          <div className="location">{weather.name}, {weather.sys.country}</div>
          <div className="date">{getDate(new Date())}</div>
          <div className="weather-box">
            <div className="temperature">{Math.round(weather.main.temp)}°F</div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
      )}
      {!weather && !error && (
        <div className="default-message">
          Enter a location to see the current weather
        </div>
      )}
      {!weather && error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <Weather />
    </div>
  );
}
