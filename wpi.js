var gpio = require('wpi-gpio');

gpio.SYNC = false;

var buttons = [
  { pin: 9, initialized: false, value: 0} ,
  { pin: 8, initialized: false, value: 0} ,
  { pin: 23, initialized: false, value: 0} ,
  { pin: 22, initialized: false, value: 0} ,
  { pin: 21, initialized: false, value: 0} ,
  { pin: 30, initialized: false, value: 0} ,
  { pin: 13, initialized: false, value: 0} ,
  { pin: 26, initialized: false, value: 0} ,
  { pin: 31, initialized: false, value: 0} ,
  { pin: 11, initialized: false, value: 0} ,
  { pin: 10, initialized: false, value: 0} ,
  { pin: 6, initialized: false, value: 0}
];

setInterval(function() {
  var status = "";
  buttons.forEach(function(button) {
    if (!button.initialized) {
      gpio.input(button.pin).then(function() {
        button.initialized = true;
        console.log("initialized", button)
      });
    } else {
      gpio.read(button.pin).then(function(val) {
        button.value = val;
      });
    }
    status += button.pin + ":" + button.value +" - ";
  });

  console.log(status);
}, 20);
