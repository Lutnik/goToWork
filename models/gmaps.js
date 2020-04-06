const mongoose = require('mongoose');

module.exports = mongoose.model('Gmaps', new mongoose.Schema({
  origin: String,
  destination: String,
  distance: Number,
  duration: Number,
  durationTraffic: Number,
  timestamp: { type: Date, default: Date.now },
}));
