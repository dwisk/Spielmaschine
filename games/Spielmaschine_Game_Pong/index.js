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

Spielmaschine_Game_Pong.prototype.default_options = { }
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
      speedX: 0.5 - Math.random(1) > 0 ? PongBall.defaultSpeed : PongBall.defaultSpeed * -1
    }),
    stage: "start"
  });
}

// draw effect – override this
Spielmaschine_Game_Pong.prototype.draw = function() {
	var self = this;
  var stage = global.pixelNode.data.fastGet(["games","Spielmaschine_Game_Pong","stage"]);

  switch(stage) {
    case "start":
      var anybutton = false;
      if (global.config.inputMode == "server" && self.inited) {
        anybutton = (global.pixelNode.data.fastGet(["inputs","buttons","btn_3"])
                       && global.pixelNode.data.fastGet(["inputs","buttons","btn_8"]));
      }
<<<<<<< HEAD
      self.stageScreen("Color", "PongStart", anybutton ? -1 : 0 , "game", false);
      if (global.config.inputMode == "server" && self.inited) {
        global.pixelNode.gameManager.getEffectByName("PongStart").draw();
=======
      self.stageScreen("ColouredRain", "PongStart", anybutton ? -1 : 0 , "game", false);
      if (global.config.inputMode == "server" && self.inited) {
        //global.pixelNode.gameManager.getEffectByName("PongStart").draw();
>>>>>>> master2019
      }
      break;
    case "game":
      self.stageGame();
      self.soundStarted = false;
      break;
    case "point":
      self.stageScreen("Glitter", "GamePoint", 50, "game", false);
      if (!self.soundStarted) {
        global.pixelNode.sound.play("point.mp3");
        self.soundStarted = true;
      }

      break;
    case "won":
      self.stageScreen("ColouredRain", "GameWinner", 250, "start", true);
      break;

  }


}

/* Game Stages
 * ==================================================================================================================== */


// stage Game
Spielmaschine_Game_Pong.prototype.stageGame = function() {
	var self = this;

  // draw background
  //self.backgroundEffect.draw();

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

    var point1 = 0;
    var point2 = 0;
    if (ball.speedX < 0) {
      // bounce player1
      point1 = ball.bouncePlayer(player1, player2);
    } else {
      // bounce player2
      point2 = ball.bouncePlayer(player2, player1);
    }

    // move players
    player1.checkMove();
    player2.checkMove();

    var stage = "game";
    var stageOptions = {};
    if (point1 + point2 >= 2) {
      console.log("Spielstand", player1.score+":"+player2.score);
      if (player1.score < 10 && player2.score < 10) {
        stage = "point";
      } else {
        stage = "won";
      }
      stageOptions = {
        player: point1 > point2 ? "player2" : "player1",
        score: {
          player1: player1.score,
          player2: player2.score
        }
      }
    }

    global.pixelNode.data.set(["games","Spielmaschine_Game_Pong"], {
      "player1": player1,
      "player2": player2,
      "ball": ball,
      "stage": stage,
      "stageOptions": stageOptions
    }, true);
  }

// self.foregroundEffect.draw();
  if (global.config.background) {
    self.backgroundEffect.draw();
  } else {
    self.foregroundEffect.draw();
  }

}

// stage Point
Spielmaschine_Game_Pong.prototype.stagePointTimer = 0;
Spielmaschine_Game_Pong.prototype.stageScreen = function(backgroundFX, foregroundFX, timerMax, nextGame, resetGame) {
  global.pixelNode.gameManager.getEffectByName(backgroundFX).draw();

  if (global.config.inputMode == "server" && this.inited) {
    this.stagePointTimer++;

    if ((timerMax > 0 && this.stagePointTimer > timerMax) || timerMax == -1) {
      this.stagePointTimer = 0;
      global.pixelNode.sound.stop();

      global.pixelNode.data.set(["games","Spielmaschine_Game_Pong", "stage"], nextGame);
      global.pixelNode.data.set(["games","Spielmaschine_Game_Pong", "stageOptions"], {});
      if (resetGame) this.reset();
    }
  } else {

    var stageOptions = global.pixelNode.data.fastGet(["games","Spielmaschine_Game_Pong","stageOptions"]);
    var effect = global.pixelNode.gameManager.getEffectByName(foregroundFX);
    if (stageOptions && effect.variables) {
      effect.variables.player = stageOptions.player;
      effect.variables.score1 = stageOptions.score.player1;
      effect.variables.score2 = stageOptions.score.player2;
    }
    effect.draw();
  }

}
