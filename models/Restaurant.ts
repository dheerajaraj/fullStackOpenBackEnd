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
  },
  menuId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu"
  }
});

menuSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

menuSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Restaurant", restSchema);
