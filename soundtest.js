var mpg321 = require('mpg321');
player = mpg321().remote();

player.play("test.mp3");


setTimeout(function() {
  player.gain("200")
}, 2000);



setTimeout(function() {
  player.gain("50")
}, 4000);


// var spawn = require('child_process').spawn,
//     child = spawn('mpg321', ["-R","asdf"], { stdio: ['pipe'] });
//
// child.stdin.setEncoding('utf-8');
//
// setTimeout(function() {
//   child.stdin.write('LOAD test.mp3\n');
// }, 1000);
//
// setTimeout(function() {
//   child.stdin.write('STOP\n');
// }, 3000);
//
// setTimeout(function() {
//   child.stdin.write('LOAD test.mp3\n');
// }, 4000);
//
//
// setTimeout(function() {
//   child.stdin.write('GAIN 50\n');
// }, 5000);
//
// setTimeout(function() {
//   child.stdin.write('GAIN 200\n');
// }, 10000);
//
//
// setTimeout(function() {
//   child.stdin.write('QUIT\n');
//   process.exit();
// }, 100000);
//
// //child.stdin.write("load test.mp3\n");
