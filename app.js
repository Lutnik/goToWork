require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const initSchedule = require('./src/initSchedule');
// const createQueryUrl = require('./src/createQueryUrl');
// const fetchData = require('./src/fetchData');
// const saveData = require('./src/saveData');

const Gmaps = require('./models/gmaps');

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

app.get('/', async (req, res) => {
  const data = await Gmaps.find().sort({ _id: -1 }).limit(5);
  res.render('index.ejs', { data });
});

app.listen(process.env.PORT, () => console.log('App listening on port 8080'));
