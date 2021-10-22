const request = require("request");
const Gpio = require("onoff");

class ElectroSwitch {
  constructor(name, ip_address) {
    this.name = name;
    this.ip_address = ip_address;
  }
  get ipAddress() {
    return this.ip_address;
  }
  turnOn() {
    //console.log(this.ipAddress + "/cm?cmnd=Power%20ON");
    let request_promise = new Promise((resolve, reject) => {
      request(
        "http://" + this.ipAddress + "/cm?cmnd=Power%20ON",
        { json: true },
        (err, res, body) => {
          if (err) {
            reject(err);
          }
          resolve(body);
        }
      );
    });
    return request_promise;
  }
  turnOff() {
    //console.log(this.ipAddress + "/cm?cmnd=Power%20OFF");
    let request_promise = new Promise((resolve, reject) => {
      request(
        "http://" + this.ipAddress + "/cm?cmnd=Power%20OFF",
        { json: true },
        (err, res, body) => {
          if (err) {
            reject(err);
          }
          resolve(body);
        }
      );
    });
    return request_promise;
  }
}

class Relay {
  constructor(relay_number, relay_GPIO_pin_number) {
    this.relay_number = relay_number;
    this.initialize_relay_physically();
  }
  
  initialize_relays_physically(relay_GPIO_pin_number){
	this.relay = new Gpio(relay_GPIO_pin_number, "out");
  }

  turnOn() {
    console.log("Turned ON relay number: " + this.relay_number);
    this.relay.writeSync(1);
  }

  turnOff() {
    console.log("Turned OFF relay number: " + this.relay_number);
    this.relay.writeSync(0);
  }
}




let array_of_devices = [
  {
    name: "Svjetlo u kuhinji",
    type: "electro",
    ip_address: "192.168.4.12",
    status: "off"
  },
  {
    name: "Pumpa - bunar",
    type: "electro",
    status: "off",
    init_data: [16,4]
    
  },
];
module.exports.array_of_devices = array_of_devices;
module.exports.ElectroSwitch = ElectroSwitch;
