/**
 * PixelNode_Input_WiringPi
 *
 * Binary input from GPIOs (beaglebone only)
 *
 * --------------------------------------------------------------------------------------------------------------------
 *
 * @author Amely Kling <mail@dwi.sk>
 *
 */


/* Includes
 * ==================================================================================================================== */

var util = require("util");
var _ = require('underscore');
var gpio = require('wpi-gpio');
gpio.SYNC = false;

var spawn = require('child_process').spawn;
var exec = require('child_process').exec;


/* Class Constructor
 * ==================================================================================================================== */

// extending Effect
PixelNode_Input = require('pixelnode-input');

// define the Student class
function PixelNode_Input_WiringPi(options,pixelData) {
  var self = this;
  PixelNode_Input_WiringPi.super_.call(self, options, pixelData);
  this.className = "PixelNode_Input_WiringPi";
}

// class inheritance
util.inherits(PixelNode_Input_WiringPi, PixelNode_Input);

// module export
module.exports = PixelNode_Input_WiringPi;


/* Variables
 * ==================================================================================================================== */

PixelNode_Input_WiringPi.prototype.default_options = {
	pins: [
		{ number: 9, input: "button1", default: 1 },
		{ number: 8, input: "button2", default: 1 },
		{ number: 23, input: "button3", default: 1 }
	],
	frequency: 50
};
PixelNode_Input_WiringPi.prototype.status_interval = 0;


/* Overridden Methods
 * ==================================================================================================================== */

// init effect – override
PixelNode_Input_WiringPi.prototype.init = function() {
	var self = this;

	// start
	console.log("Init Input GPIO".grey);

	// init pins
	this.initPins();

	// start interval to get pin status
	self.status_interval = setInterval(function() {self.getPinStatus()}, self.options.frequency );

}


/* Methods
 * ==================================================================================================================== */

// initializing pins
PixelNode_Input_WiringPi.prototype.initPins = function() {
	var self = this;

	// inputs
	var init_inputs = {};

	// init
	self.options.pins.forEach(function(pin) {
		// set input mode
    exec('gpio mode ' + pin.number + ' input');

		// set inputs
		init_inputs[pin.input] = false;
	});

	// init pixelNode data
	global.pixelNode.data.extend(["inputs",self.options.name], init_inputs);
}

// get pin status
PixelNode_Input_WiringPi.prototype.getPinStatus = function() {
	var self = this;

  exec('gpio readall', function(error, stdout, stderr) {
    if (!error) {
      var first = false;
      var lines = stdout.split("\n");
      var pins = [];
      var pinValues = {};
      for (var i = 0; i < lines.length; i++) {
        if (lines[i][1] == "|") {
          if (!first) {
            first = true;
          } else {
            pairs = lines[i].split("||");
            values1 = pairs[0].split("|");
            values2 = pairs[1].split("|").reverse();
            if (parseInt(values1[2]).toString() != "NaN" && parseInt(values1[5]).toString() != "NaN") {
              pins.push({
                number: parseInt(values1[2]),
                value: parseInt(values1[5]),
                mode: values1[4].trim()
              });
              pinValues[parseInt(values1[2])] = parseInt(values1[5]);
            }
            if (parseInt(values2[2]).toString() != "NaN" && parseInt(values2[5]).toString() != "NaN") {
              pins.push({
                number: parseInt(values2[2]),
                value: parseInt(values2[5]),
                mode: values2[4].trim()
              });
              pinValues[parseInt(values2[2])] = parseInt(values2[5]);
            }

          }
        }
      }

      // each pin
      self.options.pins.forEach(function(pin) {
        if (true || pin.initialized) {
    			global.pixelNode.data.set(["inputs", self.options.name, pin.input], pinValues[pin.number] != pin.default);
        }
      });
    }
  });


}

PixelNode_Input_WiringPi.prototype.setPinMode = function (number, mode) {

}

PixelNode_Input_WiringPi.prototype.readPin = function (number, callback) {
  var wpi = spawn('gpio', ['read', number]);
  // add an 'end' event listener to close the writeable stream
  wpi.stdout.on('data', function(data) {
    var str = parseInt(data.toString());
      callback(str);
  });



  // exec('gpio read '+number, function (error, stdout, stderr) {
  //   if (!error) {
  //     callback(stdout);
  //   }
  // });
}
