module.exports = [
  {
		name: "Maze",
		module: "./effects/Maze.js",
		outputs: [
			{
				name: "buttons",
				targets: [
					"buttons.strips"
				]
			}
		]
	},
	{
		name: "MazeStart",
		module: "./effects/Canvas.js",
		draw: [
			{
	      type: "map",
	      position: [0, 0],
	      map: [
	        [1, 0, 0, 0, 0],
	        [0, 0, 0, 0, 1]
	      ],
	      color: [255, 0, 0]
	    },
			{
	      type: "map",
	      position: [0, 0],
	      map: [
	        [0, 1, 1, 1, 1],
	        [1, 1, 1, 1, 0]
	      ],
	      color: [0, 0, 0]
	    }

		],
		outputs: [
			{
				name: "canvas",
				targets: [
					"buttons.strips"
				]
			}
		]
	}
]
