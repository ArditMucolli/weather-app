import { useState, useEffect } from "react";
import axios from "axios";

const api_key = `db5c20b47f469fd9a75ed4c4ed3642d6`;

import React from "react";

export default function searchWeather() {
  const [search, setSearch] = useState("");

  const searchWeather = e => {
    setSearch(e.target.value);

    switch (e.keyCode) {
      case 13:
        if (search.length > 3) {
          const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${api_key}&lang=al`;
        }
    }
  };

  return <div>searchWeather</div>;
}
