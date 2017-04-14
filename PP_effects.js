module.exports = [
	{
		name: "Clock",
		module: "../effects/PixelNode_Effect_TwoClock",
		outputs: [
			{
				name: "clock",
				targets: [
					"pixelmatrix.rings"
				]
			}
		]
	},
	{
		name: "Wall",
		module: "../effects/PixelNode_Effect_TwoWall",
		outputs: [
			{
				name: "ray",
				targets: [
					"pixelmatrix.rings"
				]
			}
		]
	},
	{
		name: "Color",
		module: "../effects/PixelNode_Effect_TwoColor",
		outputs: [
			{
				name: "both",
				targets: [
					"pixelmatrix.rings"
				]
			}
		]
	},
	{
		name: "Ray",
		module: "../effects/PixelNode_Effect_TwoRay",
		outputs: [
			{
				name: "ray",
				targets: [
					"pixelmatrix.rings"
				]
			}
		]
	},
	{
		name: "Wave",
		module: "../effects/PixelNode_Effect_TwoWave",
		scale: 4,
		waveBase: 0.5,
		outputs: [
			{
				name: "ray",
				targets: [
					"pixelmatrix.rings"
				]
			}
		]
	},
	{
		name: "Glitter",
		module: "../effects/PixelNode_Effect_TwoGlitter",
		outputs: [
			{
				name: "glow",
				targets: [
					"pixelmatrix.rings"
				]
			}
		]
	},
	{
		name: "RainBow",
		module: "../effects/PixelNode_Effect_Rainbow",
		scale: 2,
		speed: 100,
		outputs: [
			{
				name: "rainbow",
				targets: [
					"pixelmatrix.rings"
				]
			}
		]
	},
	{
		name: "RainBowRings",
		module: "../effects/PixelNode_Effect_Rainbow",
		scale: 0.1,
		speed: 100,
		outputs: [
			{
				name: "rainbow",
				targets: [
					"pixelmatrix.rings"
				]
			}
		]
	},

	{
		name: "RedBlue",
		module: "../effects/PixelNode_Effect_RedBlue",
		scale: 21,
		outputs: [
			{
				name: "glow",
				targets: [
					"pixelmatrix.rings"
				]
			}
		]
	},	{
		name: "Fire",
		speed: 0,
		module: "../effects/PixelNode_Effect_Fire",
		outputs: [
			{
				name: "glow",
				targets: [
					"pixelmatrix.rings"
				]
			}
		]
	},
	{
		name: "Rain",
		module: "../effects/PixelNode_Effect_ColouredRain",
		speed: 0.75,
    direction: 1,
    intensity: 0.5,
    fixedColor: [0,0,255],
		outputs: [
			{
				name: "glow",
				targets: [
					"pixelmatrix.rings"
				]
			}
		]
	},
	{
		name: "ColouredRain",
		module: "../effects/PixelNode_Effect_ColouredRain",
		speed: 0.75,
    intensity: 0.2,
    direction: -1,
		outputs: [
			{
				name: "glow",
				targets: [
					"pixelmatrix.rings"
				]
			}
		]
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
	},
	{
		name: "Title2",
		module: "./effects/Title.js",
		outputs: [
			{
				name: "glow",
				targets: [
					"pixelmatrix.rings"
				]
			}
		]
	},
	{
		name: "NoCampCamp",
		module: "./effects/Canvas.js",
		draw: [
			{
				type: "text",
				font: "8bitwonder",
				text: "NO",
				position: [6, 0],
				color: [255, 0, 0, 0.9]
			},
			{
				type: "text",
				font: "8bitwonder",
				text: "CAMP",
				position: [12, 11],
				color: [255, 255, 255, 0.6]
			},
			{
				type: "text",
				font: "8bitwonder",
				text: "CAMP",
				position: [0, 22],
				color: [255, 255, 255, 0.8]
			},
		],
		outputs: [
			{
				name: "glow",
				targets: [
					"pixelmatrix.rings"
				]
			}
		]
	},
	{
		name: "Title",
		module: "./effects/Canvas.js",
		preDraw: function() {
		},
		draw: [
			{
				type: "rectangle",
				position: [3, 23],
				width: 58,
				height: 7,
				color: [0,0,0,0.3]
			},
			{
				type: "rectangle",
				position: [3, 2],
				width: 58,
				height: 7,
				color: [0,0,0,0.3]
			},
			{
				type: "text",
				font: "04b3",
				text: "created by",
				position: function() {
					return [this.bounce("line1x", {
						min: 3,
						max: 15,
						speed: 0.25,
						initialDirection: 1,
						initialValue: 1
					}), 2];
				},
				color: [255, 255, 255, 0.9]
			},
			{
				type: "text",
				font: "8bitwonder",
				text: "dwisk",
				position: [3, 11],
				color: function() {
					return [255, 255, 255, this.bounce("line2a", {
						min: 0.5,
						max: 1,
						speed: 0.02,
						initialDirection: 1,
						initialValue: 1,
						round: false
					})]
				}
			},
			{
				type: "text",
				font: "04b3",
				text: "in Munich",
				position: function() {
					return [this.bounce("line3x", {
						min: 3,
						max: 23,
						speed: 0.25,
						initialDirection: -1,
						initialValue: 23
					}), 24];
				},
				color: [255, 255, 255, 0.9]
			}
		],
		outputs: [
			{
				name: "canvas",
				targets: [
					"pixelmatrix.rings"
				]
			}
		]
	}

];
