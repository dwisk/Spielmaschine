module.exports = [
	
	{
		"name": "Tischtennis",
		"icon": "entypo/paper-plane",
		"title": "Tischtennis",
		"module": "./games/Spielmaschine_Game_Pong",
		"backgroundEffect": "Wave",
		"foregroundEffect": "Pong",
		
		"startButtons": [
			["inputs","touch1","touches", 4],
			["inputs","touch1","touches", 1]			
		],
		
		player1:{ 
			posX: 3,
			fieldWidth: 32,
			inputs: {
				shield: ["inputs","touch1","touches",3],
				power: ["inputs","touch1","touches",7],
				up: ["inputs","touch1","touches",4],
				down: ["inputs","touch1","touches", 1]
			}
		},
		player2: {
			posX: 67,
			fieldWidth: 32,
			inputs: {
				shield: ["inputs","touch2","touches",6],
				power: ["inputs","touch2","touches",2],
				up: ["inputs","touch2","touches",4],
				down: ["inputs","touch2","touches", 0]
			}
		},


		"inputs": {
			"color_left": "inputs.rgb.color_left",
			"color_right": "inputs.rgb.color_right",
			"touches": "touch.touches"
		},
		"speed": 0.01,
		"touch_input": true,
		"color_input": true
	},

	
				{
		"name": "Spielmaschine",
		"icon": "entypo/paper-plane",
		"default": true,
		"title": "Spielmaschine",
		"allowBrightness": true,
		"module": "./games/Spielmaschine_TitleQueue",
		"inputs": {
			"color_left": "inputs.rgb.color_left",
			"color_right": "inputs.rgb.color_right",
			"touches": "touch.touches"
		},
		"afterEffect": "TitleBurnnight",

		"queue": [
			{ "effect": "Maze", "duration": 20000 },
			{ "effect": "RedBlue", "afterEffect": "bmpRadicalInclusion", "duration": 10000 },
			{ "effect": "Wave", "afterEffect": "bmpGifting", "duration": 10000 },
			{ "effect": "RainBow", "afterEffect": "bmpDecommodifcation", "duration": 10000 },
			{ "effect": "Fire", "afterEffect": "bmpRadicalSelfReliance", "duration": 10000 },
			{ "effect": "ColouredRain", "afterEffect": "bmpRadicalSelfExpression", "duration": 10000 },
			{ "effect": "RainBow", "afterEffect": "bmpCommunalEffort", "duration": 10000 },
			{ "effect": "Color", "afterEffect": "bmpCivicResponsibility", "duration": 10000 },
			{ "effect": "Rain", "afterEffect": "bmpLeaveNoTrace", "duration": 10000 },
			{ "effect": "RainBow", "afterEffect": "bmpParticipation", "duration": 10000 },
			{ "effect": "Glitter", "afterEffect": "bmpImmediacy", "duration": 10000 }


		]
	},

	{
		"name": "BeFree",
		"icon": "entypo/paper-plane",
		"title": "BeFree",
		"module": "./games/Spielmaschine_Game_Maze",
		"mapEffect": "Maze",
		"backgroundEffect": "RedBlue",
		"foregroundEffect": "Pong",

		"startButtons": [
			["inputs","touch1","touches", 4],
			["inputs","touch1","touches", 1]			
		],
		
		player1:{ 
			inputs: {
				left: ["inputs","touch1","touches",3],
				right: ["inputs","touch1","touches",7],
				up: ["inputs","touch1","touches",4],
				down: ["inputs","touch1","touches", 1]
			}
		},
		player2: {
			inputs: {
				right: ["inputs","touch2","touches",6],
				left: ["inputs","touch2","touches",2],
				up: ["inputs","touch2","touches",4],
				down: ["inputs","touch2","touches", 0]
			}
		},
		"inputs": {
			"color_left": "inputs.rgb.color_left",
			"color_right": "inputs.rgb.color_right",
			"touches": "touch.touches"
		},

		"speed": 0.01,
		"touch_input": true,
		"color_input": true
	},


{
		"name": "Spielmaschine",
		"default": true,
		"title": "Spielmaschine",
		"module": "../games/PixelNode_Game_EffectQueue",
		"inputs": {
			"color_left": "inputs.rgb.color_left",
			"color_right": "inputs.rgb.color_right",
			"touches": "touch.touches"
		},
		
		"afterEffect": "TitleSpielmaschine",

		"queue": [
			{ "effect": "ColouredRain", "duration": 10000 },
			{ "effect": "Fire", "duration": 10000 },
			{ "effect": "Rain", "duration": 10000 },
			{ "effect": "RedBlue", "duration": 10000 },
			{ "effect": "Glitter", "duration": 10000 }
		]
	}

]
