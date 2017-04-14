/**
 * Example
 *
 * --------------------------------------------------------------------------------------------------------------------
 *
 * @author Amely Kling <mail@dwi.sk>
 *
 */

process.env.NODE_ENV = 'production';

/* Includes
 * -------------------------------------------------------------------------------------------------------------------- */

var PixelNode = require('pixelnode');
//var b = require('bonescript');


/* Config
 * -------------------------------------------------------------------------------------------------------------------- */

new PixelNode({
	config: {
		"title": "Spielmaschine Fadecandy & Sensors",
		"inputMode": "server",

		"webServer": {
			"start": true,
			"port": 3001
		},

		"gameManager": {
			"idletime": 20 * 60
		},

		// DRIVERS ----------------------------------------------------------------------------------------------------

		"pixelDrivers": [
		{
			"module": "pixelnode-driver-fadecandy",
			"address": "127.0.0.1",
			"port": 7890,
			"delay": 50,
			"dimmer": 1
			}
		],


		// EFFECTS ----------------------------------------------------------------------------------------------------

		"effects": PixelNode.requireFile("FC_effects.json"),
		"after_effects": [
		],


		// INPUTS ----------------------------------------------------------------------------------------------------

		inputs: [
			{
				"name": "switch",
				"module": "../inputs/PixelNode_Input_WebSocket"
			},

		],


		// FONTS -----------------------------------------------------------------------------------------------------

		fonts: [],


		// GAMES  ----------------------------------------------------------------------------------------------------
		"games": PixelNode.requireFile("Games.json"),


	},

	mapping: "FC_mapping.json"
});
