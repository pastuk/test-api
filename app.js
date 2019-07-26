// App dependents
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sample-app', {
  poolSize: 10,
  ssl: false,
  autoReconnect: true,
  useNewUrlParser: true,
  reconnectTries: 10,
  reconnectInterval: 10000
});

mongoose.Promise = global.Promise;

// Route modules
const indexRouter = require('./routes/index');
const profileRouter = require('./routes/profile');

const publicDir = path.join(__dirname, 'public');
const app = express();

app.use(express.json());
app.use(express.static(publicDir));

// Routes
app.use('/', indexRouter);
app.use('/profile', profileRouter);

module.exports = app;
