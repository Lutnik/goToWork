const express = require('express');
const mongoose = require('mongoose');
const Gmaps = require('./models/gmaps');
const secretData = require('./secretData');

const app = express();
app.set('view engine', 'ejs');

function handleDBError(error) {
  console.error(error);
}

// DATABASE CONFIG AND CONNECT
mongoose.connect(secretData.databaseUrl, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
  .catch((err) => handleDBError(err));

mongoose.connection.on('error', (err) => handleDBError(err));

app.get('/', (req, res) => {
  res.render('index.ejs');
});

function initSchedule(initHour) {
  let counter = 0;
  let hour = initHour;
  return (currentHour) => {
    if (currentHour > hour) {
      hour = currentHour;
      counter = 0;
    }
    counter += 1;
    if (currentHour >= 6 && currentHour < 10) {
      return { toWork: true, fromWork: counter === 1 };
    }
    if (currentHour >= 10 && currentHour < 15) {
      return { toWork: counter === 1, fromWork: counter === 1 };
    }
    if (currentHour >= 15 && currentHour < 20) {
      return { toWork: counter === 1, fromWork: true };
    }
    return { toWork: false, fromWork: false };
  };
}

function fetchData(origins, destinations) {
  const originsQuery = origins.reduce((accu, next) => {
    accu += `place_id:${next.placeId}|`;
    return accu;
  }, '').slice(0, -1);
  const destQuery = destinations.reduce((accu, next) => {
    accu += `place_id:${next.placeId}|`;
    return accu;
  }, '').slice(0, -1);

  return fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originsQuery}&destinations=${destQuery}&departure_time=now&key=${secretData.gmapsKey}`)
    .then((result) => result.json());
}

function saveData(results) {
  const arr = [];
  if (results.destination_addresses.length === 1) {
    results.origin_addresses.forEach((item, i) => {
      arr.push({
        origin: results.origin_addresses[i],
        destination: results.destination_addresses[0],
        distance: results.rows[0].elements[i].distance.value,
        duration: results.rows[0].elements[i].duration.value,
        durationTraffic: results.rows[0].elements[i].duration_in_traffic.value,
      });
    });
  } else if (results.origin_addresses.length === 1) {
    results.destination_addresses.forEach((item, i) => {
      arr.push({
        origin: results.origin_addresses[0],
        destination: results.destination_addresses[i],
        distance: results.rows[0].elements[i].distance.value,
        duration: results.rows[0].elements[i].duration.value,
        durationTraffic: results.rows[0].elements[i].duration_in_traffic.value,
      });
    });
  } else throw new Error('Unexpected amount of origin/destination elements');
  return Gmaps.insertMany(arr);
}


//  The loop will poll API:
//  - every 15 minutes between 6 and 10 am
//  - every hour between 10 and 20

const check = initSchedule((new Date()).getHours());
const home = [
  { desc: 'Home', placeId: 'ChIJYSJPB9ej_UYRBt_XcY_HwzQ' },
];
const skm = [
  { desc: 'Gdynia Wzgórze Św.Maksym.', placeId: 'ChIJLz-bkzKn_UYR-JiHQ1ufQms' },
  { desc: 'Gdynia Orłowo SKM', placeId: 'ChIJLScC55mg_UYRKaK5RYAA6Aw' },
  { desc: 'Gdańsk Przymorze - Uniwer', placeId: 'ChIJ9YGWHSl1_UYRghqwL1MVXCk' },
  { desc: 'Gdańsk Główny', placeId: 'ChIJiUaiVnZz_UYR9EJIyCysYtg' },
];

setInterval(() => {
  const currentHour = (new Date()).getHours();
  if (check(currentHour).toWork) {
    fetchData(home, skm)
      .then((results) => saveData(results))
      .catch((err) => handleDBError(err));
  }
  if (check(currentHour).fromWork) {
    fetchData(skm, home)
      .then((results) => saveData(results))
      .catch((err) => handleDBError(err));
  }
}, 1500000);

app.listen(8080, () => console.log('App listening on port 8080'));
