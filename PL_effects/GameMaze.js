module.exports = [
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
    name: "MazeStart",
    module: "./effects/Canvas.js",
    draw: [
/*      {
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
            min: 9,
            max: 35,
            speed: 0.25,
            initialDirection: 1,
            initialValue: 9
          }), 25];
        },
        color: [255,0,0]
      }*/
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
