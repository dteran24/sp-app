"use strict";
var express = require('express');
var app = express();
var routes = require('./routes/routes');
var cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/forms', routes);
module.exports = app;
