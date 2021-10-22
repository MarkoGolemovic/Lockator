const mongoose = require("mongoose");
const devices = require("./devices");
const rooms = require("./rooms");
const objects = require("./objects");
const locations = require("./locations");
const db_classes = require("./db_classes");
const { errorFunction } = require("../helper_functions/error_helper_function");

//vraca promise
let connection = mongoose.connect("mongodb://localhost:27017/radakovo_farm_automation_db", {
  useNewUrlParser: true
});

console.log(devices.array_of_devices);

connection.then(() => {
  console.log("konektao sam se na bazu");

  //setting up database
  for (let device of devices.array_of_devices) {
    createDevice(device);
  }
  for (let room of rooms.array_of_rooms) {
    createRoom(room);
  }
  for (let object of objects.array_of_objects) {
    createObject(object);
  }
  for (let location of locations.array_of_locations) {
    createLocation(location);
  }

  async function createDevice(data) {
    let err, result;
    const item = new db_classes.DeviceClass(data);
    [err, result] = await errorFunction(item.save());
    if (err) {
      throw err;
    }
    console.log(result);
  }

  async function createRoom(data) {
    let err, result;
    const item = new db_classes.RoomClass(data);
    [err, result] = await errorFunction(item.save());
    if (err) {
      throw err;
    }
    console.log(result);
  }

  async function createLocation(data) {
    let err, result;
    const item = new db_classes.LocationClass(data);
    [err, result] = await errorFunction(item.save());
    if (err) {
      throw err;
    }
    console.log(result);
  }

  async function createObject(data) {
    let err, result;
    const item = new db_classes.ObjectClass(data);
    [err, result] = await errorFunction(item.save());
    if (err) {
      throw err;
    }
    console.log(result);
  }
});
