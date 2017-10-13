module.exports = [
  {
    name: "Wheels",
    module: "./games/Spielmaschine_Game_Wheels/Effect.js",
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
    name: "WheelsStart",
    module: "./effects/Canvas.js",
    preDraw: function() {
      this.probability = global.pixelNode.data.fastGet(["games","Spielmaschine_Game_Wheels","probability"]);
    },
    draw: [
      {
        type: "map",
        position: [0, 0],
        map: [
          [1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1]
        ],
        color: [0, 0, 0]
      },
      {
        type: "rectangle", width: 1, height:1,
        position: [0,0],
        color: function() {
          return [247,167,0, this.probability.B / 10 ]
        }
      },
      {
        type: "rectangle", width: 1, height:1,
        position: [0,1],
        color: function() {
          return [248,233,0, this.probability.D / 10 ]
        }
      },
      {
        type: "rectangle", width: 1, height:1,
        position: [0,2],
        color: function() {
          return [255,0,0, this.probability.S / 10]
        }
      },
      {
        type: "rectangle", width: 1, height:1,
        position: [1,0],
        color: function() {
          return [204,13,230, this.probability.H / 10 ]
        }
      },
      {
        type: "rectangle", width: 1, height:1,
        position: [1,1],
        color: function() {
          return [196,196,196, this.probability.N / 10 ]
        }
      },
      {
        type: "rectangle", width: 1, height:1,
        position: [1,2],
        color: function() {
          return [0,0,255, this.probability.W / 10 ]
        }
      },


      {
        type: "map",
        position: [0, 0],
        map: [
          [0, 0, 0, 0, 1],
          [0, 0, 0, 0, 1]
        ],
        color: [255, 0, 0]
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
