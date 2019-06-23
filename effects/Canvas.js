/**
 * PixelNode_Effect_Canvas
 *
   {
     type: "fill",
     color: [255, 0, 100, 0.5]
   },
   {
     type: "line",
     from: [0, 0],
     to: [0, 0],
     color: [255, 255, 255, 0.4]
   },
   {
     type: "rectangle",
     position: [5, 5],
     width: 40,
     height: 10,
     color: [255, 255, 255, 0.6]
   },
   {
     type: "oval",
     position: [0, 0],
     width: 100,
     height: 100,
     color: [255, 255, 255, 1]
   },
   {
     type: "circle",
     position: [25, 25],
     radius: 10,
     color: [255, 255, 255, 0.6]
   },
   {
     type: "map",
     position: [33, 5],
     map: [
       [1, 0, 0, 1],
       [0, 1, 1, 0],
       [0, 1, 1, 0],
       [1, 0, 0, 1]
     ],
     color: [255, 255, 255, 0.6]
   },
   {
     type: "text",
     font: "8bitwonder",
     text: "DWISK",
     position: [3, 10],
     color: [255, 255, 255, 1]
   }
 * --------------------------------------------------------------------------------------------------------------------
 *
 * @author Amely Kling <mail@dwi.sk>
 *
 */

/* Includes
 * ==================================================================================================================== */

var util = require("util");
var PixelNode_Canvas = require('../node_modules/pixelnode/lib/PixelNode_Canvas.js');

/* Class Constructor
 * ==================================================================================================================== */

// extending Effect
PixelNode_Effect = require('../node_modules/pixelnode/lib/PixelNode_Effect.js');

// define the Student class
function PixelNode_Effect_Canvas(options,pixelData) {
  var self = this;
  PixelNode_Effect_Canvas.super_.call(self, options, pixelData);
  self.className = "PixelNode_Effect_Canvas";
  self.public_dir = __dirname;
}

// class inheritance
util.inherits(PixelNode_Effect_Canvas, PixelNode_Effect);

// module export
module.exports = PixelNode_Effect_Canvas;


/* Variables
 * ==================================================================================================================== */

 PixelNode_Effect_Canvas.prototype.n = 1;
 PixelNode_Effect_Canvas.prototype.canvas;
 PixelNode_Effect_Canvas.prototype.variables = {};


/* Overridden Methods
 * ==================================================================================================================== */

// init effect – override
PixelNode_Effect_Canvas.prototype.init = function() {
	console.log("Init Effect Off".grey);
}

PixelNode_Effect_Canvas.prototype.pos = 4;
PixelNode_Effect_Canvas.prototype.dir = 1;
// draw effect on target
PixelNode_Effect_Canvas.prototype.drawTarget = function(target, output) {
	var self = this;
  canvas = new PixelNode_Canvas(target);

  if (typeof self.options.preDraw == "function") {
    self.options.preDraw.bind(self)(target, output);
  }

  for (var i = 0; i < this.options.draw.length; i++) {
    var element = this.options.draw[i];
    switch (element.type) {
      case "fill":
        canvas.fill(element.color);
        break;

      case "line":
        canvas.line(element.from[0], element.from[1], element.to[0], element.to[1], element.color);
        break;

      case "rectangle":
        canvas.rectangle(element.position[0], element.position[1], element.width, element.height, self.getValue(element.color));
        break;

      case "oval":
        canvas.oval(element.position[0], element.position[1], element.width, element.height, element.color);
        break;

      case "circle":
        canvas.circle(element.position[0], element.position[1], element.radius, element.color);
        break;

      case "map":
        canvas.drawMap(element.map, element.position[0], element.position[1], element.color);
        break;

      case "text":

        // get font
        var font = global.pixelNode.fontManager.getFont(element.font);
        // draw whin initialized
        if (font && font.initialized) {
          var map = font.mapWord(self.getValue(element.text));
          var alignOffset = 0;
          switch(self.getValue(element.align)) {
            case "right":
              alignOffset = map.length-1;
              break;
            case "center":
              alignOffset = Math.floor((map.length-1)/2);
              break;

          }
          canvas.drawMap(map, self.getValue(element.position)[0] - alignOffset, self.getValue(element.position)[1], self.getValue(element.color));
        }
        break;
    }
  }

  if (typeof self.options.afterDraw == "function") {
    self.options.afterDraw.bind(self)(target, output);
  }

}

PixelNode_Effect_Canvas.prototype.reset = function () {
  this.variables = [];
}

PixelNode_Effect_Canvas.prototype.getValue = function(property) {
  if (typeof property == "function") {
    return property.bind(this)();
  } else {
    return property;
  }
}

PixelNode_Effect_Canvas.prototype.bounce = function(name, conf) {
  if (this.variables[name] == undefined) this.variables[name] =  {};
  var bounceConf = Object.assign({
    min: 0,
    max: 100,
    speed: 1,
    initialValue: 50,
    initialDirection: 1,
    round: true
  }, this.variables[name], conf);
  if (bounceConf.value == undefined) bounceConf.value = bounceConf.initialValue;
  if (bounceConf.direction == undefined) bounceConf.direction = bounceConf.initialDirection;

  if (bounceConf.value >= bounceConf.max) {
    bounceConf.direction = -1;
  } else if (bounceConf.value <= bounceConf.min) {
    bounceConf.direction = 1;
  }
  bounceConf.value += bounceConf.direction * bounceConf.speed;
  this.variables[name] = bounceConf;
  return bounceConf.round ? Math.round(bounceConf.value) : bounceConf.value;
}
