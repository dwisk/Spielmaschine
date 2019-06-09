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
		"name": "Heartbeat",
		"module": "./PP_effects/Heartbeat",
		"outputs": [
			{
				name: "buttons",
				targets: [
					"buttons.strips"
				]
			},
			{
				name: "background",
				targets: [
					"bar.strips"
				]
			}
		],
	},
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
