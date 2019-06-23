module.exports = [
  {
    name: "GamePoint",
    module: "./effects/Canvas.js",
    draw: [
      {
        type: "rectangle",
        position: [1,1],
        width: 62,
        height: 30,
        color: [0,0,0,0.3]
      },
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
  }
]
