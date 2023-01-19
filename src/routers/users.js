const express = require('express');
const { usersController } = require('../controllers');
const route = express.Router();


route.get('/', usersController.getData);
route.post('/regis', usersController.regis);
route.post('/login', usersController.login);

module.exports = route;