var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();

const exphbs = require("./exphbs");
var indexRouter = require("./routes/index");
var uploadRouter = require("./routes/upload");

var app = express();

app.engine(".hbs", exphbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./views");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/upload", uploadRouter);

module.exports = app;