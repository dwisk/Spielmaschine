module.exports = [
  {
		name: "Pong",
		module: "./effects/Pong.js",
		outputs: [
			{
				name: "background",
				targets: [
          "left_leg.strips",
					"right_leg.strips",
					"head.strips"
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
          "left_leg.strips",
					"right_leg.strips",
					"head.strips"
				]
			}
		]
	}
]
