const geoRouter = require("express").Router();
const geoService = require("../Services/GeolocationService");

geoRouter.get("/", async (req, res) => {
  const result = await geoService.getNearbyRestaurants();
  res.json(result);
});

geoRouter.get("/registered", async (req, res) => {
  const result = await geoService.getNearbyRegisteredRestaurants();
  res.json(result);
});

module.exports = geoRouter;
