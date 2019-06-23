module.exports = {
  name: "TitleNoCampCamp",
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
}
