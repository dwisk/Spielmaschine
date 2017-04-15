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
Spielmaschine_Game_Pong.prototype.ballPrototype = {
  posX: 32,
  posY: 16,
  speedX: 0,
  speedY: 0
};
Spielmaschine_Game_Pong.prototype.playerPrototype = {
  pos: 12,
  width: 8,
  score: 0,
  shield: false,
  shields: 3,
  power: false,
  powers: 3
};

var last_touches = [];

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
      player1: Object.assign({}, self.playerPrototype),
      player2: Object.assign({}, self.playerPrototype),
      ball: Object.assign({}, self.ballPrototype)
    });
    self.inited = true
	}
	self.initListener();


}

Spielmaschine_Game_Pong.prototype.reset = function(speedX) {
  global.pixelNode.data.set(["games","Spielmaschine_Game_Pong"], {
    player1: Object.assign({}, this.playerPrototype),
    player2: Object.assign({}, this.playerPrototype),
    ball: Object.assign({}, this.ballPrototype, {speedX: speedX == undefined ? ((0.5-Math.random(1)) > 0 ? 0.5 : -0.5) : speedX})
  });
}

// draw effect – override this
Spielmaschine_Game_Pong.prototype.draw = function() {
	var self = this;
	self.backgroundEffect.draw();
  var player1 = global.pixelNode.data.fastGet(["games","Spielmaschine_Game_Pong","player1"]);
  var player2 = global.pixelNode.data.fastGet(["games","Spielmaschine_Game_Pong","player2"]);
  var ball = global.pixelNode.data.fastGet(["games","Spielmaschine_Game_Pong","ball"]);

  if (global.config.inputMode == "server" && self.inited) {

    var player1up = global.pixelNode.data.fastGet(["inputs","buttons","btn_1"]);
    var player1down = global.pixelNode.data.fastGet(["inputs","buttons","btn_6"]);
    var player1shield = global.pixelNode.data.fastGet(["inputs","buttons","btn_7"]);
    var player1power = global.pixelNode.data.fastGet(["inputs","buttons","btn_2"]);

    var player2up = global.pixelNode.data.fastGet(["inputs","buttons","btn_5"]);
    var player2down = global.pixelNode.data.fastGet(["inputs","buttons","btn_10"]);
    var player2shield = global.pixelNode.data.fastGet(["inputs","buttons","btn_9"]);
    var player2power = global.pixelNode.data.fastGet(["inputs","buttons","btn_4"]);

    if (player1shield && !player1.shield && player1.shields > 0) {
      player1.shield = true;
      player1.width = 12;
      player1.pos -= 2;
      player1.shields--;
    } else if (!player1shield && player1.shield) {
      player1.shield = false;
      player1.width = 8;
      player1.pos += 2;
    }
    if (player2shield && !player2.shield && player2.shields > 0) {
      player2.shield = true;
      player2.width = 12;
      player2.pos -= 2;
      player2.shields--;
    } else if (!player2shield && player2.shield) {
      player2.shield = false;
      player2.width = 8;
      player2.pos += 2;
    }

    if (player1power && !player1.power && player1.powers > 0) {
      player1.power = true;
      player1.width = 4;
      player1.pos += 2;
      player1.powers--;
    } else if (!player1power && player1.power) {
      player1.power = false;
      player1.width = 8;
      player1.pos -= 2;
    }
    if (player2power && !player2.power && player2.powers > 0) {
      player2.power = true;
      player2.width = 4;
      player2.pos += 2;
      player2.powers--;
    } else if (!player2power && player2.power) {
      player2.power = false;
      player2.width = 8;
      player2.pos -= 2;
    }


      ball.posX += ball.speedX * (ball.power ? 2 : 1);
      ball.posY += ball.speedY * (ball.power ? 2 : 1);

    // bounce walls
    if (ball.posY <= 0 || ball.posY >= 31) {
      ball.speedY = ball.speedY * -1;
    }

    // bounce player1
    if (ball.posX <= -4) {
      console.log("POINT for player 2".red);
      player2.score++;
      ball = {
        posX: 32,
        posY: 16,
        speedX: 0.5,
        speedY: 0,
        power: false
      }
      player1.powers++;
      player2.powers++;
      player1.shields++;
      player2.shields++;


    } else if (Math.round(ball.posX) <= 3 && ball.posY >= player1.pos && ball.posY <= player1.pos + player1.width) {
      ball.speedX = ball.speedX * -1;
      if (player1up && player1.pos > 0) ball.speedY -= 0.25;
      if (player1down && player1.pos < 32-player1.width) ball.speedY += 0.25;
      if (ball.speedY >1) ball.speedY = 1;
      if (ball.power) {
        ball.power = false;
        ball.posX += ball.speedX;
      }
      if (player1.power) ball.power = true;
    }

    // bounce player2
    if (ball.posX >= 67) {
      console.log("POINT for player 1".red);
      player1.score++;
      ball = {
        posX: 32,
        posY: 16,
        speedX: -0.5,
        speedY: 0,
        power: false
      }

      player1.powers++;
      player2.powers++;
      player1.shields++;
      player2.shields++;


    } else if (Math.round(ball.posX) >= 61 && ball.posY >= player2.pos && ball.posY <= player2.pos + player2.width) {
      ball.speedX = ball.speedX * -1;
      if (player2up && player2.pos > 0) ball.speedY -= 0.25;
      if (player2down && player2.pos < 32-player2.width) ball.speedY += 0.25;
      if (ball.speedY >1) ball.speedY = 1;
      if (ball.power) {
        ball.power = false;
        ball.posX += ball.speedX;
      }
      if (player2.power) ball.power = true;

    }



    if (player1up) { player1.pos--;}
    if (player1down) { player1.pos++;}

    if (player1.pos < 0) player1.pos = 0;
    if (player1.pos > 32-player1.width) player1.pos = 32-player1.width;

    if (player2up) { player2.pos--;}
    if (player2down) { player2.pos++;}

    if (player2.pos < 0) player2.pos = 0;
    if (player2.pos > 32-player2.width) player2.pos = 32-player2.width;

    global.pixelNode.data.set(["games","Spielmaschine_Game_Pong"], {
      "player1": player1,
      "player2": player2,
      "ball": ball
    }, true);
  }
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
