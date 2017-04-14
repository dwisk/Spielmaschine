/**
 * Example
 *
 * --------------------------------------------------------------------------------------------------------------------
 *
 * @author Amely Kling <mail@dwi.sk>
 *
 */


/* Includes
 * -------------------------------------------------------------------------------------------------------------------- */

var PixelNode = require('pixelnode');


/* Config
 * -------------------------------------------------------------------------------------------------------------------- */

new PixelNode({
	config: {
		"title": "Spielmaschine Pixelpusher-Display",
		"inputMode": "client",

		"webServer": {
			"start": false,
			"port": 3001
		},


		// DRIVERS ----------------------------------------------------------------------------------------------------

		"pixelDrivers": [
			{
				"module": "pixelnode-driver-pixelpusher",
				"delay": 25,
				"dimmer": 1
			}
		],


		// EFFECTS ----------------------------------------------------------------------------------------------------

		"effects": PixelNode.requireFile("PP_effects.js"),
		"after_effects": [
		],


		// INPUTS ----------------------------------------------------------------------------------------------------

		"inputs": [
			{
				"name": "socketclient",
				"module": "../inputs/PixelNode_Input_WebSocket_Client.js",
				"server": "http://localhost:3001"
			}
			// {
			// 	"name": "rgb",
			// 	"module": "../inputs/PixelNode_Input_TouchRGB"
			// }


		],


    // FONTS ----------------------------------------------------------------------------------------------------

		"fonts": [
			"./fonts/8bitwonder",
      "./fonts/04b3",
			"./fonts/commonpixel",
  		"./fonts/hachicro",
  		"./fonts/3dventure",
  		"./fonts/PressStart2P"
		],

		// GAMES  ----------------------------------------------------------------------------------------------------
		"games": PixelNode.requireFile("Games.json"),


	},

	mapping: "PP_mapping.json"
});
