require("dotenv").config();
const PORT = process.env.PORT || 3003;
let MONGO_DB_URL = process.env.MONGO_DB_URL;
if (process.env.NODE_ENV === "test") {
  MONGO_DB_URL = process.env.TEST_MONGO_DB_URL;
}
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const RADIUS_SEARCH = process.env.RADIUS_SEARCH;
const CURRENT_LOCATION_API_KEY = process.env.CURRENT_LOCATION_API_KEY;
const ORDER_CONSUMER_PORT = process.env.ORDER_CONSUMER_PORT || 3004;
const CLIENT_SERVICE_PORT = process.env.CLIENT_SERVICE_PORT || 3005;
module.exports = {
  PORT,
  MONGO_DB_URL,
  GOOGLE_API_KEY,
  RADIUS_SEARCH,
  CURRENT_LOCATION_API_KEY,
  ORDER_CONSUMER_PORT,
  CLIENT_SERVICE_PORT
};
