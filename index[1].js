const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const https = require("https");
const http = require("http");
const dbFunctions = require("./database/db_functions");
const devices = require("./database/devices");
const sessions = require("express-session");
const redis = require("redis");
const redisStore = require("connect-redis")(sessions);
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const body_parser = require("body-parser");
const app = express();
const port = process.env.PORT;
const clientRedis = redis.createClient();
//const sendSMS = require("./helper_functions/sms_sending").sendSMS;
const { isAuthenticated } = require("./helper_functions/is_authenticated");

//db
const mongoose = require("mongoose");

//func
const getWeather = require("./helper_functions/weather_function").getWeather;

let connection = mongoose.connect("mongodb://127.0.0.1:27017/home_automation", {
  useNewUrlParser: true
});

//generating api password

let password = { value: "home" };

app.use(express.static("static_files"));

app.use(body_parser.urlencoded({ extended: true }));

require("./passport/passport")(
  app,
  passport,
  sessions,
  redisStore,
  clientRedis,
  Strategy,
  password
);

app.use(express.json());

app.use(cors());

require("./routes/routes")(
  app,
  passport,
  devices,
  dbFunctions,
  isAuthenticated
);

//devices

clientRedis.on("connect", function() {
  console.log("Redis client connected");
  clientRedis.set("my test key", "my test value", redis.print);
});

connection
  .then(() => {
    getWeather();
    setInterval(getWeather, 1000 * 60 * 10);
    http.createServer(app).listen(port);
    console.log(`Example app listening on port ${port}!`);
  })
  .catch(error => {
    throw new Error(
      "Something wrong with starting app - database connection problems"
    );
  });

function check_login_status(username, password) {
  if (username === "Jura" && password === "PeroPeroPero") {
    return true;
  } else {
    return false;
  }
}
