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
		require("./TitleSpielmaschine.js")
	],
	require("./games.js"),
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
