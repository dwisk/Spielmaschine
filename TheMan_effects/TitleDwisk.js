module.exports = {
  name: "TitleDwisk",
  module: "./effects/Canvas.js",
  draw: [
    {
      type: "map",
      position: [0, 0],
      map: [
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0]
      ],
      color: [255, 0, 0]
    },
    {
      type: "map",
      position: [0, 0],
      map: [
        [0, 1, 0, 0, 0],
        [0, 1, 0, 0, 0]
      ],
      color: [255, 255, 0]
    },
    {
      type: "map",
      position: [0, 0],
      map: [
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
      ],
      color: [0, 255, 0]
    },
    {
      type: "map",
      position: [0, 0],
      map: [
        [0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0]
      ],
      color: [0, 255, 255]
    },
    {
      type: "map",
      position: [0, 0],
      map: [
        [0, 0, 0, 0, 1],
        [0, 0, 0, 0, 1]
      ],
      color: [0, 0, 255]
    },

  ],
  outputs: [
    {
      name: "canvas",
      targets: [
        "left_leg.strips",
        "right_leg.strips",
        "head.strips"
      ]
    }
  ]
}
