module.exports = [
  {
    "name": "GamePoint",
    "module": "../effects/PixelNode_Effect_TwoGlitter",
    "outputs": [
      {
        "name": "glow",
        "targets": [
          "left_leg.strips",
					"right_leg.strips",
					"head.strips"
        ]
      }
    ]
  },
  {
		"name": "GameWinner",
		"module": "../effects/PixelNode_Effect_ColouredRain",
		"scale": 0,
		"speed": 0,
		"direction": -1,
		"outputs": [
			{
				"name": "glow",
				"targets": [
          "left_leg.strips",
					"right_leg.strips",
					"head.strips"
				]
			}
		]
	},
  {
		"name": "GameHug",
		"module": "../effects/PixelNode_Effect_Fire",
		"speed": 0,
		"outputs": [
			{
				"name": "glow",
				"targets": [
          "left_leg.strips",
					"right_leg.strips",
					"head.strips"
				]
			}
		]
	}
]
