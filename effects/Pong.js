/**
 * PixelNode_Effect_Pong
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
function PixelNode_Effect_Pong(options,pixelData) {
  var self = this;
  PixelNode_Effect_Pong.super_.call(self, options, pixelData);
  self.className = "PixelNode_Effect_Pong";
  self.public_dir = __dirname;
}

// class inheritance
util.inherits(PixelNode_Effect_Pong, PixelNode_Effect);

// module export
module.exports = PixelNode_Effect_Pong;


/* Variables
 * ==================================================================================================================== */




/* Overridden Methods
 * ==================================================================================================================== */

// init effect – override
PixelNode_Effect_Pong.prototype.init = function() {
	console.log("Init Effect Off".grey);
}

PixelNode_Effect_Pong.prototype.pos = 4;
PixelNode_Effect_Pong.prototype.dir = 1;
// draw effect on target
PixelNode_Effect_Pong.prototype.drawTarget = function(target, output) {
  var self = this;

  var player1 = global.pixelNode.data.fastGet(["games","Spielmaschine_Game_Pong","player1"]);
  var player2 = global.pixelNode.data.fastGet(["games","Spielmaschine_Game_Pong","player2"]);
  var ball = global.pixelNode.data.fastGet(["games","Spielmaschine_Game_Pong","ball"]);

  if (player1 && player2 && ball) {

    canvas = new PixelNode_Canvas(target);
    canvas.fill([0,0,0]);
    if (output == "buttons") {
      canvas.drawMap([
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
      ], 0 ,0 , [0,0,0]);

      canvas.drawMap([
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1]
      ], 0 ,0 , [255,255,255]);
      canvas.dot(0, 1, [255 * player1.powers/3], 0, 0);
      canvas.dot(0, 3, [255 * player2.powers/3], 0, 0);
      canvas.dot(1, 1, [0, 0, 255 * player1.shields/3]);
      canvas.dot(1, 3, [0, 0, 255 * player2.shields/3]);

    } else if (output == "table") {

      var font = global.pixelNode.fontManager.getFont('8bitwonder');
      if (font && font.initialized) {
        canvas.drawMap(font.mapWord(player1.score.toString()), 12,11, [255,255,255, 0.4]);

        canvas.drawMap(font.mapWord(player2.score.toString()), 42,11, [255,255,255, 0.4]);
      }

      canvas.rectangle(31,0, 2, 32, [255,255,255,0.3]);

      var player1color =  [255,255,255];
      var player2color =  [255,255,255];

      if (player1.shield) player1color = [0, 0, 255];
      if (player1.power) player1color = [255, 0, 0];
      if (player2.shield) player2color = [0, 0, 255];
      if (player2.power) player2color = [255, 0, 0];

      canvas.rectangle(1,player1.pos,1,player1.width, player1color);
      canvas.rectangle(62,player2.pos,1,player2.width, player2color);

      canvas.rectangle(Math.round(ball.posX)-1, Math.round(ball.posY)-1, 2, 2, ball.power ? [255,0,0]:[255,255,255]);


    }
  }



}
