const mongoose = require("mongoose");

// Bug: Date.now() was previously used directly which executes immediately
// Fix: Replaced manual date field with timestamps option
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
 
  },{timestamps: true}); // Automatically adds createdAt & updatedAt

module.exports = mongoose.model("Book", bookSchema);
