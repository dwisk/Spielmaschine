module.exports = {
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
      text: "Mephy",
      position: [0, 11],
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
}
