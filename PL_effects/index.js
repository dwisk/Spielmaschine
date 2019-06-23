/* Includes
 * -------------------------------------------------------------------------------------------------------------------- */

var PixelNode = require('pixelnode');


/* Exports
 * -------------------------------------------------------------------------------------------------------------------- */

module.exports = [].concat(
	require("./basics.json"),
	[
		require("./TitleBBB.js"),
		require("./TitleDwisk.js"),
		require("./TitleNoCampCamp.js"),
		require("./TitleSpielmaschine.js"),
		require("./TitleBurnnight.js")
	],
	require("./games.js"),
	require("./GameMaze.js"),
	require("./GamePong.js"),
	require("../games/Spielmaschine_Game_Wheels/PP_effects"),
	require("./Principles.js"),
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
