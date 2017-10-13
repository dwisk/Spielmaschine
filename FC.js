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

		"sound": {
			enabled: true,
			dir: "sounds"
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

		"effects": PixelNode.requireFile("./FC_effects"),
		"after_effects": [
		],


		// INPUTS ----------------------------------------------------------------------------------------------------

		inputs: [
			{
				"name": "switch",
				"module": "../inputs/PixelNode_Input_WebSocket"
			},
			{
				"name": "buttons",
				"module": "./lib/PixelNode_Input_WiringPi.js",
				"pins": [
					{ "number": 8, "input": "button_front_right", "default": 1 },
					{ "number": 9, "input": "button_front_left", "default": 1 },

					{ "number": 23, "input": "btn_1", "default": 1 },
					{ "number": 22, "input": "btn_2", "default": 1 },
					{ "number": 21, "input": "btn_3", "default": 1 },
					{ "number": 30, "input": "btn_4", "default": 1 },
					{ "number": 13, "input": "btn_5", "default": 1 },
					{ "number": 26, "input": "btn_6", "default": 1 },
					{ "number": 31, "input": "btn_7", "default": 1 },
					{ "number": 11, "input": "btn_8", "default": 1 },
					{ "number": 10, "input": "btn_9", "default": 1 },
					{ "number": 6, "input": "btn_10", "default": 1 }
				]
			},

		],


		// FONTS -----------------------------------------------------------------------------------------------------

		fonts: [],


		// GAMES  ----------------------------------------------------------------------------------------------------
		"games": PixelNode.requireFile("Games.json"),


	},

	mapping: "FC_mapping.json"
});
