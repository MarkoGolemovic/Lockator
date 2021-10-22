const dbClass = require("./db_classes");
const { errorFunction } = require("../helper_functions/error_helper_function");

async function getDevicesFromDatabase(query, limit_num) {
  let err, result;
  if (limit_num != undefined && typeof limit_num === Number && limit_num > 0) {
    [err, result] = await errorFunction(
      dbClass.DeviceClass.find(query).limit(limit_num)
    );
    if (err) {
      throw new Error(
        "Error with getting devices from database -with limit parameter"
      );
    }
    return result;
  } else {
    [err, result] = await errorFunction(dbClass.DeviceClass.find(query));
    if (err) {
      throw new Error("Error with getting devices from database");
    }
    return result;
  }
}
async function getLocationsFromDatabase(query, limit_num) {
  let err, result;
  if (limit_num != undefined && typeof limit_num === Number && limit_num > 0) {
    [err, result] = await errorFunction(
      dbClass.LocationClass.find(query).limit(limit_num)
    );
    if (err) {
      throw new Error(
        "Error with getting locations from database -with limit parameter"
      );
    }
    return result;
  } else {
    [err, result] = await errorFunction(dbClass.LocationClass.find(query));
    if (err) {
      throw new Error("Error with getting locations from database");
    }
    return result;
  }
}
async function getObjectsFromDatabase(query, limit_num) {
  let err, result;
  if (limit_num != undefined && typeof limit_num === Number && limit_num > 0) {
    [err, result] = await errorFunction(
      dbClass.ObjectClass.find(query).limit(limit_num)
    );
    if (err) {
      throw new Error(
        "Error with getting objects from database -with limit parameter"
      );
    }
    return result;
  } else {
    [err, result] = await errorFunction(dbClass.ObjectClass.find(query));
    if (err) {
      throw new Error("Error with getting objects from database");
    }
    return result;
  }
}
async function getRoomsFromDatabase(query, limit_num) {
  let err, result;
  if (limit_num != undefined && typeof limit_num === Number && limit_num > 0) {
    [err, result] = await errorFunction(
      dbClass.RoomClass.find(query).limit(limit_num)
    );
    if (err) {
      throw new Error(
        "Error with getting rooms from database -with limit parameter"
      );
    }
    return result;
  } else {
    [err, result] = await errorFunction(dbClass.RoomClass.find(query));
    if (err) {
      throw new Error("Error with getting rooms from database");
    }
    return result;
  }
}

async function getWeatherFromDatabase(query) {
  let err, result;
  [err, result] = await errorFunction(dbClass.WeatherClass.find(query));
  if (err) {
    throw new Error("Error with getting weather data from database");
  }
  return result;
}

async function insertDevice(device) {
  let err, result;
  const item = new dbClass.DeviceClass(device);
  [err, result] = await errorFunction(item.save());
  if (err) {
    throw new Error("Error with saving device to a database");
  }
  return result;
}

async function insertLocation(location) {
  let err, result;
  const item = new dbClass.LocationClass(location);
  [err, result] = await errorFunction(item.save());
  if (err) {
    throw new Error("Error with saving location to a database");
  }
  return result;
}

async function insertObject(object) {
  let err, result;
  const item = new dbClass.ObjectClass(object);
  [err, result] = await errorFunction(item.save());
  if (err) {
    throw new Error("Error with saving object to a database");
  }
  return result;
}

async function insertRoom(room) {
  let err, result;
  const item = new dbClass.RoomClass(room);
  [err, result] = await errorFunction(item.save());
  if (err) {
    throw new Error("Error with saving room to a database");
  }
  return result;
}

function updateDevice(deviceIp, statusValue) {
  dbClass.DeviceClass.updateOne(
    { ip_address: deviceIp },
    { $set: { status: statusValue } },
    (err, res) => {
      if (err) {
        throw err;
      }
      console.log("Updated device status - device IP = " + deviceIp);
    }
  );
}

function updateWeather(data) {
  dbClass.WeatherClass.updateOne({}, { $set: data }, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("Updated the weather");
  });
}

/*async function updateLocation(locationName){
    const item = new dbClass.LocationClass(location);
    const result = await item.save();
    return result;
}

async function updateObject(objectName){
    const item = new dbClass.ObjectClass(object);
    const result = await item.save();
    return result;
}

async function updateRoom(roomName){
    const item = new dbClass.RoomClass(room);
    const result = await item.save();
    return result;
}
*/

function checkDevice(input) {
  let reg_name = /^[A-Za-z ]*$/;
  let reg_ip_address = /^(?=.*[^\.]$)((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.?){4}$/;
  let reg_type = /^electro|hvac|video|audio|water$/;
  let reg_array = /^([, ]{0,1}[A-Za-z_ 0-9]*[, ]{0,1}[ ]{0,1})+$/;
  let device = {};

  if (input.name === undefined || !reg_name.test(input.name)) {
    throw new Error("Something wrong with device name");
  }
  device.name = input.name;

  if (input.description === undefined || !reg_name.test(input.description)) {
    throw new Error("Something wrong with device description");
  }
  device.description = input.description;

  if (input.type === undefined || !reg_type.test(input.type)) {
    throw new Error("Something wrong with device type");
  }
  device.type = input.type;

  if (
    input.ip_address === undefined ||
    !reg_ip_address.test(input.ip_address)
  ) {
    throw new Error("Something wrong with ip_address");
  }
  device.ip_address = input.ip_address;
  if (
    input.measure_values === undefined ||
    !reg_array.test(String(input.measure_values))
  ) {
    throw new Error("Something wrong with measure values");
  }
  device.measure_values = input.measure_values;

  if (
    input.set_values_digital === undefined ||
    !reg_array.test(String(input.set_values_digital))
  ) {
    throw new Error("Something wrong with digital values");
  }
  device.set_values_digital = input.set_values_digital;
  
  if (
    input.set_values_analog === undefined ||
    !reg_array.test(String(input.set_values_analog))
  ) {
    throw new Error("Something wrong with analog values");
  }
  device.set_values_analog = input.set_values_analog;
  
  if (
    input.init_data === undefined ||
    !reg_array.test(String(input.init_data))
  ) {
    throw new Error("Something wrong with analog values");
  }
  device.init_data = input.init_data;
 
	
  return device;
}

function checkLocation(input) {
  let reg_name = /^[A-Za-z ]*$/;
  let reg_address = /^[A-Za-z 0-9,]*$/;
  let reg_id = /^[0-9]*$/;
  let location = {};

  if (input.name === undefined || !reg_name.test(input.name)) {
    throw new Error("Something wrong with location name");
  }
  location.name = input.name;

  if (input.address === undefined || !reg_address.test(input.address)) {
    throw new Error("Something wrong with location address");
  }
  location.address = input.address;

  if (input.id === undefined || !reg_id.test(input.id)) {
    throw new Error("Something wrong with location id");
  }
  location.id = input.id;

  return location;
}

function checkObject(input) {
  let reg_name = /^[A-Za-z ]*$/;
  let reg_id = /^[0-9]*$/;
  let object = {};

  if (input.name === undefined || !reg_name.test(input.name)) {
    throw new Error("Something wrong with object name");
  }
  object.name = input.name;

  if (input.id === undefined || !reg_id.test(input.id)) {
    throw new Error("Something wrong with object id");
  }
  object.id = input.id;

  return object;
}

function checkRoom(input) {
  let reg_name = /^[A-Za-z ]*$/;
  let reg_id = /^[0-9]*$/;
  let room = {};

  if (input.name === undefined || !reg_name.test(input.name)) {
    throw new Error("Something wrong with room name");
  }
  room.name = input.name;

  if (input.id === undefined || !reg_id.test(input.id)) {
    throw new Error("Something wrong with room id");
  }
  room.id = input.id;

  return room;
}

module.exports.getDevices = getDevicesFromDatabase;
module.exports.getLocations = getLocationsFromDatabase;
module.exports.getObjects = getObjectsFromDatabase;
module.exports.getRooms = getRoomsFromDatabase;
module.exports.getWeather = getWeatherFromDatabase;

module.exports.insertDevice = insertDevice;
module.exports.insertLocation = insertLocation;
module.exports.insertObject = insertObject;
module.exports.insertRoom = insertRoom;

module.exports.updateDevice = updateDevice;
module.exports.updateWeather = updateWeather;

module.exports.checkDevice = checkDevice;
module.exports.checkLocation = checkLocation;
module.exports.checkObject = checkObject;
module.exports.checkRoom = checkRoom;
