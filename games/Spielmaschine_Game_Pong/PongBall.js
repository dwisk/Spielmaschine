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
    speedX: 0,
    speedY: 0,
    power: false
  }, options);

  // remember default values
  this.resetOptions = init_options;

  // reset ball values
  this.reset();
}

module.exports = PongBall;


/* Variables
 * ==================================================================================================================== */


/* Methods
* ==================================================================================================================== */

// reset ball
PongBall.prototype.reset = function(direction) {
  this.posX = this.resetOptions.posX;
  this.posY = this.resetOptions.posY;

  switch (direction) {
    case "left":
      this.speedX = 1;
      break;
    case "right":
      this.speedX = -1;
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

// move ball
PongBall.prototype.move = function() {
  // move
  this.posX += this.speedX * (this.power ? 2 : 1);
  this.posY += this.speedY * (this.power ? 2 : 1);

  // bounce walls
  if (this.posY <= 0 || this.posY >= 31) {
    this.speedY = this.speedY * -1;
  }
}

// bounce on players
PongBall.prototype.bouncePlayer = function(player, opponent) {

  // check if player missed the ball
  if ((player.side == "left" && this.posX <= -1) || (player.side == "right" && this.posX >= 67)) {
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
      ((player.side == "left" && Math.round(this.posX) <= 3 ) || (player.side == "right" && Math.round(this.posX) >= 61 ))
      && this.posY >= player.pos && this.posY <= player.pos + player.width) {

    // revese speedX
    this.speedX = this.speedX * -1;

    // give ball some movement, if player is moving
    if (player.isUp && player.pos > 0) this.speedY -= 0.25;
    if (player.isDown && player.pos < 32-player.width) this.speedY += 0.25;

    // max out speedY
    if (this.speedY >1) this.speedY = 1;

    // if ball was in power mode, reset
    if (this.power) {
      this.power = false;
      this.posX += this.speedX;
    }

    // if player has power, give ball power
    if (player.power) this.power = true;

    return 1;
  }

  return 0;
}
