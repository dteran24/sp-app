const express = require('express');
const app = express();
const routes = require('./routes/routes');
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/forms', routes);


module.exports = app;