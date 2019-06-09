makePrinciple = function(name, title, minX, maxX) {
  var posValue = [minX, 23];

  if (maxX) {
      posValue = function() {
        return [this.bounce(name+"_bounce", {
          min: minX, //-55,
          max: maxX, //15,
          speed: 0.5,
          initialDirection: -1,
          initialValue: maxX
        }), 23];
      }
  }

  return Object.assign({},{
    name: name,
    module: "./effects/Canvas.js",
    draw: [

      // TITLE ----------------------------------------------------------------------
      {
        type: "rectangle",
        position: [0, 0],
        width: 64,
        height: 19,
        color: [0,0,0,0.4]
      },
      {
        type: "text",
        font: "04b3",
        text: "BURNING MAN",
        position: [5, 1],
        color: [255, 255, 255]
      },
      {
        type: "text",
        font: "8bitwonder",
        text: "Principles",
        position: function() {
          return [this.bounce(name+"_bmTitle", {
            min: -120,
            max: 15,
            speed: 0.5,
            initialDirection: -1,
            initialValue: 64
          }), 8];
        },
        color: [255, 255, 255]
      },

      // PRINCIPLE ----------------------------------------------------------------------
      {
        type: "rectangle",
        position: maxX ? [0, 22] : [2, 22],
        width: maxX ? 64 : 60,
        height: 7,
        color: [0,0,0,0.8]
      },

      {
        type: "text",
        font: "04b3",
        text: title,
        position: posValue,
        color: [255, 255, 255]
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
  });


}


module.exports = [
  makePrinciple("bmpParticipation", "Participation", 7),
  makePrinciple("bmpGifting", "Gifting", 18),
  makePrinciple("bmpCommunalEffort", "Communal Effort", -15, 15),
  makePrinciple("bmpRadicalInclusion", "Radical Inclusion", -15, 15),
  makePrinciple("bmpRadicalSelfReliance", "Radical Self Reliance", -35, 15),
  makePrinciple("bmpRadicalSelfExpression", "Radical Self Expression", -45, 15),
  makePrinciple("bmpCivicResponsibility", "Civic Responsibility", -20, 15),
  makePrinciple("bmpLeaveNoTrace", "Leave No Trace", -10, 10),

  makePrinciple("bmpImmediacy", "Immediacy", 10),
  makePrinciple("bmpDecommodifcation", "Decommodifcation", -15, 15),





]
