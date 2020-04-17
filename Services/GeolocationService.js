const config = require("../utils/config");
const google_api_key = config.GOOGLE_API_KEY;
const restaurantRadius = config.RADIUS_SEARCH;
const axios = require("axios");
const NodeGeocoder = require("node-geocoder");
const navigator = require("web-midi-api");
const IPGeolocationAPI = require("ip-geolocation-api-javascript-sdk");
const ipgeolocationApi = new IPGeolocationAPI(
  config.CURRENT_LOCATION_API_KEY,
  false
);
global.nearbyRestaurants;
const getNearbyRestaurants = async () => {
  await ipgeolocationApi.getGeolocation(getRestaurantData);
  console.log(nearbyRestaurants);
  return nearbyRestaurants;
};

const getRestaurantData = async result => {
  const nearbyLocationBaseUrl =
    "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
  let locationString = result.latitude + "," + result.longitude;
  let type = "restaurant";

  const nearbyRequestParams = {
    params: {
      location: locationString,
      radius: restaurantRadius,
      type: type,
      key: google_api_key
    }
  };
  const response = await axios.post(
    nearbyLocationBaseUrl,
    null,
    nearbyRequestParams
  );
  nearbyRestaurants = response.data;
};

module.exports = {
  getNearbyRestaurants
};
