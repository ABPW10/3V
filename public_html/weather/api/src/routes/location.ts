import { Router } from "express";
import fetch from 'node-fetch';

export const locationRoute = Router();

// Fetches the location of the given city from the OpenStreetMap api
async function fetchLocationData(city : string, state : string, zip : string) {
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

// sample query url: http://localhost:8000/location/location?city=Manchester&state=NH&zip=03103
locationRoute.get(`/location/:location`, async function (req, res) {
  console.log(req.query);

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
  } catch (err) {
    console.error(err);
  };

  console.log(location)

  res.send(location);
});
