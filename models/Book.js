const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
 
  },{timestamps: true}); // createdAt & updatedAt

module.exports = mongoose.model("Book", bookSchema);
