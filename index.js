var five = require("johnny-five");
var Particle = require("particle-io");
var board = new five.Board({
  io: new Particle({
    token: '9fadc82e938b06a4c102d598e9434505d34d9d64',
    deviceId: '210021000247343138333038'
  })
});

board.on("ready", function() {
  var rightWheel = new five.Motor({
  	pins: {
  		pwm: "D0",
  		dir: "D4"
  	},
  	invertPWM: true
  });

  var leftWheel = new five.Motor({
  	pins: {
  		pwm: "D1",
  		dir: "D5"
  	},
  	invertPWM: true
  });

  var speed = 255;

  function forward() {
  	leftWheel.fwd(speed);
  	rightWheel.fwd(speed);
  }

  function reverse() {
  	leftWheel.rev(speed);
  	rightWheel.rev(speed);
  }

  function stop() {
  	leftWheel.stop();
  	rightWheel.stop();
  }

  function left() {
  	leftWheel.rev(speed);
  	rightWheel.fwd(speed);
  }

  function right() {
  	leftWheel.fwd(speed);
  	rightWheel.rev(speed);
  }

  var stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.resume();

  var keyMap = {
  	'up': forward,
  	'down': reverse,
  	'left': left,
  	'right': right,
  	'space': stop
  };

  stdin.on('keypress', function(chunk, key) {
  	if(!key || !keyMap[key.name]) return;

  	console.log(key.name);

  	keyMap[key.name]();
  })
});