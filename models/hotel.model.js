const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model("Hotel", hotelSchema);
