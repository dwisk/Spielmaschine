module.exports = {
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
