// import { Router } from "express";
// import fetch from 'node-fetch';

// export const weatherRouter = Router();

async function fetchData(url /*: string*/) {
    try {
      //console.log(url);
      const p = await fetch(url);
      const getjson = p.json();
      let r = await getjson;
      return r;
    } catch (err) {
      return err;
    }
}

async function fetchLocationData(city /*: string*/, state /*: string*/, zip /*: string*/) {
    let osmURL = !city && !state && zip ?
                    `https://nominatim.openstreetmap.org/search?postalcode=${zip}&countrycodes=us,pr,vi,gu,as&format=json`
                    : `https://nominatim.openstreetmap.org/search?q=${city},${state},${zip}&format=json`;
  
    //console.log(osmURL);
  
    try {
      const promise = await fetch(osmURL);
  
      const response = promise.json();
  
      let data = await response;
  
      data = data[0];
  
      return data;
    } catch (err) {
      return err;
    }
};

async function fetchWeatherData(lat /*: any*/, long /*: any*/) {
    let weatherURL = `https://api.weather.gov/points/${lat},${long}`;
    //console.log(weatherURL);
  
    try {
      const promise = await fetch(weatherURL);
  
      const response = promise.json();
  
      let rawData = await response;

      let forecast = await fetchData(rawData.properties.forecast);
      forecast = forecast.properties;
  
      let hourlyforecast = (await fetchData(rawData.properties.forecastHourly)).properties.periods.slice(0, 24);

      let place = { text: `${rawData.properties.relativeLocation.properties.city} [ ${rawData.properties.relativeLocation.properties.state} ]`,
                    timeZone: rawData.properties.timeZone }
      let observationStation = (await fetchData(rawData.properties.observationStations)).features[0]?.properties.stationIdentifier
      let observations;
      if (observationStation) {
        try { observations = (await fetchData(`https://api.weather.gov/stations/${observationStation}/observations/latest`)).properties }
        catch (e) { console.error(e); }
      }
    
      let data = {
        forecast: forecast,
        hourlyForecast: hourlyforecast,
        place,
        observations
      };
  
      return data;
    } catch (err) {
      console.error(err);
    }
};


/*weatherRouter.get('/weather/:weather', async function(req, res){
  let city = req?.query?.city?.toString();
  let state = req?.query?.state?.toString();
  let zip = req?.query?.zip?.toString();

  if(city == undefined ||
    state == undefined || 
    zip == undefined)
  {
    console.error('Query is undefined');
    return;
  }
  try{
    const location = await fetchLocationData(
      city,
      state,
      zip
    ); 
       
    let lat = location.lat;
    let long = location.lon;

    const weatherPromise = await fetchWeatherData(lat, long);

    const weather = await weatherPromise;
    
    //console.log(weather);

    res.json(weather);
  } catch (err) {
    console.error(err);
  };
    
});*/