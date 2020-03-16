require("dotenv").config();
const PORT = process.env.PORT || 3001;
let MONGO_DB_URL = process.env.MONGO_DB_URL;
if (process.env.NODE_ENV === "test") {
  MONGO_DB_URL = process.env.TEST_MONGO_DB_URL;
}
module.exports = {
  PORT,
  MONGO_DB_URL
};
