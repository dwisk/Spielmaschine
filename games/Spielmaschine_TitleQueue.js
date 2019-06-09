/**
 * Spielmaschine_TitleQueue
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

/* Class Constructor
 * ==================================================================================================================== */

// extending Game
PixelNode_Game = require('../node_modules/pixelnode/lib/PixelNode_Game.js');

// define the Student class
function Spielmaschine_TitleQueue(options, effects) {
  var self = this;
  Spielmaschine_TitleQueue.super_.call(self, options, effects);
  self.className = "Spielmaschine_TitleQueue";
  self.public_dir = __dirname;
}

// class inheritance
util.inherits(Spielmaschine_TitleQueue, PixelNode_Game);

// module export
module.exports = Spielmaschine_TitleQueue;


/* Variables
 * ==================================================================================================================== */

 Spielmaschine_TitleQueue.prototype.default_options = {}

Spielmaschine_TitleQueue.prototype.effects = [];
Spielmaschine_TitleQueue.prototype.effect = null;
Spielmaschine_TitleQueue.prototype.afterEffect = null;
Spielmaschine_TitleQueue.prototype.queueEffect = null;
Spielmaschine_TitleQueue.prototype.queueId = 0;


/* Overridden Methods
 * ==================================================================================================================== */

// init effect – override
Spielmaschine_TitleQueue.prototype.init = function() {
	console.log("Init Game Animation".grey);
	var self = this;

	self.setEffectByQueueId(0);

  if (self.options.afterEffect) {
    self.afterEffect = self.getEffectByName(self.options.afterEffect);
  }


	if (global.config.inputMode == "server") {
		global.pixelNode.data.on("changed_inputs_buttons_button_back", function(paths, value) {
			if(self.options.name == global.pixelNode.data.get("game.name") && value) {
				self.nextEffect();
			}
		});
	}
	global.pixelNode.data.on("changed_gameAnimation_queueId", function() {
		if(self.options.name == global.pixelNode.data.get("game.name")) {
			self.setEffectByQueueId.call(self,global.pixelNode.data.get("gameAnimation.queueId"));
		}
	});
	global.pixelNode.data.on("replaced", function() {
		if(self.options.name == global.pixelNode.data.get("game.name")) {
			self.setEffectByQueueId.call(self,global.pixelNode.data.get("gameAnimation.queueId"));
		}
	});
}

Spielmaschine_TitleQueue.prototype.pixelDataOff = function() {
	var self = this;
	if (global.pixelNode.gameManager) {
		global.mapping.forEach(function(map) {
			global.pixelNode.gameManager.pixelData[map.name].mode = "off";
		});
	}
}

// draw effect – override this
Spielmaschine_TitleQueue.prototype.draw = function() {
	var self = this;
	self.effect.draw();
  if (self.afterEffect) self.afterEffect.draw();

	var counter = global.pixelNode.clock.get();

	if (global.config.inputMode == "server" && counter >=(self.queueEffect.duration || 10000)) {
		console.log("Game Animation: autoplay".grey)
		self.nextEffect();
	}

}


Spielmaschine_TitleQueue.prototype.nextEffect = function() {
	var next = this.queueId + 1;
	if (next >= this.options.queue.length) {
		next = 0;
	}
	this.setEffectByQueueId(next);
};

Spielmaschine_TitleQueue.prototype.setEffectByQueueId = function(id) {
	this.pixelDataOff();
	if (this.options.queue[id]) {
		this.setEffectByName(this.options.queue[id].effect, this.options.queue[id].afterEffect);
		this.queueEffect = this.options.queue[id];
		this.queueId = id;

		global.pixelNode.data.set("gameAnimation.queueId", id);
		global.pixelNode.data.set("game.subtitle", this.effect.name);
	}
};

Spielmaschine_TitleQueue.prototype.getEffectByName = function(name) {
	var self = this;
	var effect = null;
	self.effects.forEach(function(fx) {
		if (fx.name == name) {
			effect = fx;
		}
	});
	return effect;
}
Spielmaschine_TitleQueue.prototype.setEffectByName = function(name, nameAfter) {
	var self = this;
	self.pixelDataOff();

	self.effect = self.getEffectByName(name);

  if (nameAfter) {
    self.afterEffect = self.getEffectByName(nameAfter);
  } else {
    self.afterEffect = self.getEffectByName(self.options.afterEffect);
  }

	global.pixelNode.clock.reset();

	if (self.effect.reset != undefined)  {
		self.effect.reset();
	}
	if (self.afterEffect && self.afterEffect.reset != undefined)  {
		self.afterEffect.reset();
	}

	console.log(("Changed Effect to " + this.effect.options.name.white + (" (" + this.effect.options.module + ")").grey).grey);
	global.pixelNode.data.set("gameAnimation.effect", this.effect.options);
};
