const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const orderPrepSchema = new mongoose.Schema({
  restId: {
    type: String,
    required: [true, "Please provide the restaurant id!"]
  },
  menuIds: {
    type: Array,
    required: [true, "You cannot place an order without a menu!"]
  },
  totalPrice: {
    type: Number,
    required: [true, "Please provide the total price of order"]
  },
  isPrepared: {
    type: Boolean,
    required: true
  },
  isDelivered: {
    type: Boolean,
    required: true
  },
  timeStamp: { type: Date, default: Date.now }
});

orderPrepSchema.set("toJSON", {
  transform: (returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

orderPrepSchema.plugin(uniqueValidator);
module.exports = mongoose.model("OrderPrep", orderPrepSchema);
