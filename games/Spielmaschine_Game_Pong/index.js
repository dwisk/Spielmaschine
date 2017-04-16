/**
 * Spielmaschine_Game_Pong
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
var PongPlayer = require("./PongPlayer");
var PongBall = require("./PongBall");

/* Class Constructor
 * ==================================================================================================================== */

// extending Game
PixelNode_Game = require('../../node_modules/pixelnode/lib/PixelNode_Game.js');

// define the Student class
function Spielmaschine_Game_Pong(options, effects) {
  var self = this;
  Spielmaschine_Game_Pong.super_.call(self, options, effects);
  self.className = "Spielmaschine_Game_Pong";
  self.public_dir = __dirname;
}

// class inheritance
util.inherits(Spielmaschine_Game_Pong, PixelNode_Game);

// module export
module.exports = Spielmaschine_Game_Pong;


/* Variables
 * ==================================================================================================================== */

 Spielmaschine_Game_Pong.prototype.default_options = {
 	"targets": [
 		"domePixels.strips"
 	]
 }

Spielmaschine_Game_Pong.prototype.inited = false;
Spielmaschine_Game_Pong.prototype.backgroundEffect = null;
Spielmaschine_Game_Pong.prototype.foregroundEffect = null;


/* Overridden Methods
 * ==================================================================================================================== */

// init game – override
Spielmaschine_Game_Pong.prototype.init = function() {
	console.log("Init Game Pong".grey);
	var self = this;

	self.backgroundEffect = global.pixelNode.gameManager.getEffectByName(self.options.backgroundEffect);
	self.foregroundEffect = global.pixelNode.gameManager.getEffectByName(self.options.foregroundEffect);

	if (global.config.inputMode == "server") {

    global.pixelNode.data.set(["games","Spielmaschine_Game_Pong"], {

      ball: Object.assign({}, self.ballPrototype)
    });
    self.inited = true
	}
}

// reset game
Spielmaschine_Game_Pong.prototype.reset = function() {
  global.pixelNode.data.set(["games","Spielmaschine_Game_Pong"], {
    player1: new PongPlayer({
      posX: 3,
      side: "left",
      inputs: {
      shield: ["inputs","buttons","btn_7"],
      power: ["inputs","buttons","btn_2"],
      up: ["inputs","buttons","btn_1"],
      down: ["inputs","buttons","btn_6"]

    }}),
    player2: new PongPlayer({
      posX: 67,
      side: "right",
      inputs: {
      shield: ["inputs","buttons","btn_9"],
      power: ["inputs","buttons","btn_4"],
      up: ["inputs","buttons","btn_5"],
      down: ["inputs","buttons","btn_10"]
    }}),
    ball: new PongBall({
      speedX: 0.5 - Math.random(1) > 0 ? 0.5 : -0.5
    })
  });
}

// draw effect – override this
Spielmaschine_Game_Pong.prototype.draw = function() {
	var self = this;

  // draw background
	self.backgroundEffect.draw();

  // get data
  var player1 = global.pixelNode.data.fastGet(["games","Spielmaschine_Game_Pong","player1"]);
  var player2 = global.pixelNode.data.fastGet(["games","Spielmaschine_Game_Pong","player2"]);
  var ball = global.pixelNode.data.fastGet(["games","Spielmaschine_Game_Pong","ball"]);

  // only play if server
  if (global.config.inputMode == "server" && self.inited) {
    // check powerups
    player1.checkShield();
    player2.checkShield();
    player1.checkPower();
    player2.checkPower();

    // move the ball
    ball.move();

    // bounce player1
    ball.bouncePlayer(player1, player2);

    // bounce player2
    ball.bouncePlayer(player2, player1);

    // move players
    player1.checkMove();
    player2.checkMove();


    global.pixelNode.data.set(["games","Spielmaschine_Game_Pong"], {
      "player1": player1,
      "player2": player2,
      "ball": ball
    }, true);
  }

  // draw foreground
  self.foregroundEffect.draw();

}