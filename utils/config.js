require("dotenv").config();
const PORT = process.env.PORT || 3001;
let MONGO_DB_URL = process.env.MONGO_DB_URL;
if (process.env.NODE_ENV === "test") {
  MONGO_DB_URL = process.env.TEST_MONGO_DB_URL;
}
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const RADIUS_SEARCH = process.env.RADIUS_SEARCH;
module.exports = {
  PORT,
  MONGO_DB_URL,
  GOOGLE_API_KEY,
  RADIUS_SEARCH
};
