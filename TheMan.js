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

pixelnode = new PixelNode({
	config: {
		"title": "Spielmaschine Pixelpusher-Display",
		"inputMode": "client",
		"background": true,

		"webServer": {
			"start": false,
			"port": 3001
		},


		// DRIVERS ----------------------------------------------------------------------------------------------------

		"pixelDrivers": [
		{
			"module": "pixelnode-driver-fadecandy",
			"address": "127.0.0.1",
			"port": 7890,
			"delay": 50,
			"dimmer": 0.5
			}
		],


		// EFFECTS ----------------------------------------------------------------------------------------------------

		"effects": PixelNode.requireFile("./TheMan_effects"),
		"after_effects": [
		],


		// INPUTS ----------------------------------------------------------------------------------------------------

		"inputs": [
			{
				"name": "socketclient",
				"module": "../inputs/PixelNode_Input_WebSocket_Client.js",
				"server": "http://192.168.3.35:3001"
			}
			// {
			// 	"name": "rgb",
			// 	"module": "../inputs/PixelNode_Input_TouchRGB"
			// }


		],


    // FONTS ----------------------------------------------------------------------------------------------------

		"fonts": [

		],

		// GAMES  ----------------------------------------------------------------------------------------------------
		"games": PixelNode.requireFile("Games.json"),


	},

	mapping: "TheMan_mapping.json"
});




// override effects
pixelnode.gameManager.on("drawGame_after", function() {

	if (pixelNode.gameManager.game.options.allowBrightness || false) {
		pushed = global.pixelNode.data.fastGet(["inputs","buttons"]);
		if (pushed && pushed.btn_8 && pixelnode.pixelDrivers[0].options.dimmer > 0) {
			pixelnode.pixelDrivers[0].options.dimmer -= 0.01;
		} else if (pushed && pushed.btn_3 && pixelnode.pixelDrivers[0].options.dimmer < 1) {
			pixelnode.pixelDrivers[0].options.dimmer += 0.01;
		}
	}

});
