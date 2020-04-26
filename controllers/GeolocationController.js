const geoRouter = require("express").Router();
const geoService = require("../Services/GeolocationService");

geoRouter.get("/", async (req, res) => {
  const result = await geoService.getNearbyRestaurants();
  //console.log(result);
  res.json(result);
});

module.exports = geoRouter;
