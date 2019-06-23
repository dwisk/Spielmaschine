module.exports = [
  {
		name: "Maze",
		module: "./effects/Maze.js",
		outputs: [
			{
				name: "background",
				targets: [
					"domePixels.strips"
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
					"domePixels.strips"
				]
			}
		]
	}
]
