const Gmaps = require('../models/gmaps');
const encode = require('./encodePlace.js');

module.exports = function saveData(results) {
  const arr = [];
  if (results.error_message) {
    return Promise.reject(new Error(results.error_message));
  }
  if (results.destination_addresses.length === 1) {
    results.origin_addresses.forEach((item, i) => {
      arr.push({
        origin: encode(results.origin_addresses[i]),
        destination: encode(results.destination_addresses[0]),
        distance: results.rows[i].elements[0].distance.value,
        duration: results.rows[i].elements[0].duration.value,
        durationTraffic: results.rows[i].elements[0].duration_in_traffic.value,
        timestamp: new Date(),
      });
    });
  } else if (results.origin_addresses.length === 1) {
    results.destination_addresses.forEach((item, i) => {
      arr.push({
        origin: encode(results.origin_addresses[0]),
        destination: encode(results.destination_addresses[i]),
        distance: results.rows[0].elements[i].distance.value,
        duration: results.rows[0].elements[i].duration.value,
        durationTraffic: results.rows[0].elements[i].duration_in_traffic.value,
        timestamp: new Date(),
      });
    });
  } else {
    return Promise.reject(new Error('Unexpected amount of origin/destination elements'));
  }
  return Gmaps.insertMany(arr);
};
