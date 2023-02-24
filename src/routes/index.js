const express = require('express');

const listRoutes = require('./list');

const app = express();

app.use('/list', listRoutes);

module.exports = app;
