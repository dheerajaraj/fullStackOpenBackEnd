const mongoose = require("mongoose");
const app = express();
if (app.get("env") == "development") {
  require("dotenv").config();
}
var uniqueValidator = require("mongoose-unique-validator");

const url = process.env.MONGO_DB_URL;
console.log("connecting to", url);

mongoose
  .connect(url, { useNewUrlParser: true })
  .then(result => {
    console.log("Connected to MongoDB!");
  })
  .catch(error => {
    console.log("Error connecting to MongoDB: " + error.message);
  });

const phoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "You don't have a name?"],
    unique: [true, "Record already exists! Duplicate name found!"],
    minlength: 3
  },
  number: {
    type: Number,
    required: [true, "Please enter your number"],
    min: 8,
    unique: [true, "Number already exists for another user!"]
  }
});

phoneSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});
phoneSchema.plugin(uniqueValidator);
module.exports = mongoose.model("PhoneBook", phoneSchema);
