const fetch = require('node-fetch');

module.exports = function fetchData(url) {
  if (url) {
    return fetch(url).then((result) => result.json());
  } return Promise.reject(new Error('Invalid destination data'));
};
