/**
 * PixelNode_Effect_Maze
 *
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
function PixelNode_Effect_Maze(options,pixelData) {
  var self = this;
  PixelNode_Effect_Maze.super_.call(self, options, pixelData);
  self.className = "PixelNode_Effect_Maze";
  self.public_dir = __dirname;
}

// class inheritance
util.inherits(PixelNode_Effect_Maze, PixelNode_Effect);

// module export
module.exports = PixelNode_Effect_Maze;


/* Variables
 * ==================================================================================================================== */

 PixelNode_Effect_Maze.prototype.n = 1;
 PixelNode_Effect_Maze.prototype.canvas;
 PixelNode_Effect_Maze.prototype.font;
 PixelNode_Effect_Maze.prototype.mazeOffsetX = 0;
 PixelNode_Effect_Maze.prototype.mazeOffsetY = 0;
 PixelNode_Effect_Maze.prototype.maze;
 PixelNode_Effect_Maze.prototype.backgroundFX = null;


/* Overridden Methods
 * ==================================================================================================================== */

// init effect – override
PixelNode_Effect_Maze.prototype.init = function() {
	console.log("Init Effect Maze".grey);
this.backgroundFX = global.pixelNode.gameManager.getEffectByName("RedBlue");
}

// draw effect on target
PixelNode_Effect_Maze.prototype.drawTarget = function(target, output) {
	var self = this;
  var sz = this.sz;
	
  canvas = new PixelNode_Canvas(target);
  if (output == "buttons") {
    canvas.drawMap([
      [0, 1, 0, 0, 0],
      [1, 1, 1, 0, 0]
    ], 0 ,0 , [255,0,0]);

    canvas.drawMap([
      [0, 0, 1, 1, 1],
      [0, 0, 0, 1, 0]
    ], 0 ,0 , [0,0,255]);

    canvas.drawMap([
      [1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1]
    ], 0 ,0 , [0,0,0]);
		
		
    } else if (output == "panel1" || output == "panel2") {
			canvas.fill([0,0,0]);
			if (output == "panel1") {
				canvas.drawMap([
					[1, 1, 1, 0, 0, 1, 1, 1],
					[1, 1, 0, 0, 0, 0, 1, 1],
					[1, 0, 1, 0, 0, 1, 0, 1],
					[0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0],
					[1, 0, 1, 0, 0, 1, 0, 1],
					[1, 1, 0, 0, 0, 0, 1, 1],
					[1, 1, 1, 0, 0, 1, 1, 1],
				], 0 ,0 , [255,0,0]);
				

			} else if (true) {
				canvas.drawMap([
					[1, 1, 1, 0, 0, 1, 1, 1],
					[1, 1, 0, 0, 0, 0, 1, 1],
					[1, 0, 1, 0, 0, 1, 0, 1],
					[0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0],
					[1, 0, 1, 0, 0, 1, 0, 1],
					[1, 1, 0, 0, 0, 0, 1, 1],
					[1, 1, 1, 0, 0, 1, 1, 1],
				], 0 ,0 , [0,0,255]);


			}

  } else if (output == "table") {
		if(!player1 && !player2) {
			    self.backgroundFX.drawTarget(target, "rainbow");
			return;
		}//*/
		
    var player1 = global.pixelNode.data.fastGet(["games","Spielmaschine_Game_Maze","player1"]);
    var player2 = global.pixelNode.data.fastGet(["games","Spielmaschine_Game_Maze","player2"]);
    var map = global.pixelNode.data.fastGet(["games","Spielmaschine_Game_MazeMap"]);
    var maze = global.pixelNode.data.fastGet(["games","Spielmaschine_Game_Maze", "maze"]);
    if (maze) {
      this.mazeOffsetX = maze.offsetX;
      this.mazeOffsetY = maze.offsetY;
    }
    // canvas.fill([128,148,128]);

    if (map) {
      canvas.rectangle(this.mazeOffsetX,this.mazeOffsetY, map.length, map[0].length, [196,196,196])
      canvas.drawMap(map, this.mazeOffsetX,this.mazeOffsetY , [0,0,0]);

    	canvas.rectangle(this.mazeOffsetX,this.mazeOffsetY+1,1,1,[0,0,0]);
	    canvas.rectangle(this.mazeOffsetX + map.length-1, this.mazeOffsetY + map[0].length-2,1,1,[0,0,0]);
		}



    var player1did= [];
    for (var i = 0; i < player1.trace.length; i++) {
      pos = player1.trace[i].split(":");
      canvas.dot(this.mazeOffsetX + parseInt(pos[0]), this.mazeOffsetY + parseInt(pos[1]), player1.color.concat(0.4));
    }
    for (var i = 0; i < player2.trace.length; i++) {
      pos = player2.trace[i].split(":");
      canvas.dot(this.mazeOffsetX + parseInt(pos[0]), this.mazeOffsetY + parseInt(pos[1]), player2.color.concat(0.4));
    }
    canvas.dot(this.mazeOffsetX + player1.posX, this.mazeOffsetY + player1.posY, player1.color);
    canvas.dot(this.mazeOffsetX + player2.posX, this.mazeOffsetY + player2.posY, player2.color);

  }else if (output == "background") {
    self.backgroundFX.drawTarget(target, "rainbow");
  }
}
