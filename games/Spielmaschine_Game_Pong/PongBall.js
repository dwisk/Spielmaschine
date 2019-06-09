/**
 * PongBall
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

function PongBall(options) {
  // default values
  var init_options = Object.assign({
    posX: 32,
    posY: 16,
    bounceX: 32,
    bounceY: 16,
    speedX: 0,
    speedY: 0,
    power: false,
    spin: false
  }, options);

  // remember default values
  this.resetOptions = init_options;

  // reset ball values
  this.reset();
}

module.exports = PongBall;


/* Variables
 * ==================================================================================================================== */

PongBall.defaultSpeed = 1.5;

/* Methods
* ==================================================================================================================== */

// reset ball
PongBall.prototype.reset = function(direction) {
  this.posX = this.resetOptions.posX;
  this.posY = this.resetOptions.posY;
  this.bounceX = this.resetOptions.posX;
  this.bounceY = this.resetOptions.posY;

  switch (direction) {
    case "left":
      this.speedX = PongBall.defaultSpeed;
      break;
    case "right":
      this.speedX = PongBall.defaultSpeed * -1;
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
  this.spin = this.resetOptions.spin;
}

// move ball
PongBall.prototype.move = function() {
  // move
  this.posX += this.speedX * (this.power ? 2 : 1) * (this.spin != 0 ? 0.5 : 1);
  this.posY += this.speedY * (this.power ? 2 : 1) * (this.spin != 0 ? 0.5 : 1);

  this.bounceX = Math.round(this.posX);
  this.bounceY = Math.round(this.posY);

  // bounce walls
  if (this.posY <= 0 || this.posY >= 30) {
    global.pixelNode.sound.play("pong.mp3");
    this.speedY = this.speedY * -1;
  }
}

// bounce on players
PongBall.prototype.bouncePlayer = function(player, opponent) {

  // check if player missed the ball
  if ((player.side == "left" && this.bounceX <= -1) || (player.side == "right" && this.bounceX >= 67)) {
    // opponent made apoint
    console.log(("POINT for player " + opponent.side).red);
    opponent.score++;

    // reset ball and assign loosers side
    this.reset(player.side);

    // some powerups
    player.powers++;
    player.shields++;
    opponent.powers++;
    opponent.shields++;

    return 2;

  // check if player bounced the ball
  } else if (
      ((player.side == "left" && Math.round(this.bounceX) <= 3 ) || (player.side == "right" && Math.round(this.bounceX) >= 60 ))
      && this.bounceY >= player.pos && this.bounceY <= player.pos + player.width) {

    global.pixelNode.sound.play("pong.mp3");

    // reverse speedX
    this.speedX = this.speedX * -1;

    // give ball some movement, if player is moving
    if (player.isUp && player.pos > 0) {
      this.speedY -= (player.shield ? 0.5 : 0.25);
    }
    if (player.isDown && player.pos < 32-player.width) {
      this.speedY += (player.shield ? 0.5 : 0.25);
    }

    // max out speedY
    if (this.speedY >1) this.speedY = 1;

    // if ball was in power mode, reset
    if (this.power) {
      this.power = false;
      this.posX += this.speedX;
      this.bounceX = Math.round(this.posX);
    }

    if (this.spin) {
      this.spin = false;
    }

    // if player has power, give ball power
    if (player.power) this.power = true;
    if (player.shield) { this.spin = true;}


    return 1;
  }

  return 0;
}
