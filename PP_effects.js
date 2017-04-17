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
		name: "Maze",
		module: "./effects/Maze.js",
		outputs: [
			{
				name: "table",
				targets: [
					"pixelmatrix.rings"
				]
			}
		]
	},
	{
		name: "Pong",
		module: "./effects/Pong.js",
		outputs: [
			{
				name: "table",
				targets: [
					"pixelmatrix.rings"
				]
			}
		]
	},
	{
		name: "GamePoint",
		module: "./effects/Canvas.js",
		draw: [
			{
				type: "text",
				font: "8bitwonder",
				text: "POINT",
				position: [6, 11],
				color: function() {
					return [255, 255, 255, this.bounce("line2a", {
						min: 0.74,
						max: 1,
						speed: 0.01,
						initialDirection: 1,
						initialValue: 1,
						round: false
					})];
				}
			},
			{
				type: "text",
				font: "04b3",
				text: function() {
					if (this.variables.player == "player1") {
						return "for LEFT";
					} else {
						return "for RIGHT";
					}

				},
				position: function() {
					if (this.variables.player == "player1") {
						return [6, 22];
					} else {
						return [18, 22];
					}

				},
				color: [255, 255, 255, 1]

			},
			{
				type: "text",
				font: "04b3",
				text: function() {
					return this.variables.score1.toString();

				},
				position: [6, 3],
				color: [255, 255, 255, 1]

			},
			{
				type: "text",
				font: "04b3",
				text: ":",
				align: "center",
				position: [32, 2],
				color: [255, 255, 255, 1]

			},
			{
				type: "text",
				font: "04b3",
				align: "right",
				text: function() {
					return this.variables.score2.toString();

				},
				position: [58, 3],
				color: [255, 255, 255, 1]

			}
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
		name: "GameWinner",
		module: "./effects/Canvas.js",
		draw: [
			{
				type: "text",
				font: "8bitwonder",
				text: "WINS",
				position: function() {
					if (this.variables.player == "player1") {
						return [3, 11];
					} else {
						return [15, 11];
					}

				},
				color: function() {
					return [255, 255, 255, this.bounce("line2a", {
						min: 0.74,
						max: 1,
						speed: 0.01,
						initialDirection: 1,
						initialValue: 1,
						round: false
					})];
				}
			},
			{
				type: "text",
				font: "04b3",
				text: function() {
					if (this.variables.player == "player1") {
						return "LEFT";
					} else {
						return "RIGHT";
					}

				},
				position: function() {
					if (this.variables.player == "player1") {
						return [3, 5];
					} else {
						return [39, 5];
					}

				},
				color: [255, 255, 255, 1]

			},
			{
				type: "text",
				font: "04b3",
				align: function() {
					return this.variables.player == "player1" ? "left" : "right";
				},
				text: function() {
					return this.variables.score1+  " : " + this.variables.score2;
				},
				position: function() {
					if (this.variables.player == "player1") {
						return [3, 22];
					} else {
						return [61, 22];
					}

				},
				color: [255, 255, 255, 1]

			}
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
		name: "GameHug",
		module: "./effects/Canvas.js",
		draw: [
			{
				type: "text",
				font: "8bitwonder",
				text: "HUG",
				position: function() {
					if (this.variables.player == "player1") {
						return [3, 14];
					} else {
						return [15, 14];
					}

				},
				color: function() {
					return [255, 255, 255, this.bounce("line2a", {
						min: 0.74,
						max: 1,
						speed: 0.01,
						initialDirection: 1,
						initialValue: 1,
						round: false
					})];
				}
			},
			{
				type: "text",
				font: "04b3",
				text: "you should",
				position: [3,8],
				color: [255, 255, 255, 1]

			}
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
		name: "PongStart",
		module: "./effects/Canvas.js",
		draw: [
			{
				type: "text",
				font: "8bitwonder",
				text: "Tisch",
				position: [0,2],
				color: function() {
					return [255, 255, 255, this.bounce("line1a", {
						min: 0.74,
						max: 1,
						speed: 0.01,
						initialDirection: -1,
						initialValue: 1,
						round: false
					})];
				}
			},
			{
				type: "text",
				font: "8bitwonder",
				text: "Tennis",
				position: [0,13],
				color: function() {
					return [255, 255, 255, this.bounce("line2a", {
						min: 0.74,
						max: 1,
						speed: 0.01,
						initialDirection: 1,
						initialValue: 0.74,
						round: false
					})];
				}
			},
			{
				type: "text",
				font: "04b3",
				text: "PLAY!",
				position: function() {
					return [this.bounce("line1x", {
						min: 0,
						max: 44,
						speed: 0.25,
						initialDirection: 1,
						initialValue: 0
					}), 25];
				},
				color: [255,0,0]
			}
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
		name: "MazeStart",
		module: "./effects/Canvas.js",
		draw: [
			{
				type: "text",
				font: "PressStart2P",
				text: "BeBeBe",
				position: [9,3],
				color: function() {
					return [255, 255, 255, this.bounce("line1a", {
						min: 0.74,
						max: 1,
						speed: 0.01,
						initialDirection: -1,
						initialValue: 1,
						round: false
					})];
				}
			},
			{
				type: "text",
				font: "8bitwonder",
				text: "Free",
				align: "center",
				position: [32,12],
				color: function() {
					return [255, 255, 255, this.bounce("line2a", {
						min: 0.74,
						max: 1,
						speed: 0.01,
						initialDirection: 1,
						initialValue: 0.74,
						round: false
					})];
				}
			},
			{
				type: "text",
				font: "04b3",
				text: "PLAY!",
				position: function() {
					return [this.bounce("line1x", {
						min: 0,
						max: 44,
						speed: 0.25,
						initialDirection: 1,
						initialValue: 0
					}), 25];
				},
				color: [255,0,0]
			}
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
		name: "TitleDwisk",
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
				text: "for you by",
				position: function() {
					return [this.bounce("line1x", {
						min: 3,
						max: 14,
						speed: 0.25,
						initialDirection: 1,
						initialValue: 1
					}), 2];
				},
				color: function() {
					pushed = global.pixelNode.data.fastGet(["inputs","buttons"]);

					switch (true) {
						case pushed && pushed.btn_1:
							color = [255,0,0];
							break;
						case pushed && pushed.btn_2:
							color = [255,255,0];
							break;
						case pushed && pushed.btn_3:
							color = [0,255,0];
							break;
						case pushed && pushed.btn_4:
							color = [0,255,255];
							break;
						case pushed && pushed.btn_5:
							color = [0,0,255];
							break;
						default:
							color = [255,255,255,0.9];
							break;
					}


					return color;
				}
			},
			{
				type: "text",
				font: "8bitwonder",
				text: "dwisk",
				position: [3, 11],
				color: function() {
					pushed = global.pixelNode.data.fastGet(["inputs","buttons"]);

					switch (true) {
						case pushed && pushed.btn_6:
							color = [255,0,0];
							break;
						case pushed && pushed.btn_7:
							color = [255,255,0];
							break;
						case pushed && pushed.btn_8:
							color = [0,255,0];
							break;
						case pushed && pushed.btn_9:
							color = [0,255,255];
							break;
						case pushed && pushed.btn_10:
							color = [0,0,255];
							break;
						default:
							color = [255,255,255];
							color.push(this.bounce("line2a", {
								min: 0.74,
								max: 1,
								speed: 0.01,
								initialDirection: 1,
								initialValue: 1,
								round: false
							}));
							break;
					}


					return color;
				}
			},
			{
				type: "text",
				font: "04b3",
				text: "Have fun!",
				position: function() {
					return [this.bounce("line3x", {
						min: 3,
						max: 21,
						speed: 0.25,
						initialDirection: -1,
						initialValue: 21
					}), 24];
				},
				color: function() {
					pushed = global.pixelNode.data.fastGet(["inputs","buttons"]);

					switch (true) {
						case pushed && pushed.btn_1:
							color = [255,0,0];
							break;
						case pushed && pushed.btn_2:
							color = [255,255,0];
							break;
						case pushed && pushed.btn_3:
							color = [0,255,0];
							break;
						case pushed && pushed.btn_4:
							color = [0,255,255];
							break;
						case pushed && pushed.btn_5:
							color = [0,0,255];
							break;
						default:
							color = [255,255,255,0.9];
							break;
					}


					return color;
				}
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
	},
	{
		name: "TitleBBB", // BBB
		module: "./effects/Canvas.js",
		preDraw: function() {
		},
		draw: [

			{
				type: "text",
				font: "8bitwonder",
				text: "just",
				position: function() {
					return [this.bounce("line1x", {
						min: 0,
						max: 18,
						speed: 0.25,
						initialDirection: 1,
						initialValue: 1
					}), 1];
				},
				color: function() {
					pushed = global.pixelNode.data.fastGet(["inputs","buttons"]);

					switch (true) {
						case pushed && pushed.btn_1:
							color = [255,0,0];
							break;
						case pushed && pushed.btn_2:
							color = [255,255,0];
							break;
						case pushed && pushed.btn_3:
							color = [0,255,0];
							break;
						case pushed && pushed.btn_4:
							color = [0,255,255];
							break;
						case pushed && pushed.btn_5:
							color = [0,0,255];
							break;
						default:
							color = [255,255,255,0.9];
							break;
					}


					return color;
				}
			},
			{
				type: "text",
				font: "PressStart2P",
				text: "be be be",
				position: function() {
					return [this.bounce("line2x", {
						min: 0,
						max: 7,
						speed: 0.25,
						initialDirection: -1,
						initialValue: 3
					}), 12];
				},
				color: function() {
					pushed = global.pixelNode.data.fastGet(["inputs","buttons"]);

					switch (true) {
						case pushed && pushed.btn_6:
							color = [255,0,0];
							break;
						case pushed && pushed.btn_7:
							color = [255,255,0];
							break;
						case pushed && pushed.btn_8:
							color = [0,255,0];
							break;
						case pushed && pushed.btn_9:
							color = [0,255,255];
							break;
						case pushed && pushed.btn_10:
							color = [0,0,255];
							break;
						default:
							color = [255,255,255];
							break;
					}


					return color;
				}
			},
			{
				type: "text",
				font: "8bitwonder",
				text: "FREE",
				position: function() {
					return [this.bounce("line3x", {
						min: 0,
						max: 18,
						speed: 0.25,
						initialDirection: -1,
						initialValue: 15
					}), 21];
				},
				color: function() {
					pushed = global.pixelNode.data.fastGet(["inputs","buttons"]);

					switch (true) {
						case pushed && pushed.btn_1:
							color = [255,0,0];
							break;
						case pushed && pushed.btn_2:
							color = [255,255,0];
							break;
						case pushed && pushed.btn_3:
							color = [0,255,0];
							break;
						case pushed && pushed.btn_4:
							color = [0,255,255];
							break;
						case pushed && pushed.btn_5:
							color = [0,0,255];
							break;
						default:
							color = [255,255,255,0.9];
							break;
					}


					return color;
				}
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
