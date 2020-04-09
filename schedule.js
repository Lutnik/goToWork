require('dotenv').config();
const mongoose = require('mongoose');
const initSchedule = require('./src/initSchedule');
const createQueryUrl = require('./src/createQueryUrl');
const fetchData = require('./src/fetchData');
const saveData = require('./src/saveData');

//  DEFINE ORIGIN AND DESTINATION ADDRESSES
const home = [
  { desc: 'Home', placeId: 'ChIJYSJPB9ej_UYRBt_XcY_HwzQ' },
];
const skm = [
  { desc: 'Gdynia Wzgórze Św.Maksym.', placeId: 'ChIJLz-bkzKn_UYR-JiHQ1ufQms' },
  { desc: 'Gdynia Orłowo SKM', placeId: 'ChIJLScC55mg_UYRKaK5RYAA6Aw' },
  { desc: 'Gdańsk Przymorze - Uniwer', placeId: 'ChIJ9YGWHSl1_UYRghqwL1MVXCk' },
  { desc: 'Gdańsk Główny', placeId: 'ChIJiUaiVnZz_UYR9EJIyCysYtg' },
];

//  DATABASE CONFIG AND CONNECT
function handleDBError(error) {
  console.error(error);
}
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
  .catch((err) => handleDBError(err));

mongoose.connection.on('error', (err) => handleDBError(err));

//  RUN SCHEDULE
const currentHour = (new Date()).getHours();
const currentDay = (new Date()).getDay();
const currentMinute = (new Date()).getMinutes();
const schedule = initSchedule(currentMinute, currentHour, currentDay);

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
