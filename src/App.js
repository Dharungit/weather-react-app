import  { useState, useEffect } from "react";
import "./App.css";
import logo from "./assets/my logo.png";
const api = {
  key: "0dbca43bcde3e1a01657b13380517173",
  url: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(`${api.url}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result)
        console.log(result);
      });
    }
    fetchData();
  }, [lat,long])

  const search = evt =>{
    if (evt.key === 'Enter') {
      fetch(`${api.url}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery("");
        console.log(result);
      });
      }
    }

  const getTodaysDate = (d) => {
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December",];
    const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday",];
    var day = days[d.getDay()]; 
    var date = d.getDate(); 
    var month = months[d.getMonth()];
    var year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  };
  return (
  <div className={(typeof weather.main != "undefined") ? ((weather.main.temp < 16 ) ? "App-cold" : "App-warm") : "App-warm"}>
    <main>
    <div className="header">
      <img src={logo} alt="logo" />
      Weather App
    </div>
      <div className="search-box">
        <input type="text" className="search-bar" placeholder="search location" onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}  />
      </div>
      {(typeof weather.main != "undefined") ? (
        <div>
          <div className="weather-continer">
         <div className="weather-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="time">{getTodaysDate(new Date())}</div>
            <div className="temp">{Math.round(weather.main.temp)}॰C</div>
            <div className="weather-type location">{weather.weather[0].main}</div>
          </div>
        </div>
        <div className="weather-continer">
        <div className="weather-details">
            <div className="humidity">Humidity : {weather.main.humidity}</div>
            <div className="temp_max">Max-Temp :{weather.main.temp_max} ॰C</div>
            <div className="temp_min">Min-Temp :{weather.main.temp_min} ॰C</div>
            <div className="temp_min">Wind Speed :{weather.wind.speed}</div>
          </div>
          </div>
        </div>
        
      ) : ("")}
    </main>
  </div>
  );
}

export default App;
