module.exports = [
  {
		name: "Maze",
		module: "./effects/Maze.js",
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
		name: "MazeStart",
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
