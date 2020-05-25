var express = require("express");
const dotenv = require("dotenv");

dotenv.config();

var app = express();
app.use(express.json());
app.use(require("./routes"));

module.exports = app;
