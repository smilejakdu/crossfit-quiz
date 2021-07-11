var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var config = require("./config")

var indexRouter    = require("./routes/index");
var usersRouter    = require("./routes/users");
var cardsRouter    = require("./routes/cards");
var cardsImgRouter = require("./routes/cards_img");
var commentsRouter = require("./routes/comments");

var app = express();

// settings
app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use("/"          , indexRouter);
app.use("/users"     , usersRouter); 
app.use("/cards"     , cardsRouter);
app.use("/cards_img" , cardsImgRouter);
app.use("/comments"  , commentsRouter);


app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
