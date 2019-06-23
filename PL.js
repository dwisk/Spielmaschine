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

		"webServer": {
			"start": false,
			"port": 3001
		},


		// DRIVERS ----------------------------------------------------------------------------------------------------

		"pixelDrivers": [
		{
			"module": "pixelnode-driver-dmx",
			"ip": "192.168.3.106",
			//"ip": "192.168.3.20",
			"delay": 50,
			"dimmer": 0.25
			}
			
		],

		// EFFECTS ----------------------------------------------------------------------------------------------------

		"effects": PixelNode.requireFile("./PL_effects"),
		"after_effects": [
		],


		// INPUTS ----------------------------------------------------------------------------------------------------

		"inputs": [
			{
				"name": "socketclient",
				"module": "../inputs/PixelNode_Input_WebSocket_Client.js",
				"server": "http://192.168.5.104:3001"
				//"server": "http://localhost:3001"
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

	mapping: PixelNode.requireFile("PL_mapping.js"),
});


// override effects
/*pixelnode.gameManager.on("drawGame_after", function() {

	if (pixelNode.gameManager.game.options.allowBrightness || false) {
		pushed = global.pixelNode.data.fastGet(["inputs","buttons"]);
		if (pushed && pushed.btn_8 && pixelnode.pixelDrivers[0].options.dimmer > 0) {
			pixelnode.pixelDrivers[0].options.dimmer -= 0.01;
		} else if (pushed && pushed.btn_3 && pixelnode.pixelDrivers[0].options.dimmer < 1) {
			pixelnode.pixelDrivers[0].options.dimmer += 0.01;
		}
	}

});

*/