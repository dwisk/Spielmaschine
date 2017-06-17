/**
 * Spielmaschine_Game_Maze
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
var Runner = require("./Runner");
var mazeGen = require('@sbj42/maze-generator');


/* Class Constructor
 * ==================================================================================================================== */

// extending Game
PixelNode_Game = require('../../node_modules/pixelnode/lib/PixelNode_Game.js');

// define the Student class
function Spielmaschine_Game_Maze(options, effects) {
  var self = this;
  Spielmaschine_Game_Maze.super_.call(self, options, effects);
  self.className = "Spielmaschine_Game_Maze";
  self.public_dir = __dirname;
}

// class inheritance
util.inherits(Spielmaschine_Game_Maze, PixelNode_Game);

// module export
module.exports = Spielmaschine_Game_Maze;


/* Variables
 * ==================================================================================================================== */

Spielmaschine_Game_Maze.prototype.default_options = { }
Spielmaschine_Game_Maze.prototype.inited = false;
Spielmaschine_Game_Maze.prototype.soundStarted = false;
Spielmaschine_Game_Maze.prototype.maze = null;
Spielmaschine_Game_Maze.prototype.map = [];
Spielmaschine_Game_Maze.prototype.mazeOffsetX = 0;
Spielmaschine_Game_Maze.prototype.mazeOffsetY = 0;
Spielmaschine_Game_Maze.prototype.mazeWidth = 6;//31;
Spielmaschine_Game_Maze.prototype.mazeHeight = 6;//15;
Spielmaschine_Game_Maze.prototype.didHug = false;
Spielmaschine_Game_Maze.prototype.level = 0;
Spielmaschine_Game_Maze.prototype.levels = [
  [3,3],
  [6,3],
  [6,6],
  [9,6],
  [9,9],
  [12,9],
  [12,12],
  [15,12],
  [15,15],
  [18,15],
  [21,15],
  [24,15],
  [27,15],
  [29,15],
  [31,15]
]



/* Overridden Methods
 * ==================================================================================================================== */

// init game – override
Spielmaschine_Game_Maze.prototype.init = function() {
	console.log("Init Game Pong".grey);
	var self = this;

  self.mapEffect = global.pixelNode.gameManager.getEffectByName(self.options.mapEffect);

	if (global.config.inputMode == "server") {
    self.inited = true
	}
}

// reset game
Spielmaschine_Game_Maze.prototype.setLevel = function(levelup = false) {
  if (global.config.inputMode == "server" && this.inited) {
    this.didHug = false;
    if (levelup && this.level < this.levels.length) {
      this.level ++;
      console.log(("Reached Level "+this.level).cyan);
    } else {
      this.level = 0;
    }
    this.mazeWidth = this.levels[this.level][0];
    this.mazeHeight = this.levels[this.level][1];

    this.maze = mazeGen.generate(this.mazeWidth, this.mazeHeight, {
      generator: '@sbj42/maze-generator-backtrack'
      // generator: '@sbj42/maze-generator-prim'
      // generator: '@sbj42/maze-generator-kruskal'
    });


    for (var x = 0; x < this.mazeWidth*2+1; x++) {
      this.map[x] = [];
      for (var y = 0; y < this.mazeHeight*2+1; y++) {
        this.map[x][y] = 0;
      }
    }

    for (var y = 0; y < this.mazeHeight; y++) {
        for (var x = 0; x < this.mazeWidth; x++) {
            cell = this.maze.cell(x, y);
            this.map[x*2+1][y*2+1] = 1;
            if (cell.north()) this.map[x*2+1][y*2+0] = 1;
            if (cell.east())  this.map[x*2+2][y*2+1] = 1;
            if (cell.south()) this.map[x*2+1][y*2+2] = 1;
            if (cell.west())  this.map[x*2+0][y*2+1] = 1;
        }
    }
    // get data
    var player1 = global.pixelNode.data.fastGet(["games","Spielmaschine_Game_Maze","player1"]);
    var player2 = global.pixelNode.data.fastGet(["games","Spielmaschine_Game_Maze","player2"]);
    if (player1) player1.reset(0,1);
    if (player2) player2.reset(this.mazeWidth*2,this.mazeHeight*2-1);
    global.pixelNode.data.set(["games","Spielmaschine_Game_Maze","player1"], player1);
    global.pixelNode.data.set(["games","Spielmaschine_Game_Maze","player2"], player2);
    global.pixelNode.data.set(["games","Spielmaschine_Game_Maze","maze"], {
      offsetX: Math.round(31 - (this.mazeWidth*2-1)/2),
      offsetY: Math.round(15 - (this.mazeHeight*2-1)/2),
    });

    global.pixelNode.data.set(["games","Spielmaschine_Game_MazeMap"], [[]]);
    for (var x = 0; x < this.mazeWidth*2+1; x++) {
      for (var y = 0; y < this.mazeHeight*2+1; y++) {
        global.pixelNode.data.set(["games","Spielmaschine_Game_MazeMap",x], this.map[x]);
      }
    }
  }
}
Spielmaschine_Game_Maze.prototype.reset = function(level) {

  if (global.config.inputMode == "server") {


    global.pixelNode.data.set(["games","Spielmaschine_Game_Maze"], {
      player1: new Runner({
        posX: 0,
        posY: 1,
        color: [255,0,0],
        inputs: {
          up: ["inputs","buttons","btn_2"],
          down: ["inputs","buttons","btn_7"],
          left: ["inputs","buttons","btn_6"],
          right: ["inputs","buttons","btn_8"]
        }
      }),
      player2: new Runner({
        posX: this.mazeWidth*2,
        posY: this.mazeHeight*2-1,
        color: [0,0,255],
        inputs: {
          up: ["inputs","buttons","btn_4"],
          down: ["inputs","buttons","btn_9"],
          left: ["inputs","buttons","btn_3"],
          right: ["inputs","buttons","btn_5"]
        }
      }),
      stage: "start"

    });
    this.setLevel(false);
    this.level = 0;

  }
  this.mapEffect.init();
}

// draw effect – override this
Spielmaschine_Game_Maze.prototype.draw = function() {
	var self = this;
  var stage = global.pixelNode.data.fastGet(["games","Spielmaschine_Game_Maze","stage"]);

  switch(stage) {
    case "start":
      var anybutton = false;
      if (global.config.inputMode == "server" && self.inited) {
        anybutton = (global.pixelNode.data.fastGet(["inputs","buttons","btn_1"])
                       && global.pixelNode.data.fastGet(["inputs","buttons","btn_10"]));
      }
      self.stageScreen("Color", "MazeStart", anybutton ? -1 : 0 , "game", false);
      if (global.config.inputMode == "server" && self.inited) {
        global.pixelNode.gameManager.getEffectByName("MazeStart").draw();
      }
      break;
    case "game":
      self.soundStarted = false;

      self.stageGame();
      break;
    case "won":
      self.stageScreen("ColouredRain", "GameWinner", 250, "start", true);
      break;
    case "point":
      self.stageScreen("Glitter", "GamePoint", 50, "game", false, true);

      if (!self.soundStarted) {
        global.pixelNode.sound.play("point.mp3");
        self.soundStarted = true;
      }


      break;
    case "hug":
      self.stageScreen("Fire", "GameHug", 50, "game", false);
      break;

  }


}

/* Game Stages
 * ==================================================================================================================== */


// stage Game
Spielmaschine_Game_Maze.prototype.stageGame = function() {
	var self = this;

  // draw background
  var effect = global.pixelNode.gameManager.getEffectByName("Off");
  effect.draw();
  self.mapEffect.draw();

  // get data
  var player1 = global.pixelNode.data.fastGet(["games","Spielmaschine_Game_Maze","player1"]);
  var player2 = global.pixelNode.data.fastGet(["games","Spielmaschine_Game_Maze","player2"]);

  // only play if server
  if (global.config.inputMode == "server" && self.inited) {
    // move players
    player1.checkMove(this.map);
    player2.checkMove(this.map);

    var stage = "game";
    var stageOptions = {};

    if (player1.posX == this.mazeWidth*2-1 && player1.posY == this.mazeHeight*2-1) {
      player1.score++;
      stage = this.level < this.levels.length -1 ? "point" : "won";
      stageOptions = {
        player: "player1",
        score1: player1.score,
        score2: player2.score,
      }

    } else if (player2.posX == 1 && player2.posY == 1) {
      player2.score++;
      stage = this.level < this.levels.length -1 ? "point" : "won";
      stageOptions = {
        player: "player2",
        score1: player1.score,
        score2: player2.score,
      }

    } else if (player1.posX == player2.posX && player1.posY == player2.posY && !this.didHug) {
      stage = "hug";
      this.didHug  = true;
    }


    global.pixelNode.data.set(["games","Spielmaschine_Game_Maze"], {
      "player1": player1,
      "player2": player2,
      "stage": stage,
      "stageOptions": stageOptions
    }, true);
  }
}

// stage Point
Spielmaschine_Game_Maze.prototype.stagePointTimer = 0;
Spielmaschine_Game_Maze.prototype.stageScreen = function(backgroundFX, foregroundFX, timerMax, nextGame, resetGame, nextLevel = false) {
  global.pixelNode.gameManager.getEffectByName(backgroundFX).draw();

  if (global.config.inputMode == "server" && this.inited) {
    this.stagePointTimer++;

    if ((timerMax > 0 && this.stagePointTimer > timerMax) || timerMax == -1) {
      this.stagePointTimer = 0;

      global.pixelNode.sound.stop();

      global.pixelNode.data.set(["games","Spielmaschine_Game_Maze", "stage"], nextGame);
      global.pixelNode.data.set(["games","Spielmaschine_Game_Maze", "stageOptions"], {});
      if (resetGame) this.reset(true);
      if (nextLevel) this.setLevel(true);
    }
  } else {

    var stageOptions = global.pixelNode.data.fastGet(["games","Spielmaschine_Game_Maze","stageOptions"]);
    var effect = global.pixelNode.gameManager.getEffectByName(foregroundFX);
    if (stageOptions) {
      effect.variables.player = stageOptions.player;
      effect.variables.score1 = stageOptions.score1;
      effect.variables.score2 = stageOptions.score2;
    }
    effect.draw();
  }

}
