const Nexmo = require("nexmo");

const nexmo = new Nexmo({
  apiKey: "91aef41f",
  apiSecret: "ilvfMtCz7eI6vRdL"
});

function sendSMS(text) {
  const from = "Batman";
  let to = "+385997459099";
  nexmo.message.sendSms(from, to, "Jesil gladan");
  to = "+385989896775";
  nexmo.message.sendSms(from, to, "Livno je Bosna");
}

module.exports.sendSMS = sendSMS;
