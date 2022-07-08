const express = require('express');
const { json } = require('body-parser');

const app = express();

app.use(json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PATCH, PUT, DELETE');
  
      return res.status(200).json({});
    }
  
    next();
}); 

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