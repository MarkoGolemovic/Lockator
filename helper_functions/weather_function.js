const axios = require("axios");
const dbFunctions = require("../database/db_functions");
const errorFunction = require("./error_helper_function").errorFunction;

async function getWeather() {
  let err, data;

  [err, data] = await errorFunction(
    axios.get(
      "http://api.openweathermap.org/data/2.5/forecast?id=3186781&APPID=0e4ad46eaa5a64c3ed1235759d18e7dc&units=metric"
    )
  );
  if (err) {
    dbFunctions.updateWeather({
      description: "Api error",
      temperature: "N/A",
      icon: "Default"
    });
  } else {
    let weather_object = data.data.list[0];
    let description = weather_object.weather[0].description;
    let icon;
    switch (weather_object.weather[0].icon) {
      case "01d":
        icon = "Img01d";
        break;
      case "02d":
        icon = "Img02d";
        break;
      case "03d":
        icon = "Img03d";
        break;
      case "04d":
        icon = "Img04d";
        break;
      case "09d":
        icon = "Img09d";
        break;
      case "10d":
        icon = "Img10d";
        break;
      case "11d":
        icon = "Img11d";
        break;
      case "13d":
        icon = "Img13d";
        break;
      case "50d":
        icon = "Img50d";
        break;
      default:
        icon = "ImgDefault";
    }
    let temperature = weather_object.main.temp;
    dbFunctions.updateWeather({
      description: description,
      temperature: temperature,
      icon: icon
    });
  }
}

module.exports.getWeather = getWeather;
