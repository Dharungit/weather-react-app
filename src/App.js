import  { useState, useEffect } from "react";
import "./App.css";
import logo from "./assets/my logo.png";
import wind_icon from "./assets/wind.png"
import hum_icon from "./assets/humidity.png"
import max_icon from "./assets/max.png"
import min_icon from "./assets/min.png"

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


  // let url= "";
  const search = evt =>{
    if (evt.key === 'Enter') {
      fetch(`${api.url}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery("");
        console.log(result);
        // let icon = weather.weather[0].icon;
        // console.log(icon);
        // url = "http://openweathermap.org/img/wn/"+icon+"@2x.png"; 
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
        <div className="continer">
          <div className="weather-continer">
         <div className="weather-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="time">{getTodaysDate(new Date())}</div>
            <div className="temp">{Math.round(weather.main.temp)}°C</div>
            <div className="weather-type location">{weather.weather[0].main}</div>
            {/* <img src={url} alt="weather-icon"/> */}
          </div>
        </div>
        <div >
        <div className="weather-continer">
        <div className="weather-details">
            <div className="con1">
              <div className="column1">
              <div className="humidity">Humidity <img src={hum_icon} alt="icon"/></div>
              <div className="humidity">{weather.main.humidity}</div>
              </div>
              <div className="column2">
                <div className="wind">Wind Speed <img src={wind_icon} alt="icon"/></div>
                <div className="wind">{weather.wind.speed}</div>
              </div>
            </div>
            <div className="con2">
              <div className="column1">
              <div className="temp_min">Min-Temp <img src={min_icon} alt="icon"/></div>
              <div className="temp_min">{weather.main.temp_min} ॰C</div>
              </div>
            <div className="column2">
            <div className="temp_max">Max-Temp <img src={max_icon} alt="icon"/></div>
            <div className="temp_max">{weather.main.temp_max} ॰C</div>
            </div>
            </div>
          </div>
          </div>
          </div>
        </div>
        
      ) : ("")}
    </main>
  </div>
  );
}

export default App;


           
            
           