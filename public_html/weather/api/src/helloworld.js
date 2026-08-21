//import fetch from 'node-fetch';
const fetch = require("node-fetch");
const express = require("express");
const path = require("path");
const { debug } = require("console");

const app = express();

// Fetches the location of the given city from the OpenStreetMap api
async function fetchLocationData(city, state, zip) {
  let osmURL = `https://nominatim.openstreetmap.org/search?q=${city},${state},${zip}&format=json`;

  console.log(osmURL);

  try {
    const promise = await fetch(osmURL);

    const response = promise.json();

    let data = await response;

    data = data[0];

    return data;
  } catch (err) {
    return err;
  }
}

async function fetchData(url) {
  try {
    console.log(url);
    const p = await fetch(url);
    const getjson = p.json();
    let r = await getjson;
    return r;
  } catch (err) {
    return err;
  }
}

async function fetchWeatherData(lat, long) {
  let weatherURL = `https://api.weather.gov/points/${lat},${long}`;
  console.log(weatherURL);

  try {
    const promise = await fetch(weatherURL);

    const response = promise.json();

    let rawData = await response;

    let forecast = await fetchData(rawData.properties.forecast);
    forecast = forecast.properties;

    let hourlyforecast = await fetchData(rawData.properties.forecastHourly);

    hourlyforecast.properties.periods = hourlyforecast.properties.periods.slice(
      0,
      24
    );

    let data = {
      forecast: forecast,
      hourlyForecast: hourlyforecast,
    };

    return data;
  } catch (err) {
    console.error(err);
  }
}

app.set("json spaces", 2);

// sample query url: http://localhost:8000/location/location?city=Manchester&state=NH&zip=03103
app.get(`/location/:location`, async function (req, res) {
  console.log(req.query);

  const location = await fetchLocationData(
    req.query.city,
    req.query.state,
    req.query.zip
  );

  res.send(location);
});

// sample query url: http://localhost:8000/weather/weather?city=Boston&state=MA&zip=02109
app.get(`/weather/:weather`, async function (req, res) {
  //console.log(req.query);

  const location = await fetchLocationData(
    req.query.city,
    req.query.state,
    req.query.zip
  );

  console.log(location);

  let lat = location.lat;
  let long = location.lon;

  const weatherPromise = await fetchWeatherData(lat, long);

  const weather = await weatherPromise;

  res.json(weather);
});

app.get("/submit-form", function (req, res) {
  res.send("Form Submitted");
});

app.get("/", function (req, res) {
  // let world = 'world';
  // let hello = `Hello, ${world}`;
  // console.log(hello);
  // res.send(hello);
  var options = {
    root: __dirname,
  };

  //res.sendFile(path.join(__dirname,'../frontend/','index.html'));
  res.send("Hello from TS server");
});

app.listen(process.env.PORT || 8000, function (err) {
  if (err) console.log(err);
  console.log("Hello World app listening at http://localhost:", app.PORT);
});
