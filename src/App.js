import React, {useState} from 'react';
import './App.css';
const api = {
  key: "6f3ca1d4a3d4432add304dc309f06c5f",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(null);

  const search = evt => {
    if (evt.key === "Enter") {
      try{
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          setError(null);
          console.log(result);
        });}
        catch (err) {
          setError(err.message);
          setWeather({})
        }
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
    "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  const currentTime = new Date();
  const formattedTime = currentTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

  return (
    <div className={(typeof weather.main !== 'undefined' && weather.main.temp > 16)
    ? 'app warm'
    : (typeof weather.main === 'undefined') 
      ? 'app'
      : 'app'}>
      <main>
        <div className='search-box'>
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main !== "undefined" && !error) ? (
        <div>
          <div className='location-box'>
            <div className='location'>
              {weather.name}, {weather.sys.country}
            </div>
            <div className='date'>
              {dateBuilder(new Date())}
            </div>
          </div>
          <div className='weather-box'>
            <div className='temp'>
              {Math.round(weather.main.temp)}°C
            </div>
            <div className='weather'>
              {weather.weather[0].main}
            </div>
          </div>
        </div>
        ) : (<span className="error-message">{error || 'Please enter a valid city'}</span>)}
      </main>
    </div>
  );
}

export default App;
