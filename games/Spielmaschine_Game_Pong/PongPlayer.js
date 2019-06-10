/**
 * PongPlayer
 *
 * --------------------------------------------------------------------------------------------------------------------
 *
 * @author Amely Kling <mail@dwi.sk>
 *
 */

/* Includes
 * ==================================================================================================================== */


/* Class Constructor
 * ==================================================================================================================== */

function PongPlayer(options) {
  // default values
  var init_options = Object.assign({
    pos: 12,
    side: "left",
    width: 8,
    score: 0,
    shield: false,
    shields: 3,
    power: false,
    powers: 3,
		speed: 1,
		fieldWidth: 30,
    inputs: {
      shield: ["inputs","buttons","btn_7"]
    }
  }, options);

  // set player values
  this.pos = init_options.pos;
  this.side = init_options.side;
  this.width = init_options.width;
  this.score = init_options.score;
  this.shield = init_options.shield;
  this.shields = init_options.shields;
  this.power = init_options.power;
  this.powers = init_options.powers;
  this.speed = init_options.speed;
  this.inputs = init_options.inputs;
	this.fieldWidth = init_options.fieldWidth;
  this.isUp = false;
  this.isDown = false;
}

module.exports = PongPlayer;


/* Variables
 * ==================================================================================================================== */


/* Methods
 * ==================================================================================================================== */

// checks if shield button is pressed
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

// checks if power button is pressed
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

// checks if move buttons is pressed
PongPlayer.prototype.checkMove = function() {
  this.isUp = global.pixelNode.data.fastGet(this.inputs.up);
  this.isDown = global.pixelNode.data.fastGet(this.inputs.down);

  if (this.isUp) { this.pos -= this.speed;}
  if (this.isDown) { this.pos += this.speed;}

  if (this.pos < 0) this.pos = 0;
  if (this.pos > this.fieldWidth-this.width) this.pos = this.fieldWidth-this.width;
}
