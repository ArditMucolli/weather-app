import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./WeatherWidget.css";

import cold from "../assets/images/cold.jpg";
import normal from "../assets/images/normal.jpg";
import sunny from "../assets/images/sunny.jpg";

const api_key = `db5c20b47f469fd9a75ed4c4ed3642d6`;

function loadBackgroundImage(temp) {
  if (temp < 10) {
    return cold;
  } else if (temp > 10 && temp < 25) {
    return normal;
  } else if (temp > 25) {
    return sunny;
  }
}

export default function SearchWeather() {
  const [search, setSearch] = useState("");
  const [background, setBackground] = useState();
  const [message, setMessage] = useState();
  const [error, setError] = useState(false);

  const [temp, setTemp] = useState();
  const [icon, setIcon] = useState();
  const [name, setName] = useState();

  useEffect(() => {
    document.body.style.backgroundImage = `url(${background})`;
  }, [background]);

  const searchWeather = e => {
    setSearch(e.target.value);

    switch (e.keyCode) {
      case 13:
        if (search.length > 3) {
          const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${api_key}&lang=al`;
          axios
            .get(api_url)
            .then(resp => {
              const result = resp.data;
              const tmp = parseInt(result.main.temp - 273.15);
              setTemp(tmp);
              setIcon(
                `http://openweathermap.org/img/wn/${result.weather[0].icon}@4x.png`
              );
              setName(result.name);
              setBackground(loadBackgroundImage(tmp));
              setError(false);
              setMessage("");
            })
            .catch(e => {
              setError(true);
              setMessage("");
              console.log(e);
            });
        } else {
          setError(false);
          setMessage("Name is to short");
        }
        break;
    }
  };

  return (
    <div>
      <div className="container">
        <input
          type="search"
          onKeyUp={searchWeather}
          placeholder="Search Locations"
        />
        {message && <p>{message}</p>}
        {error && <p>Something went wrong!!!</p>}
        {icon && name && temp && (
          <div className="widget">
            <h2>{name}</h2>
            <img src={icon} />
            <h3>
              {temp} <sup>0</sup>C
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
