// Dependencies
const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Request & Response
const request = require('./server/request');
const response = require('./server/response');

// Configurations && Constants
const config = require('./config');
const dbConnection = mongoose.connect(config.LOCAL_DB_URL);
dbConnection.then((db) => {
  console.log("db connected to server");
}, (err) => {
  console.log(err);
});

// Routes
const notesRouter = require('./server/routes/notesRouter');

const app = express();
// Add headers
app.use(function(req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', false);

  // Add the default content type to application
  res.setHeader('Content-Type', 'application/json');

  // Pass to next layer of middleware
  next();
});

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/', notesRouter);

// server instance
const server = http.createServer(app);
server.listen(config.PORT, config.HOST_DEV, () => {
  console.log(`running server at : ${config.HOST_DEV}:${config.PORT}`);
})
