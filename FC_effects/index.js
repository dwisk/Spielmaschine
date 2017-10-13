/* Includes
 * -------------------------------------------------------------------------------------------------------------------- */

var PixelNode = require('pixelnode');


/* Exports
 * -------------------------------------------------------------------------------------------------------------------- */

module.exports = [].concat(
	require("./basics.json"),
	[
		require("./TitleDwisk.js"),
	],
	require("./GameMaze.js"),
	require("./GamePong.js"),
	require("../games/Spielmaschine_Game_Wheels/FC_effects"),
	[

		{
			name: "Off",
			module: "../effects/PixelNode_Effect_Off",
			outputs: [
				{
					name: "glow",
					targets: [
						"pixelmatrix.rings"
					]
				}
			]
		}
	]
);
