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

  function right() {
  	leftWheel.rev(speed);
  	rightWheel.fwd(speed);
  }

  function left() {
  	leftWheel.fwd(speed);
  	rightWheel.rev(speed);
  }



var servo = new five.Servo({
    id: "MyServo",     // User defined id
    pin: "A4",           // Which pin is it attached to?
    type: "standard"  // Default: "standard". Use "continuous" for continuous rotation servos
        // Default: 0-180
});

  function open()
  {
  	servo.to(40);
  }

  function close()
  {
  	servo.to(90);
  }
  // Sweep from 0-180 and repeat.
 // servo.sweep([0,10]);



  var stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.resume();

  var keyMap = {
  	'up': reverse,
  	'down': forward,
  	'left': left,
  	'right': right,
  	'space': stop,
  	'insert': open,
  	'delete': close
  };

  stdin.on('keypress', function(chunk, key) {
  	console.log(key);
  	if(!key || !keyMap[key.name]) return;

  

  	keyMap[key.name]();
  })
});