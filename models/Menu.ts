const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const menuSchema = new mongoose.Schema({
  dishName: {
    type: String,
    required: [true, "Please provide the dish name!"],
    unique: [true, "Record already exists! Duplicate name found!"]
  },
  price: {
    type: Number,
    required: [true, "Please provide the price for the dish!"]
  },
  restId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant"
  }
});

menuSchema.set("toJSON", {
  transform: (returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

menuSchema.plugin(uniqueValidator);
export default mongoose.model("Menu", menuSchema);
