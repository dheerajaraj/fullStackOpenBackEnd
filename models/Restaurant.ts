const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const restSchema = new mongoose.Schema({
  restName: {
    type: String,
    required: [true, "Please provide the restaurant name!"],
    unique: [
      true,
      "Restaurant name already exists! You have already registered with us."
    ]
  },
  restRatings: {
    type: Number,
    required: false
  }
});

restSchema.set("toJSON", {
  transform: (returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

restSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Restaurant", restSchema);
