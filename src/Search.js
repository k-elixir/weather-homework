import React, { useState } from "react";
import axios from "axios";

export default function Search() {
  const [cityName, setCityName] = useState("");
  const [degree, setDegree] = useState("");

  function handleSearch(event) {
    event.preventDefault();
    if (cityName.length > 0) {
      let Url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=498e6acfefe155c57e6d3fce38304477&units=metric`;
      axios.get(Url).then(Details);
    } else {
      alert("Enter a city");
    }
  }
  function Details(response) {
    let temperature = Math.round(response.data.main.temp);
    let description = response.data.weather[0].description;
    let humidity = response.data.main.humidity;
    let wind = response.data.wind.speed;
    let icon = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;

    let items = [
      `Temperature : ${temperature}`,
      `Description: ${description}`,
      `Humidity: ${humidity}`,
      `Wind: ${wind}`,
      <img src={icon} alt={description} />,
    ];
    setDegree(
      <ul>
        {items.map(function (item, index) {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    );
  }

  function nameAlert(event) {
    setCityName(event.target.value);
  }

  return (
    <div className="App">
      <h1>Weather App</h1>
      <form onSubmit={handleSearch} className="App">
        <input type="search" placeholder="Type a city" onChange={nameAlert} />
        <input type="submit" value="search" />
      </form>
      <div>{degree}</div>
      <a href="https://github.com/k-elixir/weather-react">
        Open-source code, by Kimia Rafi
      </a>
    </div>
  );
}
