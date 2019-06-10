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
			},
			{
				name: "panel1",
				targets: [
					"panel1.strips"
				]
			},
			{
				name: "panel2",
				targets: [
					"panel2.strips"
				]
			},
      {
        name: "background",
        targets: [
          "bar.strips"
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
	        [0, 0, 1, 1, 1, 1, 0, 0],
	        [0, 0, 0, 0, 0, 0, 0, 0],
	        [1, 0, 0, 0, 0, 0, 0, 1],
	        [1, 0, 0, 0, 0, 0, 0, 1],
	        [1, 0, 0, 0, 0, 0, 0, 1],
	        [1, 0, 0, 0, 0, 0, 0, 1],
	        [0, 0, 0, 0, 0, 0, 0, 0],
	        [0, 0, 1, 1, 1, 1, 0, 0],
	      ],
	      color: [255, 0, 0]
	    }

		],
		outputs: [
			{
				name: "canvas",
				targets: [
					"panel1.strips",
					"panel2.strips"
				]
			}
		]
	}
]
