let mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    name: String,
    description: String,
    type:{type:String, enum:['electro', 'hvac', 'audio', 'video', 'water']},
    ip_address: String,
    status:String,
    init_data:Array,
});

const locationSchema = new mongoose.Schema({
    name: String,
    address: String,
    id: Number,
});

const objectSchema = new mongoose.Schema({
    name: String,
    id: Number,
});

const roomSchema = new mongoose.Schema({
    name: String,
    id: Number,
});

const weatherSchema = new mongoose.Schema({
    description:String,
    temperature:String,
    humidity:String,
    wind:{speed:String, direction: String},
    icon:String
});

const loggerchema = new mongoose.Schema({
    name: String,
    description: String,
    deviceID:String,
    date_time_array: Array,
    values_array:Array
});

const DeviceClass = mongoose.model('Device', deviceSchema);
const LocationClass = mongoose.model('Location', locationSchema);
const ObjectClass = mongoose.model('Object', objectSchema);
const RoomClass = mongoose.model('Room', roomSchema);
const WeatherClass = mongoose.model('Weather', weatherSchema);

module.exports.DeviceClass = DeviceClass;
module.exports.LocationClass = LocationClass;
module.exports.ObjectClass = ObjectClass;
module.exports.RoomClass = RoomClass;
module.exports.WeatherClass = WeatherClass;
