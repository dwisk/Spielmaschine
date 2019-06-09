/**
 * PixelNode_Effect_Wheels
 *
 * --------------------------------------------------------------------------------------------------------------------
 *
 * @author Amely Kling <mail@dwi.sk>
 *
 */

/* Includes
 * ==================================================================================================================== */

var util = require("util");
var PixelNode_Canvas = require('../../node_modules/pixelnode/lib/PixelNode_Canvas.js');

/* Class Constructor
 * ==================================================================================================================== */

// extending Effect
PixelNode_Effect = require('../../node_modules/pixelnode/lib/PixelNode_Effect.js');

// define the Student class
function PixelNode_Effect_Wheels(options,pixelData) {
  var self = this;
  PixelNode_Effect_Wheels.super_.call(self, options, pixelData);
  self.className = "PixelNode_Effect_Wheels";
  self.public_dir = __dirname;
}

// class inheritance
util.inherits(PixelNode_Effect_Wheels, PixelNode_Effect);

// module export
module.exports = PixelNode_Effect_Wheels;


/* Variables
 * ==================================================================================================================== */

PixelNode_Effect_Wheels.prototype.running = false;
PixelNode_Effect_Wheels.prototype.pulled = false;



/* Overridden Methods
 * ==================================================================================================================== */

// init effect – override
PixelNode_Effect_Wheels.prototype.init = function(letters, speeds) {
	console.log("Init Effect Wheels".grey);

  this.positions = [0,0,0];

  if (!letters) letters = ["BDSWBDSWBDSWBDSWBDSW","DBSWDBSWDBSWDBSWDBSW","SBWSSBWSSBWSSBWSSBWS"];
  this.letters = letters;

  if (!speeds) speeds = ["0,0,0"];
  this.speeds = speeds;
}

PixelNode_Effect_Wheels.prototype.positions = [0,0,0];
PixelNode_Effect_Wheels.prototype.heights = [12,12,12];
PixelNode_Effect_Wheels.prototype.speeds = [0.01,0.015,0.02];
PixelNode_Effect_Wheels.prototype.letters = ["A","B","C"];

// draw effect on target
PixelNode_Effect_Wheels.prototype.drawTarget = function(target, output) {
	var self = this;
  canvas = new PixelNode_Canvas(target);

  if (output == "table") {
    self.drawWheel(canvas, 1, 0);
    self.drawWheel(canvas, 18, 1);
    self.drawWheel(canvas, 35, 2);

    self.drawPull(canvas, 54, 1);

  } else if (output == "buttons") {
    canvas.fill([0,0,0]);
    canvas.drawMap([
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1]
    ], 0 ,0 , [0,0,0]);

    canvas.drawMap([
      [0, 0, 0, 0, 1],
      [0, 0, 0, 0, 1]
    ], 0 ,0 , [255,0,0]);

  }

}


PixelNode_Effect_Wheels.prototype.drawWheel = function(canvas, x, index) {
  var pos = this.positions[index];
  var letters = this.letters[index];

  // background
  canvas.rectangle(x, 2, 18, 28, [128,128,128]);
  canvas.rectangle(x+1, 2, 16, 28, [0,0,0]);

  // get font
  var font = global.pixelNode.fontManager.getFont("8bitwonder");

  if (font && font.initialized) {
    var letterHeight = font.mapWord("A")[0].length;
    var wheelHeight = letterHeight*(letters.length-3);
    this.heights[index] = wheelHeight;

    // var offset = -7 - Math.round(wheelHeight*pos/2)-letterHeight;
    var offset = -1 -  Math.round(wheelHeight*pos);

    for (var i = 0; i < letters.length; i++) {
      var letter = letters.charAt(i);
      var map = font.mapWord(letter);
      var alignOffset = Math.floor((map.length-1)/2);
      var color = [196,196,196];

      switch (letter) {
        case "B":
          color = [247,167,0];
          break;
        case "D":
          color = [248,233,0];
          break;
        case "S":
          color = [255,0,0];
          break;
        case "H":
          color = [204,13,230];
          break;
        case "W":
          color = [0,0,255];
          break;
      }

      canvas.drawMap(map, x+9 - alignOffset , offset + letterHeight*i, color);

    }
  }


  // foreground (masking)
  canvas.rectangle(x, 1, 18, 1, [200,200,200]);
  canvas.rectangle(x, 30, 18, 1, [200,200,200]);
  canvas.rectangle(x, 0, 18, 1, [0,0,0]);
  canvas.rectangle(x, 31, 18, 1, [0,0,0]);

}

PixelNode_Effect_Wheels.prototype.drawPull = function(canvas, x, y) {

  if (!this.running && this.pulled) {
    canvas.rectangle(x+3, y+6, 3, 14, [196,196,196]);
    canvas.oval(x, y+18, 9, 9, [255,0,0]);
  } else  {
    canvas.rectangle(x+3, y+6, 3, 14, [196,196,196]);
    canvas.oval(x, y, 9, 9, [255,0,0]);
  }
}
