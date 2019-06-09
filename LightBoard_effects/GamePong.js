module.exports = [
  {
		name: "Pong",
		module: "./effects/Pong.js",
		outputs: [
			{
				name: "background",
				targets: [
					"domePixels.rings"
				]
			}
		]
	},
	{
		name: "PongStart",
		module: "./effects/Canvas.js",
		draw: [


		],
		outputs: [
			{
				name: "background",
				targets: [
					"domePixels.strips"
				]
			}
		]
	}
]
