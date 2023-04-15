const express = require('express');
const app = express();
const routes = require('./routes/routes');
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/submit', routes);
app.use('/all', routes);

module.exports = app;