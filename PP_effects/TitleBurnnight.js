module.exports = {
  name: "TitleBurnnight", // BBB
  module: "./effects/Canvas.js",
  preDraw: function() {
  },
  draw: [
    {
      type: "text",
      font: "PressStart2P",
      text: "Welcome",
      position: [2, 6],
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
      text: "HOME",
      position: [10, 16],
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
