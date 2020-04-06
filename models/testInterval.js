const mongoose = require('mongoose');

module.exports = mongoose.model('TestInterval', new mongoose.Schema({
  origin: String,
  durationTraffic: Number,
  timestamp: { type: Date, default: Date.now },
}));
