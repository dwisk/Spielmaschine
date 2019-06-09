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

/* Class Constructor
 * ==================================================================================================================== */

// extending Game
PixelNode_Game = require('../node_modules/pixelnode/lib/PixelNode_Game.js');

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


function PongPlayer(options) {
  var init_options = Object.assign({
    pos: 12,
    side: "left",
    width: 8,
    score: 0,
    shield: false,
    shields: 3,
    power: false,
    powers: 3,
    inputs: {
      shield: ["inputs","buttons","btn_7"]
    }
  }, options);

  this.pos = init_options.pos;
  this.side = init_options.side;
  this.width = init_options.width;
  this.score = init_options.score;
  this.shield = init_options.shield;
  this.shields = init_options.shields;
  this.power = init_options.power;
  this.powers = init_options.powers;
  this.inputs = init_options.inputs;
  this.isUp = false;
  this.isDown = false;
}

PongPlayer.prototype.checkShield = function() {
  var playershield = global.pixelNode.data.fastGet(this.inputs.shield);
  if (playershield && !this.shield && this.shields > 0) {
    this.shield = true;
    this.width = 12;
    this.pos -= 2;
    this.shields--;
  } else if (!playershield && this.shield) {
    this.shield = false;
    this.width = 8;
    this.pos += 2;
  }
}


PongPlayer.prototype.checkPower = function() {
  var playerpower = global.pixelNode.data.fastGet(this.inputs.power);
  if (playerpower && !this.power && this.powers > 0) {
    this.power = true;
    this.width = 4;
    this.pos += 2;
    this.powers--;
  } else if (!playerpower && this.power) {
    this.power = false;
    this.width = 8;
    this.pos -= 2;
  }
}

PongPlayer.prototype.checkMove = function() {
  this.isUp = global.pixelNode.data.fastGet(this.inputs.up);
  this.isDown = global.pixelNode.data.fastGet(this.inputs.down);

  if (this.isUp) { this.pos--;}
  if (this.isDown) { this.pos++;}

  if (this.pos < 0) this.pos = 0;
  if (this.pos > 32-this.width) this.pos = 32-this.width;
}


function PongBall(options) {
  var init_options = Object.assign({
    posX: 32,
    posY: 16,
    speedX: 0,
    speedY: 0,
    power: false
  }, options);

  this.resetOptions = init_options;
  this.reset();
}

PongBall.prototype.reset = function(direction) {
  this.posX = this.resetOptions.posX;
  this.posY = this.resetOptions.posY;

  switch (direction) {
    case "left":
      this.speedX = 0.5;
      break;
    case "right":
      this.speedX = -0.5;
      break;
    case "none":
      this.speedX = 0;
      break;
    default:
      this.speedX = this.resetOptions.speedX;
      break;
  }

  this.speedY = this.resetOptions.speedY;
  this.power = this.resetOptions.power;
}

PongBall.prototype.move = function() {
  this.posX += this.speedX * (this.power ? 2 : 1);
  this.posY += this.speedY * (this.power ? 2 : 1);

  // bounce walls
  if (this.posY <= 0 || this.posY >= 31) {
    this.speedY = this.speedY * -1;
  }
}

PongBall.prototype.bouncePlayer = function(player, opponent) {
  if ((player.side == "left" && this.posX <= -1) || (player.side == "right" && this.posX >= 67)) {
    console.log(("POINT for player " + opponent.side).red);
    opponent.score++;
    this.reset(player.side);
    player.powers++;
    opponent.powers++;
    player.shields++;
    opponent.shields++;


  } else if (
      ((player.side == "left" && Math.round(this.posX) <= 3 ) || (player.side == "right" && Math.round(this.posX) <= 61 ))
      && this.posY >= player.pos && this.posY <= player.pos + player.width) {

    this.speedX = this.speedX * -1;
    if (player.isUp && player.pos > 0) this.speedY -= 0.25;
    if (player.isDown && player.pos < 32-player.width) this.speedY += 0.25;
    if (this.speedY >1) this.speedY = 1;
    if (this.power) {
      this.power = false;
      this.posX += this.speedX;
    }
    if (player.power) this.power = true;
  }
}


/* Overridden Methods
 * ==================================================================================================================== */

// init effect – override
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
	self.initListener();


}

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


Spielmaschine_Game_Pong.prototype.initListener = function() {
	var self = this;

	// global.pixelNode.data.on("changed_inputs_buttons_btn1", function(paths, value) {
	// 	var player1 = self.foregroundEffect.player1;
  //   player.pos -= 1;
	// });
  //
	// global.pixelNode.data.on("changed_inputs_buttons", function(paths, value) {
	// 	var found = paths[0].match(/btn_(\d*)/);
  //
	// 	if (value && found != null) {
  //
	// 		index = parseInt(paths[0].split("_")[1]);
  //
	// 		self.addSprite(index);
	// 	}
	// });
}

Spielmaschine_Game_Pong.prototype.addSprite = function(index) {
	var self = this;

	var sprite = self.effect.spritePrototype != undefined ? _.clone(self.effect.spritePrototype) : {};
	sprite.index = index;
	self.effect.sprites.push(sprite);
}
