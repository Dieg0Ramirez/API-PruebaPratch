var express = require('express');
var app = express();
var loginController = require('../controllers/LoginController');


app.post('/login/', loginController.createLogin);

module.exports = app;