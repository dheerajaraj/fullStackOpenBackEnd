const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const deliverySchema = new mongoose.Schema({
  orderId: {
    type: Array
  },
  name: {
    type: String,
    required: [true, "Provide driver name!"]
  },
  phoneNumber: {
    type: Number,
    required: [true, "Provide driver's phone number!"]
  }
});

deliverySchema.set("toJSON", {
  transform: (returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

deliverySchema.plugin(uniqueValidator);
module.exports = mongoose.model("Delivery", deliverySchema);
