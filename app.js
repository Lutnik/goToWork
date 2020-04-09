require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const initSchedule = require('./src/initSchedule');
const createQueryUrl = require('./src/createQueryUrl');
const fetchData = require('./src/fetchData');
const saveData = require('./src/saveData');

const app = express();

app.set('view engine', 'ejs');

function handleDBError(error) {
  console.error(error);
}

// DATABASE CONFIG AND CONNECT
mongoose.connect(process.env.DB_URL, {
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

const home = [
  { desc: 'Home', placeId: 'ChIJYSJPB9ej_UYRBt_XcY_HwzQ' },
];
const skm = [
  { desc: 'Gdynia Wzgórze Św.Maksym.', placeId: 'ChIJLz-bkzKn_UYR-JiHQ1ufQms' },
  { desc: 'Gdynia Orłowo SKM', placeId: 'ChIJLScC55mg_UYRKaK5RYAA6Aw' },
  { desc: 'Gdańsk Przymorze - Uniwer', placeId: 'ChIJ9YGWHSl1_UYRghqwL1MVXCk' },
  { desc: 'Gdańsk Główny', placeId: 'ChIJiUaiVnZz_UYR9EJIyCysYtg' },
];

const check = initSchedule((new Date()).getHours());

setInterval(() => {
  const currentHour = (new Date()).getHours();
  const currentDay = (new Date()).getDay();
  const schedule = check(currentHour, currentDay);
  if (schedule.toWork) {
    const url = createQueryUrl(home, skm, process.env.API_KEY);
    fetchData(url)
      .then((results) => saveData(results))
      .catch((err) => handleDBError(err));
  }
  if (schedule.fromWork) {
    const url = createQueryUrl(skm, home, process.env.API_KEY);
    fetchData(url)
      .then((results) => saveData(results))
      .catch((err) => handleDBError(err));
  }
}, 900000);

app.listen(process.env.PORT, () => console.log('App listening on port 8080'));
