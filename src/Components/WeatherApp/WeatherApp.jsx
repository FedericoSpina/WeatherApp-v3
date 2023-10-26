import { useState } from "react";

import "./WeatherApp.css";
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";




const WeatherApp = () => {
  let api_key = "2e8a73f07e6836e9aa7cedccfce6dce6";
  const [wicon, setWicon] = useState(cloud_icon);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    } else {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

      let response = await fetch(url);
      let data = await response.json();

      const humidity = document.getElementsByClassName("humidity-percent");
      const wind = document.getElementsByClassName("wind-rate");
      const temprature = document.getElementsByClassName("weather-temp");
      const location = document.getElementsByClassName("weather-location");

      humidity[0].innerHTML = `${data.main.humidity}%`;
      wind[0].innerHTML = `${Math.round(data.wind.speed)} km/h`;
      temprature[0].innerHTML = `${Math.round(data.main.temp)}°C`;
      location[0].innerHTML = `${data.name}`;

      // Objeto que mapea códigos de iconos meteorológicos a sus iconos correspondientes
      const iconMappings = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": drizzle_icon,
        "03n": drizzle_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
      };

      // Obtiene el código de icono del tiempo actual
      const weatherIcon = data.weather[0].icon;
      let wicon; // Variable para almacenar el icono correspondiente

      // Evalúa el código del icono del tiempo actual y asigna el icono correspondiente
      switch (weatherIcon) {
        case "01d":
        case "01n":
          wicon = iconMappings["01d"];
          break;

        case "02d":
        case "02n":
          wicon = iconMappings["02d"];
          break;

        case "03d":
        case "03n":
        case "04d":
        case "04n":
          wicon = iconMappings["03d"];
          break;

        case "09d":
        case "09n":
        case "10d":
        case "10n":
          wicon = iconMappings["09d"];
          break;

        case "13d":
        case "13n":
          wicon = iconMappings["13d"];
          break;

        default:
          wicon = iconMappings["01d"]; // Icono predeterminado si no coincide con ningún caso
          break;
      }

      // Asigna el icono correspondiente obtenido del mapeo
      setWicon(wicon);
    }
  };

  
  return (
    <>
    
  
  <pwa-install explainer="Your Personal Weather Companion" id="installId">Install PWA</pwa-install>

      <div className="container">
        <div className="top-bar">
          <form
            className="search-form"
            onSubmit={(event) => {
              event.preventDefault(); // Prevent the default form submission behavior
              search();
            }}
          >
            <input type="text" className="cityInput" placeholder="Search" />
            <div className="search-icon" onClick={() => search()}>
              <img src={search_icon} alt="search" />
            </div>
          </form>
        </div>

        <div className="weather-image">
          <img src={wicon} alt="cloud" />
        </div>

        <div className="weather-temp">Weather</div>
        <div className="weather-location">on demand.</div>
        <div className="data-container">
          <div className="element">
            <img src={humidity_icon} alt="" className="icon" />
            <div className="data">
              <div className="humidity-percent">%</div>
              <div className="text">Humidity</div>
            </div>
          </div>

          <div className="element">
            <img src={wind_icon} alt="" className="icon" />
            <div className="data">
              <div className="wind-rate">km/h</div>
              <div className="text">Wind speed</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherApp;
