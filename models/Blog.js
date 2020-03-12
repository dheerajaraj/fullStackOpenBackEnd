const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "You don't have a name?"],
    unique: [true, "Record already exists! Duplicate name found!"],
    minlength: 3
  },
  author: {
    type: String,
    required: [true, "Please enter your number"],
    min: 8,
    unique: [true, "Number already exists for another user!"]
  },
  url: {
    type: String,
    required: true
  },
  likes: { type: Number, required: true }
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});
blogSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Blog", blogSchema);
