module.exports = [
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
  }
]
