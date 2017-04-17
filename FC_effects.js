module.exports = [
	{
		"name": "Clock",
		"module": "../effects/PixelNode_Effect_TwoClock",
		"outputs": [
			{
				"name": "clock",
				"targets": [
					"buttons.strips",
					"bar.strips"
				]
			}
		]
	},
	{
		"name": "Wall",
		"module": "../effects/PixelNode_Effect_TwoWall",
		"outputs": [
			{
				"name": "ray",
				"targets": [
					"buttons.strips",
					"bar.strips"
				]
			}
		]
	},
	{
		"name": "Color",
		"module": "../effects/PixelNode_Effect_TwoColor",
		"outputs": [
			{
				"name": "both",
				"targets": [
					"buttons.strips",
					"bar.strips"
				]
			}
		]
	},
	{
		"name": "Ray",
		"module": "../effects/PixelNode_Effect_TwoRay",
		"outputs": [
			{
				"name": "ray",
				"targets": [
					"buttons.strips",
					"bar.strips"
				]
			}
		]
	},
	{
		"name": "Wave",
		"module": "../effects/PixelNode_Effect_TwoWave",
		"outputs": [
			{
				"name": "ray",
				"targets": [
					"buttons.strips",
					"bar.strips"
				]
			}
		]
	},
	{
		"name": "Glitter",
		"module": "../effects/PixelNode_Effect_TwoGlitter",
		"outputs": [
			{
				"name": "glow",
				"targets": [
					"buttons.strips",
					"bar.strips"
				]
			}
		]
	},
	{
		"name": "RainBow",
		"module": "../effects/PixelNode_Effect_Rainbow",
		"scale": 10,
		"speed": 50,
		"outputs": [
			{
				"name": "rainbow",
				"targets": [
					"buttons.strips",
					"bar.strips"
				]
			}
		]
	},
	{
		"name": "RainBowRings",
		"module": "../effects/PixelNode_Effect_Rainbow",
		"scale": 1,
		"speed": 100,
		"outputs": [
			{
				"name": "rainbow",
				"targets": [
					"buttons.strips",
					"bar.strips"
				]
			}
		]
	},
	{
		"name": "RedBlue",
		"module": "../effects/PixelNode_Effect_RedBlue",
		"outputs": [
			{
				"name": "glow",
				"targets": [
					"buttons.rings",
					"bar.rings"
				]
			}
		]
	},	{
		"name": "Fire",
		"module": "../effects/PixelNode_Effect_Fire",
		"speed": 0,
		"outputs": [
			{
				"name": "glow",
				"targets": [
					"buttons.strips",
					"bar.strips"
				]
			}
		]
	},
	{
		"name": "Rain",
		"module": "../effects/PixelNode_Effect_ColouredRain",
		"speed": 0.75,
		"direction": 1,
		"intensity": 0.5,
		"fixedColor": [0,0,255],
		"outputs": [
			{
				"name": "glow",
				"targets": [
					"buttons.strips",
					"bar.rings"
				]
			}
		]
	},
	{
		"name": "ColouredRain",
		"module": "../effects/PixelNode_Effect_ColouredRain",
		"scale": 0,
		"speed": 0,
		"outputs": [
			{
				"name": "glow",
				"targets": [
					"buttons.strips",
					"bar.rings"
				]
			}
		]
	},
	{
		"name": "Off",
		"module": "../effects/PixelNode_Effect_Off",
		"outputs": [
			{
				"name": "glow",
				"targets": [
				]
			}
		]
	},
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
		name: "Pong",
		module: "./effects/Pong.js",
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
		name: "PongStart",
		module: "./effects/Canvas.js",
		draw: [
			{
	      type: "map",
	      position: [0, 0],
	      map: [
	        [0, 0, 0, 0, 0],
	        [0, 0, 1, 0, 0]
	      ],
	      color: [255, 0, 0]
	    },
			{
	      type: "map",
	      position: [0, 0],
	      map: [
	        [1, 1, 1, 1, 1],
	        [1, 1, 0, 1, 1]
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
	},
	{
		name: "TitleDwisk",
		module: "./effects/Canvas.js",
		draw: [
			{
	      type: "map",
	      position: [0, 0],
	      map: [
	        [1, 0, 0, 0, 0],
	        [1, 0, 0, 0, 0]
	      ],
	      color: [255, 0, 0]
	    },
			{
	      type: "map",
	      position: [0, 0],
	      map: [
	        [0, 1, 0, 0, 0],
	        [0, 1, 0, 0, 0]
	      ],
	      color: [255, 255, 0]
	    },
			{
	      type: "map",
	      position: [0, 0],
	      map: [
	        [0, 0, 1, 0, 0],
	        [0, 0, 1, 0, 0]
	      ],
	      color: [0, 255, 0]
	    },
			{
	      type: "map",
	      position: [0, 0],
	      map: [
	        [0, 0, 0, 1, 0],
	        [0, 0, 0, 1, 0]
	      ],
	      color: [0, 255, 255]
	    },
			{
	      type: "map",
	      position: [0, 0],
	      map: [
	        [0, 0, 0, 0, 1],
	        [0, 0, 0, 0, 1]
	      ],
	      color: [0, 0, 255]
	    },

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
