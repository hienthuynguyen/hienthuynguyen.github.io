var ctx;
var keyboard;
var rectangle;
var loop;

ctx = document.querySelector("canvas").getContext("2d");

ctx.canvas.height = 500;
ctx.canvas.width = 1000;

rectangle = {
  height:50,
  jumping:true,
  width:100,
  x:400, // x postion
  x_velocity:0,
  y:0,
  y_velocity:0

};

keyboard = {

  left:false,
  right:false,
  up:false,
  keyListener:function(event) {

    var key_state = (event.type == "keydown")?true:false;

    switch(event.keyCode) {

      case 37:
        keyboard.left = key_state;
      break;
      case 38:
       keyboard.up = key_state;
      break;
      case 39:
        keyboard.right = key_state;
      break;

    }

  }

};

loop = function() {

  if (keyboard.up && rectangle.jumping == false) {

    rectangle.y_velocity -= 20;
    rectangle.jumping = true;

  }

  if (keyboard.left) {

    rectangle.x_velocity -= 0.5;

  }

  if (keyboard.right) {

    rectangle.x_velocity += 0.5;

  }

  rectangle.y_velocity += 1.5;
  rectangle.x += rectangle.x_velocity;
  rectangle.y += rectangle.y_velocity;
  rectangle.x_velocity *= 0.9;
  rectangle.y_velocity *= 0.9;

  // prevent going off the canvas
  if (rectangle.y > 500 - 16 - 50) {

    rectangle.jumping = false;
    rectangle.y = 500 - 16 - 50;
    rectangle.y_velocity = 0;

  }

  // prevent going out of canvas
  if (rectangle.x < -100) {

    rectangle.x = 1000;

  } else if (rectangle.x > 1000) {

    rectangle.x = -100;

  }
 
ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 1000, 500);// x, y, width, height
 ctx.fillStyle = "grey";// hex for red
  ctx.beginPath();
  ctx.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  ctx.fill();
  ctx.strokeStyle = "grey";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(0, 495);
  ctx.lineTo(1000, 495);
 ctx.stroke();
   ctx.font = "30px Rasa";
  ctx.fillText("Use keyboard to Move and Jump!!", 250, 100);

  // update from browser
  window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", keyboard.keyListener)
window.addEventListener("keyup", keyboard.keyListener);
window.requestAnimationFrame(loop);