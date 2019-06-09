/**
 * Runner
 *
 * --------------------------------------------------------------------------------------------------------------------
 *
 * @author Amely Kling <mail@dwi.sk>
 *
 */

/* Includes
 * ==================================================================================================================== */

var _ = require("lodash");

/* Class Constructor
 * ==================================================================================================================== */

function Runner(options) {
  // default values
  var init_options = Object.assign({
    posX: 1,
    posY: 1,
    color: [255,0,0],
    score: 0,
    trace: [],
    inputs: {
      up: ["inputs","buttons","btn_7"],
      down: ["inputs","buttons","btn_7"],
      left: ["inputs","buttons","btn_7"],
      right: ["inputs","buttons","btn_7"]
    }
  }, options);

  // set player values
  this.posX = init_options.posX;
  this.posY = init_options.posY;
  this.color = init_options.color;
  this.score = init_options.score;
  this.trace = init_options.trace;
  this.inputs = init_options.inputs;
  this.isUp = false;
  this.isDown = false;
}

module.exports = Runner;


/* Variables
 * ==================================================================================================================== */


/* Methods
 * ==================================================================================================================== */

Runner.prototype.reset = function(x,y) {
  this.posX = x;
  this.posY = y;
  this.trace = [];
}

// checks if move buttons is pressed
Runner.prototype.checkMove = function(map) {
  this.isUp = global.pixelNode.data.fastGet(this.inputs.up);
  this.isDown = global.pixelNode.data.fastGet(this.inputs.down);
  this.isLeft = global.pixelNode.data.fastGet(this.inputs.left);
  this.isRight = global.pixelNode.data.fastGet(this.inputs.right);



  if (this.isUp && map[this.posX] && map[this.posX][this.posY-1] == 1) { this.posY--;}
  if (this.isDown && map[this.posX] && map[this.posX][this.posY+1] == 1) { this.posY++;}
  if (this.isLeft && map[this.posX-1] && map[this.posX-1][this.posY] == 1) { this.posX--;}
  if (this.isRight && map[this.posX+1] && map[this.posX+1][this.posY] == 1) { this.posX++;}

  if ((this.isUp ||
      this.isDown ||
      this.isLeft ||
      this.isRight) ) {

    var existingPostion = this.trace.indexOf(this.posX +":"+this.posY);
    if (existingPostion>=0) {
      this.trace.splice(existingPostion,1);
    }
    this.trace.push(this.posX +":"+this.posY);
    this.trace = this.trace.slice(-100);

  }


  // if (this.pos < 0) this.pos = 0;
  // if (this.pos > 32-this.width) this.pos = 32-this.width;
}

function in_array(needle, haystack) {
    for(var i in haystack) {
        if(haystack[i] === needle) return true;
    }
    return false;
}
