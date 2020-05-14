var express = require("express");
var app = express();

app.use(express.json());


app.use(require('./routes'));

module.exports = app;