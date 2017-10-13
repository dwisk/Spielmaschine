/**
 * Spielmaschine_Game_Wheels
 *
 * Animation Game
 *
 * --------------------------------------------------------------------------------------------------------------------
 *
 * @author Amely Kling <mail@dwi.sk>
 *
 */

/* Includes
 * ==================================================================================================================== */

var util = require("util");
var _ = require("underscore");

/* Class Constructor
 * ==================================================================================================================== */

// extending Game
PixelNode_Game = require('../../node_modules/pixelnode/lib/PixelNode_Game.js');

// define the Student class
function Spielmaschine_Game_Wheels(options, effects) {
  var self = this;
  Spielmaschine_Game_Wheels.super_.call(self, options, effects);
  self.className = "Spielmaschine_Game_Wheels";
  self.public_dir = __dirname;
}

// class inheritance
util.inherits(Spielmaschine_Game_Wheels, PixelNode_Game);

// module export
module.exports = Spielmaschine_Game_Wheels;


/* Variables
 * ==================================================================================================================== */

Spielmaschine_Game_Wheels.prototype.default_options = {
  probability: {
    "B": 8,
    "D": 4,
    "S": 3,
    "W": 1,
    "N": 10,
    "H": 4
  }
}
Spielmaschine_Game_Wheels.prototype.inited = false;



/* Overridden Methods
 * ==================================================================================================================== */

// init game – override
Spielmaschine_Game_Wheels.prototype.init = function() {
	console.log("Init Game Wheels".grey);
	var self = this;

 self.gameEffect = global.pixelNode.gameManager.getEffectByName(self.options.gameEffect);

	if (global.config.inputMode == "server") {
    self.inited = true
    self.reset();
    global.pixelNode.data.set(["games","Spielmaschine_Game_Wheels", "stage"], "start");
    global.pixelNode.data.set(["games","Spielmaschine_Game_Wheels", "probability"], self.options.probability);
	}

}

// reset game
Spielmaschine_Game_Wheels.prototype.reset = function(level) {

  if (global.config.inputMode == "server") {
    global.pixelNode.data.set(["games","Spielmaschine_Game_Wheels", "running"], true);
  } else {

    var probability = global.pixelNode.data.fastGet(["games","Spielmaschine_Game_Wheels","probability"]);
    var chars = ""; // "BBBBBBBBDDDDSSSWNNNNNNNNNNNNHHHH";

    if (probability) {
      Object.keys(probability).forEach(function(key) {
        var val = probability[key];
        for (var j = 0; j < val; j++) {
          chars += key;
        }

      });
    } else {
      chars = "BBBBBBBBDDDDSSSWNNNNNNNNNNNNHHHH";
    }

    var letters = [];

    for (var i = 0; i < 3; i++) {
      chars = chars.split('').sort(function(){return 0.5-Math.random()}).join('');

      letters[i] = "";
      for (var j = 0; j < chars.length; j++) {
        //var rnd = Math.floor(Math.random()*chars.length);
        letters[i] = letters[i] + chars.charAt(j);
      }
    }
    this.gameEffect.init(letters);
    for (var i = 0; i < 3; i++) {
      this.gameEffect.speeds[i] = 0.005 + Math.random()*0.005;
    }
  }

}

// draw effect – override this
Spielmaschine_Game_Wheels.prototype.timer = 0;
Spielmaschine_Game_Wheels.prototype.draw = function() {
	var self = this;
  var stage = global.pixelNode.data.fastGet(["games","Spielmaschine_Game_Wheels","stage"]);
  var running = global.pixelNode.data.fastGet(["games","Spielmaschine_Game_Wheels","running"]);
  var buttons = global.pixelNode.data.fastGet(["inputs","buttons"]);

  switch(stage) {
    case "start":
      var pulled = false;
      if (global.config.inputMode == "server" && self.inited) {
        pulled = (buttons.btn_5) && buttons.btn_10;
      }
      self.stageScreen("Color", "WheelsStart", pulled ? -1 : 0 , "game", false);
      if (global.config.inputMode == "server" && self.inited) {
        global.pixelNode.gameManager.getEffectByName("WheelsStart").draw();
      }

      if (global.config.inputMode == "server" && this.inited) {
        self.timer++;
        if (buttons.btn_1 && !buttons.btn_4 && self.timer > 5) { self.setProbability("B"); self.timer = 0;}
        else if (buttons.btn_2 && !buttons.btn_4 && self.timer > 5) { self.setProbability("D"); self.timer = 0;}
        else if (buttons.btn_3 && !buttons.btn_4 && self.timer > 5) { self.setProbability("S"); self.timer = 0;}
        else if (buttons.btn_6 && !buttons.btn_4 && self.timer > 5) { self.setProbability("H"); self.timer = 0;}
        else if (buttons.btn_7 && !buttons.btn_4 && self.timer > 5) { self.setProbability("N"); self.timer = 0;}
        else if (buttons.btn_8 && !buttons.btn_4 && self.timer > 5) { self.setProbability("W"); self.timer = 0;}
      }

      break;
    case "game":
      //if (!running) self.reset();
      if ( (buttons.btn_4 && buttons.btn_2 && buttons.btn_3 && buttons.btn_6 && buttons.btn_7 && buttons.btn_8) ) {
        global.pixelNode.data.set(["games","Spielmaschine_Game_Wheels", "stage"], "start");
      }
      var pulled = (buttons.btn_5 || buttons.btn_10);
      if (pulled && !running) self.reset();
      self.gameEffect.pulled = pulled;
      self.gameEffect.running = running;

      self.stageGame();
      break;


  }


}

Spielmaschine_Game_Wheels.prototype.setProbability = function (char) {
  var probability = global.pixelNode.data.fastGet(["games","Spielmaschine_Game_Wheels","probability",char]);
  probability += 1;
  if (probability > 10) probability = 0;
  global.pixelNode.data.set(["games","Spielmaschine_Game_Wheels","probability",char], probability);
}

/* Game Stages
 * ==================================================================================================================== */


// stage Game
Spielmaschine_Game_Wheels.prototype.stageGame = function() {
	var self = this;

  // draw background
  var effect = global.pixelNode.gameManager.getEffectByName("Off");
  effect.draw();

  var done = 0;

  for (var i = 0; i < 3; i++) {
    if (self.gameEffect.positions[i] < 1) self.gameEffect.positions[i] += self.gameEffect.speeds[i];
    if (self.gameEffect.positions[i] >= 1) {
      self.gameEffect.positions[i] = 1;
      done ++;
    }
  }

  if (done >= 3) {
    self.running = false;
    global.pixelNode.data.set(["games","Spielmaschine_Game_Wheels", "running"], false);
  }

  self.gameEffect.draw();

}

// stage Point
Spielmaschine_Game_Wheels.prototype.stagePointTimer = 0;
Spielmaschine_Game_Wheels.prototype.stageScreen = function(backgroundFX, foregroundFX, timerMax, nextGame, resetGame, nextLevel = false) {
  global.pixelNode.gameManager.getEffectByName(backgroundFX).draw();

  if (global.config.inputMode == "server" && this.inited) {
    this.stagePointTimer++;

    if ((timerMax > 0 && this.stagePointTimer > timerMax) || timerMax == -1) {
      this.stagePointTimer = 0;

      global.pixelNode.sound.stop();

      global.pixelNode.data.set(["games","Spielmaschine_Game_Wheels", "stage"], nextGame);
      global.pixelNode.data.set(["games","Spielmaschine_Game_Wheels", "stageOptions"], {});
      if (resetGame) this.reset(true);
      if (nextLevel) this.setLevel(true);
    }
  } else {

    var stageOptions = global.pixelNode.data.fastGet(["games","Spielmaschine_Game_Wheels","stageOptions"]);
    var effect = global.pixelNode.gameManager.getEffectByName(foregroundFX);
    if (stageOptions) {
      effect.variables.player = stageOptions.player;
      effect.variables.score1 = stageOptions.score1;
      effect.variables.score2 = stageOptions.score2;
    }
    effect.draw();
  }

}
