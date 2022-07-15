const express = require('express');
const mongoose = require('mongoose');
const { urlencoded, json } = require('body-parser');
const meetingsRouter = require('./routes/meetings');

const app = express();

const databaseString = process.env.DB_STRING || 'mongodb://localhost:27017/calendar_db';

mongoose.connect(databaseString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once('open', function() {
    console.log('Connected to database succesfully!');
});

mongoose.connection.on('error', function() {
    console.log('Connection error', error);
});

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
  
      return res.status(200).json({});
    }
  
    next();
}); 

app.use('/meetings', meetingsRouter);

app.use(function (req, res, next) {
    const error = new Error('Request is not supported!');
    error.status = 405;

    next(error);
});

app.use(function (error, req, res, next) {
    const statusCode = error.status || 500;
    res.status(statusCode).json({
        error: {
            message: error.message,
            status: statusCode,
            stack: error.stack,
        }
    });
});

module.exports = app;
